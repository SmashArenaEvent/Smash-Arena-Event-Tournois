<template>
    <main class="my_section mentions_legales">
        <h1 class="mentions_legales_titre"><span class="bleu">M</span>entions <span class="bleu">L</span>égales</h1>

        <section class="mentions_legales_section" v-for="ml in mentions_legales.data.ml_section">
            <PrismicRichText class="h2 mentions_legales_section-titre" :field="ml.ml_titre" /> 
            <PrismicRichText :field="ml.ml_texte" class="mentions_legales_section-texte"/>
        </section>

        <deco class="deco deco-1"/>
        <deco class="deco deco-2"/>
        <deco class="deco deco-3"/>
    </main>
</template>

<style lang="scss">
.mentions_legales{
    position: relative;
    overflow: hidden;

    &_section{
        padding: $m-medium 0;

        &-titre{
            strong{
                color: $color-main
            }
        }

        &-texte{
            line-height: 1.5rem;

            strong{
                font-weight: $font-weight-bold;
            }

            a{
                color: $color-main;

                &:hover{
                    text-decoration: underline;
                }
            }
        }
        

        @include medium{
            padding: $m-big 0;

            &-texte{
                line-height: 2rem;
            }
        }
    }

    .deco{
        z-index: -1;
        position: absolute;
        display: none;

        @include medium{
            display: block;

            &-1{
                rotate: 70deg;
                top: -500px;
                right: 450px;
            }
            
            &-2{
                rotate: 70deg;
                top: -93px;
                right: 1635px;
            }
            
            &-3{
                rotate: 70deg;
                bottom: -700px;
                right: 450px;
            }
        }
    }
}

</style>

<script setup>
// import de Prismic
const { client } = usePrismic();

// import du document Règles
const { data: mentions_legales, error: mentions_legales_error } = await useAsyncData("mentions_legales_tournois", () =>
  client.getSingle("mention_legales_tournois")
)

if (!mentions_legales.value || mentions_legales_error.value){
    throw createError({statusCode: 404, statusMessage: "Prismic n'a pas trouvé la section mention_legales_tournois"})
}

// SEO de la page
useSeoMeta({
  title: "Smash Arena Event - Mentions Légales",
  ogTitle: "Smash Arena Event - Mentions Légales",
  description: "Pages des mentiosn légales de Smash Arena Event.",
  ogDescription: "Pages des mentiosn légales de Smash Arena Event.",
  ogImage: "/logo.svg",
})
</script>