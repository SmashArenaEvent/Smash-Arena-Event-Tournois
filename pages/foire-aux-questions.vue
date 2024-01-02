<template>
    <main class="my_section faq">
        <h1 class="faq_titre"><span class="bleu">F</span>oire <span class="bleu">A</span>ux <span class="bleu">Q</span>uestions</h1>

        <ul class="faq_menu">
            <li v-for="(faq_menu, index) in numberOfSections" :key="index">
                <myButton :url="`#`+faq.data[`partie_titre_${index+1}`][0].spans[0].data.url">
                    <PrismicText :field="faq.data[`partie_titre_${index+1}`]" /> 
                </myButton>
            </li>
        </ul>

        <section :id="faq.data[`partie_titre_${index+1}`][0].spans[0].data.url"
                class="faq_section"
                v-for="(faq_section, index) in numberOfSections" :key="index">

            <PrismicText class="h2" :field="faq.data[`partie_titre_${index+1}`]" /> 

            <ul class="faq_section-liste">
                <li class="faq_section-liste-item" v-for="(question, index) in faq.data[`question_${index+1}`]" :key="index">
                    <PrismicText :field="question.question_titre" class="faq_section-liste-item_question"/>

                    <PrismicText :field="question.question_reponse" class="faq_section-liste-item_reponse"/>
                </li>
            </ul>

        </section>

        <div class="faq_contact">
            <p>Vous avez encore des questions sans réponse ? Envoyez-nous un message vie nos réseaux sociaux ou notre formulaire de contacte !</p>
            <myButton url="/">Nous Contacter</myButton>
        </div>

        <deco class="deco deco-1"/>
        <deco class="deco deco-2"/>
        <deco class="deco deco-3"/>
    </main>
</template>

<style lang="scss">
.faq{
    position: relative;
    overflow: hidden;

    &_menu{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        gap: $m-litle;
    }

    &_section{
        padding: $m-medium 0;

        // l'enemble des questions
        &-liste{
            width: 100%;
            
            // chaque ligne / question
            &-item{
                width: 100%;
                padding: $m-litle;
                border-radius: 5px;
                overflow: hidden;

                // une ligne/question sur 2 a un fond
                &:nth-child(2n-1){
                    background: $color-main_darken;
                }


                // le titre de la question
                &_question{
                    // @include h2;
                    font-family: $font-title;
                    font-size: $mobile-font_semibig;
                }

                // la réponse
                &_reponse {
                    margin-top: $m-small;
                }
            }
        }

        @include medium{
            padding: $m-big 0;

            &-liste{
                &-item{
                    border-radius: 10px;
                    padding: $m-medium;
    
                    &_question{
                        font-size: $pc-font_big;
                    }
                }
            }
        }
    }

    &_contact{
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
const { data: faq, error: faq_error } = await useAsyncData("faq", () =>
    client.getSingle("faq")
)

if (!faq.value || faq_error.value){
    throw createError({statusCode: 404, statusMessage: "Prismic n'a pas trouvé la section faq"})
}

// Fonction pour obtenir le nombre de sections à afficher
const numberOfSections = ref(getNumberOfSections());

function getNumberOfSections() {
  let sectionCount = 0;
  const regleSection = faq.value.data;
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
    title: faq.value.data.meta_title,
    ogTitle: faq.value.data.meta_ogtitle,
    description: faq.value.data.meta_description,
    ogDescription: faq.value.data.meta_ogdescription,
    ogImage: faq.value.data.meta_ogimage,
})
</script>