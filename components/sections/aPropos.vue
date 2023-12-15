<template>
    <section>
        <h2><span class="bleu">Notre</span> association</h2>

        <ul>
            <li>
                <cardAssos
                    v-for="membre in membres"
                    v-bind="membre"
                />
            </li>
        </ul>

    </section>
</template>

<style lang="scss">

</style>

<script setup>
const props = defineProps({
  membres: Object,
});
</script>