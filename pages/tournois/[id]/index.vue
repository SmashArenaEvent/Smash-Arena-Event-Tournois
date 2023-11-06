<template>
  <main>
    <h1>MON TOURNOIS : {{ TOURNOIS.tournament.name }}</h1>

    <ul>
      <li><RouterLink to="/">Retour accueil</RouterLink></li>
      <li><RouterLink to="/tournois">Retour liste des tournois</RouterLink></li>
    </ul>

      <ul>
        <li>nom : {{ TOURNOIS.tournament.name }}</li>
        <li>description : {{ TOURNOIS.tournament.description_source }}</li>
        <li>jeu : {{ TOURNOIS.tournament.game_name }}</li>
        <li>type : {{ TOURNOIS.tournament.tournament_type }}</li>
        <li>date de début : {{ TOURNOIS.tournament.started_at }}</li>
        <li>date de fin : {{ TOURNOIS.tournament.completed_at }}</li>
        <li>statut : {{ TOURNOIS.tournament.state }}</li>
        <li>inscription possible : {{ TOURNOIS.tournament.open_signup }}</li>
        <li>type d'inscription : {{ TOURNOIS.tournament.registration_type }}</li>
        <li>nombre de participants : {{ TOURNOIS.tournament.participants_count }}</li>
        <li>par équipe : {{ TOURNOIS.tournament.teams }}</li>
      </ul>

      <ul>
      <li><RouterLink :to="`/tournois/${TOURNOIS.tournament.url}/participants`">Voir les participants de ce tournois</RouterLink></li>
      <li v-if="TOURNOIS.tournament.state == 'pending'"><RouterLink :to="`/tournois/${TOURNOIS.tournament.url}/participants/inscription`">S'inscrire à ce tournois</RouterLink></li>
    </ul>

    <iframe :src="`https://challonge.com/fr/${TOURNOIS.tournament.url}/module`" width="100%" height="500" frameborder="0" scrolling="auto" allowtransparency="true"></iframe>
  </main>
</template>

<script setup>
const env = useRuntimeConfig();

const route = useRoute();

const tournois_url = route.params.id;

const {data: TOURNOIS} = await useAsyncData("tournois", async () => {
  return $fetch(env.public.challongeApiUrl + `/mon_tournois/${tournois_url}`)
})
</script>
