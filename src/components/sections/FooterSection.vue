<template>
  <footer class="relative overflow-hidden border-t border-white/10">
    <!-- Background -->
    <div class="absolute inset-0 glass-dark"></div>
    
    <div class="container-futuristic relative z-10 py-8">
      <div class="text-center space-y-2" data-aos="fade-up" data-aos-duration="600">
        <p class="text-gray-400 text-sm">
          © {{ new Date().getFullYear() }} Elite Web Designer. Todos os direitos reservados.
        </p>
        <p class="text-gray-400 text-sm">
          Desenvolvido com 
          <svg class="w-4 h-4 inline-block text-red-500 animate-pulse mx-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
          </svg>
          para criar experiências digitais extraordinárias
        </p>
      </div>
    </div>

    <!-- Admin Link -->
    <div class="absolute bottom-4 right-4">
      <router-link 
        to="/admin"
        class="text-gray-600 hover:text-gray-400 text-xs transition-colors"
      >
        Admin
      </router-link>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer simples
</script>
