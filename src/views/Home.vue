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
import Banner from '../components/Banner.vue';


const badges = useBadges()
const approve = useApproves()
const container = ref(null)

const { address, network } = useEthers()
const { wallet } = useWallet()

const emit = defineEmits(['wallet-refresh'])

onMounted( async () => {
    await badges.loadRemainingBadges()
})


watch(address, async (newAddress, oldAddress) => {
    emit('wallet-refresh')
    await badges.loadBadges()
    await badges.loadRemainingBadges()
})

watch(network, async (newNetwork, oldNetwork) => {
    const network = Number(import.meta.env.VITE_NETWORK_ID)
    console.log(newNetwork, network)
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
    <div class="container bg-gfa-dark text-gfa-white font-sans max-h-full min-h-screen <md:pb-30" ref="container">
        <div class="flex flex-col z-1 mx-5 lg:w-8/10 lg:mx-auto xl:w-7/10 2xl:w-6/10">
            <Banner />
            <template v-if="address != ''">
                <span class="md:fat-text md:text-lg <md:text-gfa-white <md:text-sm <sm:text-xs">
                    Wallet {{ address }} {{ $t('wallet.connected') }}
                </span>
                <BadgeDisplayer />
                <BadgeMinter v-if="!badges.purchased" />
                <Success v-else />
            </template>
            <template v-else>
                <div class="flex flex-row mb-10">
                    <span>
                        {{ $t('intro.s1') }}<br />
                        <p v-html="$t('intro.s2')" />
                        <div class="flex flex-col justify-center items-center mt-5 mb-10">
                            <img :src="badges.badge4.url" width="80" alt="{{ badges.badge4.name }}" />
                            <span 
                                @if="badges.remainingBadge4 && badges.remainingBadge4 > 0" 
                                v-html="$t('intro.badge.supply', { count: badges.remainingBadge4 })"
                                class="mt-5" 
                            />
                        </div>
                        {{ $t('intro.bullets') }}<br />
                        <ul class="list-disc list-inside">
                            <li>{{ $t('intro.bullets1') }}</li>
                            <li>{{ $t('intro.bullets2') }}</li>
                            <li>{{ $t('intro.bullets3') }}</li>
                            <li>{{ $t('intro.bullets4') }}</li>
                            <li>{{ $t('intro.bullets5') }}</li>
                            <li>{{ $t('intro.bullets6') }}</li>
                        </ul>
                    </span>
                </div>
                <p class="text-center">
                    {{ $t("wallet.not_connected") }}
                </p>
                <Connect />
            </template>
        </div>
        <!-- <Firework /> -->
        <Firework v-if="address && badges.purchased" />
    </div>
</template>

<style>
    .li-1 {
        padding: .3em 0 1em 40px;
        background-image: url(assets/large-bullet.png) no-repeat;
    }
</style>