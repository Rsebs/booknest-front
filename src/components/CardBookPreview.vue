<template>
  <v-card class="card-book mx-auto" height="600" flat color="transparent" border>
    <v-img cover :src="book.coverUrl" height="350" />

    <v-card-title class="font-secondary font-weight-semibold">{{ book.title }}</v-card-title>
    <v-card-subtitle>{{ $t('by') }} {{ book.author }}</v-card-subtitle>

    <v-card-text class="text-medium-emphasis">
      <p class="line-clamp-3">{{ book.description }}</p>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" :href="book.fileUrl" target="_blank" variant="text"> Leer </v-btn>
      <v-spacer />
      <span class="font-weight-bold">${{ book.price }}</span>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { Book } from '@/models/book.model';

interface IProps {
  book: Book;
}

defineProps<IProps>();
</script>

<style scoped>
.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-clamp: 3;
}

.card-book {
  display: flex;
  flex-direction: column;
}
</style>
