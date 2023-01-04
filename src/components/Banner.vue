<script setup lang="ts">
import { useBadges } from '../stores/badges';

const badges = useBadges();
</script>

<template>
    <div class="flex flex-row justify-center items-center mt-5 mb-15">
        <div class="mx-10 <md:hidden">
            <img :src="badges.badge3.url" width="80" alt="{{ badges.badge3.name }}" />
        </div>
        <div class="fat-text text-4xl text-center <md:mx-5">
            {{ $t('title') }}
        </div>
        <div class="mx-10 <md:hidden">
            <img :src="badges.badge1.url" width="80" alt="{{ badges.badge1.name }}" />
        </div>
    </div>
</template>