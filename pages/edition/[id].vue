<template>
    <div>
      <h1>Tournoi Super Smash Bros - Smash Arena Event</h1>
  
      <!-- Affichage des informations du tournoi en fonction de l'édition -->
      <div class="tournament">
        <h2>{{ tournament.name }}</h2>
        <p>Date de début : {{ tournament.started_at }}</p>
        <h4>Participants :</h4>
        <ul>
          <li v-for="participant in tournament.participants" :key="participant.id">
            {{ participant.name }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import axios from 'axios'
  import { useRoute } from 'vue-router'
  
  // Référence pour stocker les données du tournoi
  const tournament = ref({
    name: '',
    started_at: '',
    participants: []
  })
  
  // Récupérer le paramètre 'id' de la route dynamique (édition choisie)
  const route = useRoute()
  const editionId = route.params.id // 'edition2024' ou 'edition2025'
  
  // Fonction pour récupérer les données de l'édition à partir de l'API
  const fetchTournamentData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tournaments')
      tournament.value = response.data[editionId] // On charge les données de l'édition sélectionnée
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error)
    }
  }
  
  // Lors du changement de l'URL, recharger les données
  watch(() => route.params.id, fetchTournamentData)
  
  onMounted(() => {
    fetchTournamentData() // Charger les données lors du premier montage
  })
  </script>
  
  <style scoped>
  .tournament {
    border: 1px solid #ccc;
    padding: 1em;
    margin: 1em 0;
    border-radius: 8px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  }
  </style>
  