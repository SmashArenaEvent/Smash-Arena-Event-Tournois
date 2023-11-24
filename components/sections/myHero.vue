<template>
    <section class="my_section hero">
        <h1 class="section-hero-h1"><span class="bleu">S</span>mash <span class="bleu">A</span>rena <span class="bleu">E</span>vent
            <br><span class="bleu">T</span>ournois
        </h1>

        <h2 class="hero-h2">Prochainement</h2>

        <div>
            CARD A FAIRE APRES
        </div>

        <deco class="hero-deco"/>
    </section>
</template>

<style lang="scss">
.hero{
    position: relative;

    &-deco{
        visibility: hidden;
        z-index: -1;
        position: absolute;
        transform-origin: top;
        top: -100px;
        right: -200px;
        transform: rotate(45deg);
    }

    @include medium{
        padding: $m-medium;

        &-deco{
            visibility: visible;
        }
    }

    @include large{
        padding: $m-big;
    }
}
</style>

<script setup>

</script>