import { createRouter, createWebHistory } from 'vue-router'
import Medicine from '../components/Medicine.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/medicine',
      name: 'medicine',
      component: Medicine
    }
  ]
})

export default router
