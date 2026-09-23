<template>
  <v-main>
    <v-container class="my-6 py-8">
      <div class="mb-8 text-center text-md-start">
        <h1 class="font-secondary font-weight-bold text-h4 mb-2">Catálogo de Libros</h1>
        <p class="font-weight-light text-medium-emphasis">
          Explora nuestra biblioteca digital, filtra por tus géneros favoritos y comparte tus reseñas.
        </p>
      </div>

      <v-row align="start">
        <!-- Sidebar Filters -->
        <v-col cols="12" md="4" lg="3">
          <v-card variant="outlined" rounded="lg" class="pa-4 bg-surface">
            <h3 class="font-weight-bold text-subtitle-1 mb-4 d-flex align-center ga-2">
              <v-icon color="primary">mdi-tune</v-icon>
              Filtros
            </h3>

            <!-- Search Field -->
            <v-text-field
              v-model="filters.search"
              label="Buscar"
              placeholder="Título o autor..."
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="comfortable"
              clearable
              rounded="lg"
              color="primary"
              class="mb-3"
              @update:model-value="onFilterChange"
            />

            <!-- Category Select -->
            <v-select
              v-model="filters.categories"
              :items="categories"
              item-title="value"
              item-value="id"
              label="Categoría"
              multiple
              chips
              clearable
              variant="outlined"
              density="comfortable"
              rounded="lg"
              color="primary"
              :loading="loadingCategories"
              class="mb-3"
              @update:model-value="onFilterChange"
            />

            <!-- Sort By Select -->
            <v-select
              v-model="filters.sortBy"
              :items="['Calificación', 'Precio (asc)', 'Precio (desc)', 'Título', 'Autor']"
              label="Ordenar por"
              clearable
              variant="outlined"
              density="comfortable"
              rounded="lg"
              color="primary"
              class="mb-3"
              @update:model-value="onFilterChange"
            />

            <!-- Price Range -->
            <div class="px-2 pt-2">
              <div class="d-flex justify-space-between text-caption font-weight-medium mb-1">
                <span>Precio máximo</span>
                <span class="text-primary font-weight-bold">${{ filters.maxPrice }}</span>
              </div>
              <v-slider
                v-model="filters.maxPrice"
                :min="10"
                :max="50"
                :step="1"
                color="primary"
                thumb-label
                @update:model-value="onFilterChange"
              />
            </div>

            <v-btn
              block
              variant="tonal"
              color="secondary"
              size="small"
              rounded="lg"
              class="mt-2"
              @click="resetFilters"
            >
              Limpiar Filtros
            </v-btn>
          </v-card>
        </v-col>

        <!-- Books Grid -->
        <v-col cols="12" md="8" lg="9">
          <v-row v-if="loading" justify="center" align="center" style="min-height: 400px;">
            <v-col cols="auto">
              <loading-spinner />
            </v-col>
          </v-row>

          <template v-else>
            <div v-if="books.length" class="mb-4 text-caption text-medium-emphasis">
              Mostrando {{ books.length }} de {{ metaBooks.total }} libros
            </div>

            <v-row v-if="books.length" align="stretch">
              <v-col
                v-for="book in books"
                :key="book.id"
                cols="12"
                sm="6"
                lg="4"
                class="d-flex"
              >
                <CardBookPreview :book="book" @click-book="openBookDetail" />
              </v-col>
            </v-row>

            <v-sheet
              v-else
              class="d-flex flex-column align-center justify-center py-16 text-center border rounded-lg"
              style="min-height: 350px;"
            >
              <v-icon size="64" color="grey-lighten-1" class="mb-3">mdi-book-search-outline</v-icon>
              <h3 class="text-h6 font-weight-bold mb-1">No se encontraron libros</h3>
              <p class="text-disabled text-body-2 mb-4">Intenta cambiar los términos de búsqueda o los filtros.</p>
              <v-btn color="primary" variant="flat" size="small" rounded="lg" @click="resetFilters">
                Restablecer filtros
              </v-btn>
            </v-sheet>

            <!-- Pagination -->
            <div v-if="metaBooks.last_page > 1" class="d-flex justify-center mt-8">
              <v-pagination
                v-model="currentPage"
                :length="metaBooks.last_page"
                :total-visible="5"
                color="primary"
                rounded="circle"
                @update:model-value="onPageChange"
              />
            </div>
          </template>
        </v-col>
      </v-row>
    </v-container>

    <!-- Book Detail & Comments Modal -->
    <BookDetailModal
      v-model="showDetailModal"
      :book="selectedBook"
      @comment-added="onCommentAdded"
      @open-login="openLoginFromModal"
    />
  </v-main>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { useBook } from '@/composables/useBook';
import { useLookup } from '@/composables/useLookup';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import CardBookPreview from '@/components/CardBookPreview.vue';
import BookDetailModal from '@/components/BookDetailModal.vue';
import type { Book } from '@/models/book.model';

const { books, metaBooks, getBooks, loading } = useBook();
const {
  lookups: categories,
  getLookups: getCategories,
  loading: loadingCategories,
} = useLookup('category');

const currentPage = ref(1);
const showDetailModal = ref(false);
const selectedBook = ref<Book | null>(null);

const filters = reactive({
  search: '',
  categories: [] as number[],
  sortBy: 'Calificación',
  maxPrice: 50,
});

const executeFetch = () => {
  getBooks(currentPage.value, 6, {
    search: filters.search,
    categories: filters.categories,
    sortBy: filters.sortBy,
    priceRange: [0, filters.maxPrice],
  });
};

const onFilterChange = () => {
  currentPage.value = 1;
  executeFetch();
};

const onPageChange = (page: number) => {
  currentPage.value = page;
  executeFetch();
};

const resetFilters = () => {
  filters.search = '';
  filters.categories = [];
  filters.sortBy = 'Calificación';
  filters.maxPrice = 50;
  onFilterChange();
};

const openBookDetail = (book: Book) => {
  selectedBook.value = book;
  showDetailModal.value = true;
};

const onCommentAdded = (updatedBook: Book) => {
  selectedBook.value = updatedBook;
  executeFetch();
};

const openLoginFromModal = () => {
  // Access layout trigger if needed or signal
  const authBtn = document.querySelector('[data-demo-auth-trigger]') as HTMLElement;
  if (authBtn) {
    authBtn.click();
  }
};

onMounted(async () => {
  await getCategories();
  executeFetch();
});
</script>
