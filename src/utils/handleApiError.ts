import { ApiError } from '@/api/types/axiosResponse.type';
import { errorAlert } from './sweetAlert2';

export function handleApiError(error: unknown) {
  if (!(error instanceof ApiError)) {
    console.error('[Unknown Error]', error);
    return;
  }

  const apiMessageError = error.errorResponse.errors;
  let msgError = typeof apiMessageError == 'string' ? apiMessageError : '';

  if (
    typeof error.errorResponse.errors == 'object' &&
    Object.keys(error.errorResponse.errors).length
  ) {
    for (const keyError in error.errorResponse.errors) {
      const messageError = error.errorResponse.errors[keyError];
      msgError += `${keyError}: ${messageError.join(', ')}\n`;
    }
  }

  errorAlert(error.message, msgError);
  console.error(error.toString(), error.toJson());
}
