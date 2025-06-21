<script setup lang="ts">
import { defineProps, ref } from "vue";
import { League, Season } from "@/types";
import { useLeaguesStore } from "../store/leagues";

const leaguesStore = useLeaguesStore();

const props = defineProps({
  league: { 
    type: Object as () => League, 
    required: true 
  }
});

const isFlipped = ref<boolean>(false);
const season = ref<Season | null>(null);

const defaultSeasonData = {
  strSeason: 'No Season data',
  strBadge: '/src/assets/nopicX.JPG'
};

const toggleFlip = async () => {
  isFlipped.value = !isFlipped.value;

  if (isFlipped.value) {
    console.log(season.value);
    if (season.value) return;
    try {
      const seasonData = await leaguesStore.getSeasons(props.league.idLeague);
      season.value = seasonData ? seasonData : defaultSeasonData;
    } catch (error: any) {
      console.error(error.message);
      season.value = defaultSeasonData;
    }
  }
};

const getIconForSportCategory = (sport: string): string => {
  const name = sport.toLowerCase();
  if (name.includes('soccer')) {
    return 'mdi-soccer';
  } else if (name.includes('motorsport') || name.includes('car')) {
    return 'mdi-car-sports';
  } else if (name.includes('ice') || name.includes('hockey')) {
    return 'mdi-hockey-sticks';
  } else if (name.includes('basketball') || name.includes('basket')) {
    return 'mdi-basketball';
  } else if (name.includes('football') || name.includes('basket')) {
    return 'mdi-football-helmet';
  } else {
    return 'mdi-trophy-variant'
  }
}
</script>

<template>
  <div class="flip-container" @click="toggleFlip">
    <div class="flip-card" :class="{ 'flipped': isFlipped }">
      <!-- Front side -->
      <div class="flip-card-front">
        <v-card class="league-card" height="140px" width="100%">
          <v-card-title class="card-title">
            <h4 class="league-name">{{ league.strLeague }}</h4>
          </v-card-title>
          <v-card-text class="pa-3 pt-0">
            <v-row class="ma-0">
              <v-col cols="1" class="pa-0">
                <v-icon color="secondary" size="small" class="sport-icon">{{ getIconForSportCategory(league.strSport) }}</v-icon>
              </v-col>
              <v-col cols="11" class="pa-0">
                <div class="sport-name">{{ league.strSport }}</div>
              </v-col>
            </v-row>
            <v-row class="mt-2 ma-0">
              <v-col class="d-flex justify-end pa-0">
                <div class="alternate-name">{{ league.strLeagueAlternate }}</div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
      
      <!-- Back side -->
      <div class="flip-card-back">
        <v-card class="league-card back-card" height="140px" width="100%">
          <v-card-text class="d-flex flex-column align-center justify-center h-100">
            <v-img :src="season?.strBadge" height="60px" width="60px" class="mb-2" />
            <h3 class="season-text">{{ season?.strSeason }}</h3>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

.flip-container {
  width: 100%;
  height: 140px;
  perspective: 1000px;
  cursor: pointer;
}

.flip-card {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: left;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card.flipped {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-card-back {
  transform: rotateY(180deg);
}

.league-card {
  width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.league-card:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.card-title {
  padding: 16px 16px 8px 16px;
}

.league-name {
  font-family: 'Space Mono', monospace;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e3c72;
  margin: 0;
  line-height: 1.2;
  letter-spacing: 0.5px;
}

.sport-name {
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  color: #666;
  font-weight: 400;
}

.sport-icon {
  margin-top: 2px;
}

.alternate-name {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: #888;
  text-align: right;
  font-style: italic;
}

.back-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.season-text {
  font-family: 'Space Mono', monospace;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  margin: 0;
  letter-spacing: 1px;
}
</style>