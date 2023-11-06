<template>
  <main>
    <h1>MON TOURNOIS : {{ TOURNOIS.name }}</h1>

    <ul>
      <li><RouterLink to="/">Retour accueil</RouterLink></li>
      <li><RouterLink to="/tournois">Retour liste des tournois</RouterLink></li>
    </ul>

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
        <li>nombre de participants : {{ TOURNOIS.participants_count }}</li>
        <li>par équipe : {{ TOURNOIS.teams }}</li>
      </ul>

      <ul>
      <li><RouterLink :to="`/tournois/${TOURNOIS.url}/participants`">Voir les participants de ce tournois</RouterLink></li>
      <li><RouterLink :to="`/tournois/${TOURNOIS.url}/participants/inscription`">S'inscrire à ce tournois</RouterLink></li>
    </ul>

    <iframe :src="`https://challonge.com/fr/${TOURNOIS.url}/module`" width="100%" height="500" frameborder="0" scrolling="auto" allowtransparency="true"></iframe>
  </main>
</template>

<script setup>
import axios from "axios";

const env = useRuntimeConfig();

const route = useRoute();

const tournois_url = route.params.id;

const TOURNOIS = ref([]);

const GET_TOURNOIS = axios.create({
  baseURL: env.public.challongeApiUrl + `/mon_tournois/${tournois_url}`,
});

const fetchTournois = async () => {
  try {
    const response = await GET_TOURNOIS.get();
    TOURNOIS.value = response.data.tournament;
    console.log("DATA : ", TOURNOIS.value);
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération du tournoi en front :",
      error
    );
  }
};

onMounted(fetchTournois);
</script>
