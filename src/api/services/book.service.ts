import { transformBook } from '../transformers/book.transformer';
import AxiosService from './AxiosService';
import type { ApiBook } from '../types/book.api';

export async function fetchBooks(page: number = 1) {
  const response = await AxiosService.get<ApiBook[]>('/books', { page });
  return {
    data: response.data.map(transformBook),
    meta: response.meta,
  };
}
