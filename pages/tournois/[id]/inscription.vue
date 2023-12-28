<template>
  <main class="my_section">
    <h1><span class="bleu">{{ TOURNOI.name }}</span> - Inscription</h1>

    <div class="inscription">
      <div class="inscription-formulaire">
        <form @submit.prevent="function_inscription" method="post" class="inscription-formulaire_form">
          <input class="inscription-formulaire_form-text texte-nom" type="text" id="joueur_name" v-model="joueur_name" placeholder="Prénom et Nom" required/>

          <input class="inscription-formulaire_form-text texte-mail" type="text" id="joueur_email" v-model="joueur_email" placeholder="Email (exemple : prenom.nom@edu.univ-fcomte.fr)" required/>

          <div class="inscription-formulaire_form-check">
            <input type="checkbox" id="joueur_check" v-model="joueur_check" required/>
            <label for="joueur_check">En m'inscrivant à ce tournois, je m'engage à être présent durant l'événement, à respecter <RouterLink to="/regles">les règles</RouterLink> et partager les données suivante (mon prénom, nom et adresse mail universitaire) à Smash Arena Event pour la bonne organisation du tournoi.</label>
          </div>

          <input class="bouton_envoye" type="submit" name="inscription" id="inscription" value="Je m'inscris"/>
        </form>
    
        <p class="inscription-formulaire_message" v-if="message_inscription">{{ message_inscription }}</p>
      </div>

      <div class="inscription-tournoi_infos">
        <div class="inscription-tournoi_infos-date">
          <p class="inscription-tournoi_infos-date_heure">{{ TOURNOI_date.heure }}</p>
          <p class="inscription-tournoi_infos-date_jour">{{ TOURNOI_date.jour }}</p>
        </div>
  
        <p class="inscription-tournoi_infos-lieu">Batiment EX CDDP, Campus Universitaire de Montbéliard</p>
      </div>
    </div>

  </main>
</template>

<style lang="scss">
.inscription{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: $m-medium;

  &-formulaire{
    flex: 1 1 400px;
    max-width: 600px;

    &_form{

      &-text{
        width: 100%;
        margin: 15px auto;
        padding: 5px;
        border: transparent;
        border-bottom: 2px solid $color-white;
        background: none;
        color: $color-white;
        
        &:focus{
          outline: 2px solid $color-main;
        }
      }
  
      &-check{
        margin: 15px auto;
  
        input[type="checkbox"]{
          width: 20px;
          height: 20px;
          accent-color: $color-main
        }

        label{
          margin: 5px;
        }
      }

      .bouton_envoye{
        @include bouton_big;
        display: block;
        margin: auto;
        margin-top: $m-litle;
        padding: $m-litle $m-small+15;
        min-width: 150px;
        width: fit-content;
        height: fit-content;
        text-align: center;
        border: none;
        background: $color-main;
        color: $color_white;
        transition: all 0.1s linear;
        cursor: pointer;

        &:hover{
          background: $color-main_darken;
        }
    
        @include medium{
          padding: $m-litle $m-litle+15;
        }     
      }
    }

    &_message{
      max-width: 100%;
      width: fit-content;
      margin: $m-litle auto;
      padding: $m-small;
      border: 4px solid #dd3030;
      display: flex;
      align-items: center;
      gap: $m-small;

      &::before{
        @include h2;
        content: "!";
        color: #dd3030;
      }
    }
  }
  
  &-tournoi_infos{
    flex: 1 0 300px;
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: $m-litle;
    
    &-date{
      display: flex;
      align-items: center;
      gap: 10px;

      &_heure{
        font-size: $mobile-font_semibig;
        color: $color-main;
      }
  
      &_jour{
        font-size: $mobile-font_big;
        font-weight: $font-weight-bold;
      }
    }
    
    &-lieu{
      text-align: right;
      font-size: $mobile-font_big;
      font-weight: $font-weight-bold;
    }
  }

  @include medium{

    &-formulaire{
      &_form{
        .texte-nom{
          margin: 0;
        }

        .texte-mail{
          margin-top: $m-medium;
        }

        &-check{
          margin: $m-litle 0;
        }
        

      }
    }

    &-tournoi_infos{
      &-date{
        gap: $m-small;

        &_heure{
          font-size: $pc-font_semibig;
        }

        &_jour{
          font-size: $pc-font_big;
        }
      }
      &-lieu{
        font-size: $pc-font_big;
      }
    }
  }
}
</style>

<script setup>
import axios from "axios";

const env = useRuntimeConfig();

const route = useRoute();
const tournoi_url = route.params.id;

const joueur_name = ref(null);
const joueur_email = ref(null);
const joueur_check = ref(null);
const message_inscription = ref(null);

const GET_NEW_PROFIL = axios.create({
  baseURL: env.public.challongeApiUrl,
});

const function_inscription = async () => {
  const donneesFormulaire = {
    tournoi_url: tournoi_url.toString(),
    joueur_name: joueur_name.value.toString(),
    joueur_email: joueur_email.value.toString(),
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
        router.push(`/tournois/${tournoi_url}`);  
      }
      
    } catch (error) {
      message_inscription.value = "Une erreur s'est produite lors de l'inscription."
      console.error("Une erreur s'est produite lors de l'inscription :", error);
    }

  } else {
    message_inscription.value = "Vous devez cocher cette case pour vous inscrire."
  }
};

const TOURNOI = ref([]);
const TOURNOI_date = ref("")

const GET_TOURNOI = axios.create({
  baseURL: env.public.challongeApiUrl + `/mon_tournois/${tournoi_url}`,
});

const fetchTournoi = async () => {
  try {
    const response = await GET_TOURNOI.get();
    TOURNOI.value = response.data.tournament;
    // console.log("DATA : ", TOURNOI.value.start_at)

    // pour traduire en FR la statut du tournoi
    if (TOURNOI.value.state == "pending"){
      TOURNOI.value.state = "prochainement"
    } else if (TOURNOI.value.state == "underway"){
      TOURNOI.value.state = "en cours"
    } else (
      TOURNOI.value.state = "terminé"
    )

    // pour récupéré l'heure et le jour du tounoi
    TOURNOI_date.value = formaterDate(TOURNOI.value.start_at);

  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération du tournoi en front :",
      error
    );
  }
};

function formaterDate(dateString) {
  const date = new Date(dateString);

  // Formater l'heure (HH:MM)
  const heure = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;

  // Formater la date (jour mois année)
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const dateFormatee = date.toLocaleDateString('fr-FR', options);

  return { heure, jour: dateFormatee };
}

onMounted(fetchTournoi);
</script>
