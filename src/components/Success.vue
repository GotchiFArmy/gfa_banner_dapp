<script setup lang="ts">
    import { useBadges } from '../stores/badges';
    import BeTheCoin from '../assets/svg/BeTheCoin.svg?url'
    import boss from  '../assets/svg/boss.svg?url'
    import fifoooo from  '../assets/svg/fifoooo.svg?url'
    import kira from  '../assets/svg/kira.svg?url'
    import moula from  '../assets/svg/moula.svg?url'
    import pg from  '../assets/svg/pg.svg?url'
    import sigri from  '../assets/svg/sigri.svg?url'
    import berlin from '../assets/svg/Berlin.svg?url'
    import sebou from '../assets/svg/Sebou.svg?url'

import Gotchi from './reusable/Gotchi.vue';
    const badges = useBadges()
    const gotchis:Array<{url: string, name: string}> = [
        { name: 'BeTheCoin', url: BeTheCoin },
        { name: 'Berlin', 'url': berlin },
        { name: 'FiFoOoO', url: fifoooo },
        { name: 'Kira', url: kira },
        { name: 'Boss', url: boss },
        { name: 'PG', url: pg },
        { name: 'Moula', url: moula },
        { name: 'Sebou', url: sebou},
        { name: 'Sigri', url: sigri }
    ]
</script>

<template>
    <div class="flex flex-col items-center">
        <div class="fat-text text-xl text-center mb-2 mt-6" >
            {{ (badges.getBadgesArray.length > 1) ? $t('newBadge.title') : $t('welcome.title')}}
        </div>
        <div class="fat-text text-base text-center my-2" >
            {{ (badges.getBadgesArray.length > 1) ? $t('newBadge.message') : $t('welcome.message')}}
        </div>
        <div class="flex flex-wrap pt-10 items-center">
            <template v-for="gotchi of gotchis">
                <div class="flex flex-col items-center">
                    <Gotchi :url="gotchi.url" :size="18" class="mx-2 px-1"/>
                    <span class="text-sm">{{ gotchi.name }}</span>
                </div>
            </template>
        </div>
    </div>
</template>