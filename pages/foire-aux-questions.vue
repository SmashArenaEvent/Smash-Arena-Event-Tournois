<template>
    <main class="my_section faq">
        <h1 class="faq_titre"><span class="bleu">F</span>oire <span class="bleu">A</span>ux <span class="bleu">Q</span>uestions</h1>

        <ul class="faq-liste">
            <li class="faq-liste-item" v-for="(question, index) in faq.data.question" :key="index">
                <PrismicText :field="question.question_titre" class="faq-liste-item_question"/>

                <PrismicText :field="question.question_reponse" class="faq-liste-item_reponse"/>
            </li>
        </ul>

        <div class="faq_contact">
            <p>Vous avez encore des questions sans réponse ? Envoyez-nous un message vie nos réseaux sociaux ou notre formulaire de contacte !</p>
            <myButton url="/">Nous Contacter</myButton>
        </div>

    </main>
</template>

<style lang="scss">
.faq{

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

        @include medium{
            &-item{
                border-radius: 10px;
                padding: $m-medium;

                &_question{
                    font-size: $pc-font_big;
                }

                &_reponse {
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

// liste des icons
const tabIcons = ["epee", "etoile", "fleche", "poing", "pacman", "feuille", "oeuf", "pokeball", "fleur", "courrone", "cube", "triangle"]

</script>