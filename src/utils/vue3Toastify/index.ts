import { toast, type ToastOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const defaultOptions: ToastOptions = {
  position: 'top-left',
  autoClose: 2000,
};

export const showToast = (message: string, options: ToastOptions = defaultOptions) => {
  toast(message, {
    ...defaultOptions,
    ...options,
  });
};
