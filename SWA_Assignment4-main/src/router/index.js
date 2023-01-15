import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '../views/register.vue'
import Login from '../views/Login.vue'
import Highscore from '../views/highscore.vue'
import Gameboard from '../views/gameBoard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home/:token',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/highscore',
      name: 'highscore',
      component: Highscore
    },
    {
      path: '/gameboard',
      name: 'gameboard',
      component: Gameboard
    }
  ]
})

export default router
