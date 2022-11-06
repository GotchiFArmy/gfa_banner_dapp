import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import { VueDapp } from 'vue-dapp'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import messages from '@intlify/vite-plugin-vue-i18n/'

const app = createApp(App)
const pinia = createPinia()

let lang='en'
const langs:string[] = ['fr', 'en']
if (langs.find(i => i == navigator.language)) {
  lang=navigator.language
}
// const i18n = createI18n({
//     locale: lang,
//     fallbackLocale: 'en',
//     legacy: false,
//     globalInjection: true,
//     messages: messages
//   })

app.use(router)
app.use(VueDapp)
app.use(pinia)

app.mount('#app')
