<template>
  <main class="main">
    <h1 class="my_section main-h1"><span class="bleu">S</span>mash <span class="bleu">A</span>rena <span class="bleu">E</span>vent
        <br><span class="bleu">T</span>ournois
    </h1>

    <!-- liste des tournois en cours -->
    <section class="my_section main-tournois" v-if="TOURNOIS_ENCOURS.length > 0">
      <h2 class="hero-h2"><span class="bleu">En</span> cours</h2>
      
      <ul class="main-tournois_liste">
        <li class="main-tournois_liste-item" v-for="tournoi in TOURNOIS_ENCOURS" :key="tournoi.id">
          <cardTournoi v-bind="tournoi.tournament"/>
        </li>
      </ul>
    </section>

    <!-- liste des tournois prévus -->
    <section class="my_section main-tournois" v-if="TOURNOIS_PROCHAIN.length > 0">
      <h2 class="hero-h2">Prochainement</h2>
      
      <ul class="main-tournois_liste">
        <li class="main-tournois_liste-item" v-for="tournoi in TOURNOIS_PROCHAIN" :key="tournoi.id">
          <cardTournoi v-bind="tournoi.tournament"/>
        </li>
      </ul>
    </section>

    <!-- card à afficher lorsqu'il n'y a ni tournois en cours ni prévus -->
    <div class="my_section main-tournois" v-if="TOURNOIS_ENCOURS.length == 0 && TOURNOIS_PROCHAIN.length == 0">     
      <cardTournoi/>
    </div>

    <aPropos/>

  </main>
</template>

<style lang="scss">
.main{
  &-tournois{
    &_liste{
      &-item{
        margin-bottom: $m-medium;

        @include medium{
          margin-bottom: $m-big;
        }
      }
    }
  }
}
</style>

<script setup>
// import de Prismic
const { client } = usePrismic();
const { data: home, error } = await useAsyncData("home", () =>
  client.getSingle("homepage")
)

if (!home.value || error.value){
  throw createError({statusCode: 404, statusMessage: "La page d'accueil est introuvable"})
}

// import d'axios et des donées des tournois
import axios from "axios";

const env = useRuntimeConfig();
const TOURNOIS_PROCHAIN = ref([]);
const TOURNOIS_ENCOURS = ref([]);

const GET_TOURNOIS_PROCHAIN = axios.create({
  baseURL: env.public.challongeApiUrl + `/liste_tournois_pending`,
});

const GET_TOURNOIS_ENCOURS = axios.create({
  baseURL: env.public.challongeApiUrl + `/liste_tournois_underway`,
});

const fetchTournoisProchain = async () => {
  try {
    const response = await GET_TOURNOIS_PROCHAIN.get();
    TOURNOIS_PROCHAIN.value = response.data;
    // console.log("DATA : ", TOURNOIS_PROCHAIN.value)
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération de la liste des prochains tournois.",
      error
    );
  }
};

const fetchTournoisEncours = async () => {
  try {
    const response = await GET_TOURNOIS_ENCOURS.get();
    TOURNOIS_ENCOURS.value = response.data;
    // console.log("DATA : ", TOURNOIS_ENCOURS.value)
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération de la liste des tournois en cours.",
      error
    );
  }
};

// Montage de la Vue -----------------------------------------------------------------
onMounted(() => {
  fetchTournoisProchain();
  fetchTournoisEncours();
});

</script>
