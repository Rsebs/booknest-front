<template>
  <v-container class="my-8 py-16 text-center">
    <span class="text-uppercase font-weight-light">
      <v-icon icon="mdi-shimmer" /> Una librería para tardes lentas
    </span>
    <h1 class="font-weight-semibold mb-6 mt-2">
      Piérdete en una tarde más
      <span class="font-italic text-primary font-weight-semibold">silenciosa</span>.
    </h1>
    <p class="my-2 font-weight-light">
      Volúmenes cuidadosamente seleccionados, clásicos olvidados y voces contemporáneas pensadas
      para leer despacio.
    </p>

    <v-text-field
      v-model="search"
      bg-color="white"
      color="primary"
      placeholder="Busca por autor, título o estado de ánimo..."
      prepend-inner-icon="mdi-magnify"
      rounded="xl"
      variant="outlined"
      class="input-search my-8"
      @keydown.enter="handleSearch"
    >
      <template #append-inner>
        <v-btn type="submit" color="primary" variant="flat" rounded="xl" @click="handleSearch">
          {{ $t('explore') }}
        </v-btn>
      </template>
    </v-text-field>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const search = ref('');

const handleSearch = () => {
  // Push with the search query param
  router.push({ name: 'catalog' });
};
</script>

<style scoped lang="scss">
.input-search {
  max-width: 100%;
  @media (min-width: 768px) {
    max-width: 60%;
    margin: 0 auto;
  }
}
</style>
