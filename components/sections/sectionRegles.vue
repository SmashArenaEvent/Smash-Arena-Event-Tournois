<template>
    <section class="section_regles">
        <h2><span class="bleu">Les règles</span> principales</h2>

        <ul class="section_regles-liste">
            <li v-for="(regle, index) in reglesAffichees" :key="index">

                <div class="regle_head">
                    <PrismicImage class="regle_icon" :field="regle.regle_icon" />
                    <PrismicText class="regle_titre" :field="regle.regle_titre" />
                </div>

                <PrismicRichText class="regle_texte" :field="regle.regle_texte" />
            </li>
        </ul>

        <div class="section_regles-button">
          <myButton url="/regles">Découvrir les autres règles</myButton>
        </div>
    </section>
</template>

<style lang="scss">
.section_regles{

    &-liste{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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

    &-button{
        display: block;
        width: fit-content;
        margin: $m-medium auto;
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

const mesRegles = [regles.value.data.regle_1[0],
                  regles.value.data.regle_2[0],
                  regles.value.data.regle_3[0],
                  regles.value.data.regle_1[1],
                  regles.value.data.regle_2[1],
                  regles.value.data.regle_3[1]]

// liste des règles à afficher (change en fonction de la taille d'écran)
const reglesAffichees = ref([]);

// Fonction pour définir le nombre de règles à afficher en fonction de la largeur de l'écran
const calculeReglesAffichees = () => {
  if (window.innerWidth <= 768) {
    reglesAffichees.value = mesRegles.slice(0, 3);
  } else {
    reglesAffichees.value = mesRegles.slice(0, 6);
  }
};

// Appel initial pour définir le nombre de règles à afficher en fonction de la taille de l'écran
onMounted(() => {
  calculeReglesAffichees();
});

// Écouteur d'événement pour gérer les changements de taille d'écran et ajuster le nombre de règles à afficher
const resizeHandler = () => {
  calculeReglesAffichees();
};

// onMounted = ne s'execute qu'une fois le composant chargé (exemple : on ne peut pas mesurer la taille de la fenetre si celle-ci n'est pas créer)
onMounted(() => {
  window.addEventListener('resize', resizeHandler);
});

// onUnmounted = s'execute au moment de quitter la page, est utiliser pour supprimer les écouteur d'événement et libéré des ressources
onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler);
});
</script>