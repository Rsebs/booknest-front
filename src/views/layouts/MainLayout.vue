<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer" elevation="1">
      <v-list nav>
        <v-list-item
          v-for="feature in features"
          :key="feature.id"
          :active="$route.name === feature.routeName"
          :title="feature.name"
          :to="{ name: feature.routeName }"
          link
        >
          <template #prepend>
            <v-avatar>
              <v-icon color="primary" :icon="feature.icon" />
            </v-avatar>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar title="Book Nest" app elevation="1">
      <template #prepend>
        <v-btn icon="mdi-menu" @click="drawer = !drawer" />
      </template>

      <template #append>
        <v-btn color="secondary" text="Registrarse" @click="openModalAuth('register')" />
        <v-btn color="primary" text="Iniciar sesión" @click="openModalAuth('login')" />
      </template>
    </v-app-bar>
    <v-main>
      <router-view />

      <v-dialog v-model="openModal" max-width="500">
        <auth-form :type="typeAuth" />
      </v-dialog>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue';
import { useDisplay } from 'vuetify';
import { useFeatures } from '@/composables/useFeature';
import AuthForm from '@/components/forms/auth/AuthForm.vue';

const { mobile } = useDisplay();
const drawer = ref(!mobile.value);

const { features, getFeatures } = useFeatures();

type AuthType = 'login' | 'register';
const openModal = ref(false);
const typeAuth: Ref<AuthType> = ref('login');

const openModalAuth = (typeModal: AuthType) => {
  openModal.value = !openModal.value;
  typeAuth.value = typeModal;
};

onMounted(getFeatures);
</script>
