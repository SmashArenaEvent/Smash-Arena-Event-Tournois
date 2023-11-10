<template>
  <main>
    <h1>MON TOURNOIS : {{ TOURNOIS.tournament.name }}</h1>

    <ul>
      <li><a href="/">Retour accueil</a></li>
      <li><a href="/tournois">Retour liste des tournois</a></li>
    </ul>

    <iframe v-if="TOURNOIS.tournament.state === 'underway'"
      :src="`https://challonge.com/fr/${tournois_url}/module`"
      width="100%"
      height="500"
      frameborder="0"
      scrolling="auto"
      allowtransparency="true"
    ></iframe>

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
      <li>par équipe : {{ TOURNOIS.tournament.teams }}</li>
    </ul>

    <ul>
      <li v-if="TOURNOIS.tournament.state == 'pending'">
        <a :href="`/tournois/${TOURNOIS.tournament.url}/inscription`">
          S'inscrire à ce tournois
        </a>
      </li>
    </ul>

    <iframe v-if="TOURNOIS.tournament.state !== 'underway'"
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
const env = useRuntimeConfig();

const route = useRoute();

const tournois_url = route.params.id;

const { data: TOURNOIS } = await useAsyncData("tournois", async () => {
  return $fetch(env.public.challongeApiUrl + `/mon_tournois/${tournois_url}`);
});

console.log(TOURNOIS)
</script>
