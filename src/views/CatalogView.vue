<template>
  <v-container>
    <v-container>
      <v-row v-if="loading" justify="center">
        <v-col cols="auto">
          <loading-spinner />
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col v-for="book in books" :key="book.id" cols="12" sm="6" md="4" lg="3">
          <v-card class="mx-auto" max-width="344">
            <v-img :src="book.coverUrl" height="200px" />

            <v-card-title>{{ book.title }}</v-card-title>
            <v-card-subtitle>{{ book.author }}</v-card-subtitle>

            <v-card-text>
              {{ book.description }}
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" :href="book.fileUrl" target="_blank" variant="text">
                Leer
              </v-btn>
              <v-spacer />
              <span class="font-weight-bold">${{ book.price }}</span>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useBook } from '../composables/useBook';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const { books, getBooks, loading } = useBook();

onMounted(getBooks);
</script>
