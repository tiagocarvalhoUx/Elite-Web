<template>
  <div 
    class="floating-particles"
    :class="[`density-${density}`, { 'is-interactive': interactive }]"
    :style="containerStyle"
  >
    <!-- Canvas para partículas -->
    <canvas
      ref="canvasRef"
      class="particles-canvas"
      :style="canvasStyle"
    />
    
    <!-- Gradient Overlay -->
    <div v-if="gradientOverlay" class="gradient-overlay"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  alpha: number
  pulsePhase: number
  pulseSpeed: number
}

interface Props {
  /** Quantidade de partículas */
  density?: 'low' | 'medium' | 'high'
  /** Cor das partículas */
  color?: 'purple' | 'blue' | 'cyan' | 'mixed' | 'white'
  /** Habilita conexões entre partículas próximas */
  connections?: boolean
  /** Habilita interação com mouse */
  interactive?: boolean
  /** Velocidade das partículas */
  speed?: 'slow' | 'normal' | 'fast'
  /** Tamanho das partículas */
  size?: 'small' | 'medium' | 'large'
  /** Opacidade das partículas */
  opacity?: number
  /** Overlay gradiente no fundo */
  gradientOverlay?: boolean
  /** Distância máxima para conexões */
  connectionDistance?: number
  /** Animação de pulso nas partículas */
  pulse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  density: 'medium',
  color: 'mixed',
  connections: true,
  interactive: true,
  speed: 'slow',
  size: 'medium',
  opacity: 0.6,
  gradientOverlay: true,
  connectionDistance: 150,
  pulse: true
})

const canvasRef = ref<HTMLCanvasElement>()
const containerStyle = computed(() => ({
  '--particle-opacity': props.opacity
}))

const canvasStyle = computed(() => ({
  opacity: props.opacity
}))

// Configurações baseadas nas props
const particleCount = computed(() => {
  const counts = { low: 25, medium: 50, high: 100 }
  return counts[props.density]
})

const speedMultiplier = computed(() => {
  const speeds = { slow: 0.3, normal: 0.6, fast: 1.2 }
  return speeds[props.speed]
})

const sizeMultiplier = computed(() => {
  const sizes = { small: 1, medium: 1.5, large: 2.5 }
  return sizes[props.size]
})

const colorPalettes = {
  purple: ['#a78bfa', '#8b5cf6', '#7c3aed', '#c4b5fd'],
  blue: ['#60a5fa', '#3b82f6', '#2563eb', '#93c5fd'],
  cyan: ['#22d3ee', '#06b6d4', '#0891b2', '#67e8f9'],
  white: ['#f8fafc', '#e2e8f0', '#cbd5e1', '#94a3b8'],
  mixed: ['#a78bfa', '#3b82f6', '#22d3ee', '#f472b6', '#60a5fa', '#c084fc']
}

// Estado
let particles: Particle[] = []
let animationId: number
let ctx: CanvasRenderingContext2D | null = null
let mouseX = 0
let mouseY = 0
let isMouseActive = false

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  ctx = canvas.getContext('2d')
  if (!ctx) return
  
  resizeCanvas()
  createParticles()
  animate()
}

const resizeCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas || !canvas.parentElement) return
  
  const parent = canvas.parentElement
  canvas.width = parent.clientWidth
  canvas.height = parent.clientHeight
}

const createParticles = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  particles = []
  const colors = colorPalettes[props.color]
  
  for (let i = 0; i < particleCount.value; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speedMultiplier.value,
      vy: (Math.random() - 0.5) * speedMultiplier.value,
      radius: (Math.random() * 2 + 1) * sizeMultiplier.value,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.3,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01
    })
  }
}

