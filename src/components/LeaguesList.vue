<script setup lang="ts">
import { onMounted, ref } from "vue";
import { League } from "@/types";
import { useLeaguesStore } from "../store/leagues";
import LeagueCard from "./LeagueCard.vue";
import FilterTab from "./FilterTab.vue";

const leaguesStore = useLeaguesStore();
const chosenLeague = ref<League | null>(null);
const isDialogOpen = ref(false);

const showLeagueDetails = async(league: League) => {
  chosenLeague.value = league;
  isDialogOpen.value = true;
  try {
    await leaguesStore.getSeasons(league.idLeague);
    isDialogOpen.value = true;
  } catch (error: any) {
    alert(error.message);
    console.error(error.message);
  }
};

onMounted(async () => {
  await leaguesStore.getAllLeagues()
});
</script>

<template>
  <div class="leagues-list-container">
    <div class="header-section">
      <h1 class="typewriter-title">LEAGUES DIRECTORY</h1>
      <div class="typewriter-subtitle">Discover the world's finest sporting competitions</div>
    </div>
    
    <div class="filter-section">
      <FilterTab />
    </div>
    
    <div class="content-section">
      <v-progress-circular
        v-if="leaguesStore.isLoading"
        color="primary"
        class="loading-spinner"
        size="64"
        indeterminate
      ></v-progress-circular>
      
      <div v-else class="leagues-grid">
        <div
          v-for="(league, index) in leaguesStore.filteredLeagues"
          :key="index"
          class="league-item"
        >
          <LeagueCard :league="league" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

.leagues-list-container {
  width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  padding: 20px;
  box-sizing: border-box;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}

.header-section {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 0;
}

.typewriter-title {
  font-family: 'Space Mono', monospace;
  font-size: 3.5rem;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  margin: 0;
  letter-spacing: 4px;
  animation: glow 2s ease-in-out infinite alternate;
}

.typewriter-subtitle {
  font-family: 'Space Mono', monospace;
  font-size: 1.2rem;
  color: #b8c5d6;
  margin-top: 10px;
  letter-spacing: 2px;
  opacity: 0.8;
}

.filter-section {
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.content-section {
  width: 100%;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.leagues-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 100%;
}

.league-item {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.league-item:hover {
  transform: translateY(-5px);
}

@keyframes glow {
  from {
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  }
  to {
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.6), 0 0 40px rgba(255, 255, 255, 0.3);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .typewriter-title {
    font-size: 2.5rem;
    letter-spacing: 2px;
  }
  
  .typewriter-subtitle {
    font-size: 1rem;
  }
  
  .leagues-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
  }
  
  .leagues-list-container {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .typewriter-title {
    font-size: 2rem;
    letter-spacing: 1px;
  }
  
  .leagues-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
</style>