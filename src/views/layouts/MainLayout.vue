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
        <template v-if="!userStore.isAuthenticated">
          <v-btn color="secondary" :text="$t('register')" @click="openModalAuth('register')" />
          <v-btn color="primary" :text="$t('login')" @click="openModalAuth('login')" />
        </template>
        <template v-else>
          <v-btn color="primary" :text="$t('myProfile')" :to="{ name: 'profile' }" />
          <v-btn color="secondary" :text="$t('logout')" @click="userStore.logout" />
        </template>

        <v-menu transition="slide-y-transition">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon="mdi-translate" />
          </template>
          <v-list>
            <v-list-subheader>{{ $t('translations') }}</v-list-subheader>

            <v-list-item
              v-for="(lang, i) in availableLocales"
              :key="i"
              :value="i"
              :active="lang.code === currentLang"
              @click="locale = lang.code"
            >
              <v-list-item-title>{{ lang.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn :prepend-icon="iconTheme" slim @click="toggleTheme">
          <v-tooltip :text="$t('toggleTheme')" activator="parent" location="bottom" />
        </v-btn>
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
import { availableLocales } from '../../lang/availableLocales';
import { computed, onMounted, ref, type Ref } from 'vue';
import { useDisplay, useTheme } from 'vuetify';
import { useFeatures } from '@/composables/useFeature';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '../../stores/userStore';
import AuthForm from '@/components/forms/auth/AuthForm.vue';

const userStore = useUserStore();

const { mobile } = useDisplay();
const drawer = ref(!mobile.value);

const theme = useTheme();
const toggleTheme = () => {
  theme.global.name.value = theme.global.name.value === 'light' ? 'dark' : 'light';
};
const iconTheme = computed(() =>
  theme.global.name.value === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night',
);

const { locale } = useI18n();
const currentLang = computed(() => locale.value);

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
