<template>
  <p>Explore Page</p>
  <pre>{{ books }}</pre>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useBook } from '../composables/useBook';

const { books, getBooks } = useBook();

onMounted(getBooks);
</script>
