<template>
    <i class="icon" :class="className">
        <a :href="url" target="_blank" rel="noopener noreferrer">
            <component :is="getIcon"/>
        </a>
    </i>
</template>

<style lang="scss">
.icon{
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
    fill: $color-white;
    transition: all 0.5s;
    
    &.-cercle{
        cursor: pointer;
        padding: 23%;
        border: $color-white 1px solid;
        border-radius: 100%;

        &:hover{
            width: 100%;
            height: 100%;
            background: $color-main;
        };
    }

}
</style>

<script setup>
import iconEpee from '@/components/icons/iconEpee.vue'
import iconFleche from '@/components/icons/iconFleche.vue'
import iconEtoile from '@/components/icons/iconEtoile.vue'
import iconFeuille from '@/components/icons/iconFeuille.vue'
import iconPoing from '@/components/icons/iconPoing.vue'
import iconPacman from '@/components/icons/iconPacman.vue'
import iconOeuf from '@/components/icons/iconOeuf.vue'
import iconPokeball from '@/components/icons/iconPokeball.vue'
import iconFleur from '@/components/icons/iconFleur.vue'
import iconCourrone from '@/components/icons/iconCourrone.vue'
import iconCube from '@/components/icons/iconCube.vue'
import iconTriangle from '@/components/icons/iconTriangle.vue'

import iconInsta from '@/components/icons/iconInsta.vue'
import iconX from '@/components/icons/iconX.vue'
import iconFacebook from '@/components/icons/iconFacebook.vue'
import iconTwitch from '@/components/icons/iconTwitch.vue'

const props = defineProps({
  name: String,
  cercle: String,
  url: String,
})

const getIcon = computed(() => {
  switch (props.name) {
    case 'epee':
        return iconEpee
    case 'fleche':
        return iconFleche
    case 'etoile':
        return iconEtoile
    case 'feuille':
        return iconFeuille
    case 'poing':
        return iconPoing
    case 'pacman':
        return iconPacman
    case 'oeuf':
        return iconOeuf
    case 'pokeball':
        return iconPokeball
    case 'fleur':
        return iconFleur
    case 'courrone':
        return iconCourrone
    case 'cube':
        return iconCube
    case 'triangle':
        return iconTriangle

    case 'twitch':
        return iconTwitch
    case 'x':
        return iconX
    case 'facebook':
        return iconFacebook
    default:
        return iconInsta
  }
})

const className = computed(() => ({
  " -cercle": props.cercle === "true",
}));

</script>