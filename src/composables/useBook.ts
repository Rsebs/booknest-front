import { fetchBooks } from '@/api/services/book.service';
import type { Book } from '@/models/book.model';
import { ref, type Ref } from 'vue';
import type { APIPaginate } from '@/api/types/axiosResponse.type';

export function useBook() {
  const books: Ref<Book[]> = ref([]);
  const metaBooks: Ref<APIPaginate> = ref({} as APIPaginate);
  const loading = ref(false);
  const error = ref<unknown>(null);

  const getBooks = async (page: number = 1, perPage: number = 12) => {
    try {
      loading.value = true;
      const response = await fetchBooks(page, perPage);
      books.value = response.data;
      metaBooks.value = response.meta as APIPaginate;
    } catch (err) {
      console.error('Error loading books:', err);
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    books,
    metaBooks,
    loading,
    error,
    getBooks,
  };
}
