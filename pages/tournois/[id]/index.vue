<template>
  <main>
    <h1>MON TOURNOIS : {{ TOURNOIS.name }}</h1>

    <ul>
      <li><a href="/">Retour accueil</a></li>
      <li><a href="/tournois">Retour liste des tournois</a></li>
    </ul>

    <iframe
      v-if="TOURNOIS.state === 'underway'"
      :src="`https://challonge.com/fr/${tournois_url}/module`"
      width="100%"
      height="500"
      frameborder="0"
      scrolling="auto"
      allowtransparency="true"
    ></iframe>

    <ul>
      <li>nom : {{ TOURNOIS.name }}</li>
      <li>description : {{ TOURNOIS.description_source }}</li>
      <li>jeu : {{ TOURNOIS.game_name }}</li>
      <li>type : {{ TOURNOIS.tournament_type }}</li>
      <li>date de début : {{ TOURNOIS.started_at }}</li>
      <li>date de fin : {{ TOURNOIS.completed_at }}</li>
      <li>statut : {{ TOURNOIS.state }}</li>
      <li>inscription possible : {{ TOURNOIS.open_signup }}</li>
      <li>type d'inscription : {{ TOURNOIS.registration_type }}</li>
      <li>par équipe : {{ TOURNOIS.teams }}</li>
    </ul>

    <ul>
      <li v-if="TOURNOIS.state == 'pending'">
        <a :href="`/tournois/${TOURNOIS.url}/inscription`">
          S'inscrire à ce tournois
        </a>
      </li>
    </ul>

    <iframe
      v-if="TOURNOIS.state !== 'underway'"
      :src="`https://challonge.com/fr/${tournois_url}/module`"
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
const tournois_url = route.params.id;
const TOURNOIS = ref([]);

const GET_TOURNOI = axios.create({
  baseURL: env.public.challongeApiUrl + `/mon_tournois/${tournois_url}`,
});

const fetchTournoi = async () => {
  try {
    const response = await GET_TOURNOI.get();
    TOURNOIS.value = response.data.tournament;
    // console.log("DATA : ", TOURNOIS.value)
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération du tournoi en front :",
      error
    );
  }
};

onMounted(fetchTournoi);
</script>
