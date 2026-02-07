<template>
  <div
    :class="[
      'glass-card-futuristic',
      `variant-${variant}`,
      `size-${size}`,
      { 'is-hoverable': hoverable, 'is-animated': animated, 'has-glow': glow },
      customClass
    ]"
    :style="customStyles"
  >
    <!-- Borda Neon Decorativa -->
    <div v-if="borderGlow" class="card-border-glow"></div>
    
    <!-- Header do Card -->
    <div v-if="$slots.header || title" class="card-header">
      <slot name="header">
        <div class="header-content">
          <div v-if="icon" class="header-icon">
            <component :is="icon" />
          </div>
          <div class="header-text">
            <h3 v-if="title" class="card-title">{{ title }}</h3>
            <p v-if="subtitle" class="card-subtitle">{{ subtitle }}</p>
          </div>
        </div>
      </slot>
    </div>
    
    <!-- Conteúdo Principal -->
    <div class="card-body">
      <slot />
    </div>
    
    <!-- Footer do Card -->
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
    
    <!-- Efeito de Hover Overlay -->
    <div v-if="hoverable" class="hover-overlay"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'

interface Props {
  /** Variante visual do card */
  variant?: 'default' | 'neon' | 'dark' | 'light' | 'cyber'
  /** Tamanho do card */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Título do card */
  title?: string
  /** Subtítulo do card */
  subtitle?: string
  /** Ícone do header */
  icon?: Component
  /** Habilita efeitos de hover */
  hoverable?: boolean
  /** Habilita animação de entrada */
  animated?: boolean
  /** Habilita glow ao redor do card */
  glow?: boolean
  /** Habilita borda com glow neon */
  borderGlow?: boolean
  /** Delay da animação (em ms) */
  animationDelay?: number
  /** Classes CSS customizadas */
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  title: '',
  subtitle: '',
  hoverable: true,
  animated: false,
  glow: false,
  borderGlow: false,
  animationDelay: 0,
  customClass: ''
})

const customStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.animationDelay > 0) {
    styles['--animation-delay'] = `${props.animationDelay}ms`
  }
  
  return styles
})
</script>

<style scoped>
.glass-card-futuristic {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  isolation: isolate;
}

/* ========================================
   VARIANTES
   ======================================== */

/* Default - Glassmorphism padrão */
.variant-default {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Neon - Com bordas neon */
.variant-neon {
  background: linear-gradient(
    135deg,
    rgba(124, 58, 237, 0.15) 0%,
    rgba(59, 130, 246, 0.1) 50%,
    rgba(34, 211, 238, 0.05) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(168, 85, 247, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(124, 58, 237, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Dark - Mais escuro */
.variant-dark {
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

/* Light - Mais claro */
.variant-light {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Cyber - Estilo cyberpunk */
.variant-cyber {
  background: linear-gradient(
    135deg,
    rgba(34, 211, 238, 0.1) 0%,
    rgba(59, 130, 246, 0.15) 50%,
    rgba(124, 58, 237, 0.1) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(34, 211, 238, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(34, 211, 238, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  clip-path: polygon(
    0 10px,
    10px 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    10px 100%,
    0 calc(100% - 10px)
  );
}

/* ========================================
   TAMANHOS
   ======================================== */
.size-sm {
  padding: 1rem;
}

.size-sm .card-header {
  padding-bottom: 0.75rem;
  margin-bottom: 0.75rem;
}

.size-sm .card-title {
  font-size: 1rem;
}

.size-md {
  padding: 1.5rem;
}

.size-md .card-header {
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.size-md .card-title {
  font-size: 1.25rem;
}

.size-lg {
  padding: 2rem;
}

.size-lg .card-header {
  padding-bottom: 1.25rem;
  margin-bottom: 1.25rem;
}

.size-lg .card-title {
  font-size: 1.5rem;
}

.size-xl {
  padding: 2.5rem;
}

.size-xl .card-header {
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
}

.size-xl .card-title {
  font-size: 1.75rem;
}

/* ========================================
   HEADER
   ======================================== */
.card-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.header-icon {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%);
  color: #a78bfa;
  font-size: 1.25rem;
}

.header-text {
  flex: 1;
  min-width: 0;
}

.card-title {
  font-weight: 700;
  color: #f8fafc;
  line-height: 1.3;
  margin: 0;
}

.card-subtitle {
  font-size: 0.875rem;
  color: #94a3b8;
  margin-top: 0.25rem;
  margin-bottom: 0;
}

/* ========================================
   BODY E FOOTER
   ======================================== */
.card-body {
  flex: 1;
  position: relative;
  z-index: 1;
}

.card-footer {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* ========================================
   EFEITOS DE HOVER
   ======================================== */
.is-hoverable {
  cursor: pointer;
}

.is-hoverable:hover {
  transform: translateY(-8px);
}

.variant-default.is-hoverable:hover {
  border-color: rgba(168, 85, 247, 0.4);
  box-shadow: 
    0 20px 50px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(124, 58, 237, 0.2);
}

.variant-neon.is-hoverable:hover {
  border-color: rgba(217, 70, 239, 0.6);
  box-shadow: 
    0 20px 50px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(124, 58, 237, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.variant-cyber.is-hoverable:hover {
  border-color: rgba(34, 211, 238, 0.6);
  box-shadow: 
    0 20px 50px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(34, 211, 238, 0.3);
}

.hover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 50%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 0;
}

.is-hoverable:hover .hover-overlay {
  opacity: 1;
}

/* ========================================
   GLOW EXTERNO
   ======================================== */
.has-glow {
  position: relative;
}

.has-glow::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 22px;
  background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 50%, #22d3ee 100%);
  opacity: 0;
  filter: blur(20px);
  transition: opacity 0.4s ease;
  z-index: -1;
}

.has-glow:hover::before {
  opacity: 0.5;
}

/* ========================================
   BORDA GLOW
   ======================================== */
.card-border-glow {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, #d946ef 0%, #8b5cf6 50%, #3b82f6 100%);
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0.5;
  animation: border-pulse 3s ease-in-out infinite;
  pointer-events: none;
}

@keyframes border-pulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
}

/* ========================================
   ANIMAÇÃO DE ENTRADA
   ======================================== */
.is-animated {
  opacity: 0;
  transform: translateY(30px);
  animation: card-enter 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: var(--animation-delay, 0ms);
}

@keyframes card-enter {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ========================================
   RESPONSIVIDADE
   ======================================== */
@media (max-width: 768px) {
  .size-lg,
  .size-xl {
    padding: 1.5rem;
  }
  
  .is-hoverable:hover {
    transform: translateY(-4px);
  }
}
</style>
