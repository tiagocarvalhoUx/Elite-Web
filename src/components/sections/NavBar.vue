<template>
  <nav class="fixed w-full z-40 glass-effect transition-all duration-300" :class="{ 'bg-white/95': scrolled }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-14 sm:h-16">
        <!-- Logo -->
        <div class="flex items-center space-x-2 sm:space-x-3">
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span class="text-white font-bold text-lg sm:text-xl">WD</span>
          </div>
          <span class="text-xl text-gray-500 border-b-2 border-transparent font-bold">Elite Web Designer</span>
        </div>
        
        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-8">
          <a href="#home" @click="scrollToSection" class="text-gray-700 hover:text-blue-600 transition-colors font-semibold">Início</a>
          <a href="#services" @click="scrollToSection" class="text-gray-700 hover:text-blue-600 transition-colors font-semibold">Serviços</a>
          <a href="#projects" @click="scrollToSection" class="text-gray-700 hover:text-blue-600 transition-colors font-semibold">Projetos</a>
          <a href="#contact" @click="scrollToSection" class="text-gray-700 hover:text-blue-600 transition-colors font-semibold">Contato</a>
        </div>
        
        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu" 
          class="md:hidden p-2"
          aria-label="Menu"
        >
          <svg class="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              v-if="!mobileMenuOpen"
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
            <path 
              v-else
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      
      <!-- Mobile Menu Melhorado -->
      <transition name="fade">
        <div 
          v-show="mobileMenuOpen" 
          class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center space-y-6 px-6"
        >
          <button
            @click="toggleMobileMenu"
            class="absolute top-6 right-6 text-white bg-black/30 rounded-full p-2 shadow-lg focus:outline-none"
            aria-label="Fechar menu"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <a 
            href="#home" 
            @click="scrollToSection" 
            class="block text-2xl font-bold text-white hover:text-blue-400 transition-colors py-2 w-full text-center"
          >
            Início
          </a>
          <a 
            href="#services" 
            @click="scrollToSection" 
            class="block text-2xl font-bold text-white hover:text-blue-400 transition-colors py-2 w-full text-center"
          >
            Serviços
          </a>
          <a 
            href="#projects" 
            @click="scrollToSection" 
            class="block text-2xl font-bold text-white hover:text-blue-400 transition-colors py-2 w-full text-center"
          >
            Projetos
          </a>
          <a 
            href="#contact" 
            @click="scrollToSection" 
            class="block text-2xl font-bold text-white hover:text-blue-400 transition-colors py-2 w-full text-center"
          >
            Contato
          </a>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      mobileMenuOpen: false,
      scrolled: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    scrollToSection(event) {
      event.preventDefault()
      const target = document.querySelector(event.target.getAttribute('href'))
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
      this.mobileMenuOpen = false
    },
    handleScroll() {
      this.scrolled = window.scrollY > 100
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>