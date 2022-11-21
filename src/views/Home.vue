<script setup lang="ts">
import { useEthers, useWallet, MetaMaskConnector } from 'vue-dapp';
import BadgeDisplayer from '../components/BadgeDisplayer.vue';
import BadgeMinter from '../components/BadgeMinter.vue'
import Connect from '../components/reusable/Connect.vue';
import Success from '../components/Success.vue';
import Firework from '../components/Firework.vue';
import { useBadges } from '../stores/badges';
import { onMounted, ref, watch } from '@vue/runtime-dom';
import { useApproves } from '../stores/approve';


const badges = useBadges()
const approve = useApproves()
const container = ref(null)
const width = ref(0)
const height = ref(0)

onMounted( () => {
    width.value = container.value.offsetWidth
    height.value = container.value.offsetHeight
})

const { address, network } = useEthers()
const { wallet } = useWallet()

const emit = defineEmits(['wallet-refresh'])

watch(address, async (newAddress, oldAddress) => {
    emit('wallet-refresh')
})

watch(network, async (newNetwork, oldNetwork) => {
    const network = Number(import.meta.env.VITE_NETWORK_ID)
    console.log(newNetwork, network)
    // if (document.hasFocus() && newNetwork?.chainId != import.meta.env.VITE_NETWORK_ID) {
    if (newNetwork?.chainId != network) {
        await wallet.connector?.switchChain(network)
    }
    if (newNetwork?.chainId == network) {
        emit('wallet-refresh')
        await approve.loadApproveStatus()
    }
})

</script>


<template>
    <div class="container mx-auto px-4 pt-4 bg-gfa-dark text-gfa-white font-sans h-700px" ref="container">
        <div class="flex flex-col z-1">
            <template v-if="address != ''">
                <span class="fat_text text-lg">
                    Wallet {{ address }} {{ $t('wallet.connected') }}
                </span>
                <!-- <BadgeDisplayer />
                <BadgeMinter v-if="!badges.purchased" />
                <Success v-else /> -->
                <Success />
            </template>
            <template v-else>
                <p class="text-center">
                    {{ $t("wallet.not_connected" )}}
                </p>
                <Connect />
            </template>
        </div>

        <Firework v-if="address && !badges.purchased" />
    </div>
    
</template>
