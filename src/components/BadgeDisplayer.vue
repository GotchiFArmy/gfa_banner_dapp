<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useBadges } from '../stores/badges'

const badges = useBadges()

onBeforeMount(async () => {
    await badges.loadBadges()
})    
</script>

<template>
    <div v-if="badges.loaded">
        <div v-if="badges.getBadgesArray.filter(i => i.count > 0).length === 0" class="mt-5">
            <p>{{ $t('badges_display.no_badges') }}</p>
        </div>
        <div v-else class="text-lg my-4">{{ $t('badges.title') }}</div>

        <div class="flex flex-row">
            <template v-for="badge in badges.getBadgesArray">
                <div v-if="badge.count > 0" class="flex flex-row justify-center items-center mx-4">
                    <img :src="badge.url" width="80" alt="{{ badge.name }}" />
                    <span class="pl-1">x {{ badge.count }}</span>
                </div>
            </template>
        </div>
    </div>
    <span v-else>{{ $t('badges.loading') }}</span>
</template>