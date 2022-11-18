<script setup lang="ts">
    import { useBadges } from '../stores/badges';
    import BeTheCoin from '../assets/svg/BeTheCoin.svg?url'
    import boss from  '../assets/svg/boss.svg?url'
    import fifoooo from  '../assets/svg/fifoooo.svg?url'
    import kira from  '../assets/svg/kira.svg?url'
    import moula from  '../assets/svg/moula.svg?url'
    import pg from  '../assets/svg/pg.svg?url'
    import sigri from  '../assets/svg/sigri.svg?url'
    // import svg1 from '../assets/svg/1.svg?url'
    // import svg2 from '../assets/svg/2.svg?url'
    // import svg3 from '../assets/svg/3.svg?url'
    // import svg4 from '../assets/svg/4.svg?url'
    // import svg5 from '../assets/svg/5.svg?url'
    // import svg6 from '../assets/svg/6.svg?url'
    // import svg7 from '../assets/svg/7.svg?url'
    // import svg8 from '../assets/svg/8.svg?url'
import Gotchi from './reusable/Gotchi.vue';
    const badges = useBadges()
    const gotchis:Array<{url: string, name: string}> = [
        { name: 'BeTheCoin', url: BeTheCoin },
        { name: 'FiFoOoO', url: fifoooo },
        { name: 'Kira', url: kira },
        { name: 'Boss', url: boss },
        { name: 'PG', url: pg },
        { name: 'Moula', url: moula },
        { name: 'Sigri', url: sigri }
    ]
</script>

<template>
    <div class="flex flex-col items-center">
        <div class="fat_text text-xl text-center mb-2 mt-6" >
            {{ (badges.getBadgesArray.length > 1) ? $t('newBadge.title') : $t('welcome.title')}}
        </div>
        <div class="fat_text text-base text-center my-2" >
            {{ (badges.getBadgesArray.length > 1) ? $t('newBadge.message') : $t('welcome.message')}}
        </div>
        <div class="flex flex-wrap pt-10 items-center">
            <template v-for="gotchi of gotchis">
                <div class="flex flex-col items-center">
                    <Gotchi :url="gotchi.url" class="mx-2 px-1"/>
                    <span class="text-sm">{{ gotchi.name }}</span>
                </div>
            </template>
        </div>
    </div>
</template>