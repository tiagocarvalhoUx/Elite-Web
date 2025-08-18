<template>
  <div class="fixed bottom-8 right-4 sm:bottom-6 sm:right-6 z-50 ">
    <a 
      href="https://wa.me/5518981142927" 
      target="_blank" 
      class="whatsapp-float  text-green-500 p-3 sm:p-4 rounded-full shadow-2xl group relative overflow-hidden"
      aria-label="Contato via WhatsApp"
    >
      <!-- Background animated circles -->
      <div class="absolute inset-0 rounded-full">
        <div class="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
        <div class="absolute inset-2 bg-green-500 rounded-full animate-pulse opacity-30"></div>
      </div>
      
      <!-- WhatsApp Icon -->
      <div class="relative z-10 flex items-center justify-center">
        <svg class="w-6 h-6 sm:w-8 sm:h-8 transform group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.456"/>
        </svg>
      </div>
      
      <!-- Online Status Badge -->
      <div class="absolute -top-1 -right-1 sm:-top-2 sm:-right-2">
        <div class="relative">
          <div class="w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
            <div class="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full"></div>
          </div>
          <div class="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-75"></div>
        </div>
      </div>
      
      <!-- Tooltip with message preview -->
      <div class="tooltip absolute right-full mr-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 px-4 py-3 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none hidden sm:block min-w-[280px] border border-gray-100">
        <!-- Avatar -->
        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0">
            <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
              </svg>
            </div>
          </div>
          <div class="flex-1">
            <div class="flex items-center space-x-2">
              <h4 class="font-semibold text-sm text-gray-900">Elite Web Designer</h4>
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <p class="text-xs text-gray-500 mb-2">Online agora</p>
            <div class="bg-green-50 p-3 rounded-lg">
              <p class="text-sm text-gray-700">👋 Olá! Como posso te ajudar hoje?</p>
            </div>
            <p class="text-xs text-gray-400 mt-1">Clique para conversar</p>
          </div>
        </div>
        
        <!-- Arrow -->
        <div class="absolute left-full top-1/2 transform -translate-y-1/2">
          <div class="w-0 h-0 border-l-8 border-l-white border-t-8 border-t-transparent border-b-8 border-b-transparent"></div>
        </div>
      </div>
    </a>
    
    <!-- Notification dots animation -->
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
      <div class="notification-dot absolute top-2 left-2 w-1 h-1 bg-white rounded-full opacity-0"></div>
      <div class="notification-dot absolute top-4 left-6 w-1 h-1 bg-white rounded-full opacity-0"></div>
      <div class="notification-dot absolute top-6 left-3 w-1 h-1 bg-white rounded-full opacity-0"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FloatingWhatsApp',
  mounted() {
    // Animate notification dots periodically
    this.animateNotificationDots();
  },
  methods: {
    animateNotificationDots() {
      const dots = document.querySelectorAll('.notification-dot');
      
      const animate = () => {
        dots.forEach((dot, index) => {
          setTimeout(() => {
            dot.style.opacity = '1';
            dot.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
              dot.style.opacity = '0';
              dot.style.transform = 'translateY(0)';
            }, 1000);
          }, index * 200);
        });
      };
      
      // Run immediately and then every 5 seconds
      animate();
      setInterval(animate, 5000);
    }
  }
}
</script>

<style scoped>
.whatsapp-float {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: float 3s ease-in-out infinite;
}

.whatsapp-float:hover {
  transform: translateY(-2px) scale(1.05);
  
}

.whatsapp-float:active {
  transform: translateY(0) scale(0.98);
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  50% { 
    transform: translateY(-10px) rotate(2deg); 
  }
}

.tooltip {
  animation: tooltipSlideIn 0.3s ease-out;
}

@keyframes tooltipSlideIn {
  0% {
    opacity: 0;
    transform: translateY(-50%) translateX(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
}

.notification-dot {
  transition: all 1s ease-out;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .tooltip {
    display: none;
  }
}

/* Additional glow effect */
.whatsapp-float::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;

  border-radius: 50%;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

.whatsapp-float:hover::before {
  opacity: 0.3;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>