import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import StorePage from './views/StorePage.vue'
import AdminPage from './views/AdminPage.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components, directives,
  icons: { defaultSet: 'mdi' },
  theme: {
    defaultTheme: 'dietTheme',
    themes: {
      dietTheme: {
        dark: false,
        colors: {
          primary: '#16a34a',     // green-600
          secondary: '#0ea5e9',   // sky-500
          surface: '#ffffff',
          background: '#f9fafb'
        }
      }
    }
  },
  defaults: {
    VBtn: { rounded: 'xl', density: 'comfortable' },
    VTextField: { density: 'comfortable', variant: 'outlined' },
    VCard: { elevation: 2, rounded: 'xl' },
    VDataTable: { density: 'comfortable' }
  }
})

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/store' },
    { path: '/store', component: StorePage },
    { path: '/admin', component: AdminPage }
  ]
})

createApp(App).use(router).use(vuetify).mount('#app')
