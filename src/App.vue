<template>
  <div class="bg-gray-50 overflow-x-hidden">
    <NavBar />
    <CreativeBanner />
    <HeroSection />
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