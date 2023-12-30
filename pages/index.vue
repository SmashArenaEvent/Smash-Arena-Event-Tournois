<template>
  <main>
    <h1 class="my_section main-h1"><span class="bleu">S</span>mash <span class="bleu">A</span>rena <span class="bleu">E</span>vent
        <br><span class="bleu">T</span>ournois
    </h1>

    <!-- liste des tournois en cours -->
    <section class="main-tournois" v-if="TOURNOIS_ENCOURS.length > 0">
      <h2 class="hero-h2"><span class="bleu">En</span> cours</h2>
      
      <ul class="main-tournois_liste">
        <li class="main-tournois_liste-item" v-for="tournoi in TOURNOIS_ENCOURS" :key="tournoi.id">
          <cardTournoi v-bind="tournoi.tournament"/>
        </li>
      </ul>
    </section>

    <!-- liste des tournois prévus -->
    <section class="main-tournois" v-if="TOURNOIS_PROCHAIN.length > 0">
      <h2 class="hero-h2">Prochainement</h2>
      
      <ul class="main-tournois_liste">
        <li class="main-tournois_liste-item" v-for="tournoi in TOURNOIS_PROCHAIN" :key="tournoi.id">
          <cardTournoi v-bind="tournoi.tournament"/>
        </li>
      </ul>
    </section>

    <!-- card à afficher lorsqu'il n'y a ni tournois en cours ni prévus -->
    <div class="main-tournois" v-if="TOURNOIS_ENCOURS.length == 0 && TOURNOIS_PROCHAIN.length == 0">     
      <cardTournoi/>
    </div>

    <SectionRegles class="my_section"/>

    <SectionFaq class="my_section"/>

    <sectionAPropos class="my_section"/>

    <deco class="deco deco-1"/>
    <deco class="deco deco-2"/>
    <deco class="deco deco-3"/>
    <deco class="deco deco-4"/>

  </main>
</template>

<style lang="scss">
main{
  position: relative;
  overflow: hidden;

  .main{

    &-h1{
      padding: $m-small;
      @include medium{
        padding: $m-big;
        padding-bottom: $m-medium;
      }
    }
    
    &-tournois{
      padding: 0 $m-small;

      &_liste{
        &-item{
          margin-bottom: $m-medium;
  
          @include medium{
            margin-bottom: $m-big;
          }
        }
      }
    }
  }

  .deco{
    // @include teste;
    z-index: -1;
    position: absolute;
    scale: 0.5;

    &-1{
      rotate: 45deg;
      top: -400px;
      right: 0;
    }

    &-2
    &-3,
    &-4{
      display: none;
    }

    @include medium{
      display: block;
      scale: 1;

      &-1{
        rotate: 70deg;
        top: -500px;
        right: 450px;
      }
      
      &-2{
        top: -93px;
        right: 1635px;
        rotate: 70deg;
      }

      &-3{
        top: 45%;
        right: -150px;
      }

      &-4{
        bottom: -500px;
        left: 300px;
        rotate: 120deg;
      }
    }
  }
}
</style>

<script setup>
// import d'axios et des donées des tournois
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

</script>
