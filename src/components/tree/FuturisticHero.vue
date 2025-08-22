<template>
  <div class="h-screen relative overflow-hidden">
    <!-- HTML Content Overlay -->
    <div class="h-screen uppercase items-center w-full absolute z-50 pointer-events-none px-10 flex justify-center flex-col">
      <div class="text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold">
        <div class="flex space-x-2 lg:space-x-6 overflow-hidden text-white">
          <div
            v-for="(word, index) in titleWords"
            :key="index"
            :class="index < visibleWords ? 'fade-in' : ''"
            :style="{ 
              animationDelay: `${index * 0.13 + (delays[index] || 0)}s`, 
              opacity: index < visibleWords ? undefined : 0 
            }"
          >
            {{ word }}
          </div>
        </div>
      </div>
      <div class="text-xs md:text-xl xl:text-2xl 2xl:text-3xl mt-2 overflow-hidden text-white font-bold">
        <div
          :class="subtitleVisible ? 'fade-in-subtitle' : ''"
          :style="{ 
            animationDelay: `${titleWords.length * 0.13 + 0.2 + subtitleDelay}s`, 
            opacity: subtitleVisible ? undefined : 0 
          }"
        >
          {{ subtitle }}
        </div>
      </div>
    </div>

    <!-- Explore Button -->
    <button
      class="explore-btn"
      style="animation-delay: 2.2s"
    >
      Scroll to explore
      <span class="explore-arrow">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow-svg">
          <path d="M11 5V17" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M6 12L11 17L16 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </span>
    </button>

    <!-- Three.js Canvas -->
    <canvas ref="canvasRef" class="w-full h-full absolute top-0 left-0"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as THREE from 'three'
import ComponentsShowcase from './ComponentsShowcase.vue'

// Constants
const TEXTUREMAP = 'https://i.postimg.cc/XYwvXN8D/img-4.png'
const DEPTHMAP = 'https://i.postimg.cc/2SHKQh2q/raw-4.webp'
const WIDTH = 300
const HEIGHT = 300

// Reactive data
const canvasRef = ref(null)
const titleWords = ref('Build Your Dreams'.split(' '))
const subtitle = ref('AI-powered creativity for the next generation.')
const visibleWords = ref(0)
const subtitleVisible = ref(false)
const delays = ref([])
const subtitleDelay = ref(0)

// Three.js variables
let scene, camera, renderer, mesh, clock
let uniforms = {}
let animationId

// Animation and setup
onMounted(async () => {
  await nextTick()
  setupThreeJS()
  setupAnimations()
  animate()
})

onUnmounted(() => {
  cleanup()
})

const setupAnimations = () => {
  // Generate random delays for glitch effect
  delays.value = titleWords.value.map(() => Math.random() * 0.07)
  subtitleDelay.value = Math.random() * 0.1

  // Animate title words
  const animateWords = () => {
    if (visibleWords.value < titleWords.value.length) {
      setTimeout(() => {
        visibleWords.value++
        animateWords()
      }, 600)
    } else {
      setTimeout(() => {
        subtitleVisible.value = true
      }, 800)
    }
  }
  animateWords()
}

const setupThreeJS = async () => {
  // Create scene
  scene = new THREE.Scene()
  
  // Create camera
  camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
  )
  camera.position.z = 1

  // Create renderer
  renderer = new THREE.WebGLRenderer({ 
    canvas: canvasRef.value,
    antialias: true,
    alpha: true 
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // Create clock
  clock = new THREE.Clock()

  // Load textures
  const textureLoader = new THREE.TextureLoader()
  const [rawMap, depthMap] = await Promise.all([
    textureLoader.loadAsync(TEXTUREMAP),
    textureLoader.loadAsync(DEPTHMAP)
  ])

  // Create material with custom shader
  const material = createMaterial(rawMap, depthMap)
  
  // Create geometry and mesh
  const aspect = WIDTH / HEIGHT
  const geometry = new THREE.PlaneGeometry(
    aspect * 0.4, 
    0.4
  )
  
  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  // Handle window resize
  window.addEventListener('resize', handleResize)
}

const createMaterial = (rawMap, depthMap) => {
  // Create uniforms
  uniforms = {
    uTime: { value: 0 },
    uPointer: { value: new THREE.Vector2(0) },
    uProgress: { value: 0 },
    uRawMap: { value: rawMap },
    uDepthMap: { value: depthMap },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
  }

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uPointer;
    uniform float uProgress;
    uniform sampler2D uRawMap;
    uniform sampler2D uDepthMap;
    uniform vec2 uResolution;
    
    varying vec2 vUv;
    
    // Noise function
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
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
      float strength = 0.01;
      
      // Sample depth map
      float depth = texture2D(uDepthMap, uv).r;
      
      // Apply parallax effect
      vec2 distortedUv = uv + depth * uPointer * strength;
      vec3 color = texture2D(uRawMap, distortedUv).rgb;
      
      // Create scanning effect
      float scanPos = uProgress;
      float scanWidth = 0.05;
      float scanLine = smoothstep(0.0, scanWidth, abs(uv.y - scanPos));
      vec3 redOverlay = vec3(1.0, 0.0, 0.0) * (1.0 - scanLine) * 0.4;
      
      // Create dot pattern
      float aspect = 300.0 / 300.0;
      vec2 tiledUv = fract(uv * 120.0) - 0.5;
      float dist = length(tiledUv);
      float brightness = noise(uv * 60.0);
      float dot = smoothstep(0.5, 0.49, dist) * brightness;
      
      // Flow effect based on depth
      float flow = 1.0 - smoothstep(0.0, 0.02, abs(depth - uProgress));
      vec3 mask = vec3(dot * flow * 10.0, 0.0, 0.0);
      
      // Blend everything
      color = color + redOverlay + mask;
      
      // Add bloom-like glow
      color += color * 0.3;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `

  return new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true
  })
}

const animate = () => {
  animationId = requestAnimationFrame(animate)
  
  const elapsedTime = clock.getElapsedTime()
  
  if (uniforms.uTime) {
    uniforms.uTime.value = elapsedTime
    uniforms.uProgress.value = (Math.sin(elapsedTime * 0.5) * 0.5 + 0.5)
  }
  
  renderer.render(scene, camera)
}

const handleResize = () => {
  if (camera && renderer) {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    
    if (uniforms.uResolution) {
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight)
    }
  }
}

const handleMouseMove = (event) => {
  if (uniforms.uPointer) {
    const x = (event.clientX / window.innerWidth) * 2 - 1
    const y = -(event.clientY / window.innerHeight) * 2 + 1
    uniforms.uPointer.value.set(x, y)
  }
}

const cleanup = () => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  
  if (renderer) {
    renderer.dispose()
  }
  
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
}

// Add mouse move listener
onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInSubtitle {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-3px);
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
  }
}

.fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.fade-in-subtitle {
  animation: fadeInSubtitle 0.6s ease-out forwards;
}

.explore-btn {
  @apply fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50;
  @apply px-6 py-3 bg-transparent border-2 border-white text-white;
  @apply font-semibold text-sm tracking-wider uppercase;
  @apply flex items-center space-x-2 opacity-0;
  @apply hover:bg-white hover:text-black transition-all duration-300;
  animation: fadeIn 1s ease-out 2.2s forwards;
}

.explore-btn:hover {
  animation: glow 2s ease-in-out infinite;
}

.explore-arrow {
  @apply transition-transform duration-300;
}

.explore-btn:hover .explore-arrow {
  animation: bounce 1s ease-in-out infinite;
}

.arrow-svg {
  @apply w-5 h-5;
}

/* Canvas styling */
canvas {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
}
</style>