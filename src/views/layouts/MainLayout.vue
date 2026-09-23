<template>
  <v-app>
    <v-app-bar border elevation="0" color="background" class="px-3">
      <template #title>
        <router-link :to="{ name: 'home' }" class="text-decoration-none text-black">
          <p class="font-secondary font-weight-semibold">
            Book<span class="text-primary">nest</span>
          </p>
        </router-link>
      </template>

      <template #append>
        <v-btn
          v-if="!userStore.isAuthenticated"
          data-demo-auth-trigger
          :text="$t('enter')"
          color="primary"
          rounded="xl"
          variant="flat"
          @click="openModalAuth('login')"
        />

        <div v-else class="d-flex align-center">
          <v-menu>
            <template #activator="{ props }">
              <v-btn variant="text" rounded="pill" class="text-none" v-bind="props">
                <v-avatar color="primary" size="32" class="mr-2">
                  <span class="text-caption text-white font-weight-bold">
                    {{ userStore.user.name.charAt(0).toUpperCase() }}
                  </span>
                </v-avatar>
                <span class="font-weight-medium text-body-2">{{ userStore.user.name }}</span>
                <v-icon icon="mdi-chevron-down" size="small" class="ml-1" />
              </v-btn>
            </template>

            <v-list density="compact" rounded="lg">
              <v-list-item class="px-4 py-2">
                <v-list-item-title class="font-weight-bold">{{ userStore.user.name }}</v-list-item-title>
                <v-list-item-subtitle class="text-caption">{{ userStore.user.email }}</v-list-item-subtitle>
              </v-list-item>
              <v-divider />
              <v-list-item class="cursor-pointer" @click="userStore.logout()">
                <template #prepend>
                  <v-icon icon="mdi-logout" color="error" size="small" />
                </template>
                <span class="text-error font-weight-medium">Cerrar sesión</span>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>

      <template #extension>
        <v-tabs color="primary">
          <v-tab v-for="(tab, i) in tabs" :key="i" :text="$t(tab.title)" exact :to="tab.to" />
        </v-tabs>
      </template>
    </v-app-bar>

    <router-view />

    <v-dialog v-model="openModal" max-width="500">
      <auth-form :type="typeAuth" @is-authenticated="(val) => (openModal = !val)" />
    </v-dialog>

    <v-footer color="background" name="footer" border height="auto" class="mt-8">
      <v-container>
        <v-row justify="space-between" align="center">
          <v-col cols="12" md="6">
            <div>
              <p class="font-weight-semibold font-secondary">Booknest</p>
              <p class="font-weight-light text-disabled" :style="{ fontSize: '0.9rem' }">
                Una librería para tardes lentas (Demo Frontend).
              </p>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="text-center text-md-right">
            <p class="font-weight-light text-disabled" :style="{ fontSize: '0.9rem' }">
              &copy; {{ new Date().getFullYear() }} BOOKNEST - Frontend Demo
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import AuthForm from '@/components/forms/auth/AuthForm.vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

type AuthType = 'login' | 'register';
const openModal = ref(false);
const typeAuth: Ref<AuthType> = ref('login');

const openModalAuth = (typeModal: AuthType) => {
  openModal.value = true;
  typeAuth.value = typeModal;
};

const tabs = ref([
  { title: 'home', to: { name: 'home' } },
  { title: 'catalog', to: { name: 'catalog' } },
]);
</script>
