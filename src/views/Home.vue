<script setup lang="ts">
import { useEthers } from 'vue-dapp';
import BadgeDisplayer from '../components/BadgeDisplayer.vue';
import BadgeMinter from '../components/BadgeMinter.vue'
import Connect from '../components/reusable/Connect.vue';


const { address } = useEthers()

</script>

<template>
<div v-if="address != ''">
    Connecté {{ address  }}<br />
    <BadgeDisplayer />
    <BadgeMinter />
</div>
<div v-else>
    Pas connecté
    <br />
    <Connect />
</div>
</template>
