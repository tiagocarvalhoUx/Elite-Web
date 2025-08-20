<template>
  <section id="projects" class="py-12 sm:py-16 md:py-20 bg-[#ececec] relative min-h-[722px] flex flex-col justify-center">
    <div class="container mx-auto px-4 sm:px-6 max-w-[1920px]">
      <!-- Header Section -->
      <div class="text-center mb-8 sm:mb-12">
        <h2 class="text-[#531381] text-xl sm:text-2xl md:text-3xl lg:text-[38px] font-semibold font-segoe-ui-emoji leading-tight">
          Conferir alguns de nossos projetos
        </h2>
      </div>
      
      <!-- Projects Grid -->
      <div class="max-w-[1280px] mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div class="project-item" v-for="(project, index) in projects" :key="index">
            <a 
              :href="project.link" 
              target="_blank"
              rel="noopener noreferrer"
              class="block w-full h-full"
            >
              <img 
                class="w-full h-[150px] sm:h-[180px] md:h-[200px] object-cover rounded-[10px] hover:scale-105 transition-transform duration-300 cursor-pointer" 
                :src="project.src" 
                :alt="project.alt"
              />
            </a>
          </div>
        </div>
      </div>
      
      <!-- Call to Action Button -->
      <div class="text-center mt-8 sm:mt-12">
        <a 
          :href="whatsappLink"
          target="_blank"
          rel="noopener noreferrer"
          class="cta-button bg-gradient-to-b from-[#430d97] to-[#7b2796] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-[25px] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center mx-auto gap-3 min-w-[280px] sm:min-w-[350px] lg:min-w-[407px] no-underline"
        >
          <span class="text-sm sm:text-base lg:text-[17px] font-semibold font-segoe-ui-emoji uppercase tracking-wide">
            Vamos dar início ao seu projeto?
          </span>
          <!-- WhatsApp Icon -->
          <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
// Imports das imagens dos projetos
import projeto1 from '../../assets/images/burguer layout.png'
import projeto2 from '../../assets/images/Barbearia.png'
import projeto3 from '../../assets/images/Faster-food.png'
import projeto4 from '../../assets/images/Mrv.png'
import projeto5 from '../../assets/images/Pet-shop.png'
import projeto6 from '../../assets/images/coffe-app.png'
import projeto7 from '../../assets/images/marcenaria.png'
import projeto8 from '../../assets/images/reza-vela.png'
import projeto9 from '../../assets/images/caetano-hidráulica.png'

export default {
  name: 'ProjectsGallerySection',
  data() {
    return {
      // Configure seu número do WhatsApp aqui (formato internacional)
      phoneNumber: '5518981142927', // Substitua pelo seu número
      message: 'Olá! Gostaria de iniciar um projeto com vocês. Vi o portfólio no site e me interessei pelos serviços.',
      // Imagens dos projetos com links
      projects: [
        
        { 
          src: projeto4, 
          alt: 'https://mrv-house.vercel.app/', 
          link: 'https://exemplo-mrv.com', // Link externo
          external: true
        },
        { 
          src: projeto5, 
          alt: 'Projeto Pet Shop', 
          link: 'https://petshop-chi.vercel.app/',
          external: false
        },
        { 
          src: projeto6, 
          alt: 'Projeto Coffee App', 
          link: 'https://coffe-web-henna.vercel.app/', // Link externo
          external: true
        },
        { 
          src: projeto7, 
          alt: 'Projeto Marcenaria App', 
          link: 'https://marcenaria-vue.vercel.app/', // Link externo
          external: true
        },
        { 
          src: projeto8, 
          alt: 'Projeto Reza Vela', 
          link: 'https://reza-vela.vercel.app/', // Link externo
          external: true
        },
        { 
          src: projeto9, 
          alt: 'Projeto Caetano Hidráulica', 
          link: 'https://caetano-hidraulica.vercel.app/', // Link externo
          external: true
        },
        { 
          src: projeto1, 
          alt: 'Projeto Burger Layout', 
          link: 'https://cardapio-hambuguer-three.vercel.app/', // Link interno da aplicação
          external: false
        },
        { 
          src: projeto2, 
          alt: 'Projeto Barbearia', 
          link: 'https://barbearia-react-eight.vercel.app/',
          external: false
        },
        { 
          src: projeto3, 
          alt: 'Projeto Faster Food', 
          link: 'https://faster-food-omega.vercel.app/',
          external: false
        },
      ]
    }
  },
  computed: {
    whatsappLink() {
      const encodedMessage = encodeURIComponent(this.message);
      return `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
    }
  }
}
</script>

<style scoped>
.font-segoe-ui-emoji {
  font-family: 'Segoe UI Emoji', 'Segoe UI', system-ui, -apple-system, sans-serif;
}

.project-item {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

.project-item a {
  text-decoration: none;
}

.project-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(67, 13, 151, 0.1), rgba(123, 39, 150, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.project-item:hover::after {
  opacity: 1;
}

.cta-button {
  position: relative;
  overflow: hidden;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 80px;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 176, 123, 0.3));
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.cta-button:hover::before {
  transform: translateX(0);
}

.cta-button:hover {
  transform: translateY(-2px);
  text-decoration: none;
}

.cta-button:active {
  transform: translateY(0);
}

/* Responsividade adicional para telas muito pequenas */
@media (max-width: 640px) {
  .project-item img {
    height: 120px;
  }
}

/* Para telas grandes, manter proporções mais próximas ao design original */
@media (min-width: 1280px) {
  .project-item img {
    height: 200px;
  }
}
</style>