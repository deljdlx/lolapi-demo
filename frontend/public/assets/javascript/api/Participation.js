class Participation extends Entity
{
  summoner = null;
  match = null;


  constructor(summoner, match) {
    super(summoner.getRepository());
    this.summoner =  summoner;
    this.match = match;
  }

  getMatch() {
    return this.match;
  }

  

  getLane() {
    return this.match.data.lane;
  }


  getParticipant() {
    const summoner = this.summoner;

    let participantId = null;

    for(let participant of this.match.details.participantIdentities) {
      if(participant.player.accountId == summoner.getAccountId()) {
        participantId = participant.participantId;
      }
    }

    for(let participant of this.match.details.participants) {
      if(participant.participantId == participantId) {
        return this.match.getParticipantById(participantId);
      }
    }
  }

  getChampion() {
    const summoner = this.summoner;
    const participant = this.getParticipant();
    const championId = participant.getChampionId();
    return this.repository.getChampionById(championId);
  }

  getTeam() {
    let participant = this.getParticipant();
    let teamId = participant.getTeamId();
    return this.match.getTeamById(teamId);

  }


  getLane() {
    return this.match.data.lane;
  }

  getRole() {
    return this.match.data.role;
  }

  getAssists() {
    return this.getParticipant().getAssists();
  }

  getKills() {
    return this.getParticipant().getKills();
  }

  getDeaths() {
    return this.getParticipant().getDeaths();
  }

  isWin() {
    let team = this.getTeam();
    if(team.win == 'Fail') {
      return false;
    }
    else {
      return true;
    }
  }

}
