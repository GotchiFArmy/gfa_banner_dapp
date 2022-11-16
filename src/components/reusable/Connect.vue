<script setup lang="ts">
import { watch } from 'vue';
import { useBoard, useEthers, Connector } from 'vue-dapp';

const { address, network } = useEthers()
const { open } = useBoard()

const emit = defineEmits(['wallet-refresh'])

watch(address, async (newAddress, oldAddress) => {
    emit('wallet-refresh')
})

watch(network, async (newNetwork, oldNetwork) => {
    if (document.hasFocus() && newNetwork?.chainId != import.meta.env.VITE_NETWORK_ID) {
        
    }
    if (newNetwork?.chainId == import.meta.env.VITE_NETWORK_ID) {
        emit('wallet-refresh')
    }
})

watch(network, async (newNetwork, oldNetwork) => {

})
</script>

<template>
    <div v-if="address == ''" class="mt-4 leading-tight text-center">
        <button class="button" @click="open">Connecter mon wallet</button>
    </div>
    <!-- <BadgeDisplayer /> -->
    
</template>