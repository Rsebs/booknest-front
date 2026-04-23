import HomeView from '@/views/HomeView.vue';
import MainLayout from '@/views/layouts/MainLayout.vue';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
      },
      {
        path: 'catalog',
        name: 'catalog',
        component: () => import('@/views/CatalogView.vue'),
      },
    ],
  },
];

export default routes;
