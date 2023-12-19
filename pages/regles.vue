<template>
    <main class="my_section regles">
        <h1 class="regles_titre">Règles</h1>

        <ul class="regles-liste">
            <li v-for="(regle, index) in regles.data.regle" :key="index">

                <div class="regle_head">
                    <myIcon class="regle_icon" :name="tabIcons[index]"/>
                    <PrismicText class="regle_titre" :field="regle.titre" />
                </div>

                <PrismicText class="regle_texte" :field="regle.texte" />
            </li>
        </ul>

        <div class="regles_faq">
            <p>Vous avez des doutes ? Besoin de précisions ? Vous pouvez consulter notre FAQ pour vous éclairer !</p>
            <myButton url="/">Consulter la FAQ</myButton>
        </div>

    </main>
</template>

<style lang="scss">
.regles{

    &_titre{
        text-align: center;

        &::first-letter{
            color: $color-main;
        }
    }

    &-liste{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: $m-small;

        li{
            padding: $m-litle;
            border: 2px solid $color-main_darken;
            border-radius: 10px;

            &:nth-child(2n-1){
                background: $color-main_darken;
            }

            .regle_head{
                display: flex;
                align-items: center;
                gap: 15px;
                margin-bottom: 15px;

                .regle_icon{
                    display: inline-block;
                    width: 2rem;
                    height: 2rem;
                    fill: $color-white;
                    stroke: $color-white;
                }
    
                .regle_titre{
                    display: inline-block;
                    width: fit-content;
                    font-family: $font-title;
                    font-size: $mobile-font_semibig;
                    text-transform: uppercase;
                }
            }
        }

        @include medium{
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: $m-medium;

            li{
                padding: $m-medium;

                .regle_head{
                    margin-bottom: $m-litle;
                    gap: 25px;
                    
                    .regle_icon{
                        width: 3rem;
                        height: 3rem;
                    }

                    .regle_titre{
                        font-size: $pc-font_semibig;
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

// liste des icons
const tabIcons = ["epee", "etoile", "fleche", "poing", "pacman", "feuille", "oeuf", "pokeball", "fleur", "courrone", "cube", "triangle"]

</script>