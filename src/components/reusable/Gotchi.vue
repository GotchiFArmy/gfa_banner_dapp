<script setup lang="ts">
    const props = withDefaults(defineProps<{ url: string, size: number }>(), {
        size: 24
    })

    const width = `w-${props.size}`
    const height = `h-${props.size}`

</script>
<template>
    <div :class="`w-${size} h-${size}`">
    <!-- <div class="w-30 h-30"> -->
        <img :src="url" />
    </div>
</template>