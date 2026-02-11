<template>
  <section id="services" class="py-20 sm:py-28 relative overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
    
    <div class="container-futuristic relative z-10">
      <!-- Header -->
      <div class="text-center mb-16">
        <TechBadge label="Serviços" variant="neon" class="mb-4" data-aos="zoom-in" />
        <h2 class="heading-futuristic heading-lg text-gradient-animated mb-4" data-aos="fade-up">
          Soluções Digitais Completas
        </h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          Oferecemos um ecossistema completo de serviços para impulsionar sua presença digital
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <GlassCard 
          v-for="(service, index) in services" 
          :key="service.title"
          variant="dark"
          :hoverable="true"
          :animated="true"
          :delay="index * 100"
          class="group"
          :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'"
          data-aos-offset="300"
          :data-aos-easing="index % 2 === 0 ? 'ease-in-sine' : 'ease-out-sine'"
          :data-aos-duration="index % 2 === 0 ? 800 : 500"
        >
          <!-- Icon -->
          <div 
            class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
            :class="service.bgClass"
          >
            <component :is="service.icon" class="w-8 h-8" :class="service.iconClass" />
          </div>

          <!-- Content -->
          <h3 class="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-colors">
            {{ service.title }}
          </h3>
          <p class="text-gray-400 mb-6">
            {{ service.description }}
          </p>

          <!-- Features -->
          <ul class="space-y-2">
            <li 
              v-for="feature in service.features" 
              :key="feature"
              class="flex items-center gap-2 text-sm text-gray-400"
            >
              <svg class="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              {{ feature }}
            </li>
          </ul>
        </GlassCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h } from 'vue'
import GlassCard from '../ui/GlassCard.vue'
import TechBadge from '../ui/TechBadge.vue'

// Icons
const WebsiteIcon = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' })
])

const StoreIcon = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' })
])

const MobileIcon = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' })
])

const SystemIcon = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' })
])

const LandingIcon = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 10V3L4 14h7v7l9-11h-7z' })
])

const SeoIcon = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' })
])

const services = [
  {
    title: 'Sites Institucionais',
    description: 'Websites profissionais que representam sua marca com excelência e credibilidade.',
    icon: WebsiteIcon,
    bgClass: 'bg-purple-500/20',
    iconClass: 'text-purple-400',
    features: ['Design Responsivo', 'SEO Otimizado', 'Alta Performance', 'CMS Integrado']
  },
  {
    title: 'E-commerce',
    description: 'Lojas virtuais completas para vender seus produtos 24 horas por dia.',
    icon: StoreIcon,
    bgClass: 'bg-blue-500/20',
    iconClass: 'text-blue-400',
    features: ['Pagamento Integrado', 'Gestão de Estoque', 'Relatórios', 'Cupons e Promoções']
  },
  {
    title: 'Aplicativos Mobile',
    description: 'Apps nativos e híbridos para iOS e Android que engajam seus usuários.',
    icon: MobileIcon,
    bgClass: 'bg-cyan-500/20',
    iconClass: 'text-cyan-400',
    features: ['iOS & Android', 'Push Notifications', 'Offline First', 'UI/UX Nativo']
  },
  {
    title: 'Sistemas Web',
    description: 'Sistemas customizados para automatizar e otimizar seus processos.',
    icon: SystemIcon,
    bgClass: 'bg-pink-500/20',
    iconClass: 'text-pink-400',
    features: ['Painel Admin', 'API REST', 'Autenticação', 'Relatórios Avançados']
  },
  {
    title: 'Landing Pages',
    description: 'Páginas de alta conversão para campanhas e lançamentos.',
    icon: LandingIcon,
    bgClass: 'bg-orange-500/20',
    iconClass: 'text-orange-400',
    features: ['Alta Conversão', 'A/B Testing', 'Analytics', 'Forms Inteligentes']
  },
  {
    title: 'SEO & Marketing',
    description: 'Estratégias digitais para aumentar sua visibilidade online.',
    icon: SeoIcon,
    bgClass: 'bg-green-500/20',
    iconClass: 'text-green-400',
    features: ['SEO Técnico', 'Google Ads', 'Analytics', 'Social Media']
  }
]
</script>
