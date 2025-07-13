import type { App } from 'vue';

import vuetify from './vuetify.conf';
import pinia from './pinia.conf';
import router from '@/router';

export const registerPlugins = (app: App) => {
  app.use(vuetify).use(pinia).use(router);
};
