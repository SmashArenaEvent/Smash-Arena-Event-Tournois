<template>
  <main>
    <h1>INSCRIPTION</h1>

    <ul>
      <li><a href="/">Retour accueil</a></li>
      <li><a href="/tournois">Retour liste des tournois</a></li>
      <li>
        <a :href="`/tournois/${tournois_url}`">
          Retour à la fiche du tournois
        </a>
      </li>
    </ul>

    <form @submit.prevent="function_inscription" method="post">
      <input type="text" id="joueur_name" v-model="joueur_name" placeholder="Nom et Prénom" required/>
      <input type="text" id="joueur_email" v-model="joueur_email" placeholder="Email" required/>
      <input type="text" id="joueur_email_extend" v-model="joueur_email_extend" disabled required/>
      <input type="checkbox" id="joueur_check" v-model="joueur_check" required/><p>J'accepte les conditions d'utilisation de mes données</p>
      <input type="submit" name="inscription" id="inscription" value="Je m'inscris"/>
    </form>

    <p>{{ message_inscription }}</p>

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
const joueur_email_extend = "@edu.univ-fcomte.fr";
const joueur_check = ref(null);
const message_inscription = ref(null);

const GET_NEW_PROFIL = axios.create({
  baseURL: env.public.challongeApiUrl,
});

const function_inscription = async () => {
  const donneesFormulaire = {
    tournois_url: tournois_url.toString(),
    joueur_name: joueur_name.value.toString(),
    joueur_email: joueur_email.value.toString() + joueur_email_extend,
    joueur_check: joueur_check.value
  };
  // console.log(donneesFormulaire)

  // vérifie que le joueur à bien accepeter les conditions d'utilisation
  if (joueur_check){

    // essaye d'envoyer les données à l'API
    try {
      const response = await GET_NEW_PROFIL.post(
        "/inscription",
        donneesFormulaire
      );
      // console.log(response)
      if (response.data == "mauvais email"){
        message_inscription.value = "Vous devez vous inscrire avec votre mail universitaire Pour participer au tournois. Exemple : prenom.nom@edu.univ-fcomte.fr"
      } else {
        const router = useRouter();
        router.push(`/tournois/${tournois_url}`);  
      }
      
    } catch (error) {
      message_inscription.value = "Une erreur s'est produite lors de l'inscription."
      console.error("Une erreur s'est produite lors de l'inscription :", error);
    }

  } else {
    message_inscription.value = "Vous devez cocher cette case pour vous inscrire."
  }
};
</script>