const animate = () => {
  const canvas = canvasRef.value
  if (!canvas || !ctx) return
  
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  particles.forEach((particle, i) => {
    // Atualizar posição
    particle.x += particle.vx
    particle.y += particle.vy
    
    // Interatividade com mouse
    if (props.interactive && isMouseActive) {
      const dx = mouseX - particle.x
      const dy = mouseY - particle.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist < 200) {
        const force = (200 - dist) / 200
        particle.vx += (dx / dist) * force * 0.02
        particle.vy += (dy / dist) * force * 0.02
      }
    }
    
    // Limitar velocidade
    const maxSpeed = speedMultiplier.value * 2
    const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
    if (speed > maxSpeed) {
      particle.vx = (particle.vx / speed) * maxSpeed
      particle.vy = (particle.vy / speed) * maxSpeed
    }
    
    // Bounce nas bordas
    if (particle.x < 0 || particle.x > canvas.width) {
      particle.vx *= -1
      particle.x = Math.max(0, Math.min(canvas.width, particle.x))
    }
    if (particle.y < 0 || particle.y > canvas.height) {
      particle.vy *= -1
      particle.y = Math.max(0, Math.min(canvas.height, particle.y))
    }
    
    // Atualizar pulso
    if (props.pulse) {
      particle.pulsePhase += particle.pulseSpeed
    }
    
    // Desenhar partícula
    const pulseFactor = props.pulse 
      ? 1 + Math.sin(particle.pulsePhase) * 0.2 
      : 1
    
    ctx.beginPath()
    ctx.arc(
      particle.x, 
      particle.y, 
      particle.radius * pulseFactor, 
      0, 
      Math.PI * 2
    )
    ctx.fillStyle = particle.color
    ctx.globalAlpha = particle.alpha * (0.7 + Math.sin(particle.pulsePhase) * 0.3)
    ctx.fill()
    
    // Glow effect
    const gradient = ctx.createRadialGradient(
      particle.x, particle.y, 0,
      particle.x, particle.y, particle.radius * pulseFactor * 3
    )
    gradient.addColorStop(0, particle.color)
    gradient.addColorStop(1, 'transparent')
    
    ctx.beginPath()
    ctx.arc(
      particle.x, 
      particle.y, 
      particle.radius * pulseFactor * 3, 
      0, 
      Math.PI * 2
    )
    ctx.fillStyle = gradient
    ctx.globalAlpha = particle.alpha * 0.2
    ctx.fill()
    
    // Conexões
    if (props.connections) {
      for (let j = i + 1; j < particles.length; j++) {
        const other = particles[j]
        const dx = particle.x - other.x
        const dy = particle.y - other.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist < props.connectionDistance) {
          const opacity = (1 - dist / props.connectionDistance) * 0.2
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(other.x, other.y)
          ctx.strokeStyle = `rgba(167, 139, 250, ${opacity})`
          ctx.lineWidth = 0.5
          ctx.globalAlpha = opacity
          ctx.stroke()
        }
      }
    }
  })
  
  ctx.globalAlpha = 1
  animationId = requestAnimationFrame(animate)
}

// Event handlers
const handleMouseMove = (e: MouseEvent) => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const rect = canvas.getBoundingClientRect()
  mouseX = e.clientX - rect.left
  mouseY = e.clientY - rect.top
  isMouseActive = true
}

const handleMouseLeave = () => {
  isMouseActive = false
}

const handleResize = () => {
  resizeCanvas()
  createParticles()
}

// Lifecycle
onMounted(() => {
  initCanvas()
  
  const canvas = canvasRef.value
  if (canvas && props.interactive) {
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
  }
  
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  
  const canvas = canvasRef.value
  if (canvas) {
    canvas.removeEventListener('mousemove', handleMouseMove)
    canvas.removeEventListener('mouseleave', handleMouseLeave)
  }
  
  window.removeEventListener('resize', handleResize)
})

// Watch for prop changes
watch(() => props.density, createParticles)
watch(() => props.color, createParticles)
</script>

<style scoped>
.floating-particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.floating-particles.is-interactive {
  pointer-events: auto;
}

.particles-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    rgba(10, 10, 15, 0.4) 70%,
    rgba(10, 10, 15, 0.8) 100%
  );
  pointer-events: none;
}

/* Variações de densidade podem ter ajustes adicionais */
.density-low .particles-canvas {
  opacity: calc(var(--particle-opacity, 0.6) * 0.8);
}

.density-high .particles-canvas {
  opacity: calc(var(--particle-opacity, 0.6) * 1.2);
}
</style>
