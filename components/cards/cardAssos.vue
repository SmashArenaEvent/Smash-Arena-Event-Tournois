<template>
    <div>

        <div>
            <component :is="getInitials"/>
        </div>

        <img :src="img" alt="">

        <h3>{{ prenom }} {{ nom }}</h3>

        <p>{{ adjectif }}</p>
        
        <p>{{ role }}</p>        
    </div>
</template>

<style lang="scss">

</style>

<script setup>
// import iconInsta from "@/components/lettres/lettresAR.vue"

import initialAR from '@/components/initials/initialAR.vue'
import initialBR from '@/components/initials/initialBR.vue'
import initialEF from '@/components/initials/initialEF.vue'
import initialEP from '@/components/initials/initialEP.vue'
import initialVS from '@/components/initials/initialVS.vue'

const props = defineProps({
    initials: String,
    img: String,
    prenom: String,
    nom: String,
    adjectif: String,
    role: String,
})

const getInitials = computed(() => {
  switch (props.initials) {
    case 'ar':
        return initialAR
    case 'br':
        return initialBR
    case 'ef':
        return initialEF
    case 'ep':
        return initialEP
    case 'vs':
        return initialVS
    default:
        return initialVS
  }
})
</script>