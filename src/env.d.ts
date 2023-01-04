/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_GHST: string
  readonly VITE_BANNER1: string
  readonly VITE_BANNER2: string
  readonly VITE_BANNER3: string
  readonly VITE_BANNER4: string
  readonly VITE_BANNER_GOLD: string
  readonly VITE_BANNER1_ID: string
  readonly VITE_BANNER2_ID: string
  readonly VITE_BANNER3_ID: string
  readonly VITE_BANNER4_ID: string
  readonly VITE_BANNER_GOLD_ID: string
  readonly VITE_BANNER1_URL: string
  readonly VITE_BANNER2_URL: string
  readonly VITE_BANNER3_URL: string
  readonly VITE_BANNER4_URL: string
  readonly VITE_BANNER_GOLD_URL: string
  readonly VITE_NETWORK_ID: string
  readonly VITE_DISTRIBUTOR: string
  readonly VITE_NETWORK_SCAN: string
  readonly VITE_OPENSEA_IMG_URL: string
  readonly VITE_NETWORK_RPC: string
  readonly VITE_MIN_PRICE:string
 
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}