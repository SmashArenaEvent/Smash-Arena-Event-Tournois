<template>
    <div>
        <component :is="getInitials"/>
    </div>
</template>

<script setup>
import initialAR from '@/components/initials/initialAR.vue'
import initialBR from '@/components/initials/initialBR.vue'
import initialEF from '@/components/initials/initialEF.vue'
import initialEP from '@/components/initials/initialEP.vue'
import initialVS from '@/components/initials/initialVS.vue'

const props = defineProps({
    initials: String,
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