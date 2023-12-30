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