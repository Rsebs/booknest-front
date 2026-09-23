import type { Book, BookComment } from '@/models/book.model';
import { getStoredBooks, saveStoredBooks } from '../mockData';

export interface BookFilterParams {
  search?: string;
  categories?: number[];
  sortBy?: string;
  priceRange?: [number, number];
}

export async function fetchBooks(
  page: number = 1,
  perPage: number = 8,
  filters: BookFilterParams = {},
) {
  let list = getStoredBooks();

  // 1. Text search filter (title or author)
  if (filters.search && filters.search.trim()) {
    const q = filters.search.trim().toLowerCase();
    list = list.filter(
      (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
    );
  }

  // 2. Category filter
  if (filters.categories && filters.categories.length > 0) {
    list = list.filter((b) => filters.categories!.includes(b.categoryId));
  }

  // 3. Price range filter
  if (filters.priceRange) {
    const [minPrice, maxPrice] = filters.priceRange;
    list = list.filter((b) => {
      const p = parseFloat(b.price);
      return p >= minPrice && p <= maxPrice;
    });
  }

  // 4. Sorting
  if (filters.sortBy) {
    if (filters.sortBy === 'Precio (asc)') {
      list = [...list].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (filters.sortBy === 'Precio (desc)') {
      list = [...list].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (filters.sortBy === 'Título') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    } else if (filters.sortBy === 'Autor') {
      list = [...list].sort((a, b) => a.author.localeCompare(b.author));
    } else if (filters.sortBy === 'Calificación') {
      list = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
  }

  const total = list.length;
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const currentPage = Math.min(Math.max(1, page), lastPage);

  const startIndex = (currentPage - 1) * perPage;
  const paginatedData = list.slice(startIndex, startIndex + perPage);

  // Artificial short delay to feel like a real smooth web request
  await new Promise((resolve) => setTimeout(resolve, 200));

  return {
    data: paginatedData,
    meta: {
      current_page: currentPage,
      last_page: lastPage,
      per_page: perPage,
      total: total,
    },
  };
}

export async function fetchBookById(id: number): Promise<Book | null> {
  const list = getStoredBooks();
  const book = list.find((b) => b.id === id);
  return book || null;
}

export async function addBookComment(
  bookId: number,
  newComment: {
    rating: number;
    comment: string;
    userName: string;
    userEmail: string;
  }
): Promise<Book> {
  const books = getStoredBooks();
  const index = books.findIndex((b) => b.id === bookId);
  if (index === -1) {
    throw new Error('Libro no encontrado');
  }

  const targetBook = books[index];
  const commentObj: BookComment = {
    id: Date.now(),
    bookId,
    userName: newComment.userName,
    userEmail: newComment.userEmail,
    rating: newComment.rating,
    comment: newComment.comment,
    createdAt: new Date().toISOString().split('T')[0],
  };

  targetBook.comments = [commentObj, ...(targetBook.comments || [])];

  // Recalculate average rating
  const totalRatings = targetBook.comments.reduce((sum, c) => sum + c.rating, 0);
  targetBook.ratingCount = targetBook.comments.length;
  targetBook.rating = parseFloat((totalRatings / targetBook.ratingCount).toFixed(1));

  books[index] = targetBook;
  saveStoredBooks(books);

  await new Promise((resolve) => setTimeout(resolve, 200));
  return targetBook;
}
