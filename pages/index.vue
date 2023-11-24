<template>
  <main>

    <myHero/>

  </main>
</template>

<style lang="scss">

</style>

<!-- <script setup>

import axios from "axios";

const env = useRuntimeConfig();
const TOURNOIS_PROCHAIN = ref([]);
const TOURNOIS_ENCOURS = ref([]);

const GET_TOURNOIS_PROCHAIN = axios.create({
  baseURL: env.public.challongeApiUrl + `/liste_tournois_pending`,
});

const GET_TOURNOIS_ENCOURS = axios.create({
  baseURL: env.public.challongeApiUrl + `/liste_tournois_underway`,
});

const fetchTournoisProchain = async () => {
  try {
    const response = await GET_TOURNOIS_PROCHAIN.get();
    TOURNOIS_PROCHAIN.value = response.data;
    // console.log("DATA : ", TOURNOIS_PROCHAIN.value)
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération de la liste des prochains tournois.",
      error
    );
  }
};

const fetchTournoisEncours = async () => {
  try {
    const response = await GET_TOURNOIS_ENCOURS.get();
    TOURNOIS_ENCOURS.value = response.data;
    // console.log("DATA : ", TOURNOIS_ENCOURS.value)
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération de la liste des tournois en cours.",
      error
    );
  }
};

// Montage de la Vue -----------------------------------------------------------------
onMounted(() => {
  fetchTournoisProchain();
  fetchTournoisEncours();
});

</script> -->
