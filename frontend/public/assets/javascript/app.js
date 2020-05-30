let app = {
  client: null,
  champions: {},
  
  matchesInCarousel: 10,

  matches: [],
  accountInfo: null,

  init: function() {
    console.log('init')
    app.client = LolApi;

    app.matchesContainer = document.querySelector('.matches');

    //app.initializeMatchesCarousel();

    document.getElementById('search-invocator').addEventListener('submit', app.handleSearchInvocatorSubmit);
    app.client.getChampions(app.registerChampions, app.registerChampions)

  },


  handleSearchInvocatorSubmit: function(event) {
    event.preventDefault();
    let search = document.querySelector('input[name="invocator"]').value;
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


  initializeMatchesCarousel: function() {
    console.log('carousel');
    //$(app.matchesContainer).slick('unslick');


      $(app.matchesContainer).slick({
        slide: 'article',
        slidesToShow: 3,
      });


  },

  displayMatches: function(data) {
    app.lastMatchFromList = false;
    app.matchesContainer.innerHTML = '';
    let i = 0;

    for(let match of data.matches) {
      data.matches[match.gameId] = match;


      app.client.getMatchInfo(match.gameId, app.renderMatch);

      i++;
      
      if(i >= app.matchesInCarousel) {
        break;
      }
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


    let date = new Date(match.gameCreation);
    
    element.querySelector('.date').innerHTML = '<span class="date">' + date.toLocaleDateString() + ' </span><span class="hour">' + date.toLocaleTimeString() + '</span>';

    element.querySelector('.kill-number').innerHTML = app.getKillNumber(match);
    element.querySelector('.death-number').innerHTML = app.getDeathNumber(match);
    element.querySelector('.assist-number').innerHTML = app.getAssistNumber(match);


    element.querySelector('.champion-splash').setAttribute('src', 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' + champion.id + '_0.jpg');
    

    let duration = Math.round(match.gameDuration/60);

    /*
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


    */

    

    if(hasWin) {
      element.classList.add('win');
    }
    else {
      element.classList.add('lose');
    }

    app.matchesContainer.appendChild(element);

    
    if(app.matchesContainer.querySelectorAll('a').length == app.matchesInCarousel) {
      app.initializeMatchesCarousel();
    }
    

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



