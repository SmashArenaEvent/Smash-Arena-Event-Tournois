<template>
  <!-- test -->
  <div>
    <h1>Tournois Super Smash Bros - Smash Arena Event</h1>

    <div v-for="(tournament, edition) in tournaments" :key="edition" class="tournament">
      <h2>{{ edition }}</h2>
      <h3>{{ tournament.name }}</h3>
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
import { ref, onMounted } from 'vue'
import axios from 'axios'

const tournaments = ref({})

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/tournaments')
    tournaments.value = response.data
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error)
  }
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
