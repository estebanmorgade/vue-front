import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'
import Login from '../views/Login.vue'
import Users from '../views/Users.vue'
import { useUserStore } from '../stores/useUserStore'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/users', component: Users, meta: { requiresAuth: true }},
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  { path: '/login', component: Login}
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const user = useUserStore()
  const isProtected = to.meta.requiresAuth

  if(isProtected && !user.isAuthenticated){
    next('/login')
  } else {
    next()
  }
})

export default router
