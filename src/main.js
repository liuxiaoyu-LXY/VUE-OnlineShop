import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import './style/index.scss'
import VueLazyload from 'vue3-lazyload'
import './mock/mock.js'



const app = createApp(App)
app.use(store)
app.use(router)
console.log(VueLazyload)
app.use(VueLazyload,{preLoad:1,loading:require('./assets/loading.gif')})
app.mount('#app')

