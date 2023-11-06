<template>
  <main>
    <h1>LES PARTICIPANTS</h1>
<ul>
  <li><RouterLink to="/">Retour accueil</RouterLink></li>
  <li><RouterLink to="/tournois">Retour liste tournois</RouterLink></li>
  <li><RouterLink :to="`/tournois/${TOURNOIS.tournament.url}`">Retour à la fiche du tournois {{TOURNOIS.tournament.name}}</RouterLink></li>
</ul>

    <ul v-for="p in LISTE_PARTICIPANTS" :key="p.participant.id">
      <li>
        <RouterLink :to="`/tournois/${TOURNOIS.tournament.url}/participants/${p.participant.id}`">
          Nom du joueur : {{ p.participant.name }}
        </RouterLink>
      </li>
    </ul>
  </main>
</template>

<script setup>
const env = useRuntimeConfig();

const route = useRoute();

const tournois_url = route.params.id;

const {data: LISTE_PARTICIPANTS} = await useAsyncData("liste_apticipants", async () => {
  return $fetch(env.public.challongeApiUrl + `/les_participants/${tournois_url}`)
})

const {data: TOURNOIS} = await useAsyncData("tournois", async () => {
  return $fetch(env.public.challongeApiUrl + `/mon_tournois/${tournois_url}`)
})
</script>
