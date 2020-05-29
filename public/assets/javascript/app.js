let app = {
  client: null,
  champions: {},

  matches: [],
  accountInfo: null,

  init: function() {
    console.log('init')
    app.client = LolApi;

    app.matchesContainer = document.querySelector('.matches');;

    document.getElementById('search-invocator').addEventListener('submit', app.handleSearchInvocatorSubmit);
    app.client.getChampions(app.registerChampions, app.registerChampions)

  },


  handleSearchInvocatorSubmit: function(event) {
    event.preventDefault();
    let search = document.querySelector('input[name="invocateur"]').value;
    console.log(search);
    app.client.getAccountByName(search, app.getAccountInfo);
  },


  registerChampions: function(response) {
    for(let championName in response.data) {
      let champion = response.data[championName];
      app.champions[champion.key] = champion;
    }
  },


  getAccountInfo: function(accountInfo) {
    app.accountInfo = accountInfo;
    app.displayAccountInfo()
    
    app.client.getMatches(accountInfo, app.displayMatches)
  },


  displayAccountInfo: function(accountData) {
    console.log(accountData);
  },


  displayMatches: function(data) {
    app.matchesContainer.innerHTML = '';
    for(let match of data.matches) {
      data.matches[match.gameId] = match;
      app.client.getMatchInfo(match.gameId, app.renderMatch);
      
    }
  },

  renderMatch: function(match) {
    console.log(match);

    let player = app.getPlayer(match);
    //console.log(player);

    let participant = app.getParticipant(match);
    //console.log(participant);

    let champion = app.getChampion(match);
    //console.log(champion);

    let team = app.getTeam(match);
    //console.log(team);
    
    let hasWin = app.hasWin(match);
    //console.log(hasWin);
    //console.log('============================================');


    

    let template = document.getElementById('match-template');
    let element = template.content.cloneNode(true).querySelector('article');

    let championThumnail = app.client.getChampionThumbnailURL(champion.id);
    element.querySelector('.champion-thumbnail').setAttribute('src', championThumnail);
    element.querySelector('.level').innerHTML = app.getLevel(match);



    let date = new Date(match.gameCreation);
    let duration = Math.round(match.gameDuration/60);
    element.querySelector('.header').innerHTML = 
      '<h2>'+
        '<div class="date"><span class="date">' + date.toLocaleDateString() + ' </span><span class="hour">' + date.toLocaleTimeString() + '</span></div>' + 
        '<div class="duration">' +duration+ 'm</div>' +
        '<div><span class="champion">' + champion.id + '</span></div>' +
      '</h2>';

    element.querySelector('.kill-number').innerHTML = app.getKillNumber(match);
    element.querySelector('.death-number').innerHTML = app.getDeathNumber(match);
    element.querySelector('.assist-number').innerHTML = app.getAssistNumber(match);

    

    if(hasWin) {
      element.classList.add('win');
    }
    else {
      element.classList.add('lose');
    }


    app.matchesContainer.appendChild(element);

  },


  //================================================================================
  //fonction pour récupérer les informations d'un match
  //================================================================================


  hasWin: function(match) {
    let team = app.getTeam(match);
    if(team.win == 'Fail') {
      return false;
    }
    else {
      return true;
    }
  },

  getTeam: function(match) {
    let participant = app.getParticipant(match);
    let teamId = participant.teamId;

    for(let team of match.teams) {
      if(team.teamId == teamId) {
        return team;
      }
    }

  },

  getParticipant: function(match) {
    let participantId = null;
    for(let participant of match.participantIdentities) {
      if(participant.player.accountId == app.accountInfo.accountId) {
        participantId = participant.participantId;
      }
    }

    for(let participant of match.participants) {
      if(participant.participantId == participantId) {
        return participant;
      }
    }
  },


  getPlayer: function(match) {
    for(let participant of match.participantIdentities) {
      if(participant.player.accountId == app.accountInfo.accountId) {
        return participant.player;
      }
    }
  },

  getChampion: function(match) {
    let participant = app.getParticipant(match);
    let championId = participant.championId;
    return app.champions[championId];
  },

  getAssistNumber: function(match) {
    let participant = app.getParticipant(match);
    return participant.stats.assists;
  },

  getKillNumber: function(match) {
    let participant = app.getParticipant(match);
    return participant.stats.kills;
  },

  getDeathNumber: function(match) {
    let participant = app.getParticipant(match);
    return participant.stats.deaths;
  },


  getLevel: function(match) {
    let participant = app.getParticipant(match);
    return participant.stats.champLevel;
  }



  
};



