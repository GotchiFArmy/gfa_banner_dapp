<script setup lang="ts">
import { useEthers } from 'vue-dapp';
import Connect from '../components/reusable/Connect.vue';


const { address, signer, network } = useEthers()

</script>

<template>
Test
<div v-if="address != ''">
    Connecté
</div>
<div v-else>
    Pas connecté Connard
    <br />
    <Connect />
</div>
</template>
