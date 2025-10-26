import Swal, { type SweetAlertOptions } from 'sweetalert2';

const generalConfig: SweetAlertOptions = {
  theme: 'auto',

  didOpen: () => {
    (document.querySelector('.swal2-container') as HTMLElement | null)?.style.setProperty(
      'z-index',
      '99999',
    );
  },
};

/**
 * Show an error alert with a custom title and message.
 * If no title or message is provided, it will default to 'Error!' and 'Something went wrong'.
 * The message will be parsed as HTML and will replace all newline characters with '<br>'.
 * @param {string} [title] - The title of the error alert.
 * @param {string} [message] - The message of the error alert.
 */
export const errorAlert = (title?: string, message?: string) => {
  Swal.fire({
    title: title ?? 'Error!',
    html: (message ?? 'Something went wrong').replace(/\n/g, '<br>'),
    icon: 'error',
    ...generalConfig,
  });
};
