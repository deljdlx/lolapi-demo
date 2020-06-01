class Match extends Entity
{

  data = {};
  details = {};
  teams = {};
  participants = [];
  champions = {};


  constructor(repository, data) {
    super(repository);
    this.data = data;
  }

  loadDetails(doAfter) {

    let promise = this.repository.client.getMatchInfo(this.data.gameId)
      .then((data) => {
        this.details = data;
        for(let participantData of this.details.participants) {
          this.participants[participantData.participantId] = new Participant(this, participantData);
        }
        return this;
      }
    );

    if(doAfter) {
      return promise.then(doAfter);
    }
    else {
      return promise;
    }


    /*
    let promise = this.repository.client.getMatchInfo(this.data.gameId, (data) => {
      this.details = data;
      for(let participantData of this.details.participants) {
        this.participants[participantData.participantId] = new Participant(this, participantData);
      }
      if(doAfter) {
        //strange bug; doAfter seems to be sometimes called before this.details = data;
        //maybe a local problem on my computer
        setTimeout(doAfter, 2);
      }
    });
    return promise;
    */
  }

  getDetails() {
    return this.details;
  }


  getGameCreation() {
    return this.details.gameCreation;
  }

  getParticipantById(id) {
    return this.participants[id];
  }

  getDuration() {
    return this.details.gameDuration;
  }

  getTeamById(id) {

    console.log(this.details);
    console.log(id);
    for(let team of this.details.teams) {
      if(team.teamId == id) {
        return team;
      }
    }
  }

}