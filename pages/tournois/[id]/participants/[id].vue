<template>
  <main>
    <h1>LE PARTICIPANT {{ PARTICIPANT.participant.name }}</h1>

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

    <p>Nom : {{ PARTICIPANT.participant.name }}</p>
    <p>Numéro d'inscriptionn : {{ PARTICIPANT.participant.ordinal_seed }}</p>
    <p>Date de création : {{ PARTICIPANT.participant.created_at }}</p>
    <p>Déscription : {{ PARTICIPANT.participant.misc }}</p>

  </main>
</template>

<script setup>
const env = useRuntimeConfig();

const route = useRoute();

// Découpez l'URL en un tableau
const urlParts = computed(() => route.fullPath.split("/"));

// Récupérez les valeurs appropriées du tableau
const tournois_url = ref(urlParts.value[2]);
const participant_id = ref(urlParts.value[4]);
// console.log(tournois_url.value, participant_id.value);

const {data: PARTICIPANT} = await useAsyncData("paticipant", async () => {
  return $fetch(env.public.challongeApiUrl + `/tournois/${tournois_url.value}/participants/${participant_id.value}`)
})

const {data: TOURNOIS} = await useAsyncData("tournois", async () => {
  return $fetch(env.public.challongeApiUrl + `/mon_tournois/${tournois_url.value}`)
})
</script>
