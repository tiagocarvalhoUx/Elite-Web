<template>
  <section id="services" class="py-12 sm:py-16 md:py-20 bg-white">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="text-center mb-12 sm:mb-16">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4">Nossos Serviços</h2>
        <p class="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Oferecemos soluções completas em desenvolvimento web com foco em performance e experiência do usuário
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        <div class="group bg-gradient-to-br from-blue-50 to-indigo-100 p-6 sm:p-8 rounded-2xl hover-scale hover:shadow-2xl transition-all duration-500">
          <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
            <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
            </svg>
          </div>
          <h3 class="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Desenvolvimento Frontend</h3>
          <p class="text-gray-600 leading-relaxed">
            Criamos interfaces modernas e responsivas usando as mais recentes tecnologias como React, Vue.js e TypeScript.
          </p>
        </div>
        
        <div class="group bg-gradient-to-br from-purple-50 to-pink-100 p-6 sm:p-8 rounded-2xl hover-scale hover:shadow-2xl transition-all duration-500">
          <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
            <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
            </svg>
          </div>
          <h3 class="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Desenvolvimento Backend</h3>
          <p class="text-gray-600 leading-relaxed">
            Sistemas robustos e escaláveis com Node.js, Express.js e bancos de dados otimizados para alta performance.
          </p>
        </div>
        
        <div class="group bg-gradient-to-br from-green-50 to-emerald-100 p-6 sm:p-8 rounded-2xl hover-scale hover:shadow-2xl transition-all duration-500">
          <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
            <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h3 class="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">UI/UX Design</h3>
          <p class="text-gray-600 leading-relaxed">
            Designs intuitivos e centrados no usuário que convertem visitantes em clientes através de experiências excepcionais.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ServicesSection'
}
</script>