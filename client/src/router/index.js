import { createRouter, createWebHistory } from 'vue-router'
import { useGlobalStore } from '@/stores'
import HomeView from '../views/home-view.vue'
import ChatView from '../views/chat-view.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: HomeView,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from) => {
  const store = useGlobalStore()
  const authRequired = to.meta.requiresAuth
  if (authRequired && !store.isLoggedIn) {
    return '/login'
  }
})

export default router
