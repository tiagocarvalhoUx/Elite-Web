<template>
  <nav class="fixed w-full z-40 glass-effect transition-all duration-300" :class="{ 'bg-white/95': scrolled }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-14 sm:h-16">
        <!-- Logo -->
        <div class="flex items-center space-x-2 sm:space-x-3">
          <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-full flex items-center justify-center">
            <span class="text-white font-bold text-sm sm:text-lg">WD</span>
          </div>
          <span class="text-lg sm:text-xl font-bold text-gray-800 hidden xs:block">Elite Web Designer</span>
          <span class="text-lg sm:text-xl font-bold text-gray-800 xs:hidden">Elite WD</span>
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
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      
      <!-- Mobile Menu -->
      <div 
        v-show="mobileMenuOpen" 
        class="md:hidden bg-white border-t border-gray-200 py-4 space-y-2"
      >
        <a 
          href="#home" 
          @click="scrollToSection" 
          class="block px-4 py-2 text-gray-900 hover:text-blue-600 hover:bg-gray-50 transition-colors font-semibold"
        >
          Início
        </a>
        <a 
          href="#services" 
          @click="scrollToSection" 
          class="block px-4 py-2 text-gray-900 hover:text-blue-600 hover:bg-gray-50 transition-colors font-semibold"
        >
          Serviços
        </a>
        <a 
          href="#projects" 
          @click="scrollToSection" 
          class="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-semibold"
        >
          Projetos
        </a>
        <a 
          href="#contact" 
          @click="scrollToSection" 
          class="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-semibold"
        >
          Contato
        </a>
      </div>
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