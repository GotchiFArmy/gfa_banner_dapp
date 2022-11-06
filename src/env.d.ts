/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_GHST: string
  readonly VITE_BANNER1: string
  readonly VITE_BANNER2: string
  readonly VITE_BANNER3: string
  readonly VITE_BANNER4: string
  readonly VITE_BANNER: string
  readonly VITE_OLD_BANNER_CONTRACT: string
  readonly VITE_NETWORK_ID: number
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}