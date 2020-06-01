class Participant extends Entity
{

  data = {};
  match = null;

  constructor(match, data) {
    super(match.getRepository());
    this.match = match;
    this.data = data;
  }

  getKills() {
    return this.data.stats.kills;
  }

  getAssists() {
    return this.data.stats.assists;
  }

  getDeaths() {
    return this.data.stats.deaths;
  }

  getChampionId() {
    return this.data.championId;
  }

  getTeamId() {
    return this.data.teamId;
  }

}