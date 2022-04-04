import { createRouter, createWebHistory } from 'vue-router'

import echartsRoutes from './examples/echarts'

const routes = [
    { path: '/', component: () => import('../views/home.vue') },
    echartsRoutes
]

const router = createRouter({
    history: createWebHistory(),
    base: '/',
    routes
})

export default router