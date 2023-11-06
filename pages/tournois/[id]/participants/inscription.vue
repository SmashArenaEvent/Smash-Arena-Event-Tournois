<template>
  <main>
    <h1>INSCRIPTION</h1>

    <ul>
      <li><RouterLink to="/">Retour accueil</RouterLink></li>
      <li><RouterLink to="/tournois">Retour liste des tournois</RouterLink></li>
      <li>
        <RouterLink :to="`/tournois/${tournois_url}`">
          Retour à la fiche du tournois
        </RouterLink>
      </li>
    </ul>

    <form @submit.prevent="function_inscription" method="post">
      <input
        type="text"
        id="joueur_name"
        name="joueur_name"
        v-model="joueur_name"
        placeholder="Nom et Prénom"
        required
      />
      <input
        type="email"
        id="joueur_email"
        name="joueur_email"
        v-model="joueur_email"
        placeholder="Email"
        required
      />
      <textarea
        id="joueur_misc"
        name="joueur_misc"
        v-model="joueur_misc"
        placeholder="Description, écrivez votre filière et vos mains"
        cols="30"
        rows="10"
      ></textarea>
      <input
        type="submit"
        name="inscription"
        id="inscription"
        value="Je m'inscris"
      />
    </form>

  </main>
</template>

<style lang="scss" scoped></style>

<script setup>
import axios from "axios";

const env = useRuntimeConfig();

const route = useRoute();
const tournois_url = route.params.id;

const joueur_name = ref(null);
const joueur_email = ref(null);
const joueur_misc = ref(null);

const NEW_PROFIL = ref([]);

const GET_NEW_PROFIL = axios.create({
  baseURL: env.public.challongeApiUrl,
});

const function_inscription = async () => {
  const donneesFormulaire = {
    tournois_url: tournois_url.toString(),
    joueur_name: joueur_name.value.toString(),
    joueur_email: joueur_email.value.toString(),
    joueur_misc: joueur_misc.value.toString(),
  };
  // console.log(donneesFormulaire)
  try {
    const response = await GET_NEW_PROFIL.post(
      "/inscription",
      donneesFormulaire
    );
    NEW_PROFIL.value = response.data;
    console.log(NEW_PROFIL);
  } catch (error) {
    console.log(donneesFormulaire);
    console.error("Une erreur s'est produite lors de l'inscription :", error);
  }
};
</script>
