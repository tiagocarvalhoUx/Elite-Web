<template>
  <div class="relative h-screen w-full overflow-hidden">
    <!-- Content Overlay -->
    <div class="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 sm:px-10 pointer-events-none">
      <!-- Title Container -->
      <div class="text-center">
        <!-- Main Title -->
        <div class="text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold uppercase leading-tight mb-2">
          <div class="flex flex-wrap justify-center gap-2 lg:gap-6 overflow-hidden text-white">
            <span
              v-for="(word, index) in titleWords"
              :key="index"
              :class="[
                'inline-block transition-opacity duration-800 ease-out transform',
                { 'animate-fade-in-word': index < visibleWords }
              ]"
              :style="{ 
                animationDelay: `${index * 0.13 + (delays[index] || 0)}s`,
                opacity: index < visibleWords ? 1 : 0
              }"
            >
              {{ word }}
            </span>
          </div>
        </div>

        <!-- Subtitle -->
        <div class="text-xs md:text-xl xl:text-2xl 2xl:text-3xl mt-2 overflow-hidden text-white font-bold">
          <div
            :class="[
              'transition-opacity duration-800 ease-out transform',
              { 'animate-fade-in-subtitle': subtitleVisible }
            ]"
            :style="{ 
              animationDelay: `${titleWords.length * 0.13 + 0.2 + subtitleDelay}s`,
              opacity: subtitleVisible ? 1 : 0
            }"
          >
            {{ subtitle }}
          </div>
        </div>
      </div>

      <!-- Explore Button -->
      <button 
        class="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 cursor-pointer pointer-events-auto backdrop-blur-md opacity-0 hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300 animate-fade-in-button"
        :style="{ animationDelay: '2.2s' }"
      >
        {{ buttonText }}
        <span class="flex items-center animate-bounce">
          <svg 
            width="22" 
            height="22" 
            viewBox="0 0 22 22" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            class="transition-transform duration-300 hover:translate-y-0.5"
          >
            <path d="M11 5V17" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <path d="M6 12L11 17L16 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </span>
      </button>
    </div>

    <!-- Three.js Canvas -->
    <canvas 
      ref="canvasRef" 
      class="absolute inset-0 z-0 w-full h-full"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { createScene } from './Scene.js'
import { createPostProcessing } from './PostProcessing.js'

// Props
const props = defineProps({
  title: {
    type: String,
    default: 'Build Your Dreams'
  },
  subtitle: {
    type: String,
    default: 'AI-powered creativity for the next generation.'
  },
  buttonText: {
    type: String,
    default: 'Scroll to explore'
  }
})

// Refs
const canvasRef = ref(null)
const visibleWords = ref(0)
const subtitleVisible = ref(false)
const delays = ref([])
const subtitleDelay = ref(0)

// Computed
const titleWords = props.title.split(' ')

// Variables for Three.js
let scene = null
let postProcessing = null
let animationId = null

// Animation logic
const animateText = () => {
  // Generate random delays for glitch effect
  delays.value = titleWords.map(() => Math.random() * 0.07)
  subtitleDelay.value = Math.random() * 0.1

  // Animate title words
  const showNextWord = () => {
    if (visibleWords.value < titleWords.length) {
      visibleWords.value++
      setTimeout(showNextWord, 600)
    } else {
      setTimeout(() => {
        subtitleVisible.value = true
      }, 800)
    }
  }
  
  setTimeout(showNextWord, 100)
}

// Three.js setup
const initThreeJS = async () => {
  if (!canvasRef.value) return

  try {
    // Create scene
    scene = await createScene(canvasRef.value)
    
    // Create post processing
    postProcessing = await createPostProcessing(
      scene.renderer,
      scene.scene,
      scene.camera
    )

    // Start render loop
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      
      const time = Date.now() * 0.001
      
      // Update scene uniforms
      if (scene.uniforms) {
        scene.uniforms.uProgress.value = (Math.sin(time * 0.5) * 0.5 + 0.5)
      }

      // Update post processing
      if (postProcessing) {
        postProcessing.updateScanProgress(time)
        postProcessing.render()
      } else if (scene.renderer) {
        scene.renderer.render(scene.scene, scene.camera)
      }
    }

    animate()
  } catch (error) {
    console.error('Error initializing Three.js:', error)
  }
}

// Mouse move handler
const handleMouseMove = (event) => {
  if (!scene || !scene.uniforms) return
  
  const rect = canvasRef.value.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width * 2 - 1
  const y = -((event.clientY - rect.top) / rect.height * 2 - 1)
  
  scene.uniforms.uPointer.value.set(x, y)
}

// Resize handler
const handleResize = () => {
  if (!scene) return
  
  const width = window.innerWidth
  const height = window.innerHeight
  
  scene.camera.aspect = width / height
  scene.camera.updateProjectionMatrix()
  scene.renderer.setSize(width, height)
  
  if (postProcessing) {
    postProcessing.setSize(width, height)
  }
}

// Lifecycle
onMounted(async () => {
  await nextTick()
  
  // Start text animation
  animateText()
  
  // Initialize Three.js
  await initThreeJS()
  
  // Add event listeners
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  // Clean up
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  
  if (scene) {
    scene.dispose?.()
  }
  
  if (postProcessing) {
    postProcessing.dispose?.()
  }
  
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* Custom Tailwind animations */
@keyframes fadeInWord {
  from {
    opacity: 0;
    transform: translateY(30px) rotateX(90deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotateX(0);
  }
}

@keyframes fadeInSubtitle {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInButton {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.animate-fade-in-word {
  animation: fadeInWord 0.8s ease forwards;
}

.animate-fade-in-subtitle {
  animation: fadeInSubtitle 0.8s ease forwards;
}

.animate-fade-in-button {
  animation: fadeInButton 0.6s ease forwards;
}

/* Responsive adjustments for mobile */
@media (max-width: 768px) {
  .text-3xl {
    @apply text-2xl;
  }
  
  .gap-2 {
    @apply gap-1;
  }
  
  .bottom-8 {
    @apply bottom-4;
  }
  
  .px-6 {
    @apply px-4;
  }
  
  .py-3 {
    @apply py-2;
  }
}</style>