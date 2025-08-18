<template>
  <section class="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-3 sm:py-4 mt-14 sm:mt-16 overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 opacity-20">
      <div class="absolute top-1/2 left-1/4 w-2 h-2 bg-white rounded-full animate-float"></div>
      <div class="absolute top-1/3 right-1/3 w-3 h-3 bg-white rounded-full animate-float" style="animation-delay: -1s;"></div>
      <div class="absolute bottom-1/2 right-1/4 w-2 h-2 bg-white rounded-full animate-float" style="animation-delay: -2s;"></div>
    </div>
    
    <div class="container mx-auto px-4 relative z-10">
      <div class="flex items-center justify-center text-center">
        <div class="flex items-center space-x-2 sm:space-x-4">
          <!-- Animated icon -->
          <div class="animate-pulse">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          
          <!-- Banner text -->
          <p class="text-white text-sm sm:text-base font-medium">
            <span class="hidden sm:inline">🚀 Transformamos suas ideias em realidade digital!</span>
            <span class="sm:hidden">🚀 Suas ideias, nossa expertise!</span>
          </p>
          
          <!-- CTA Button -->
          <button 
            @click="scrollToContact"
            class="bg-white text-purple-600 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <span class="hidden sm:inline">Começar Agora</span>
            <span class="sm:hidden">Começar</span>
          </button>
        </div>
      </div>
      
      <!-- Sliding offer text -->
      <div class="mt-2 overflow-hidden">
        <div class="animate-pulse">
          <p class="text-white text-xs sm:text-sm text-center opacity-90">
            <span class="hidden sm:inline">💡 Consulta gratuita • Orçamento sem compromisso • Suporte 24/7</span>
            <span class="sm:hidden">💡 Consulta gratuita • Orçamento grátis</span>
          </p>
        </div>
      </div>
    </div>
    
    <!-- Decorative wave -->
    <div class="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1200 40" class="w-full h-4 text-gray-50">
        <path fill="currentColor" d="M0,0 C150,40 350,40 600,20 C850,0 1050,0 1200,20 L1200,40 L0,40 Z"></path>
      </svg>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CreativeBanner',
  methods: {
    scrollToContact() {
      const contactSection = document.querySelector('#contact')
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  }
}
</script>