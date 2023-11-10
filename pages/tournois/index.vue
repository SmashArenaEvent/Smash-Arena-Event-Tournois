<template>
  <main>
    <h1>LISTE DE TOUS LES TOURNOIS</h1>

    <a href="/">Retour accueil</a>

    <div class="card__tournois">
      <ul v-for="t in TOURNOIS" :key="t.id">
        <li>nom : {{ t.tournament.name }}</li>
        <li>description : {{ t.tournament.description_source }}</li>
        <li>jeu : {{ t.tournament.game_name }}</li>
        <li>type : {{ t.tournament.tournament_type }}</li>
        <li>date de début : {{ t.tournament.started_at }}</li>
        <li>statut : {{ t.tournament.state }}</li>
        <a :href="`/tournois/${t.tournament.url}`">
          Voir la fiche de ce tournois
        </a>
      </ul>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.card__tournois {
  display: flex;
  flex-direction: column-reverse;

  ul {
    margin: 10px;
    padding: 20px 40px;
    border: gray 2px solid;
  }
}
</style>

<script setup>
import axios from "axios";

const env = useRuntimeConfig();
const TOURNOIS = ref([]);

const GET_TOURNOIS = axios.create({
  baseURL: env.public.challongeApiUrl + "/liste_tournois",
});

const fetchTournois = async () => {
  try {
    const response = await GET_TOURNOIS.get();
    TOURNOIS.value = response.data;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération de la liste des tournois.",
      error
    );
  }
};

onMounted(fetchTournois);
</script>
