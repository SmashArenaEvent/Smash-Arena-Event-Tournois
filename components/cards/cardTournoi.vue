<template>
    <div class="card_tournoi">
        <div class="card_tournoi-header">
            <h3 class="card_tournoi-header_title">Tournoi n°1</h3>
            <p class="card_tournoi-header_type">Double élimination</p>
        </div>

        <div class="card_tournoi-infos">
            <p class="card_tournoi-infos_date">10 Janvier 2024</p>
            <p class="card_tournoi-infos_heure">14h - 19h</p>
            <p class="card_tournoi-infos_lieu">Batiment B, Campus Montbéliard</p>
        </div>

        <div class="card_tournoi-contenu">
            <p class="card_tournoi-contenu_texte">Donut sesame snaps gingerbread gummi bears pudding wafer jelly liquorice sesame snaps. Cookie icing liquorice apple pie candy canes I love carrot cake jelly-o lollipop. Biscuit donut pastry I love I love. Toffee cookie pudding apple pie sweet sugar plum chocolate bar croissant halvah.</p>
    
            <myButton size="big" color="blue" class="card_tournoi-contenu_button">Voir la Fiche du Tournoi</myButton>
        </div>

        <div class="card_tournoi-img">
            <img class="" src="/img/persos.png" alt="fanart des persos de Smash Bros Ultimate">
        </div>
    </div>
</template>

<style lang="scss">
.card_tournoi{
    z-index: 5;
    position: relative;
    width: 100%;
    max-width: $xl;
    min-height: 100px;
    margin: auto;
    padding: $m-litle;
    border-radius: 20px;
    background-color: $color-gray_darken;
    overflow: hidden;
    box-shadow: 0 0 10px rgba($color-gray_darken, 95%);

    &-header{
        z-index: 5;
        position: relative;

        &_title{
            display: inline-block;
            color: $color-main;
            margin-right: $m-small;
        }

        &_type{
            display: inline-block;
            font-size: 0.8rem;
        }
    }
    
    &-infos{
        z-index: 5;
        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: $m-small;
        margin: $m-litle 0;

        &_date,
        &_lieu{
            font-weight: $font_weight-bold;
        }

        &_heure{
            color: $color-main_darken;
            margin-right: $m-litle;
        }
    }

    &-contenu{
        z-index: 5;
        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 5vw;
        width: 100%;

        &_texte{
            flex: 40%;
        }
    }
    
    &-img{
        position: absolute;
        z-index: 0;
        top: 0;
        right: -100px;
        height: 155%;
        aspect-ratio: 1/1;
        transform-origin: center;
        transform: translate(50%, -50%) rotate(-25deg);
        overflow: hidden;

        img{
            z-index: 0;
            position: absolute;
            top: 20%;
            right: 75%;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transform-origin: center;
            transform: rotate(25deg);
            opacity: 50%;
        }
    }

    @include medium{
        padding: $m-medium $m-big;

        &-infos{
            gap: $m-litle;
            margin: $m-medium 0;
        }

        &-img{
            top: 0;
            right: 0;
            height: 150%;
            transform: translate(50%, -50%) rotate(45deg);

            img{
                top: 70%;
                right: 0%;
                transform: rotate(-45deg);
            }
        }
        
    }

    @include large{

        &-contenu{
            width: 90%;
            justify-content: start;
        }
    }
}
</style>

<script setup>

</script>