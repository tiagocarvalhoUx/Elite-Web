<template>
  <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Background com banner de laptop colorido -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
      <!-- Banner principal -->
      <div class="absolute inset-0 flex items-center justify-center">
        <img 
          src="../../assets/images/home-hero-banner.png" 
          alt="Creative laptop banner"
          class="w-full h-full object-cover opacity-90"
        />
      </div>
      
     
     
    </div>
    
    <!-- Partículas animadas -->
    <div class="absolute inset-0 z-10">
      <div class="absolute top-1/4 left-1/4 w-4 h-4 bg-white rounded-full opacity-30 animate-float"></div>
      <div class="absolute top-1/3 right-1/3 w-6 h-6 bg-blue-400 rounded-full opacity-20 animate-float" style="animation-delay: -2s;"></div>
      <div class="absolute bottom-1/4 left-1/3 w-3 h-3 bg-yellow-400 rounded-full opacity-40 animate-float" style="animation-delay: -4s;"></div>
      <div class="absolute top-1/2 right-1/4 w-5 h-5 bg-red-400 rounded-full opacity-25 animate-float" style="animation-delay: -1s;"></div>
      <div class="absolute top-2/3 left-1/5 w-2 h-2 bg-purple-400 rounded-full opacity-35 animate-float" style="animation-delay: -3s;"></div>
      <div class="absolute bottom-1/3 right-1/5 w-4 h-4 bg-orange-400 rounded-full opacity-30 animate-float" style="animation-delay: -1.5s;"></div>
    </div>
    
    <div class="container mx-auto px-4 sm:px-6 text-center text-white relative z-20">
      <div class="mb-6 sm:mb-8 animate-float">
        <div class="mx-auto w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center neon-glow shadow-2xl">
          <span class="text-white font-bold text-3xl sm:text-5xl">WD</span>
        </div>
      </div>
      
      <h1 class="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 animate-pulse-slow text-shadow-lg">
        Elite Web Designer
      </h1>
      
      <p class="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 opacity-90 max-w-3xl mx-auto px-4 text-shadow">
        Transformando ideias em experiências digitais extraordinárias com design inovador e tecnologia de ponta
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center px-4">
        <button 
          @click="scrollToProjects"
          class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover-scale hover:from-blue-600 hover:to-purple-700 transition-all shadow-2xl border-2 border-transparent hover:border-white/30"
        >
          Ver Projetos
        </button>
        <button 
          @click="scrollToContact"
          class="border-2 border-white/80 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white hover:text-gray-800 transition-all hover-scale backdrop-blur-sm"
        >
          Falar Conosco
        </button>
      </div>
    </div>
    
    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
      <svg class="w-6 h-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  methods: {
    scrollToProjects() {
      const projectsSection = document.querySelector('#projects')
      if (projectsSection) {
        projectsSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    },
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

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

.hover-scale {
  transition: transform 0.3s ease;
}

.hover-scale:hover {
  transform: scale(1.05);
}

.neon-glow {
  box-shadow: 
    0 0 20px rgba(139, 92, 246, 0.3),
    0 0 40px rgba(59, 130, 246, 0.2),
    0 0 80px rgba(139, 92, 246, 0.1);
}

.text-shadow-lg {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.text-shadow {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
}

/* Garantir que o background cubra toda a tela */
#home::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #1e1e2e 0%, #2d1b69 50%, #11998e 100%);
  z-index: -1;
}
</style>