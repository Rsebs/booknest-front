import { createApp } from 'vue';
import { registerPlugins } from './plugins';
import App from './App.vue';
import './assets/styles/main.css';

const app = createApp(App);

registerPlugins(app);
app.mount('#app');
