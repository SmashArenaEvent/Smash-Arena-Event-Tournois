<template>
  <main>
    <h1>LISTE DES TOURNOIS</h1>

    <RouterLink to="/">Retour accueil</RouterLink>

    <div class="card__tournois">
      <ul v-for="t in LISTE_TOURNOIS" :key="t.id">
        <li>nom : {{ t.tournament.name }}</li>
        <li>description : {{ t.tournament.description_source }}</li>
        <li>jeu : {{ t.tournament.game_name }}</li>
        <li>type : {{ t.tournament.tournament_type }}</li>
        <li>date de début : {{ t.tournament.started_at }}</li>
        <li>statut : {{ t.tournament.state }}</li>
        <RouterLink :to="`/tournois/${t.tournament.url}`"
          >Voir la fiche de ce tournois</RouterLink
        >
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
const env = useRuntimeConfig();

const {data: LISTE_TOURNOIS} = await useAsyncData("liste_tournois", async () => {
  return $fetch(env.public.challongeApiUrl + "/liste_tournois")
})
</script>
