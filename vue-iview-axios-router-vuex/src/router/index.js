import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/components/home'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
    	{name: 'home', path: '/', component: Home}
    ]
})