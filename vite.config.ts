import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import inject from '@rollup/plugin-inject'
import { vueI18n } from '@intlify/vite-plugin-vue-i18n'
import path from 'path'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    vueI18n({
      // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
      // compositionOnly: false,
      // you need to set i18n resource including paths !
      include: path.resolve(__dirname, './src/locales/**')
    })
    
  ],
  build: {
    rollupOptions: {
      plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
