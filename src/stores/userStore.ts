import { computed, ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { transformUser } from '@/api/transformers/auth.transformer';
import AxiosService from '@/api/services/AxiosService';
import type { ApiLoginUser } from '@/api/types/auth.api';
import type { User } from '@/models/user.model';

export const useUserStore = defineStore(
  'user',
  () => {
    // Init
    const userNotLogged: User = {
      id: 0,
      email: '',
      name: '',
    };

    // State
    const user: Ref<User> = ref(userNotLogged);
    const apiToken: Ref<string | null> = ref(null);

    // Getters
    const isAuthenticated = computed(() => !!apiToken.value);

    // Actions
    async function login(email: string, password: string): Promise<boolean> {
      const response = await AxiosService.post<ApiLoginUser>('login', { email, password });
      const transformedUser = transformUser(response.data);

      user.value = transformedUser;
      apiToken.value = response.data.api_token;

      return isAuthenticated.value;
    }

    async function register(
      name: string,
      email: string,
      password: string,
      passwordConfirmation: string,
    ): Promise<boolean> {
      const response = await AxiosService.post<ApiLoginUser>('register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      const transformedUser = transformUser(response.data);
      user.value = transformedUser;
      apiToken.value = response.data.api_token;

      return isAuthenticated.value;
    }

    async function logout() {
      await AxiosService.post('logout');
      user.value = userNotLogged;
      apiToken.value = null;
    }

    return {
      // State
      user,
      apiToken,

      // Getters
      isAuthenticated,

      // Actions
      login,
      register,
      logout,
    };
  },
  {
    persist: {
      storage: sessionStorage,
    },
  },
);
