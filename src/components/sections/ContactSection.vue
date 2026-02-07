<template>
  <section id="contact" class="py-20 sm:py-28 relative overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-dots opacity-30"></div>
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]"></div>
    <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]"></div>

    <div class="container-futuristic relative z-10">
      <!-- Header -->
      <div class="text-center mb-16">
        <TechBadge label="Contato" variant="neon" class="mb-4" />
        <h2 class="heading-futuristic heading-lg text-gradient-animated mb-4">
          Vamos Criar Algo Incrível
        </h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          Pronto para transformar sua ideia em realidade? Entre em contato e vamos conversar sobre seu projeto
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <!-- Contact Info -->
        <div class="space-y-6">
          <GlassCard 
            v-for="(contact, index) in contacts" 
            :key="contact.title"
            variant="dark"
            :animated="true"
            :delay="index * 100"
            class="group"
          >
            <a 
              :href="contact.link"
              target="_blank"
              class="flex items-start gap-4"
            >
              <div 
                class="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                :class="contact.bgClass"
              >
                <component :is="contact.icon" class="w-6 h-6" :class="contact.iconClass" />
              </div>
              <div>
                <h3 class="font-semibold text-white text-lg mb-1">{{ contact.title }}</h3>
                <p class="text-gray-400 whitespace-pre-line">{{ contact.content }}</p>
              </div>
            </a>
          </GlassCard>

          <!-- Social Links -->
          <GlassCard variant="neon" :animated="true" :delay="300">
            <h3 class="font-semibold text-white mb-4">Siga-nos</h3>
            <div class="flex gap-3">
              <a 
                v-for="social in socials" 
                :key="social.name"
                :href="social.link"
                target="_blank"
                class="w-12 h-12 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-600/20 transition-all"
              >
                <component :is="social.icon" class="w-5 h-5" />
              </a>
            </div>
          </GlassCard>
        </div>

        <!-- Contact Form -->
        <GlassCard 
          variant="neon" 
          :animated="true" 
          :delay="200"
          class="h-fit"
        >
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Nome</label>
                <input 
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-500"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">E-mail</label>
                <input 
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-500"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Telefone/WhatsApp</label>
              <input 
                v-model="form.phone"
                type="tel"
                required
                class="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-500"
                placeholder="(00) 00000-0000"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Tipo de Projeto</label>
              <select 
                v-model="form.projectType"
                required
                class="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
              >
                <option value="" disabled>Selecione uma opção</option>
                <option value="site-institucional">Site Institucional</option>
                <option value="e-commerce">E-commerce</option>
                <option value="aplicativo-mobile">Aplicativo Mobile</option>
                <option value="sistema-web">Sistema Web</option>
                <option value="landing-page">Landing Page</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Mensagem</label>
              <textarea 
                v-model="form.message"
                rows="4"
                required
                class="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-500 resize-none"
                placeholder="Conte-nos sobre seu projeto..."
              ></textarea>
            </div>

            <NeonButton
              type="submit"
              variant="primary"
              size="lg"
              block
            >
              <template #icon>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
              </template>
              Enviar Mensagem
            </NeonButton>
          </form>
        </GlassCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import GlassCard from '../ui/GlassCard.vue'
import NeonButton from '../ui/NeonButton.vue'
import TechBadge from '../ui/TechBadge.vue'

// Icons
const LocationIcon = () => h('svg', { class: 'w-6 h-6', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' }),
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 11a3 3 0 11-6 0 3 3 0 016 0z' })
])

const PhoneIcon = () => h('svg', { class: 'w-6 h-6', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' })
])

const EmailIcon = () => h('svg', { class: 'w-6 h-6', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' })
])

const InstagramIcon = () => h('svg', { class: 'w-5 h-5', fill: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' })
])

const LinkedInIcon = () => h('svg', { class: 'w-5 h-5', fill: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' })
])

const GitHubIcon = () => h('svg', { class: 'w-5 h-5', fill: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' })
])

const contacts = [
  {
    title: 'Localização',
    content: 'Araçatuba, SP - Brasil\nAtendimento em todo território nacional',
    link: 'https://maps.google.com/?q=Araçatuba,SP',
    icon: LocationIcon,
    bgClass: 'bg-purple-500/20',
    iconClass: 'text-purple-400'
  },
  {
    title: 'Telefone & WhatsApp',
    content: '(18) 98114-2927\nDisponível 24h via WhatsApp',
    link: 'https://wa.me/5518981142927',
    icon: PhoneIcon,
    bgClass: 'bg-green-500/20',
    iconClass: 'text-green-400'
  },
  {
    title: 'E-mail',
    content: 'contato@elitewebdesigner.com\nResposta em até 2 horas',
    link: 'mailto:contato@elitewebdesigner.com',
    icon: EmailIcon,
    bgClass: 'bg-blue-500/20',
    iconClass: 'text-blue-400'
  }
]

const socials = [
  { name: 'Instagram', link: 'https://www.instagram.com/elite_webdesigner/', icon: InstagramIcon },
  { name: 'LinkedIn', link: 'https://www.linkedin.com/in/tiago-carvalho-ux', icon: LinkedInIcon },
  { name: 'GitHub', link: 'https://github.com/tiagocarvalhoUx/tiagocarvalhoUx', icon: GitHubIcon }
]

const form = ref({
  name: '',
  email: '',
  phone: '',
  projectType: '',
  message: ''
})

const handleSubmit = () => {
  const whatsappMessage = `Olá! Meu nome é ${form.value.name} e gostaria de solicitar um orçamento.

*E-mail:* ${form.value.email}
*Telefone:* ${form.value.phone}
*Tipo de Projeto:* ${form.value.projectType}
*Mensagem:* ${form.value.message}`

  window.open(`https://wa.me/5518981142927?text=${encodeURIComponent(whatsappMessage)}`, '_blank')
}
</script>
