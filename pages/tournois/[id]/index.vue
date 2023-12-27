<template>
  <main class="my_section tournoi">
    <div class="tournoi_entete">
      <h1 class="tournoi_entete-titre">{{ TOURNOI.name }}</h1>
  
      <div class="tournoi_entete-inscription" v-if="TOURNOI.state == 'prochainement'">
        <myButton class="tournoi_entete-inscription_bouton"
          :url="`/tournois/${TOURNOI.url}/inscription`" color="blue" size="big">
          Je Participe
        </myButton>
  
        <p class="tournoi_entete-inscription_texte"><span class="bleu">Dépéchez-vous !</span> Une fois le tournoi commencé, vous ne pourrez plus vous inscrire.</p>
      </div>
    </div>

    <div class="tournoi_match-encours" v-if="TOURNOI.state === 'en cours'">
      <iframe
        :src="`https://challonge.com/fr/${TOURNOI.url}/module`"
        width="100%"
        height="500"
        frameborder="0"
        scrolling="auto"
        allowtransparency="true"
      ></iframe>
    </div>

    <div class="tournoi_informations">
      <h2 class="tournoi_informations-titre" v-if="TOURNOI.state === 'en cours'"><span class="bleu">Les</span> Informations</h2>

      <div class="tournoi_description">
        <ul class="tournoi_description-rapide">
          <li>Type : <span class="tournoi_description-rapide_valeur">{{ TOURNOI.tournament_type }}</span></li>
          <li>Statut : <span class="tournoi_description-rapide_valeur">{{ TOURNOI.state }}</span></li>
          <li>Nombre de participants : <span class="tournoi_description-rapide_valeur">{{ TOURNOI.participants_count }}</span></li>
        </ul>
  
        <p class="tournoi_description-texte">{{ TOURNOI.description }}</p>
      </div>
  
      <div class="tournoi_infos">
        <div class="tournoi_infos-date">
          <p class="tournoi_infos-date_heure">{{ TOURNOI_date.heure }}</p>
          <p class="tournoi_infos-date_jour">{{ TOURNOI_date.jour }}</p>
        </div>
  
        <p class="tournoi_infos-lieu">Batiment EX CDDP, Campus Universitaire de Montbéliard</p>
      </div>
    </div>

    <div class="tournoi_match" v-if="TOURNOI.state !== 'en cours'">
      <h2><span class="bleu">Participants</span> & Matchs</h2>

      <iframe
        :src="`https://challonge.com/fr/${TOURNOI.url}/module`"
        width="100%"
        height="500"
        frameborder="0"
        scrolling="auto"
        allowtransparency="true"
      ></iframe>
    </div>
  </main>
</template>

<style lang="scss">
.tournoi{

  &_entete{
    &-titre{
      &::first-line{
        color: $color-main;
      }
    }

    &-inscription{
      position: fixed;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 0);
      display: block;
      width: 100%;
      padding: $m-small;
      background-color: $color-black;
      text-align: center;

      &_texte{
        margin-top: 20px;
      }
    }
  }

  &_informations{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: $m-medium;

    &-titre{
      width: 100%;
      margin: 0;
      margin-top: $m-big;
    }

    .tournoi_description{
      flex: 1 1 400px;
      max-width: 600px;
  
      &-rapide{
        margin-bottom: $m-litle;
        font-weight: $font-weight-bold;
  
        &_valeur{
          display: inline-block;
          color: $color-main;
          margin: 10px 0;
        }
      }
    }
  
    .tournoi_infos{
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
  }

  &_match{
    margin: $m-big 0;
  }

  @include medium{

    &_entete{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: $m-litle;
      margin-bottom: $m-big;
      
      &-titre{
        margin: 0;
      }

      &-inscription{
        position: relative;
        left: 0;
        transform: translate(0);
        padding: 0;
        margin: auto;
        width: fit-content;

        display: flex;
        flex-wrap: wrap;
        text-align: left;
        align-items: center;
        gap: $m-litle;

        &_texte{
          margin: 0;
          max-width: 250px;
        }
      }
    }

    &_informations{

      .tournoi_infos{

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

    &_match{
      margin: 200px 0 0 0;
    }
  }
}
</style>

<script setup>
import axios from "axios";

const env = useRuntimeConfig();
const route = useRoute();
const tournoi_url = route.params.id;
const TOURNOI = ref([]);

const GET_TOURNOI = axios.create({
  baseURL: env.public.challongeApiUrl + `/mon_tournois/${tournoi_url}`,
});

const TOURNOI_date = ref("")

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
