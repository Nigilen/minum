import { createRouter, createWebHistory } from 'vue-router';
import ToDoView from '@/views/ToDoView.vue';
import NotesView from '@/views/NotesView.vue';
import TimerView from '@/views/TimerView.vue';
import MusicView from '@/views/MusicView.vue';
import NotFound from '@/views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    {
      path: '/',
      name: 'home',
      component: ToDoView,
    },
    {
      path: '/notes',
      name: 'notes',
      component: NotesView,
    },
    {
      path: '/timer',
      name: 'timer',
      component: TimerView,
    },
    {
      path: '/music',
      name: 'music',
      component: MusicView,
    },
  ],
})

export default router
