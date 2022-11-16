<script setup lang="ts">
import { useEthers } from 'vue-dapp';
import BadgeDisplayer from '../components/BadgeDisplayer.vue';
import BadgeMinter from '../components/BadgeMinter.vue'
import Connect from '../components/reusable/Connect.vue';
import Success from '../components/Success.vue';
import { useBadges } from '../stores/badges';

const { address } = useEthers()
const badges = useBadges()

</script>

<template>
    <div class="container mx-auto px-4 pt-4 bg-gfa-dark text-gfa-white font-sans min-h-400px">
        <div class="flex flex-col">
            <template v-if="address != ''">
                <span class="fat_text text-lg">
                    Wallet {{ address }} connecté
                </span>
                <BadgeDisplayer />
                <BadgeMinter v-if="!badges.purchased" />
                <Success v-else />
            </template>
            <template v-else>
                <p class="text-center">
                    {{ $t("wallet.not_connected" )}}
                </p>
                <Connect />
            </template>
        </div>
    </div>
</template>
