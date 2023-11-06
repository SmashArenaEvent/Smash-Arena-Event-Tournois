<template>
  <main>
    <h1>LE PARTICIPANT {{ PROFIL.name }}</h1>

    <ul>
      <li><RouterLink to="/">Retour accueil</RouterLink></li>
      <li><RouterLink to="/tournois">Retour liste des tournois</RouterLink></li>
      <li>
        <RouterLink :to="`/tournois/${TOURNOIS.url}`">
          Retour à la fiche du tournois {{ TOURNOIS.name }}
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="`/tournois/${TOURNOIS.url}/participants`">
          Retour à la liste des participants du tournois {{ TOURNOIS.name }}
        </RouterLink>
      </li>
    </ul>

    <p>Nom : {{ PROFIL.name }}</p>
    <p>Numéro d'inscriptionn : {{ PROFIL.ordinal_seed }}</p>
    <p>Date de création : {{ PROFIL.created_at }}</p>
    <p>Déscription : {{ PROFIL.misc }}</p>

    <RouterLink :to="`/tournois/${TOURNOIS.url}/participants/${PROFIL.id}/modif`">
      Modifier
    </RouterLink>
  </main>
</template>

<script setup>
import axios from "axios";

const env = useRuntimeConfig();

const route = useRoute();

// Découpez l'URL en un tableau
const urlParts = computed(() => route.fullPath.split("/"));

// Récupérez les valeurs appropriées du tableau
const tournois_url = ref(urlParts.value[2]);
const participant_id = ref(urlParts.value[4]);
// console.log(tournois_url.value, participant_id.value);

const PROFIL = ref([]);

const GET_Profil = axios.create({
  baseURL:
    env.public.challongeApiUrl +
    `/tournois/${tournois_url.value}/participants/${participant_id.value}`,
});

const fetchProfil = async () => {
  try {
    const response = await GET_Profil.get();
    PROFIL.value = response.data.participant;
    console.log(PROFIL.value);
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération du profil en front :",
      error
    );
  }
};

onMounted(fetchProfil);

const TOURNOIS = ref([]);

const GET_TOURNOIS = axios.create({
  baseURL: env.public.challongeApiUrl + `/mon_tournois/${tournois_url.value}`,
});

const fetchTournois = async () => {
  try {
    const response = await GET_TOURNOIS.get();
    TOURNOIS.value = response.data.tournament;
    // console.log("DATA : ", TOURNOIS.value);
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération du tournoi en front :",
      error
    );
  }
};

onMounted(fetchTournois);
</script>
