export type LeaguesState = {
  isLoading?: boolean;
  leagues: League[];
  filteredLeagues: League[];
};

export type League = {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string;
};

export type Season = {
  strSeason: string;
  strBadge: string;
};
