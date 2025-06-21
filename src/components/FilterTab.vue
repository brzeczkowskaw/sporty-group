<script setup lang="ts">
import { ref } from "vue";
import { useLeaguesStore } from "../store/leagues";

const leaguesStore = useLeaguesStore();

const selectItems = [
  "American Football",
  "Basketball",
  "Ice Hockey",
  "Motorsport",
  "Soccer"
];

const selectedSport = ref<string | null>(null);
const leagueName = ref<string | null>(null);

const filter = () => {
  if (!selectedSport.value && !leagueName.value) {
    leaguesStore.filteredLeagues = leaguesStore.leagues;
    return;
  }
  
  let filtered = leaguesStore.leagues;
  
  if (selectedSport.value) {
    filtered = filtered.filter(league => league.strSport === selectedSport.value);
  }
  
  if (leagueName.value) {
    filtered = filtered.filter(league => 
      league.strLeague?.toLowerCase().includes(leagueName.value?.toLowerCase() || '')
    );
  }
  console.log(filtered);
  leaguesStore.filteredLeagues = filtered;
}
</script>

<template>
  <div class="filter-container">
    <v-row class="px-4">
      <v-col cols="12" sm="6" md="6">
        <v-text-field 
          v-model="leagueName"
          label="Find league by name"
          density="compact"
          variant="outlined"
          clearable
          class="filter-input"
          @update:model-value="filter"
        />
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-select 
          :items="selectItems"
          v-model="selectedSport"
          label="Choose sport"
          density="compact"
          variant="outlined"
          clearable
          class="filter-input"
          @update:model-value="filter"
        />
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

.filter-container {
  width: 100%;
}

.filter-input {
  font-family: 'Space Mono', monospace;
}

:deep(.v-field) {
  background: rgba(255, 255, 255, 0.9) !important;
  border-radius: 8px !important;
  font-family: 'Space Mono', monospace;
}

:deep(.v-field__input) {
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
}

:deep(.v-label) {
  font-family: 'Space Mono', monospace;
  font-weight: 500;
  color: #1e3c72;
}

:deep(.v-field:hover) {
  background: rgba(255, 255, 255, 1) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Reduce spacing on mobile */
@media (max-width: 600px) {
  :deep(.v-col) {
    padding-bottom: 8px !important;
  }
}
</style>
