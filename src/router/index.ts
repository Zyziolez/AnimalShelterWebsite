import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/',
      name: 'user',
      component: () => import('@/views/MainUserView.vue'),
      children: [
{
      path: '/',
      name: 'home',
      component: HomeView
    },
     {
      path: '/animal/:animalId',
      name: 'animal',
      component: () => import('@/views/AnimalView.vue')
    },
     {
      path: '/kontakt',
      name: 'contact',
      component: () => import('@/views/ContactView.vue')
    },
      ]
    },
   
    {
       path: '/login',
      name: 'login',
      component: () => import('@/views/adminpanel/LoginView.vue')
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('@/views/adminpanel/AdminView.vue'),
        children: [
          {
            path: '',
            name: 'admin-dashboard',
            component: () => import('@/views/adminpanel/AdminDashboardView.vue')
          },
          {
            'path': 'forms',
            'name': 'admin-forms',
            'component': () => import('@/views/adminpanel/AdminFormsView.vue')
          }
        ]
    },
   
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue')
    }

  ],
})

export default router
