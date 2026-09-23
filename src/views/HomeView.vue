<template>
  <v-main class="my-16">
    <v-container class="text-center">
      <span class="text-uppercase font-weight-light">
        <v-icon icon="mdi-shimmer" color="primary" /> Una librería para tardes lentas
      </span>
      <h1 class="font-weight-semibold mb-6 mt-2">
        Piérdete en una tarde más
        <span class="font-italic text-primary font-weight-semibold">silenciosa</span>.
      </h1>
      <p class="my-2 font-weight-light text-medium-emphasis">
        Volúmenes cuidadosamente seleccionados, clásicos olvidados y voces contemporáneas pensadas
        para leer despacio.
      </p>

      <v-text-field
        v-model="search"
        bg-color="white"
        color="primary"
        placeholder="Busca por autor, título o categoría..."
        prepend-inner-icon="mdi-magnify"
        rounded="xl"
        variant="outlined"
        class="input-search my-8"
        @keydown.enter="handleSearch"
      >
        <template #append-inner>
          <v-btn color="primary" variant="flat" rounded="xl" @click="handleSearch">
            {{ $t('explore') }}
          </v-btn>
        </template>
      </v-text-field>
    </v-container>

    <!-- Featured -->
    <section class="my-8" v-if="books.length > 0">
      <v-container>
        <div class="border-b pb-5 mb-8">
          <v-row align="center">
            <v-col class="text-left">
              <h2 class="font-secondary font-weight-bold">Selección destacada</h2>
            </v-col>
            <v-col class="text-right">
              <v-btn
                :to="{ name: 'catalog' }"
                class="text-primary font-weight-medium"
                variant="text"
              >
                Ver todo <v-icon icon="mdi-arrow-right" class="ml-1" />
              </v-btn>
            </v-col>
          </v-row>
        </div>

        <v-row align="stretch">
          <v-col cols="12" sm="6" md="4" v-for="book in books.slice(0, 3)" :key="book.id" class="d-flex">
            <CardBookPreview :book="book" @click-book="openBookDetail" />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Latest -->
    <section class="my-8" v-if="books.length > 0">
      <v-container>
        <div class="border-b pb-5 mb-8">
          <v-row align="center">
            <v-col class="text-left">
              <h2 class="font-secondary font-weight-bold">Todos los libros</h2>
            </v-col>
            <v-col class="text-right">
              <v-btn
                :to="{ name: 'catalog' }"
                class="text-primary font-weight-medium"
                variant="text"
              >
                Ver catálogo completo <v-icon icon="mdi-arrow-right" class="ml-1" />
              </v-btn>
            </v-col>
          </v-row>
        </div>

        <v-row align="stretch">
          <v-col cols="12" sm="6" md="3" v-for="book in books.slice(3, 11)" :key="book.id" class="d-flex">
            <CardBookPreview :book="book" @click-book="openBookDetail" />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <BookDetailModal
      v-model="showDetailModal"
      :book="selectedBook"
      @comment-added="onCommentAdded"
      @open-login="openLoginFromModal"
    />
  </v-main>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useBook } from '../composables/useBook';
import { useRouter } from 'vue-router';
import CardBookPreview from '@/components/CardBookPreview.vue';
import BookDetailModal from '@/components/BookDetailModal.vue';
import type { Book } from '@/models/book.model';

const router = useRouter();
const search = ref('');
const showDetailModal = ref(false);
const selectedBook = ref<Book | null>(null);

const { books, getBooks } = useBook();

const handleSearch = () => {
  router.push({ name: 'catalog', query: { q: search.value } });
};

const openBookDetail = (book: Book) => {
  selectedBook.value = book;
  showDetailModal.value = true;
};

const onCommentAdded = (updatedBook: Book) => {
  selectedBook.value = updatedBook;
  getBooks(1, 12);
};

const openLoginFromModal = () => {
  const authBtn = document.querySelector('[data-demo-auth-trigger]') as HTMLElement;
  if (authBtn) {
    authBtn.click();
  }
};

onMounted(() => {
  getBooks(1, 12);
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
