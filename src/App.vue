<script setup lang="ts">
import { MetaMaskConnector, WalletConnectConnector, CoinbaseWalletConnector } from 'vue-dapp'
import './assets/fonts/opensans/open-sans-v34.css'
import './assets/fonts/poppins/poppins.css'

const infuraId = ''

const connectors = [
  new MetaMaskConnector({
    appUrl: 'http://localhost:3001',
  }),
  new WalletConnectConnector({
    qrcode: true,
    rpc: {
      1: `https://mainnet.infura.io/v3/${infuraId}`,
      4: `https://rinkeby.infura.io/v3/${infuraId}`,
    },
  }),
  new CoinbaseWalletConnector({
    appName: 'Vue Dapp',
    jsonRpcUrl: `https://mainnet.infura.io/v3/${infuraId}`,
  }),
]
</script>

<template>
  <router-view></router-view>
  <vd-board :connectors="connectors" dark />
</template>
