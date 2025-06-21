<script setup lang="ts">
import LeaguesList from "../components/LeaguesList.vue"
</script>

<template>
  <div class="main-container">
    <LeaguesList />
  </div>
</template>

<style scoped>
.main-container {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

@media (max-width: 768px) {
  .main-container {
    padding: 0;
  }
}
</style>
