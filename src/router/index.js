import { createRouter, createWebHashHistory } from 'vue-router'

import MainLayout from '@/layout/mainLayout.vue'
import Home from '@/views/home.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'Home',
        name: 'Home',
        component: Home
      },
      {
        path: 'analytics',
        name: 'Analytics',
        component: () => import('@/views/home.vue')
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('@/views/home.vue')
      },
      {
        path: 'customers',
        name: 'Customers',
        component: () => import('@/views/home.vue')
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/home.vue')
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/home.vue')
      }
    ]
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})