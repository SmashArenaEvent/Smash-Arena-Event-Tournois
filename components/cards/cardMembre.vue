<template>
    <div class="cardAssos">
        <MyInitials class="cardAssos_initials" :initiales="initiales"/>

        <div class="cardAssos_photo">
            <PrismicImage class="cardAssos_photo-img" :field="photo" />
        </div>
        <PrismicRichText class="cardAssos_prenom" :field="prenom" />
        <PrismicRichText class="cardAssos_nom" :field="nom" />
        <PrismicRichText class="cardAssos_adjectif" :field="adjectif" />
        <PrismicRichText class="cardAssos_role" :field="role" />
    </div>
</template>

<style lang="scss">
.cardAssos{
    position: relative;
    width: 130px;
    text-align: center;

    &_initials{
        position: absolute;
        top: 0;
        left: 0;
        scale: 0.5;
        translate: -40% -50%;
    }

    &_photo{
        width: 100%;
        border: solid 2px $color-main;
        margin-bottom: 15px;
        padding: 10px;

        &-img{
            width: 100%;
            aspect-ratio: 1/1;
        }
    }

    &_prenom,
    &_nom{
        font-family: $font-title;
        font-size: $mobile-font_semibig;
        text-transform: uppercase;
    }

    &_nom{
        color: transparent;
        -webkit-text-stroke: 0.75px $color-white;
    }
    
    &_adjectif{
        margin: 10px 0;
        font-family: $font-title;
        color: $color-main;
    }

    &_role{
        font-weight: $font_weight-bold;
        text-transform: capitalize;
    }

    @include medium{
        width: 200px;

        &_initials{
            scale: 0.7;
        }

        &_photo{
            margin-bottom: 15px;
            padding: 15px;
        }

        &_prenom,
        &_nom{
            font-size: $pc-font_big;
        }

        &_nom{
            -webkit-text-stroke: 1px $color-white;
        }
    }
}
</style>

<script setup>
const props = defineProps({
    initiales: String,
    photo: String,
    prenom: String,
    nom: String,
    adjectif: String,
    role: String,
})
</script>