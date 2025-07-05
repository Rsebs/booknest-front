import { fetchBooks } from '@/api/services/book.service';
import type { Book } from '@/models/book.model';
import { ref, type Ref } from 'vue';

export function useBook() {
  const books: Ref<Book[]> = ref([]);
  const loading = ref(false);
  const error = ref<unknown>(null);

  const getBooks = async () => {
    try {
      loading.value = true;
      books.value = await fetchBooks();
    } catch (err) {
      console.error('Error loading books:', err);
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    books,
    loading,
    error,
    getBooks,
  };
}
