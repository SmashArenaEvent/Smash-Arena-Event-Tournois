<template>
  <main class="my_section tournoi">

    <div class="deco_persos">
      <img src="/img/persos_coin.png" alt="">
    </div>

    <div class="tournoi_entete">
      <h1 class="tournoi_entete-titre">{{ TOURNOI.name }}</h1>
  
      <div class="tournoi_entete-inscription" v-if="TOURNOI.state == 'prochainement'">
        <myButton class="tournoi_entete-inscription_bouton"
          :url="`/tournois/${TOURNOI.id}/inscription`" color="blue" size="big">
          Je Participe comme joueur
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
          <li>Nombre de participants : <span class="tournoi_description-rapide_valeur">{{ TOURNOI.participants_count }}</span> / <PrismicText :field="prismic_tournoi.data.nbr_joueur_max" class="tournoi_description-rapide_valeur-max"/></li>
        </ul>
  
        <p class="tournoi_description-texte">{{ TOURNOI.description }}</p>
      </div>
  
      <div class="tournoi_infos">
        <div class="tournoi_infos-date">
          <p class="tournoi_infos-date_heure">{{ TOURNOI_date.heure }}</p>
          <p class="tournoi_infos-date_jour">{{ TOURNOI_date.jour }}</p>
        </div>
  
        <PrismicText :field="prismic_tournoi.data.lieu" class="tournoi_infos-lieu"/>
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

    <section class="tournoi_section" v-if="TOURNOI.state == 'prochainement'">
      <h2><span class="bleu tournoi_section-titre">Tu préfère aider ?</span><br/> Soit bénévole pour la journée !</h2>

      <div class="tournoi_section-bouton">
        <myButton :lien="prismic_tournoi.data.inscription_benevole.url" color="blue" size="big">Je participe comme bénévole</myButton>
      </div>

      <p class="tournoi_section-texte"><span class="bleu">Attention</span> : tu ne peux pas être bénévole ET participer au tournoi comme joueur en même temps. C'est l'un ou l'autre.</p>
    </section>

    <section class="tournoi_section">
      <h2><span class="bleu tournoi_section-titre">Plus d'infos</span> sur l'événement ?</h2>

      <div class="tournoi_section-bouton">
        <myButton :lien="prismic_tournoi.data.site_vitrine.url">Consulter le site de cet événement</myButton>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
.tournoi{
  position: relative;
  overflow: visible;

  &_entete{
    &-titre{
      &::first-line{
        color: $color-main;
      }
    }

    &-inscription{
      z-index: 5;
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

          &-max{
            display: inline;
          }
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

  &_section{
    margin: $m-big 0;

    &-bouton{
      width: fit-content;
      margin: 0 auto;
    }

    &-texte{
      margin: $m-medium 0;
    }
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
        background: none;

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

    &_section{
      margin: 200px 0;
    }
  }

  .deco_persos{
    z-index: -1;
    opacity: 0.2;
    position: absolute;
    top: 0;
    right: 0;
    
    @include large{
      opacity: 0.3;
      top: -220px;
    }
    
    @include xxlarge{
      top: -180px;
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

// import de Prismic
const { client } = usePrismic();

// import du document Règles
const { data: prismic_tournoi, error: prismic_tournoi_error } = await useAsyncData(tournoi_url, () =>
    client.getSingle(tournoi_url)
)

if (!prismic_tournoi.value || prismic_tournoi_error.value){
    throw createError({statusCode: 404, statusMessage: "Prismic n'a pas trouvé la section faq"})
}

onMounted(fetchTournoi);

// SEO de la page
useSeoMeta({
  title: "Smash Arena Event - Fiche Tournoi",
  ogTitle: "Smash Arena Event - Tournoi orgnaisé par SAE",
  description: "Fiche d'un tournoi organisé par l'association Smash Arena Event.",
  ogDescription: "Fiche d'un tournoi organisé par l'association Smash Arena Event.",
  ogImage: "/img/logo.svg",
})
</script>
