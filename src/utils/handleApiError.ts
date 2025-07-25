import { ApiError } from '@/api/types/axiosResponse.type';

export function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    console.error(error.toString(), error.toJson());
  } else {
    console.error('[Unknown Error]', error);
  }
}
