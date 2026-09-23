import { computed, ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '@/models/user.model';
import { showToast } from '@/utils/vue3Toastify';

export const useUserStore = defineStore(
  'user',
  () => {
    const userNotLogged: User = {
      id: 0,
      email: '',
      name: '',
    };

    const user: Ref<User> = ref(userNotLogged);
    const apiToken: Ref<string | null> = ref(null);

    const isAuthenticated = computed(() => !!apiToken.value);

    async function login(email: string, _password: string): Promise<boolean> {
      // Simulate backend response
      await new Promise((resolve) => setTimeout(resolve, 300));

      const nameFromEmail = email.split('@')[0] || 'Usuario';
      const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

      user.value = {
        id: Math.floor(Math.random() * 1000) + 1,
        email: email.trim(),
        name: formattedName,
      };
      apiToken.value = `demo-token-${Date.now()}`;

      showToast(`Bienvenido de nuevo, ${user.value.name}`);
      return isAuthenticated.value;
    }

    async function signup(
      name: string,
      email: string,
      _password: string,
      _passwordConfirmation: string,
    ): Promise<boolean> {
      await new Promise((resolve) => setTimeout(resolve, 300));

      user.value = {
        id: Math.floor(Math.random() * 1000) + 1,
        email: email.trim(),
        name: name.trim() || 'Nuevo Usuario',
      };
      apiToken.value = `demo-token-${Date.now()}`;

      showToast(`¡Cuenta creada con éxito! Bienvenido, ${user.value.name}`);
      return isAuthenticated.value;
    }

    async function logout() {
      await new Promise((resolve) => setTimeout(resolve, 150));
      user.value = userNotLogged;
      apiToken.value = null;
      showToast('Has cerrado sesión correctamente');
    }

    return {
      user,
      apiToken,
      isAuthenticated,
      login,
      signup,
      logout,
    };
  },
  {
    persist: {
      storage: localStorage,
    },
  },
);
