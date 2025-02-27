<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

export default defineComponent({
  name: 'EditionIndex',
});
</script>

<template>
  <div>
    <RouterLink to="./edition2024">2024</RouterLink>
    <RouterLink to="./edition2025">2025</RouterLink>
  </div>
</template>