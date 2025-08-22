import * as THREE from 'three'

const TEXTURE_URL = 'https://i.postimg.cc/XYwvXN8D/img-4.png'
const DEPTH_URL = 'https://i.postimg.cc/2SHKQh2q/raw-4.webp'

export async function createScene(canvas) {
  // Check WebGPU support
  const isWebGPUSupported = 'gpu' in navigator
  
  // Create renderer
  let renderer
  if (isWebGPUSupported) {
    try {
      renderer = new THREE.WebGPURenderer({ canvas, antialias: true })
      await renderer.init()
    } catch (error) {
      console.warn('WebGPU not available, falling back to WebGL:', error)
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    }
  } else {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  }

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 1)

  // Create scene
  const scene = new THREE.Scene()

  // Create camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 1

  // Load textures
  const textureLoader = new THREE.TextureLoader()
  const [rawTexture, depthTexture] = await Promise.all([
    new Promise((resolve, reject) => {
      textureLoader.load(TEXTURE_URL, resolve, undefined, reject)
    }),
    new Promise((resolve, reject) => {
      textureLoader.load(DEPTH_URL, resolve, undefined, reject)
    })
  ])

  // Configure textures
  rawTexture.wrapS = rawTexture.wrapT = THREE.RepeatWrapping
  depthTexture.wrapS = depthTexture.wrapT = THREE.RepeatWrapping

  // Create uniforms
  const uniforms = {
    uTime: { value: 0 },
    uPointer: { value: new THREE.Vector2(0, 0) },
    uProgress: { value: 0 },
    uTexture: { value: rawTexture },
    uDepthMap: { value: depthTexture },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
  }

  // Create shader material
  const vertexShader = `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform sampler2D uTexture;
    uniform sampler2D uDepthMap;
    uniform vec2 uPointer;
    uniform float uProgress;
    uniform vec2 uResolution;
    uniform float uTime;
    
    varying vec2 vUv;
    
    // Noise function
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }
    
    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      
      vec2 u = f * f * (3.0 - 2.0 * f);
      
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    
    void main() {
      vec2 uv = vUv;
      float aspect = uResolution.x / uResolution.y;
      
      // Sample depth map
      float depth = texture2D(uDepthMap, uv).r;
      
      // Create parallax effect
      float strength = 0.01;
      vec2 parallaxOffset = depth * uPointer * strength;
      vec2 parallaxUv = uv + parallaxOffset;
      
      // Sample main texture with parallax
      vec4 texColor = texture2D(uTexture, parallaxUv);
      
      // Create tiled UV for dot pattern
      vec2 tiledUv = vec2(uv.x * aspect, uv.y) * 120.0;
      vec2 localUv = fract(tiledUv) * 2.0 - 1.0;
      
      // Create dot pattern
      float dist = length(localUv);
      float brightness = noise(tiledUv * 0.5);
      float dot = smoothstep(0.5, 0.49, dist) * brightness;
      
      // Create scanning effect
      float flow = 1.0 - smoothstep(0.0, 0.02, abs(depth - uProgress));
      
      // Create red scanning mask
      vec3 redMask = vec3(dot * flow * 10.0, 0.0, 0.0);
      
      // Blend screen mode
      vec3 finalColor = texColor.rgb + redMask - texColor.rgb * redMask;
      
      gl_FragColor = vec4(finalColor, texColor.a);
    }
  `

  // Create material
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true
  })

  // Create geometry and mesh
  const geometry = new THREE.PlaneGeometry(2, 2)
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  // Scale mesh to fit screen while maintaining aspect ratio
  const WIDTH = 300
  const HEIGHT = 300
  const scaleFactor = 0.3
  
  const aspectRatio = WIDTH / HEIGHT
  const screenAspect = window.innerWidth / window.innerHeight
  
  if (screenAspect > aspectRatio) {
    mesh.scale.set(
      (window.innerHeight / HEIGHT) * WIDTH * scaleFactor,
      window.innerHeight * scaleFactor,
      1
    )
  } else {
    mesh.scale.set(
      window.innerWidth * scaleFactor,
      (window.innerWidth / WIDTH) * HEIGHT * scaleFactor,
      1
    )
  }

  // Dispose function
  const dispose = () => {
    geometry.dispose()
    material.dispose()
    rawTexture.dispose()
    depthTexture.dispose()
    renderer.dispose()
  }

  return {
    scene,
    camera,
    renderer,
    mesh,
    uniforms,
    dispose
  }
}