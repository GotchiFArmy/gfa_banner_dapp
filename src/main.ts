import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import { VueDapp } from 'vue-dapp'
import { createPinia } from 'pinia'
import 'virtual:windi.css'
import { createI18n } from 'vue-i18n'
import messages from '@intlify/vite-plugin-vue-i18n/messages'

const app = createApp(App)
const pinia = createPinia()

let lang='en'
const langs:string[] = ['fr', 'en']

// We do that so fr-FR uses fr and same for en-*
langs.forEach( (l) => {
  if (navigator.language.startsWith(l)) {
    lang=navigator.language  
  }
})

const i18n = createI18n({
    locale: lang,
    fallbackLocale: 'fr',
    legacy: false,
    globalInjection: true,
    messages: messages
  })

app.use(router)
app.use(VueDapp)
app.use(pinia)
app.use(i18n)
app.mount('#app')
