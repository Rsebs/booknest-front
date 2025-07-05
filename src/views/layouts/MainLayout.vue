<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer" elevation="1">
      <v-list nav>
        <v-list-item
          v-for="feature in features"
          :key="feature.id"
          :title="feature.name"
          :to="feature.route"
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
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useDisplay } from 'vuetify';
import { useFeatures } from '@/composables/useFeature';

const { mobile } = useDisplay();
const drawer = ref(!mobile.value);

const { features, getFeatures } = useFeatures();

onMounted(getFeatures);
</script>
