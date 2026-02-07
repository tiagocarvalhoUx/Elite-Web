import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

interface User {
  id: number;
  username: string;
}

export const useAuthStore = defineStore("auth", () => {
  // State
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem("token"));
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const isAuthenticated = computed(() => !!token.value);
  const isAdmin = computed(() => !!user.value);

  // Actions
  const setAuthHeader = () => {
    if (token.value) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  const login = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });

      if (response.data.success) {
        const authData = response.data.data;
        token.value = authData?.token || null;
        user.value = authData?.user || null;
        if (token.value) {
          localStorage.setItem("token", token.value);
        } else {
          localStorage.removeItem("token");
        }
        setAuthHeader();
        return true;
      }
      return false;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Erro ao fazer login";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const register = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        password,
      });

      return response.data.success;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Erro ao registrar";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  const checkAuth = async (): Promise<boolean> => {
    if (!token.value) return false;

    setAuthHeader();

    try {
      // Verificar token fazendo uma requisição protegida
      const response = await axios.get(`${API_URL}/auth/verify`);
      return response.data.success;
    } catch {
      logout();
      return false;
    }
  };

  const clearError = () => {
    error.value = null;
  };

  // Inicializar header se já tiver token
  setAuthHeader();

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    checkAuth,
    clearError,
  };
});
