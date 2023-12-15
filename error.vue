<template>
    <div>
        <myHeader/>
    
        <main class="main error">
            <div class="error_contenu">
                <h1 class="error_contenu-title">Erreur <span class="bleu">404</span></h1>
                <p class="error_contenu-text">La page que vous recherchez à été envoyée hors stage et est maintenant introuvable.</p>

                <img class="error_contenu-img_mobile" src="/img/error.webp" alt="image d'un personnage ejecter hors stage">

                <myButton url="/" size="big" color="blue" class="error_contenu-button">Retourner à l'accueil</myButton>
            </div>

            <img class="error-img_pc" src="/img/error.webp" alt="image d'un personnage ejecter hors stage">
        </main>

        <myFooter/>
  </div>
</template>

<style lang="scss">
.error{
    min-height: 90vh;
    text-align: center;
    padding: $m-small;

    &_contenu{

        &-title{
            &::first-letter{
                color: $color-main;
            }
        }

        &-text{
            padding: 0 $m-litle;
        }

        &-img_mobile{
            margin: $m-medium 0;
        }
    }

    &-img_pc{
        display: none;
    }

    @include large{
        display: flex;
        flex-wrap: wrap;
        gap: $m-medium;
        min-height: fit-content;
        padding: $m-litle $m-big;
        margin-bottom: $m-big;

        &_contenu{
            width: 45%;
            text-align: left;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: $m-small;

            &-title{
                margin: 0;
            }

            &-text{
                padding: 0;
            }

            &-img_mobile{
                display: none;
            }

            &-button{
                margin: 0 auto;
            }
        }

        &-img_pc{
            display: block;
            flex: 1 1 45%;
            height: auto;
            object-fit: cover;
        }
    }

}
</style>

<script setup>

</script>