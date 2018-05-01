import Vue from 'vue'
import App from './App.vue'

//import './assets/styles/test.css'
//import './assets/styles/test-styleus.styl'
//import './assets/images/weijinsuo-8-2000x300.jpg'
import './assets/styles/global.css'

const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
	render: (h) => h(App)
}).$mount(root)
