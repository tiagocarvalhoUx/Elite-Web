<template>
  <section class="py-16 relative overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 glass-dark"></div>
    <div class="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-blue-600/10"></div>

    <div class="container-futuristic relative z-10">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div 
          v-for="(stat, index) in stats" 
          :key="stat.label"
          class="text-center"
          data-aos="zoom-in"
          :data-aos-delay="index * 150"
        >
          <div class="text-4xl md:text-5xl font-bold text-gradient mb-2">
            <span ref="counters">{{ stat.value }}</span>
          </div>
          <div class="text-gray-400">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stats = [
  { value: '50+', label: 'Projetos Entregues' },
  { value: '30+', label: 'Clientes Satisfeitos' },
  { value: '5+', label: 'Anos de Experiência' },
  { value: '100%', label: 'Comprometimento' }
]
</script>
