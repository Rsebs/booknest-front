<template>
  <v-layout>
    <v-app-bar border elevation="0" color="#F3F0EA" class="px-3 pt-3">
      <template #title>
        <p class="font-secondary font-weight-semibold">
          Book<span class="text-primary">nest</span>
        </p>
      </template>

      <template #append>
        <v-btn icon="mdi-shopping-outline" variant="text" class="mr-4" />
        <v-btn
          :text="$t('enter')"
          color="primary"
          rounded="xl"
          variant="flat"
          @click="openModalAuth('login')"
        />
      </template>

      <template #extension>
        <v-tabs color="primary">
          <v-tab v-for="(tab, i) in tabs" :key="i" :text="$t(tab.title)" exact :to="tab.to" />
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <router-view />

      <v-dialog v-model="openModal" max-width="500">
        <auth-form :type="typeAuth" @is-authenticated="(val) => (openModal = !val)" />
      </v-dialog>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import AuthForm from '@/components/forms/auth/AuthForm.vue';

type AuthType = 'login' | 'register';
const openModal = ref(false);
const typeAuth: Ref<AuthType> = ref('login');

const openModalAuth = (typeModal: AuthType) => {
  openModal.value = !openModal.value;
  typeAuth.value = typeModal;
};

const tabs = ref([
  { title: 'home', to: { name: 'home' } },
  { title: 'catalog', to: { name: 'catalog' } },
]);
</script>
