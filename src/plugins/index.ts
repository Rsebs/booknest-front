import type { App } from 'vue';

import { createPinia } from 'pinia';
import vuetify from './vuetify.conf';
import router from '@/router';

export const registerPlugins = (app: App) => {
  app.use(vuetify).use(createPinia()).use(router);
};
