import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/animal/:animalId',
      name: 'animal',
      component: () => import('@/views/AnimalView.vue')
    }

  ],
})

export default router
