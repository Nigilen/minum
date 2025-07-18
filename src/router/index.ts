import { createRouter, createWebHistory } from 'vue-router';
import ToDoView from '@/views/ToDoView.vue';
import NotFound from '@/views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    { path: '/', name: 'home', component: ToDoView },
  ],
})

export default router;
