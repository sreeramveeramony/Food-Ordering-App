import StorePage from './views/StorePage.vue'
import AdminPage from './views/AdminPage.vue'

import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const Home = { template: '<div style="padding:16px">OK</div>' }

const vuetify = createVuetify({
  components, directives,
  icons: { defaultSet: 'mdi' },
  theme: { defaultTheme: 'light' }
})


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/store' },     // redirect home to /store
    { path: '/store', component: StorePage },
    { path: '/admin', component: AdminPage },
  ],
})
createApp(App).use(router).use(vuetify).mount('#app')
