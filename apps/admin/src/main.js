import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './router'
import 'animate.css'
import 'nprogress/nprogress.css'
import 'ant-design-vue/dist/reset.css'

createApp(App).use(router).use(Antd).use(createPinia()).mount('#app')
