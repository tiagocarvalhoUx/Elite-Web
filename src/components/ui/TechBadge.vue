<template>
  <div
    :class="[
      'tech-badge',
      `variant-${variant}`,
      `size-${size}`,
      {
        'is-animated': animated,
        'is-pulsing': pulse,
        'has-icon': hasIcon,
        'is-interactive': interactive
      }
    ]"
    :style="customStyles"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Background Glow -->
    <span class="badge-glow"></span>
    
    <!-- Icon -->
    <span v-if="icon || $slots.icon" class="badge-icon">
      <slot name="icon">
        <component :is="icon" v-if="icon" />
      </slot>
    </span>
    
    <!-- Text Content -->
    <span class="badge-content">
      <span class="badge-label">{{ label }}</span>
      <span v-if="sublabel" class="badge-sublabel">{{ sublabel }}</span>
    </span>
    
    <!-- Skill Level Indicator -->
    <div v-if="level !== undefined" class="skill-level">
      <div class="level-bar">
        <div 
          class="level-fill" 
          :style="{ width: `${level}%` }"
        ></div>
      </div>
      <span v-if="showPercentage" class="level-text">{{ level }}%</span>
    </div>
    
    <!-- Shine Effect -->
    <span v-if="shine" class="badge-shine"></span>
  </div>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'

interface Props {
  /** Texto principal do badge */
  label: string
  /** Subtexto opcional */
  sublabel?: string
  /** Ícone do badge */
  icon?: Component
  /** Variante visual */
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'neon' | 'glass' | 'cyber'
  /** Tamanho do badge */
  size?: 'sm' | 'md' | 'lg'
  /** Nível de habilidade (0-100) */
  level?: number
  /** Mostra porcentagem do nível */
  showPercentage?: boolean
  /** Habilita animação de entrada */
  animated?: boolean
  /** Habilita pulsação */
  pulse?: boolean
  /** Habilita efeito shine */
  shine?: boolean
  /** Torna o badge interativo */
  interactive?: boolean
  /** Delay da animação (ms) */
  animationDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  sublabel: '',
  variant: 'default',
  size: 'md',
  showPercentage: false,
  animated: false,
  pulse: false,
  shine: false,
  interactive: false,
  animationDelay: 0
})

const emit = defineEmits<{
  mouseenter: [event: MouseEvent]
  mouseleave: [event: MouseEvent]
}>()

const hasIcon = computed(() => !!props.icon)

const customStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.animationDelay > 0) {
    styles['--animation-delay'] = `${props.animationDelay}ms`
  }
  
  return styles
})

const handleMouseEnter = (event: MouseEvent) => {
  emit('mouseenter', event)
}

const handleMouseLeave = (event: MouseEvent) => {
  emit('mouseleave', event)
}
</script>

<style scoped>
/* ========================================
   BASE DO BADGE
   ======================================== */
.tech-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  border-radius: 100px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  isolation: isolate;
}

/* ========================================
   TAMANHOS
   ======================================== */
.size-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  gap: 0.375rem;
}

.size-sm .badge-icon {
  width: 1rem;
  height: 1rem;
}

.size-md {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.size-md .badge-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.size-lg {
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
}

.size-lg .badge-icon {
  width: 1.5rem;
  height: 1.5rem;
}

/* ========================================
   VARIANTES
   ======================================== */

/* Default */
.variant-default {
  background: rgba(255, 255, 255, 0.1);
  color: #f8fafc;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.variant-default:hover.is-interactive {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* Primary - Roxo */
.variant-primary {
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(109, 40, 217, 0.3) 100%);
  color: #c4b5fd;
  border: 1px solid rgba(139, 92, 246, 0.3);
}

.variant-primary:hover.is-interactive {
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.3) 0%, rgba(109, 40, 217, 0.4) 100%);
  border-color: rgba(139, 92, 246, 0.5);
  box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
  transform: translateY(-2px);
}

/* Secondary - Azul */
.variant-secondary {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.3) 100%);
  color: #93c5fd;
  border: 1px solid rgba(96, 165, 250, 0.3);
}

.variant-secondary:hover.is-interactive {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(37, 99, 235, 0.4) 100%);
  border-color: rgba(96, 165, 250, 0.5);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  transform: translateY(-2px);
}

/* Accent - Cyan */
.variant-accent {
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(8, 145, 178, 0.3) 100%);
  color: #67e8f9;
  border: 1px solid rgba(34, 211, 238, 0.3);
}

.variant-accent:hover.is-interactive {
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.3) 0%, rgba(8, 145, 178, 0.4) 100%);
  border-color: rgba(34, 211, 238, 0.5);
  box-shadow: 0 4px 15px rgba(6, 182, 212, 0.3);
  transform: translateY(-2px);
}

/* Success - Verde */
.variant-success {
  background: linear-gradient(135deg, rgba(74, 222, 128, 0.2) 0%, rgba(34, 197, 94, 0.3) 100%);
  color: #86efac;
  border: 1px solid rgba(74, 222, 128, 0.3);
}

