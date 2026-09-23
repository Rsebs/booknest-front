import type { ApiBook } from '../types/book.api';
import type { Book } from '@/models/book.model';

export function transformBook(book: ApiBook): Book {
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    description: book.description,
    coverUrl: book.cover_url,
    fileUrl: book.file_url,
    price: book.price,
    categoryId: 1,
    categoryName: 'General',
    rating: 4.5,
    ratingCount: 1,
    comments: [],
  };
}
