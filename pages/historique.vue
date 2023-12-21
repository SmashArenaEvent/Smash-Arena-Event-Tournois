<template>
    <main class="my_section historique">
        <h1 class="historique-titre">Historique</h1>

        <p class="historique-texte">Voici l'ensemble des précédents tournois que Smash Arena Event a organisé.</p>

        <ul class="historique-tournois_liste" v-if="TOURNOIS_TERMINES.length >= 0">
            <li class="historique-tournois_liste-item" v-for="tournoi in TOURNOIS_TERMINES" :key="tournoi.id">
                <cardTournoi v-bind="tournoi.tournament"/>
            </li>
        </ul>

            <!-- card à afficher lorsqu'il n'y a ni tournois en cours ni prévus -->
        <div class="my_section main-tournois" v-if="TOURNOIS_TERMINES.length == 0">     
            <cardTournoi/>
        </div>
    </main>
</template>

<style lang="scss">
.historique{

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
}
</style>

<script setup>
// import d'axios et des donées des tournois
import axios from "axios";

const env = useRuntimeConfig();
const TOURNOIS_TERMINES = ref([]);

const GET_TOURNOIS_TERMINES = axios.create({
//   baseURL: env.public.challongeApiUrl + `/liste_tournois`,
  baseURL: env.public.challongeApiUrl + `/liste_tournois_complet`,
});

const fetchTournoisTermines = async () => {
  try {
    const response = await GET_TOURNOIS_TERMINES.get();
    TOURNOIS_TERMINES.value = response.data;
    // console.log("DATA : ", TOURNOIS_TERMINES.value)
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération de la liste des tournois terminés.",
      error
    );
  }
};

// Montage de la Vue -----------------------------------------------------------------
onMounted(() => {
  fetchTournoisTermines();
});

</script>