.variant-success:hover.is-interactive {
  background: linear-gradient(135deg, rgba(74, 222, 128, 0.3) 0%, rgba(34, 197, 94, 0.4) 100%);
  border-color: rgba(74, 222, 128, 0.5);
  box-shadow: 0 4px 15px rgba(74, 222, 128, 0.3);
  transform: translateY(-2px);
}

/* Warning - Amarelo/Laranja */
.variant-warning {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.3) 100%);
  color: #fcd34d;
  border: 1px solid rgba(251, 191, 36, 0.3);
}

.variant-warning:hover.is-interactive {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.3) 0%, rgba(245, 158, 11, 0.4) 100%);
  border-color: rgba(251, 191, 36, 0.5);
  box-shadow: 0 4px 15px rgba(251, 191, 36, 0.3);
  transform: translateY(-2px);
}

/* Neon - Efeito neon forte */
.variant-neon {
  background: rgba(10, 10, 15, 0.8);
  color: #d946ef;
  border: 1px solid #d946ef;
  text-shadow: 0 0 10px rgba(217, 70, 239, 0.5);
}

.variant-neon .badge-icon {
  filter: drop-shadow(0 0 5px rgba(217, 70, 239, 0.5));
}

.variant-neon:hover.is-interactive {
  background: rgba(217, 70, 239, 0.1);
  box-shadow: 
    0 0 20px rgba(217, 70, 239, 0.4),
    inset 0 0 20px rgba(217, 70, 239, 0.1);
  transform: translateY(-2px);
}

/* Glass - Glassmorphism */
.variant-glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #f8fafc;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.variant-glass:hover.is-interactive {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* Cyber - Estilo cyberpunk */
.variant-cyber {
  background: linear-gradient(135deg, rgba(34, 211, 238, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%);
  color: #22d3ee;
  border: 1px solid rgba(34, 211, 238, 0.4);
  clip-path: polygon(
    8px 0, 
    100% 0, 
    100% calc(100% - 8px), 
    calc(100% - 8px) 100%, 
    0 100%, 
    0 8px
  );
}

.variant-cber:hover.is-interactive {
  background: linear-gradient(135deg, rgba(34, 211, 238, 0.2) 0%, rgba(124, 58, 237, 0.2) 100%);
  border-color: rgba(34, 211, 238, 0.6);
  box-shadow: 0 4px 15px rgba(34, 211, 238, 0.3);
  transform: translateY(-2px);
}

/* ========================================
   ÍCONE
   ======================================== */
.badge-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.badge-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

/* ========================================
   CONTEÚDO
   ======================================== */
.badge-content {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.badge-label {
  font-weight: 600;
  line-height: 1.2;
}

.badge-sublabel {
  font-size: 0.75em;
  font-weight: 400;
  opacity: 0.8;
}

/* ========================================
   SKILL LEVEL
   ======================================== */
.skill-level {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 0.25rem;
}

.level-bar {
  width: 40px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.size-lg .level-bar {
  width: 60px;
  height: 6px;
}

.level-fill {
  height: 100%;
  background: linear-gradient(90deg, #7c3aed 0%, #3b82f6 100%);
  border-radius: 2px;
  transition: width 0.5s ease;
}

.level-text {
  font-size: 0.625rem;
  font-weight: 500;
  opacity: 0.8;
}

/* ========================================
   GLOW EFFECT
   ======================================== */
.badge-glow {
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: -1;
}

.variant-primary .badge-glow {
  background: #8b5cf6;
  filter: blur(15px);
}

.variant-secondary .badge-glow {
  background: #3b82f6;
  filter: blur(15px);
}

.variant-accent .badge-glow {
  background: #22d3ee;
  filter: blur(15px);
}

.variant-neon .badge-glow {
  background: #d946ef;
  filter: blur(20px);
}

.tech-badge:hover .badge-glow {
  opacity: 0.4;
}

/* ========================================
   SHINE EFFECT
   ======================================== */
.badge-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: shine 3s ease-in-out infinite;
  pointer-events: none;
}

@keyframes shine {
  0%, 100% {
    left: -100%;
  }
  50% {
    left: 150%;
  }
}

/* ========================================
   ANIMAÇÃO DE ENTRADA
   ======================================== */
.is-animated {
  opacity: 0;
  transform: scale(0.8) translateY(10px);
  animation: badge-enter 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: var(--animation-delay, 0ms);
}

@keyframes badge-enter {
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* ========================================
   PULSE ANIMATION
   ======================================== */
.is-pulsing {
  animation: badge-pulse 2s ease-in-out infinite;
}

@keyframes badge-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(124, 58, 237, 0);
  }
}

/* ========================================
   RESPONSIVIDADE
   ======================================== */
@media (max-width: 768px) {
  .size-lg {
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
  }
  
  .skill-level {
    display: none;
  }
}
</style>
