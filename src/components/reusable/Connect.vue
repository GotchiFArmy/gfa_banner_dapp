<script setup lang="ts">
import { watch } from 'vue';
import { useBoard, useEthers, useWallet } from 'vue-dapp';
import svg1 from '../../assets/svg/1.svg?url'
import Gotchi from './Gotchi.vue';

const { address } = useEthers()
const { open } = useBoard()

</script>

<template>
    <div class="flex flex-col items-center">
        <div v-if="address == ''" class="mt-4 leading-tight text-center pt-6">
            <button class="button" @click="open">{{ $t('wallet.connect')}}</button>
        </div>
        <Gotchi :url="svg1" class="pt-6" />
    </div>    
</template>