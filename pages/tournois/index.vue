<template>
    <main class="my_section tous_tournois">
        <h1 class="tous_tournois-titre">Tous <span class="bleu">l</span>es <span class="bleu">t</span>ournois</h1>

        <p class="tous_tournois-texte">Voici l'ensemble des tournois que Smash Arena Event a organisé et prévois.</p>

        <ul class="tous_tournois-tournois_liste" v-if="TOURNOIS_TOUS.length >= 0">
            <li class="tous_tournois-tournois_liste-item" v-for="tournoi in TOURNOIS_TOUS" :key="tournoi.id">
                <cardTournoi v-bind="tournoi.tournament"/>
            </li>
        </ul>

            <!-- card à afficher lorsqu'il n'y a ni tournois en cours ni prévus -->
        <div class="my_section main-tournois" v-if="TOURNOIS_TOUS.length == 0">     
            <cardTournoi/>
        </div>

        <deco class="deco deco-1"/>
        <deco class="deco deco-2"/>
        <deco class="deco deco-3"/>
    </main>
</template>

<style lang="scss">
.tous_tournois{
    position: relative;
    overflow: hidden;

    &-titre{
        &::first-letter{
            color: $color-main;
        }
    }

    &-tournois_liste{

        &-item{
            margin: $m-medium 0;
        }
    }

    @include medium{

        &-tournois_liste{

            &-item{
                margin: $m-big 0;
            }
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
// import d'axios et des donées des tournois
import axios from "axios";

const env = useRuntimeConfig();
const TOURNOIS_TOUS = ref([]);

const GET_TOURNOIS_TOUS = axios.create({
//   baseURL: env.public.challongeApiUrl + `/liste_tournois`,
baseURL: env.public.challongeApiUrl + `/liste_tournois`,
});

const fetchTournoisTous = async () => {
try {
  const response = await GET_TOURNOIS_TOUS.get();
  TOURNOIS_TOUS.value = response.data;
  // console.log("DATA : ", TOURNOIS_TERMINES.value)
} catch (error) {
  console.error(
    "Une erreur s'est produite lors de la récupération de la liste de tous les tournois.",
    error
  );
}
};

// Montage de la Vue -----------------------------------------------------------------
onMounted(() => {
fetchTournoisTous();
});
</script>