<template>
    <section class="my_section section_faq">
        <h2><span class="bleu">Foire Aux</span> Questions</h2>

        <ul class="section_faq-liste">
            <li class="section_faq-liste-item" v-for="(question, index) in questionsAffichees" :key="index">
                <!-- bouton radio pour determiner si l'utilisateur à cliqué que cette question ou non -->
                <input :id="'question_' + index" type="radio" name="questions" />

                <!-- le titre de la question -->
                <label class="section_faq-liste-item_question" :for="'question_' + index">
                    <PrismicText :field="question.question_titre"/>
                </label>

                <!-- la réponse à la question, s'affiche ou non -->
                <PrismicText class="section_faq-liste-item_reponse" :field="question.question_reponse"/>
            </li>
        </ul>

        <myButton class="section_faq-button" url="/foire-aux-questions">Consulter toute la FAQ</myButton>
    </section>
</template>

<style lang="scss">
.section_faq{

    // l'enemble des questions
    &-liste{
        width: 100%;
        max-width: $lg;
        margin: auto;
        
        // chaque ligne / question
        &-item{
            width: 100%;
            border-radius: 5px;
            overflow: hidden;

            // une ligne/question sur 2 a un fond
            &:nth-child(2n-1){
                background: $color-main_darken;
            }

            // cache le bouton radio
            input[type="radio"]{
                display: none;
            }

            // le titre de la question
            &_question{
                position: relative;
                display: inline-block;
                width: 100%;
                padding: $m-small;
                font-family: $font-title;
                font-size: $mobile-font_semibig;
                cursor: pointer;

                // le texte de la question (s'applique sur le Prismic)
                > *{
                    width: 90%;
                }

                // la fleche
                &::after{
                    content: ">";
                    position: absolute;
                    top: 50%;
                    right: $m-litle;
                    display: inline-block;
                    width: fit-content;
                    height: fit-content;
                    font-size: $mobile-font_semibig;
                    font-weight: $font-weight-bold;
                    transform: translate(0, -50%) rotate(90deg);
                    transition: all .25s ease-in-out;
                }
            }

            // "si le bouton radio est coché, appliqué ces style sur &_question"
            input:checked ~ &_question {
                &::after{
                    transform: translate(0, -50%) rotate(-90deg);
                }
            }

            // style de la réponse cachée
            &_reponse{
                height: 0;
                opacity: 0;
                transition: opacity .25s ease-in-out;
            }

            // "si le bouton radio est coché, appliqué ces style sur &_reponse"
            input:checked ~ &_reponse {
                margin: $m-small ;
                margin-top: 0;
                height: fit-content;
                opacity: 1;
            }
        }

        @include medium{
            &-item{
                border-radius: 10px;

                &_question{
                    padding: $m-litle $m-medium;
                    font-size: $pc-font_semibig;

                    &::after{
                        right: $m-medium;
                        font-size: $pc-font_semibig;
                    }
                }

                input:checked ~ &_reponse {
                    margin: 0 $m-medium $m-litle $m-medium;
                }
            }
        }
    }

    &-button{
        display: block;
        width: fit-content;
        margin: $m-medium auto;
    }
}

</style>

<script setup>
const props = defineProps({
    faq: Object,
});


// Fonction pour définir le nombre de questions à afficher
const questionsAffichees = computed(() => {
    return props.faq.slice(0, 3);
});

</script>