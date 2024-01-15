<template>
    <main class="my_section politique_confidentialite">
        <h1 class="politique_confidentialite_titre"><span class="bleu">P</span>olitique <span class="bleu">D</span>e <span class="bleu">C</span>condifentialité</h1>

        <section class="politique_confidentialite_section" v-for="pc in politique_confidentialite.data.pc_section">
            <PrismicRichText class="h2 politique_confidentialite_section-titre" :field="pc.pc_titre" /> 
            <PrismicRichText :field="pc.pc_texte" class="politique_confidentialite_section-texte"/>
        </section>

        <deco class="deco deco-1"/>
        <deco class="deco deco-2"/>
        <deco class="deco deco-3"/>
    </main>
</template>

<style lang="scss">
.politique_confidentialite{
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
                bottom: -500px;
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
const { data: politique_confidentialite, error: politique_confidentialite_error } = await useAsyncData("politique_confidentialite_tournois", () =>
  client.getSingle("politique_confidentialite_tournois")
)

if (!politique_confidentialite.value || politique_confidentialite_error.value){
    throw createError({statusCode: 404, statusMessage: "Prismic n'a pas trouvé la section politique_confidentialite_tournois"})
}

// SEO de la page
useSeoMeta({
  title: "Smash Arena Event - Politique de Condifentialité",
  ogTitle: "Smash Arena Event - Politique de Condifentialité",
  description: "Pages des Politique de Condifentialité de Smash Arena Event.",
  ogDescription: "Pages des Politique de Condifentialité de Smash Arena Event.",
  ogImage: "/logo.svg",
})
</script>