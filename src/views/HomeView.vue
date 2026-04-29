<template>
  <v-main class="my-16">
    <v-container class="text-center">
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
  </v-main>

  <!-- Featured -->
  <section class="my-8">
    <v-container>
      <div class="border-b pb-5 mb-14">
        <v-row>
          <v-col class="text-left">
            <h2>Selección destacada</h2>
          </v-col>
          <v-col class="text-right">
            <v-btn
              :to="{ name: 'catalog' }"
              class="text-xs uppercase tracking-widest text-primary hover:text-foreground transition-colors flex items-center gap-2"
              variant="text"
            >
              Ver todo <v-icon icon="mdi-arrow-right" />
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <v-row>
        <v-col cols="12" sm="4" v-for="book in books.slice(0, 3)" :key="book.id">
          <CardBookPreview :book="book" />
        </v-col>
      </v-row>
    </v-container>
  </section>

  <!-- Latest -->
  <section class="my-8">
    <v-container>
      <div class="border-b pb-5 mb-14">
        <v-row>
          <v-col class="text-left">
            <h2>Últimos llegados</h2>
          </v-col>
          <v-col class="text-right">
            <v-btn
              :to="{ name: 'catalog' }"
              class="text-xs uppercase tracking-widest text-primary hover:text-foreground transition-colors flex items-center gap-2"
              variant="text"
            >
              Ver todo <v-icon icon="mdi-arrow-right" />
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <v-row>
        <v-col cols="12" sm="3" v-for="book in books" :key="book.id">
          <CardBookPreview :book="book" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useBook } from '../composables/useBook';
import { useRouter } from 'vue-router';
import CardBookPreview from '@/components/CardBookPreview.vue';

const router = useRouter();
const search = ref('');

const { books, getBooks } = useBook();

const handleSearch = () => {
  //todo: Push with the search query param
  router.push({ name: 'catalog' });
};

onMounted(() => {
  getBooks(1, 8);
});
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
