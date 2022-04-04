import Layout from '../../layout/layout-echarts.vue'

export default {
    path: '/echarts',
    component: Layout,
    children: [
        { path: 'map-2d', component: () => import('../../views/echarts/2d/map-2d.vue') },
        { path: 'map-3d', component: () => import('../../views/echarts/3d/map-3d.vue') }
    ]
}