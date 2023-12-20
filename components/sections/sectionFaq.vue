<template>
    <section class="my_section section_faq">
        <h2><span class="bleu">Foire Aux</span> Questions </h2>

        <ul class="section_faq-liste">
            <li>
                <label for="question1">Question 1 ?</label>
                <input id="question1" type="radio" name="questions" />

                <p>Réponse 1</p>
            </li>
            <li>
                <label for="question2">Question 2 ?</label>
                <input id="question2" type="radio" name="questions" />

                <p>Réponse 2</p>
            </li>
            <li>
                <label for="question3">Question 3 ?</label>
                <input id="question3" type="radio" name="questions" />

                <p>Réponse 3</p>
            </li>
        </ul>

        <myButton class="section_faq-button" url="/foire-aux-questions">Consulter toute la FAQ</myButton>
    </section>
</template>

<style lang="scss">
.section_faq{

    &-liste{
        width: 100%;
        
        li{
            width: 100%;
            border-radius: 5px;
            overflow: hidden;

            &:nth-child(2n-1){
                background: $color-main_darken;
            }

            input[type="radio"]{
                display: none;
            }

            label{
                display: inline-block;
                width: 100%;
                padding: $m-small;
                font-family: $font-title;
                font-size: $mobile-font_semibig;
            }
            
            p{
                height: 0;
                opacity: 0;
                transition: all 0.25s ease-in-out;
            }

            input:checked + p {
                margin: $m-small ;
                margin-top: 0;
                height: 1.5rem;
                opacity: 1;
            }
        }

        @include medium{
            li{
                border-radius: 10px;

                label{
                    padding: $m-litle $m-medium;
                    font-size: $pc-font_semibig;
                }

                input:checked + p {
                    margin: $m-litle $m-medium;
                    margin-top: 0;
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

</script>