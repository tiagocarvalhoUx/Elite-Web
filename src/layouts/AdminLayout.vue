<template>
  <div class="min-h-screen bg-[#0a0a0f] text-white">
    <!-- Sidebar -->
    <aside 
      class="fixed left-0 top-0 h-full w-64 glass-dark border-r border-white/10 z-50 transition-transform duration-300"
      :class="{ '-translate-x-full': !sidebarOpen }"
    >
      <div class="p-6">
        <div class="flex items-center gap-3 mb-8">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
            <span class="text-lg font-bold">E</span>
          </div>
          <span class="text-xl font-bold text-gradient">Elite Admin</span>
        </div>

        <nav class="space-y-2">
          <router-link 
            to="/admin" 
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300"
            :class="$route.path === '/admin' ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' : 'text-gray-400 hover:bg-white/5 hover:text-white'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
            </svg>
            Dashboard
          </router-link>

          <router-link 
            to="/admin/projects" 
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300"
            :class="$route.path.includes('/admin/projects') ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' : 'text-gray-400 hover:bg-white/5 hover:text-white'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            Projetos
          </router-link>

          <router-link 
            to="/admin/projects/new" 
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300"
            :class="$route.path === '/admin/projects/new' ? 'bg-green-600/20 text-green-400 border border-green-500/30' : 'text-gray-400 hover:bg-white/5 hover:text-white'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Novo Projeto
          </router-link>
        </nav>
      </div>

      <div class="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
            <span class="text-sm font-bold">{{ authStore.user?.username.charAt(0).toUpperCase() }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-white truncate">{{ authStore.user?.username }}</p>
            <p class="text-xs text-gray-500">Administrador</p>
          </div>
        </div>
        
        <button 
          @click="logout"
          class="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          Sair
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div 
      class="transition-all duration-300"
      :class="sidebarOpen ? 'ml-64' : 'ml-0'"
    >
      <!-- Header -->
      <header class="glass-dark border-b border-white/10 sticky top-0 z-40">
        <div class="flex items-center justify-between px-6 py-4">
          <button 
            @click="sidebarOpen = !sidebarOpen"
            class="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>

          <div class="flex items-center gap-4">
            <a 
              href="/" 
              target="_blank"
              class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              Ver Site
            </a>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores'

const router = useRouter()
const authStore = useAuthStore()
const sidebarOpen = ref(true)

const logout = () => {
  authStore.logout()
  router.push('/admin/login')
}
</script>
