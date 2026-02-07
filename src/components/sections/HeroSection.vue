<template>
  <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0">
      <img 
        src="../../assets/images/home-hero-banner.png" 
        alt="Background"
        class="w-full h-full object-cover opacity-40"
      />
      <!-- Dark Overlay -->
      <div class="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/80 via-[#0a0a0f]/60 to-[#0a0a0f]/90"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-blue-900/30"></div>
    </div>

    <!-- Animated Background Effects -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Gradient Orbs -->
      <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse" style="animation-delay: 1s;"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] animate-pulse" style="animation-delay: 2s;"></div>
      
      <!-- Grid Pattern -->
      <div class="absolute inset-0 bg-grid opacity-10"></div>
    </div>

    <!-- Floating Particles -->
    <FloatingParticles 
      density="medium"
      palette="mixed"
      :interactive="true"
      class="absolute inset-0"
    />

    <!-- Content -->
    <div class="container-futuristic relative z-10 text-center px-4">
      <!-- Main Title -->
      <h1 class="heading-futuristic heading-xl mb-6 animate-slide-up delay-100">
        <span class="block text-white">Elite</span>
        <span class="block text-gradient-animated">Web Designer</span>
      </h1>

      <!-- Description -->
      <p class="text-xl text-gray-400 max-w-2xl mx-auto mb-10 animate-slide-up delay-200">
        Criamos experiências digitais extraordinárias com design inovador, 
        tecnologia de ponta e resultados que superam expectativas
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-300">
        <NeonButton 
          @click="scrollToProjects"
          variant="primary"
          size="lg"
        >
          <template #icon>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          </template>
          Ver Projetos
        </NeonButton>

        <NeonButton 
          @click="scrollToContact"
          variant="ghost"
          size="lg"
        >
          <template #icon>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
          </template>
          Falar Conosco
        </NeonButton>
      </div>

      <!-- Badge -->
      <div class="mt-8 animate-fade-in">
        <TechBadge 
          label="✨ Transformando Ideias em Realidade" 
          variant="neon"
          :animated="true"
        />
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 animate-slide-up delay-500">
        <div v-for="stat in stats" :key="stat.label" class="glass-card p-4 rounded-xl">
          <div class="text-2xl md:text-3xl font-bold text-gradient mb-1">{{ stat.value }}</div>
          <div class="text-sm text-gray-400">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <div class="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
        <div class="w-1 h-2 bg-white/60 rounded-full animate-pulse"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import NeonButton from '../ui/NeonButton.vue'
import TechBadge from '../ui/TechBadge.vue'
import FloatingParticles from '../ui/FloatingParticles.vue'

const stats = [
  { value: '50+', label: 'Projetos Entregues' },
  { value: '30+', label: 'Clientes Satisfeitos' },
  { value: '5+', label: 'Anos de Experiência' },
  { value: '100%', label: 'Comprometimento' }
]

const scrollToProjects = () => {
  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToContact = () => {
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

.neon-glow {
  box-shadow: 
    0 0 20px rgba(139, 92, 246, 0.5),
    0 0 40px rgba(59, 130, 246, 0.3),
    0 0 60px rgba(139, 92, 246, 0.2);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>
