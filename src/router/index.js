import { createRouter, createWebHashHistory } from 'vue-router'
import MainLayout from '@/layout/mainLayout.vue'
import Home from '@/views/home.vue'
import analytics from '@/views/analytics.vue'
import orders from '@/views/orders.vue'
import Customers from '@/views/customers.vue'
import Products from '@/views/staff.vue'
import Settings from '@/views/settings.vue'
import Login from '@/views/Login.vue'
import Details from '@/views/details.vue'
const routes = [
   {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: 'content',
        name: 'Analytics',
        component: analytics
      },
      {
        path: 'leads',
        name: 'Orders',
        component: orders
      },
      {
        path: 'details',
        name: 'Details',
        component: Details
      },
      {
        path: 'mails',
        name: 'Customers',
        component: Customers
      },
      {
        path: 'staff',
        name: 'Products',
        component: Products
      },
      {
        path: 'security',
        name: 'Settings',
        component: Settings}
      ]}]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('auth_token')

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login' })
  } else if (to.name === 'Login' && isLoggedIn) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router