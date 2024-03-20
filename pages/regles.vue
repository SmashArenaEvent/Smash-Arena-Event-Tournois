<template>
    <main class="my_section regles">
        <h1 class="regles_titre">Règles</h1>

        <ul class="regles_menu">
            <li v-for="(regle_menu, index) in numberOfSections" :key="index">
                <myButton :url="`#`+regles.data[`partie_titre_${index+1}`][0].spans[0].data.url">
                    <PrismicText :field="regles.data[`partie_titre_${index+1}`]" /> 
                </myButton>
            </li>
        </ul>
        
        <section :id="regles.data[`partie_titre_${index+1}`][0].spans[0].data.url"
                class="regles_section"
                v-for="(regle_section, index) in numberOfSections" :key="index">

            <PrismicText class="h2 regles_section-titre" :field="regles.data[`partie_titre_${index+1}`]" /> 
      
            <ul class="regles_section-liste">
                <li class="item" v-for="(regle, index) in regles.data[`regle_${index+1}`]" :key="index">
    
                    <div class="item_head">
                        <PrismicImage class="item_head-icon" :field="regle.regle_icon" />
                        <PrismicText class="item_head-titre" :field="regle.regle_titre" />
                    </div>
    
                    <PrismicText class="item_texte" :field="regle.regle_texte" />
                </li>
            </ul>

        </section>

        <div class="regles_faq">
            <p>Vous avez des doutes ? Besoin de précisions ? Vous pouvez consulter notre FAQ pour vous éclairer !</p>
            <myButton url="/foire-aux-questions">Consulter la FAQ</myButton>
        </div>

        <deco class="deco deco-1"/>
        <deco class="deco deco-2"/>
        <deco class="deco deco-3"/>

    </main>
</template>

<style lang="scss">
.regles{
    position: relative;
    overflow: hidden;

    &_titre{
        &::first-letter{
            color: $color-main;
        }
    }

    &_menu{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        gap: $m-litle;
    }

    &_section{
        padding: $m-medium 0;
        max-width: $xl2;
        margin: auto;

        &-titre{
            strong{
                color: $color-main
            }
        }
        
        &-liste{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: $m-small;
    
            .item{
                padding: $m-litle;
                border: 2px solid $color-main_darken;
                border-radius: 10px;
    
                &:nth-child(2n-1){
                    background: $color-main_darken;
                }
    
                &_head{
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 15px;
    
                    &-icon{
                        display: inline-block;
                        width: 2rem;
                        height: 2rem;
                        fill: $color-white;
                        stroke: $color-white;
                    }
        
                    &-titre{
                        display: inline-block;
                        width: fit-content;
                        font-family: $font-title;
                        font-size: $mobile-font_semibig;
                        text-transform: uppercase;
                    }
                }
            }
        }

        @include medium{
            padding: $m-big 0;
            
            &-liste{
                grid-template-columns: repeat(auto-fit, minmax(430px, 1fr));
                gap: $m-medium;
    
                .item{
                    padding: $m-medium;
    
                    &_head{
                        margin-bottom: $m-litle;
                        gap: 25px;
                        
                        &-icon{
                            width: 3rem;
                            height: 3rem;
                        }
    
                        &-titre{
                            font-size: $pc-font_semibig;
                        }
                    }
    
                }

            }
        }

    }

    &_faq{
        text-align: center;
        margin: $m-medium 0;
        
        p{
            margin: $m-litle 0;
        }

        @include medium{
            margin: $m-big 0;

            p{
                margin: $m-medium 0
            };
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
const { data: regles, error: regles_error } = await useAsyncData("regles", () =>
  client.getSingle("regles")
)

if (!regles.value || regles_error.value){
    throw createError({statusCode: 404, statusMessage: "Prismic n'a pas trouvé la section regles"})
}


// Fonction pour obtenir le nombre de sections à afficher
const numberOfSections = ref(getNumberOfSections());

function getNumberOfSections() {
  let sectionCount = 0;
  const regleSection = regles.value.data;
  // Compter le nombre de partie_titre_X disponibles dans les données
  for (const key in regleSection) {
    if (key.startsWith('partie_titre_')) {
      sectionCount++;
    }
  }
  return sectionCount;
}


// SEO de la page
useSeoMeta({
    title: regles.value.data.meta_title,
    ogTitle: regles.value.data.meta_ogtitle,
    description: regles.value.data.meta_description,
    ogDescription: regles.value.data.meta_ogdescription,
    ogImage: regles.value.data.meta_ogimage,
})
</script>