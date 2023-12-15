<template>
    <div>
        <component :is="getInitiales"/>
    </div>
</template>

<script setup>
import initialeAR from '@/components/initiales/initialeAR.vue'
import initialeBR from '@/components/initiales/initialeBR.vue'
import initialeEF from '@/components/initiales/initialeEF.vue'
import initialeEP from '@/components/initiales/initialeEP.vue'
import initialeVS from '@/components/initiales/initialeVS.vue'

const props = defineProps({
    initiales: String,
})

const getInitiales = computed(() => {
  switch (props.initiales) {
    case 'ar':
        return initialeAR
    case 'br':
        return initialeBR
    case 'ef':
        return initialeEF
    case 'ep':
        return initialeEP
    case 'vs':
        return initialeVS
    default:
        return initialeVS
  }
})
</script>