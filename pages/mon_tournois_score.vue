<template>
  <main>
    <h1>LES RESULTATS</h1>

    <RouterLink to="/">Retour accueil</RouterLink>

    <ul>
      <li v-for="scrore in SCORES" :key="scrore.id">
        <p>nom : {{ scrore.name }}</p>
      </li>
    </ul>

  </main>
</template>

<script setup>
import axios from "axios";

const SCORES = ref([]);

const GET_SCRORE = axios.create({
  baseURL: "http://localhost:5000/mon_tournois_score_challonge",
});

const fetchScore = async () => {
  try {
    const response = await GET_SCRORE.get();
    SCORES.value = response.data;
    console.log("Les scrores :", SCORES.value);
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des scores en front :",
      error
    );
  }
};

onMounted(fetchScore);
</script>
