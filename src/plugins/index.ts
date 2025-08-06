import type { App } from 'vue';

// Plugins
import vuetify from './vuetify.conf';
import pinia from './pinia.conf';
import router from '@/router';
import i18n from './i18n';

import AxiosService from '@/api/services/AxiosService';

export const registerPlugins = (app: App) => {
  app.use(vuetify).use(pinia).use(router).use(i18n);

  AxiosService.initialize();
};
