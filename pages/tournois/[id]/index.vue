<template>
  <main>
    <h1>MON TOURNOI : {{ TOURNOI.name }}</h1>

    <ul>
      <li><a href="/">Retour accueil</a></li>
      <li><a href="/tournois">Retour liste des tournois</a></li>
    </ul>

    <iframe
      v-if="TOURNOI.state === 'underway'"
      :src="`https://challonge.com/fr/${tournoi_url}/module`"
      width="100%"
      height="500"
      frameborder="0"
      scrolling="auto"
      allowtransparency="true"
    ></iframe>

    <ul>
      <li>nom : {{ TOURNOI.name }}</li>
      <li>description : {{ TOURNOI.description_source }}</li>
      <li>jeu : {{ TOURNOI.game_name }}</li>
      <li>type : {{ TOURNOI.tournament_type }}</li>
      <li>date de début : {{ TOURNOI.started_at }}</li>
      <li>date de fin : {{ TOURNOI.completed_at }}</li>
      <li>statut : {{ TOURNOI.state }}</li>
      <li>inscription possible : {{ TOURNOI.open_signup }}</li>
      <li>type d'inscription : {{ TOURNOI.registration_type }}</li>
      <li>par équipe : {{ TOURNOI.teams }}</li>
      <li>nombre de joueurs : {{ TOURNOI.participants_count }}</li>
    </ul>

    <a :href="`/tournois/${TOURNOI.url}/inscription`" v-if="TOURNOI.state == 'pending'">
      S'inscrire à ce tournois
    </a>

    <iframe
      v-if="TOURNOI.state !== 'underway'"
      :src="`https://challonge.com/fr/${tournoi_url}/module`"
      width="100%"
      height="500"
      frameborder="0"
      scrolling="auto"
      allowtransparency="true"
    ></iframe>
  </main>
</template>

<script setup>
import axios from "axios";

const env = useRuntimeConfig();
const route = useRoute();
const tournoi_url = route.params.id;
const TOURNOI = ref([]);

const GET_TOURNOI = axios.create({
  baseURL: env.public.challongeApiUrl + `/mon_tournois/${tournoi_url}`,
});

const fetchTournoi = async () => {
  try {
    const response = await GET_TOURNOI.get();
    TOURNOI.value = response.data.tournament;
    // console.log("DATA : ", TOURNOI.value)
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération du tournoi en front :",
      error
    );
  }
};

onMounted(fetchTournoi);
</script>
