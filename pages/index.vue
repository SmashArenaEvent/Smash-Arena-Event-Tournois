<template>
  <main>
    <h1>SMASH ARENA EVENT - SITE VITRINE</h1>

    <img class="hero__img" :src="imgHeroAffiche" alt="" />
    <p span v-if="temps != 0">Vous pourrez vous inscrire dans {{ temps }}</p>

    <button v-if="temps == 0">Je m'inscris</button>

    <br />
    <br />
    <br />
    <hr />
    <br />
    <br />
    <br />

    <h1>SMASH ARENA EVENT - SITE DE TOURNOIS</h1>

    <section>
      <h2>Prochain tournois</h2>

      <div v-if="TOURNOIS_PROCHAIN.length == 0">
        <p>Pas de tournois prévus pour le moment.</p>
      </div>
      <div v-else>
        <div class="card__tournois">
          <ul v-for="t in TOURNOIS_PROCHAIN" :key="t.tournament.id">
            <li>nom : {{ t.tournament.name }}</li>
            <li>description : {{ t.tournament.description_source }}</li>
            <li>jeu : {{ t.tournament.game_name }}</li>
            <li>type : {{ t.tournament.tournament_type }}</li>
            <li>date de début : {{ t.tournament.started_at }}</li>
            <li>statut : {{ t.tournament.state }}</li>
            <a :href="`/tournois/${t.url}`">
              Voir la fiche de ce tournois
            </a>
          </ul>
        </div>
      </div>
    </section>

    <section>
      <h2>Tournois en cours</h2>

      <div v-if="TOURNOIS_ENCOURS.length == 0">
        <p>Pas de tournois en cours pour le moment.</p>
      </div>
      <div v-else>
        <div class="card__tournois">
          <ul v-for="t in TOURNOIS_ENCOURS" :key="t.tournament.id">
            <li>nom : {{ t.tournament.name }}</li>
            <li>description : {{ t.tournament.description_source }}</li>
            <li>jeu : {{ t.tournament.game_name }}</li>
            <li>type : {{ t.tournament.tournament_type }}</li>
            <li>date de début : {{ t.tournament.started_at }}</li>
            <li>statut : {{ t.tournament.state }}</li>
            <a :href="`/tournois/${t.url}`">
              Voir la fiche de ce tournois
            </a>
          </ul>
        </div>
      </div>
    </section>

    <ul>
      <li>
        <a href="/tournois/complet">Voir la liste des précédants tournois</a>
      </li>
    </ul>
  </main>
</template>

<style lang="scss">
.hero__img {
  width: 300px;
  height: 300px;
  object-fit: contain;
}

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
// Images rendom dans le Hero (pour site vitrine) -----------------------------------------------------

// variable qui contient le lien de l'image aléatoire
const imgHeroAffiche = ref("");

// tableau de toutes les images possibles
const imgHero = [
  "/imgHero/captainFalcon.png",
  "/imgHero/ike.png",
  "/imgHero/mario.png",
  "/imgHero/pikachu.png",
  "/imgHero/wolf.png",
];

// fonction qui attribue un lien aléatoirement à la constante "imgHeroAffiche"
const HeroImgAleatoire = () => {
  let randomNum = Math.floor(Math.random() * imgHero.length);
  imgHeroAffiche.value = imgHero[randomNum];
};

// Compte à rebours (pour site vitrine) ------------------------------------------------------------------

// Date limite (15 décembre 2023)
const dateFinale = new Date("2023-12-15T00:00:00").getTime();
// variable qui affiche le temps restant
const temps = ref("");

// fonction qui calcule la différence entre la date finale et la date actuelle
const CompteARebours = () => {
  const dateActuelle = new Date().getTime();
  const tempsRestant = dateFinale - dateActuelle;

  if (tempsRestant <= 0) {
    temps.value = 0;
  } else {
    const jours = Math.floor(tempsRestant / (1000 * 60 * 60 * 24));
    const heurs = Math.floor(
      (tempsRestant % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((tempsRestant % (1000 * 60 * 60)) / (1000 * 60));
    const secondes = Math.floor((tempsRestant % (1000 * 60)) / 1000);

    temps.value = `${jours} jours, ${heurs} heures, ${minutes} minutes, ${secondes} secondes`;
  }
};

// Données tournois (pour site de tournois) ------------------------------------------------------------

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
  // chargement des données pour le site du tournois
  fetchTournoisProchain();
  fetchTournoisEncours();

  // Site Vitrine
  HeroImgAleatoire();
  CompteARebours();

  // appelle la fonction CompteARebours toutes les secondes
  const CompteAReboursInterval = setInterval(CompteARebours, 1000);

  onBeforeUnmount(() => {
    clearInterval(CompteAReboursInterval);
  });
});
</script>
