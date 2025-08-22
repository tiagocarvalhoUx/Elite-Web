import * as THREE from 'three'

export async function createPostProcessing(renderer, scene, camera, options = {}) {
  const {
    strength = 1,
    threshold = 1,
    fullScreenEffect = true
  } = options

  // Check if we can use post processing
  if (!renderer.capabilities?.isWebGL2 && !renderer.isWebGPURenderer) {
    console.warn('Post processing requires WebGL2 or WebGPU')
    return null
  }

  // Create render targets
  const renderTarget = new THREE.WebGLRenderTarget(
    window.innerWidth,
    window.innerHeight,
    {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType
    }
  )

  const bloomRenderTarget = new THREE.WebGLRenderTarget(
    window.innerWidth,
    window.innerHeight,
    {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat
    }
  )

  // Create scenes for post processing
  const postScene = new THREE.Scene()
  const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  // Uniforms for post processing
  const postUniforms = {
    tDiffuse: { value: null },
    uScanProgress: { value: 0 },
    uTime: { value: 0 },
    uBloomStrength: { value: strength },
    uBloomThreshold: { value: threshold },
    uFullScreenEffect: { value: fullScreenEffect ? 1.0 : 0.0 },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
  }

  // Post processing vertex shader
  const postVertexShader = `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  // Post processing fragment shader with bloom and scan effect
  const postFragmentShader = `
    uniform sampler2D tDiffuse;
    uniform float uScanProgress;
    uniform float uTime;
    uniform float uBloomStrength;
    uniform float uBloomThreshold;
    uniform float uFullScreenEffect;
    uniform vec2 uResolution;
    
    varying vec2 vUv;
    
    // Gaussian blur for bloom
    vec4 blur(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
      vec4 color = vec4(0.0);
      vec2 off1 = vec2(1.3846153846) * direction;
      vec2 off2 = vec2(3.2307692308) * direction;
      
      color += texture2D(image, uv) * 0.2270270270;
      color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;
      color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;
      color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;
      color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;
      
      return color;
    }
    
    void main() {
      vec2 uv = vUv;
      vec4 originalColor = texture2D(tDiffuse, uv);
      
      // Create scanning effect
      float scanPos = uScanProgress;
      float scanWidth = 0.05;
      float scanLine = smoothstep(0.0, scanWidth, abs(uv.y - scanPos));
      
      // Create red overlay for scan effect
      vec3 redOverlay = vec3(1.0, 0.0, 0.0) * (1.0 - scanLine) * 0.4;
      
      // Apply scan effect
      vec3 withScanEffect = mix(
        originalColor.rgb,
        originalColor.rgb + redOverlay,
        uFullScreenEffect * smoothstep(0.9, 1.0, 1.0 - scanLine)
      );
      
      // Simple bloom approximation
      vec4 blurredColor = blur(tDiffuse, uv, uResolution, vec2(1.0, 0.0));
      blurredColor += blur(tDiffuse, uv, uResolution, vec2(0.0, 1.0));
      blurredColor *= 0.5;
      
      // Apply bloom threshold
      float brightness = dot(blurredColor.rgb, vec3(0.2126, 0.7152, 0.0722));
      vec3 bloomColor = blurredColor.rgb * step(uBloomThreshold, brightness) * uBloomStrength;
      
      // Combine effects
      vec3 finalColor = withScanEffect + bloomColor * 0.3;
      
      gl_FragColor = vec4(finalColor, originalColor.a);
    }
  `

  // Create post processing material
  const postMaterial = new THREE.ShaderMaterial({
    uniforms: postUniforms,
    vertexShader: postVertexShader,
    fragmentShader: postFragmentShader
  })

  // Create post processing mesh
  const postGeometry = new THREE.PlaneGeometry(2, 2)
  const postMesh = new THREE.Mesh(postGeometry, postMaterial)
  postScene.add(postMesh)

  // Post processing object
  const postProcessing = {
    renderTarget,
    bloomRenderTarget,
    postScene,
    postCamera,
    postMaterial,
    uniforms: postUniforms,

    updateScanProgress(time) {
      this.uniforms.uScanProgress.value = (Math.sin(time * 0.5) * 0.5 + 0.5)
      this.uniforms.uTime.value = time
    },

    render() {
      // Render scene to render target
      renderer.setRenderTarget(renderTarget)
      renderer.render(scene, camera)

      // Render post processing to screen
      this.uniforms.tDiffuse.value = renderTarget.texture
      renderer.setRenderTarget(null)
      renderer.render(postScene, postCamera)
    },

    setSize(width, height) {
      renderTarget.setSize(width, height)
      bloomRenderTarget.setSize(width, height)
      this.uniforms.uResolution.value.set(width, height)
    },

    dispose() {
      renderTarget.dispose()
      bloomRenderTarget.dispose()
      postGeometry.dispose()
      postMaterial.dispose()
    }
  }

  return postProcessing
}