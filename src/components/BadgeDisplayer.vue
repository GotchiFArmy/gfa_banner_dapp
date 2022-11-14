<script setup lang="ts">
    import { onBeforeMount } from 'vue';
    import { useBadges } from '../stores/badges'
    
    const badges = useBadges()

    onBeforeMount( async () => {
        await badges.loadBadges()
    })    
</script>

<template>  
    <div v-if="badges.loaded" v-for="badge in badges.getBadgesArray">
        <span>Vous avez {{ badge.count }} badge {{ badge.name }}</span><br />
        <img v-if="badge.count > 0" :src="badge.url" width="50" />
    </div>
    <span v-else>Chargement ....</span>
</template>