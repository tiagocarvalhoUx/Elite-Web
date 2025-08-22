<template>
  <div class="bg-gray-50 overflow-x-hidden">
    <NavBar />
    <CreativeBanner />       
    <HeroSection />
    <ComponentsShowcase  />
    
    

  



    
    <ServicesSection />
    <ProjectsSection />
    <StatsSection />
    <ContactSection />
    <FooterSection />
    <FloatingWhatsApp />
  </div>

  



</template>

<script>
import NavBar from './components/sections/NavBar.vue'
import CreativeBanner from './components/sections/CreativeBanner.vue'
import HeroSection from './components/sections/HeroSection.vue'
import ServicesSection from './components/sections/ServicesSection.vue'
import ProjectsSection from './components/sections/ProjectsSection.vue'
import StatsSection from './components/sections/StatsSection.vue'
import ContactSection from './components/sections/ContactSection.vue'
import FooterSection from './components/sections/FooterSection.vue'
import FloatingWhatsApp from './components/sections/FloatingWhatsApp.vue'
import ComponentsShowcase from './components/tree/ComponentsShowcase.vue'





export default {
  name: 'App',
  components: {
    NavBar,
    CreativeBanner,
    HeroSection,
    ServicesSection,
    ProjectsSection,
    StatsSection,
    ContactSection,
    FooterSection,
    FloatingWhatsApp
  }
}
</script>



<script setup>
import { ref, onMounted } from 'vue'
import SceneView from '../src/components/tree/SceneView.vue'

// Estado da aplicação
const showThreeScene = ref(true)
const showNavigation = ref(true)
const showSettings = ref(false)
const isLoading = ref(false)
const isPortuguese = ref(true)

// Textos customizáveis
const customTitle = ref('')
const customSubtitle = ref('')
const currentTitle = ref('Construa seus Sonhos')
const currentSubtitle = ref('AI-powered creativity for the next generation.')
const buttonText = ref('Scroll to explore')

// Textos em diferentes idiomas
const texts = {
  pt: {
    title: 'Construa Seus Sonhos',
    subtitle: 'Criatividade impulsionada por IA para a próxima geração.',
    button: 'Role para explorar'
  },
  en: {
    title: 'Build Your Dreams',
    subtitle: 'AI-powered creativity for the next generation.',
    button: 'Scroll to explore'
  }
}

// Métodos
const toggleScene = async () => {
  if (!showThreeScene.value) {
    isLoading.value = true
    // Simular carregamento
    await new Promise(resolve => setTimeout(resolve, 1000))
    isLoading.value = false
  }
  showThreeScene.value = !showThreeScene.value
}

const changeLanguage = () => {
  isPortuguese.value = !isPortuguese.value
  const lang = isPortuguese.value ? 'pt' : 'en'
  
  if (!customTitle.value) {
    currentTitle.value = texts[lang].title
  }
  
  if (!customSubtitle.value) {
    currentSubtitle.value = texts[lang].subtitle
  }
  
  buttonText.value = texts[lang].button
}

const updateTitle = () => {
  currentTitle.value = customTitle.value || texts[isPortuguese.value ? 'pt' : 'en'].title
}

const updateSubtitle = () => {
  currentSubtitle.value = customSubtitle.value || texts[isPortuguese.value ? 'pt' : 'en'].subtitle
}

const resetToDefault = () => {
  customTitle.value = ''
  customSubtitle.value = ''
  const lang = isPortuguese.value ? 'pt' : 'en'
  currentTitle.value = texts[lang].title
  currentSubtitle.value = texts[lang].subtitle
}

// Inicialização
onMounted(() => {
  // Definir textos iniciais
  const lang = isPortuguese.value ? 'pt' : 'en'
  currentTitle.value = texts[lang].title
  currentSubtitle.value = texts[lang].subtitle
  buttonText.value = texts[lang].button
})
</script>

<style>
/* Global styles com Tailwind */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Custom scrollbar */
::-webkit-scrollbar {
  @apply w-2;
}

::-webkit-scrollbar-track {
  @apply bg-black;
}

::-webkit-scrollbar-thumb {
  @apply bg-white/20 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-white/30;
}

/* Smooth transitions for all interactive elements */
* {
  @apply transition-colors duration-200;
}

/* Custom gradient backgrounds */
.bg-gradient-cosmic {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.bg-gradient-neon {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

/* Custom animations with Tailwind */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Responsive font sizes */
@screen sm {
  .text-responsive {
    @apply text-lg;
  }
}

@screen md {
  .text-responsive {
    @apply text-xl;
  }
}

@screen lg {
  .text-responsive {
    @apply text-2xl;
  }
}
</style>