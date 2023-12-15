<template>
    <section class="my_section aPropos">
        <h2><span class="bleu">Notre</span> association</h2>

        <ul class="aPropos_liste">
            <li v-for="membre in membres">
                <cardMembre v-bind="membre"/>
            </li>
        </ul>

    </section>
</template>

<style lang="scss">
.aPropos{

    &_liste{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        gap: $m-medium $m-litle;
        margin: $m-medium 0;
        
        @include medium{
            gap: $m-big 200px;
            margin: $m-big 0;
        }
    }

}
</style>

<script setup>
const props = defineProps({
  membres: Object,
});
</script>