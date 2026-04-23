import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    // defaultTheme: 'system',
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#F4F1EC',
          primary: '#8B3B27',
        },
        variables: {
          'font-primary': '"DM Sans", sans-serif',
          'font-secondary': '"Noto Serif JP", serif',
        },
      },
      dark: {
        dark: true,
      },
    },
  },
});
