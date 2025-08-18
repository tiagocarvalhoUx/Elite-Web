<template>
  <section id="contact" class="py-12 sm:py-16 md:py-20 bg-white">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="text-center mb-12 sm:mb-16">
        <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold text-gradient mb-4 font-ramaraja">Vamos Conversar</h2>
        <p class="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto font-ramaraja">
          Pronto para transformar sua ideia em realidade? Entre em contato conosco para um orçamento personalizado
        </p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
        <!-- Contact Info -->
        <div class="space-y-6 sm:space-y-8">
          <div class="flex items-start space-x-4">
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-xl sm:text-2xl font-semibold mb-2 font-ramaraja">Localização</h3>
              <p class="text-gray-600 text-base sm:text-lg font-ramaraja">São Paulo, SP - Brasil<br>Atendimento em todo território nacional</p>
            </div>
          </div>
          
          <div class="flex items-start space-x-4">
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-xl sm:text-2xl font-semibold mb-2 font-ramaraja">Telefone & WhatsApp</h3>
              <p class="text-gray-600 text-base sm:text-lg font-ramaraja">(11) 99999-9999<br>Disponível 24h via WhatsApp</p>
            </div>
          </div>
          
          <div class="flex items-start space-x-4">
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-xl sm:text-2xl font-semibold mb-2 font-ramaraja">E-mail</h3>
              <p class="text-gray-600 text-base sm:text-lg font-ramaraja">contato@elitewebdesigner.com<br>Resposta em até 2 horas</p>
            </div>
          </div>
        </div>
        
        <!-- Contact Form -->
        <div class="bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 rounded-2xl shadow-2xl">
          <form @submit="handleSubmit" class="space-y-4 sm:space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input 
                  v-model="form.name"
                  type="text" 
                  placeholder="Seu Nome" 
                  class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base sm:text-lg font-ramaraja"
                  required
                >
              </div>
              <div>
                <input 
                  v-model="form.email"
                  type="email" 
                  placeholder="Seu E-mail" 
                  class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base sm:text-lg font-ramaraja"
                  required
                >
              </div>
            </div>
            <div>
              <input 
                v-model="form.phone"
                type="tel" 
                placeholder="Telefone/WhatsApp" 
                class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base sm:text-lg font-ramaraja"
                required
              >
            </div>
            <div>
              <select 
                v-model="form.projectType"
                class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base sm:text-lg font-ramaraja"
                required
              >
                <option value="">Selecione o tipo de projeto</option>
                <option value="site-institucional">Site Institucional</option>
                <option value="e-commerce">E-commerce</option>
                <option value="aplicativo-mobile">Aplicativo Mobile</option>
                <option value="sistema-web">Sistema Web</option>
                <option value="landing-page">Landing Page</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <div>
              <textarea 
                v-model="form.message"
                placeholder="Descreva seu projeto..." 
                rows="4"
                class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-base sm:text-lg font-ramaraja"
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all hover-scale shadow-lg text-base sm:text-lg font-ramaraja"
            >
              Solicitar Orçamento Gratuito
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContactSection',
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        projectType: '',
        message: ''
      }
    }
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault()
      
      // WhatsApp message
      const whatsappMessage = `Olá! Gostaria de solicitar um orçamento:
      
*Nome:* ${this.form.name}
*E-mail:* ${this.form.email}
*Telefone:* ${this.form.phone}
*Tipo de Projeto:* ${this.form.projectType}
*Descrição:* ${this.form.message}`
      
      const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`
      window.open(whatsappUrl, '_blank')
      
      // Reset form
      this.form = {
        name: '',
        email: '',
        phone: '',
        projectType: '',
        message: ''
      }
      
      // Show success message
      alert('Redirecionando para WhatsApp...')
    }
  }
}
</script>

<style scoped>
/* Importar fonte Ramaraja */
@import url('https://fonts.googleapis.com/css2?family=Ramaraja:wght@400&display=swap');

.font-ramaraja {
  font-family: 'Ramaraja', serif;
}

.text-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hover-scale {
  transition: transform 0.3s ease;
}

.hover-scale:hover {
  transform: scale(1.05);
}
</style>