<script setup lang="ts">
import { watch } from 'vue';
import { useBoard, useEthers, useWallet } from 'vue-dapp';
import boss from '../../assets/img/gfa_boss.png?url'
import Gotchi from './Gotchi.vue';

const { address } = useEthers()
const { open } = useBoard()

</script>

<template>
    <div class="flex flex-col items-center">
        <div v-if="address == ''" class="mt-4 leading-tight text-center pt-6">
            <button class="button" @click="open">{{ $t('wallet.connect')}}</button>
        </div>
        <Gotchi :url="boss" class="mt-6" />
    </div>    
</template>