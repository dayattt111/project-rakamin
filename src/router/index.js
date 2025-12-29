import { createRouter, createWebHistory } from 'vue-router'
import WomensClothing from '../views/WomensClothing.vue'
import MensClothing from '../views/MensClothing.vue'

const routes = [
  {
    path: '/',
    redirect: '/womens-clothing'
  },
  {
    path: '/womens-clothing',
    name: 'WomensClothing',
    component: WomensClothing
  },
  {
    path: '/mens-clothing',
    name: 'MensClothing',
    component: MensClothing
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
