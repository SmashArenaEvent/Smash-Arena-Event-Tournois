<template>
    <section class="my_section section_regles">
        <h2><span class="bleu">Les règles</span> principales</h2>

        <ul class="section_regles-liste">
            <li v-for="regle in regles" :key="regle.id">
                <PrismicText class="regle_titre" :field="regle.titre" />
                <PrismicRichText class="regle_texte" :field="regle.texte" />
            </li>
        </ul>

    </section>
</template>

<style lang="scss">
.section_regles{

    &-liste{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: $m-small;

        li{
            padding: $m-litle;
            border: 2px solid $color-main;
            border-radius: 10px;

            &:nth-child(2n-1){
                background: $color-main;
            }

            .regle_titre{
                font-family: $font-title;
                font-size: $mobile-font_semibig;
                text-transform: uppercase;
                margin-bottom: 15px;
            }
        }
        
        @include medium{
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: $m-medium;

            li{
                padding: $m-medium;

                .regle_titre{
                    font-size: $pc-font_semibig;
                    margin-bottom: $m-litle;
                }
            }
        }
    }
}
</style>

<script setup>
const props = defineProps({
  regles: Object,
});

</script>