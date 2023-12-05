<template>
    <RouterLink :to="url">
        <button class="my_button" :class="className">
            <span class="my_button-text"><slot/></span>
        </button>
    </RouterLink>
</template>

<style lang="scss">
.my_button{
    flex: none;
    display: inline-flex;
    padding: $m-small;
    min-width: 100px;
    height: fit-content;
    background: $color-white;
    transform: skewX(-25deg);
    text-align: center;
    color: $color_black;
    transition: all 0.1s linear;
    cursor: pointer;
    
    &-text{
        width: 100%;
        transform: skewX(25deg);
    }
    
    &:hover{
        background: $color-white_darken;
    }
    
    &.-big{
        @include bouton_big;
        padding: $m-litle $m-small+15;
        min-width: 150px;
    }
    
    @include medium{
        padding: $m-small $m-small+10;

        &.-big{
            padding: $m-litle $m-litle+15;
        }
    }
    
    &.-blue{
        background: $color-main;
        color: $color_white;

        &:hover{
            background: $color-main_darken;
        }
    }

    &.-non_clicable{
        background: $color-gray;
        cursor: not-allowed;
        
        &:hover{
            background: $color-gray;
        }
    }
}
</style>

<script setup>
const props = defineProps({
  url: String,
  size: String,
  color: String,
  clicable: Boolean,
});

const className = computed(() => ({
  " -big": props.size === "big",
  " -blue": props.color === "blue",
  " -non_clicable": props.clicable === "false",
}));
</script>
