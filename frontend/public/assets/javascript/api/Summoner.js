class Summoner extends Entity
{
  data = {};
  participations = [];

  picks = [];

  roles = {
    SOLO: 0,
    DUO: 0,
    DUO_SUPPORT: 0,
    DUO_CARRY: 0,
  };

  lanes = {
    MID: 0,
    NONE: 0,
    TOP: 0,
    BOTTOM: 0,
    JUNGLE: 0
  };

  averageKda = {
    kills: 0,
    deaths: 0,
    assists: 0
  };


  constructor(repository, data) {
    super(repository);
    this.data = data;
  }



  getName() {
    return this.data.name
  }


  getParticipations() {
    return this.participations;
  }


  setMatches(matches) {
    for(let matchData of matches) {
      const match = new Match(this.repository, matchData);
      const participation = new Participation(this, match);
      this.participations.push(participation);
    }
  }

  getMatches() {
    let matches = [];
    for(let participation of this.participations) {
      matches.push(participation.getMatch());
    }
    return matches;
  }


  loadMatchesDetails(doAfter) {

    let promises = [];

    for(let i = 0 ; i < this.participations.length ; i++) {
      let promise =  this.participations[i].getMatch().loadDetails();
      promises.push(promise);
    }
    return Promise.all(promises);
    
  }

  computeStatistiques() {
    this.computeChampionPick();
    this.computeRoles();
    this.computeLanes();
    this.computeKDA();
  }

  getFavoriteChampion() {
    return this.repository.getChampionById(this.picks[0].championId);
  }

  geChampionUsageById(championId) {
    for(let data of this.picks) {
      if(data.championId == championId) {
          return data.count / this.participations.length;
      }
    }
    return 0;
  }



  computeChampionPick() {

    let pickCounter = {};
    for(let participation of this.participations) {
      const champion = participation.getChampion();

      if(typeof(pickCounter[champion.getId()]) === 'undefined') {
        pickCounter[champion.getId()] = 0;
      }
      pickCounter[champion.getId()]++;
    }

    let sortedPickCounter = [];
    for(let id in pickCounter) {
      const count = pickCounter[id];
      sortedPickCounter.push({
        championId: id,
        count: count
      });
    }

    this.picks = sortedPickCounter.sort(function(element0, element1) {
      if(element0.count > element1.count) {
        return -1;
      }
      else if(element0.count < element1.count) {
        return 1;
      }
      else {
        return 0;
      }
    });
    return this;
  }

  computeKDA() {
    let kills = 0;
    let assists = 0;
    let deaths = 0;

    for(let participation of this.participations) {

      kills += participation.getKills();
      assists += participation.getAssists();
      deaths += participation.getDeaths();
    }

    this.averageKda.kills = Math.round(kills / this.participations.length * 100 ) /100;
    this.averageKda.deaths = Math.round(deaths / this.participations.length * 100 ) /100;
    this.averageKda.assists = Math.round(assists / this.participations.length * 100 ) /100;

    return this;
  }


  computeLanes() {
    for(let participation of this.participations) {
      this.lanes[participation.getLane()]++;
    }
    return this;
  }

  computeRoles() {
    for(let participation of this.participations) {
      this.roles[participation.getRole()]++;
    }
    return this;
  }


  getAccountId() {
    return this.data.accountId;
  }


}