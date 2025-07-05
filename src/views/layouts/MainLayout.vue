<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer" elevation="1">
      <v-list nav>
        <v-list-item
          v-for="feature in features"
          :key="feature.route.name"
          :title="feature.name"
          link
          @click="$router.push(feature.route)"
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
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import type { Features } from '@/interfaces/features.interface';
const { mobile } = useDisplay();
import { ref } from 'vue';
import { useDisplay } from 'vuetify';

const drawer = ref(!mobile.value);

const features: Features[] = [
  {
    name: 'Home Page',
    icon: 'mdi-home',
    route: { name: 'home' },
  },
  {
    name: 'About Page',
    icon: 'mdi-information',
    route: { name: 'about' },
  },
];
</script>
