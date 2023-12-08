<template>
    <i class="icon">
        <a :href="url" target="_blank" rel="noopener noreferrer">
            <component :is="getIcon"/>
        </a>
    </i>
</template>

<style lang="scss">
.icon{
    display: block;
    width: 40px;
    height: 40px;
    padding: 23%;
    border: $color-white 1px solid;
    border-radius: 100%;
    text-align: center;
    fill: $color-white;
    transition: all 0.5s;
    cursor: pointer;

    &:hover{
        background-color: $color-main;
    };
}
</style>

<script setup>
import iconInsta from '@/components/icons/iconInsta.vue'
import iconX from '@/components/icons/iconX.vue'
import iconFacebook from '@/components/icons/iconFacebook.vue'
import iconTwitch from '@/components/icons/iconTwitch.vue'

const props = defineProps({
  name: String,
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

</script>