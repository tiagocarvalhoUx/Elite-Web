<template>
  <nav 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="isScrolled ? 'glass-dark py-3' : 'py-6 bg-transparent'"
  >
    <div class="container-futuristic">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <a href="#home" class="flex items-center gap-3 group">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center transform group-hover:scale-110 transition-transform animate-spin-slow neon-glow">
            <span class="text-lg font-bold text-white">WD</span>
          </div>
          <span class="text-xl font-bold text-gradient hidden sm:block">Elite Designer</span>
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-1">
          <a 
            v-for="item in navItems" 
            :key="item.href"
            :href="item.href"
            class="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
            :class="activeSection === item.href.replace('#', '') ? 'text-purple-400 bg-purple-500/10' : ''"
          >
            {{ item.label }}
          </a>
        </div>

        <!-- CTA Button -->
        <div class="hidden md:block">
          <NeonButton 
            href="#contact"
            variant="primary"
            size="sm"
          >
            Orçamento
          </NeonButton>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <Transition 
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div v-if="mobileMenuOpen" class="md:hidden mt-4 glass-dark rounded-2xl p-4 space-y-2">
          <a 
            v-for="item in navItems" 
            :key="item.href"
            :href="item.href"
            @click="mobileMenuOpen = false"
            class="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
            :class="activeSection === item.href.replace('#', '') ? 'text-purple-400 bg-purple-500/10' : ''"
          >
            {{ item.label }}
          </a>
          <div class="pt-2 border-t border-white/10">
            <NeonButton 
              href="#contact"
              variant="primary"
              size="sm"
              block
              @click="mobileMenuOpen = false"
            >
              Solicitar Orçamento
            </NeonButton>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import NeonButton from '../ui/NeonButton.vue'

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Serviços' },
  { href: '#projects', label: 'Projetos' },
  { href: '#contact', label: 'Contato' }
]

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)
const activeSection = ref('home')

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50

  // Update active section
  const sections = navItems.map(item => item.href.replace('#', ''))
  for (const section of sections.reverse()) {
    const element = document.getElementById(section)
    if (element) {
      const rect = element.getBoundingClientRect()
      if (rect.top <= 100) {
        activeSection.value = section
        break
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
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
    0 0 10px rgba(139, 92, 246, 0.5),
    0 0 20px rgba(59, 130, 246, 0.3);
}
</style>
