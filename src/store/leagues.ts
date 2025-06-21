import { defineStore } from "pinia";
import { LeaguesState, Season } from "@/types";
import axios from "axios";

export const useLeaguesStore = defineStore("leagues", {
  state: (): LeaguesState => ({
    isLoading: false,
    leagues: [],
    filteredLeagues: [],
  }),
  getters: {},
  actions: {
    async getAllLeagues() {
      if (this.leagues.length > 0 ) return;
      try {
        this.isLoading = true;
        const { data } = await axios.get(
          "https://www.thesportsdb.com/api/v1/json/3/all_leagues.php"
        );
        this.leagues = data.leagues;
        this.filteredLeagues = data.leagues;
        this.isLoading = false;
      } catch (error: any) {
        console.error(error.message);
        this.isLoading = false;
      }
    },
    async getSeasons(id: string): Promise<Season> {
      try {
        const { data } = await axios.get(
          `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=${id}`
        );
        console.log(data.seasons[0]);
        return data.seasons[0];
      } catch (error: any) {
        console.error(error.message);
      }
    },
  },
});
