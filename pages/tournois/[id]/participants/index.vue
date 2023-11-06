<template>
  <main>
    <h1>LES PARTICIPANTS</h1>
<ul>
  <li><RouterLink to="/">Retour accueil</RouterLink></li>
  <li><RouterLink to="/tournois">Retour liste tournois</RouterLink></li>
  <li><RouterLink :to="`/tournois/${TOURNOIS.url}`">Retour à la fiche du tournois {{TOURNOIS.name}}</RouterLink></li>
</ul>

    <ul v-for="p in PARTICIPANTS" :key="p.participant.id">
      <li>
        <RouterLink :to="`/tournois/${TOURNOIS.url}/participants/${p.participant.id}`">
          Nom du joueur : {{ p.participant.name }}
        </RouterLink>
      </li>
    </ul>
  </main>
</template>

<script setup>
import axios from "axios";

const env = useRuntimeConfig();

const route = useRoute();

const tournois_url = route.params.id;

const PARTICIPANTS = ref([]);

const GET_PARTICIPANT = axios.create({
  baseURL: env.public.challongeApiUrl + `/les_participants/${tournois_url}`,
});

const fetchParticipants = async () => {
  try {
    const response = await GET_PARTICIPANT.get();
    PARTICIPANTS.value = response.data;
    console.log("Les participants :", PARTICIPANTS.value);
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des participants :",
      error
    );
  }
};

onMounted(fetchParticipants);

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
