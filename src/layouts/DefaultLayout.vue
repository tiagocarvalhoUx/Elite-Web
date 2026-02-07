<template>
  <div class="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
    <FloatingParticles 
      density="low" 
      palette="mixed"
      :interactive="true"
      class="fixed inset-0 pointer-events-none z-0"
    />
    <NavBar />
    <main class="relative z-10">
      <router-view />
    </main>
    <FooterSection />
    <FloatingWhatsApp />
  </div>
</template>

<script setup lang="ts">
import NavBar from '../components/sections/NavBar.vue'
import FooterSection from '../components/sections/FooterSection.vue'
import FloatingWhatsApp from '../components/sections/FloatingWhatsApp.vue'
import FloatingParticles from '../components/ui/FloatingParticles.vue'
</script>
