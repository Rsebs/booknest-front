<template>
  <v-card
    class="card-book mx-auto cursor-pointer rounded-lg hover-elevation"
    height="100%"
    flat
    color="surface"
    border
    @click="$emit('click-book', book)"
  >
    <div class="position-relative">
      <v-img cover :src="book.coverUrl" height="260" />
      <v-chip
        v-if="book.categoryName"
        color="primary"
        size="x-small"
        variant="elevated"
        class="position-absolute top-0 right-0 ma-2"
      >
        {{ book.categoryName }}
      </v-chip>
    </div>

    <v-card-title class="font-secondary font-weight-bold text-subtitle-1 pt-3 pb-0 line-clamp-1">
      {{ book.title }}
    </v-card-title>
    <v-card-subtitle class="text-caption text-medium-emphasis pb-2">
      {{ $t('by') }} {{ book.author }}
    </v-card-subtitle>

    <div class="px-4 d-flex align-center ga-1 mb-2">
      <v-rating
        :model-value="book.rating || 0"
        color="amber-darken-2"
        density="compact"
        half-increments
        readonly
        size="x-small"
      />
      <span class="text-caption font-weight-bold">
        {{ book.rating ? book.rating.toFixed(1) : '-' }}
      </span>
      <span class="text-caption text-medium-emphasis">
        ({{ book.ratingCount || 0 }})
      </span>
    </div>

    <v-card-text class="text-caption text-medium-emphasis pt-0 pb-2 flex-grow-1">
      <p class="line-clamp-2">{{ book.description }}</p>
    </v-card-text>

    <v-divider />

    <v-card-actions class="px-3 py-2 d-flex align-center justify-space-between">
      <span class="text-subtitle-2 font-weight-bold text-primary">${{ book.price }}</span>
      <v-btn
        color="primary"
        variant="tonal"
        size="small"
        rounded="lg"
        prepend-icon="mdi-eye-outline"
        @click.stop="$emit('click-book', book)"
      >
        Ver detalles
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { Book } from '@/models/book.model';

interface IProps {
  book: Book;
}

defineProps<IProps>();

defineEmits<{
  (e: 'click-book', book: Book): void;
}>();
</script>

<style scoped>
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  line-clamp: 1;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
}

.card-book {
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hover-elevation:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08) !important;
}
</style>
