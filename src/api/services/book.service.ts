import { transformBook } from '../transformers/book.transformer';
import AxiosService from './AxiosService';
import type { ApiBook } from '../types/book.api';

export async function fetchBooks() {
  const response = await AxiosService.get<ApiBook[]>('/books');
  return response.data.map(transformBook);
}
