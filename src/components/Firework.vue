<script setup lang="ts">
    import { Box, Camera, LambertMaterial, PointLight, Renderer, Scene } from 'troisjs';
    import { onMounted, Ref, ref } from "vue";
    import * as THREE from 'three'
    import Firework from '../three/Firework'

    const fireworks:Array<Firework> = []
    const scene = ref<InstanceType<typeof Scene> | null>(null)
    const renderer = ref<InstanceType<typeof Renderer> | null>(null)

    const container = ref(null)
        
    onMounted( () => {
        renderer.value?.three.setSize(container.value.offsetWidth, container.value.offsetHeight)
        window.addEventListener('resize', () => {
            renderer.value?.three.setSize(container.value.offsetWidth, container.value.offsetHeight)
        })
        draw()
    } )

    function draw() {
        requestAnimationFrame(draw)
        if (scene.value !== null && THREE.MathUtils.randInt( 1, 30 ) === 10) {
            fireworks.push(new Firework( scene.value.scene ))
        }
        for(const [i, f] of fireworks.entries()) {
            if (f.done) {
                fireworks.splice(i, 1)
                continue
            }    
            f.update()        
        }  
    }

    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

</script>

<template>
    <div class="w-full md:h-screen <md:h-full text-center absolute inset-0  z-50" ref="container">
        <!-- <Renderer ref="renderer" :alpha="true" antialias :height="props.height.toString()" :width="props.width.toString()"> -->
        <Renderer ref="renderer" :alpha="true" resize=true antialias>
            <Camera ref="camera" :fov="60" />
            <Scene ref="scene"></Scene>
        </Renderer>
    </div>
</template>









