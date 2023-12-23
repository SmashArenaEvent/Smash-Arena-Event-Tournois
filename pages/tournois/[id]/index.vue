<template>
  <main class="my_section tournoi">
    <h1 class="tournoi_titre">{{ TOURNOI.name }}</h1>

    <iframe
      v-if="TOURNOI.state === 'underway'"
      :src="`https://challonge.com/fr/${TOURNOI.url}/module`"
      width="100%"
      height="500"
      frameborder="0"
      scrolling="auto"
      allowtransparency="true"
    ></iframe>

    <div class="tournoi_informations">
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
  
        <p class="tournoi_infos-lieu">Batiment B, Campus Montbéliard</p>
      </div>
    </div>

    <!--<a :href="`/tournois/${TOURNOI.url}/inscription`" v-if="TOURNOI.state == 'pending'">
      S'inscrire à ce tournois
    </a> -->

    <iframe
      v-if="TOURNOI.state !== 'underway'"
      :src="`https://challonge.com/fr/${TOURNOI.url}/module`"
      width="100%"
      height="500"
      frameborder="0"
      scrolling="auto"
      allowtransparency="true"
    ></iframe>
  </main>
</template>

<style lang="scss">
.tournoi{

  &_titre{
    &::first-line{
      color: $color-main;
    }
  }

  &_informations{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: $m-medium;

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
      flex: 1 0 400px;
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

  @include medium{

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
