<script setup lang="ts">
    import { onBeforeMount } from 'vue';
    import { useBadges } from '../stores/badges'
    
    const badges = useBadges()

    onBeforeMount( async () => {
        await badges.loadBadges()
    })    
</script>

<template>  
    <div class="text-lg my-4"> Vos badges</div>
    <div v-if="badges.loaded">
        <div v-if="badges.getBadgesArray.length === 0">
            <p>Vous n'avez aucun badge</p>
        </div>
        <div v-else class="flex flex-row">
            <template v-for="badge in badges.getBadgesArray">
                <div v-if="badge.count > 0" class="flex flex-row justify-center items-center mx-4" >
                    <img v-if="badge.count > 0" :src="badge.url" width="80" alt="{{ badge.name }}" />
                    <span class="pl-1">x {{ badge.count }}</span>
                </div>
            </template>
        </div>
    </div>
    <span v-else>Chargement ....</span>
</template>