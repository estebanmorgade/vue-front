import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'

const app = createApp(App)

app.use(createHead())
app.use(createPinia())
app.use(router)
app.mount('#app')