let app = {
  client: null,
  champions: {},
  
  matchesInCarousel: 10,
  matchesCarouselRendered: false,

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
    app.displayAccountInfo(accountInfo)
    
    app.client.getMatches(accountInfo, app.displayMatches)
  },


  displayAccountInfo: function(accountData) {
    document.querySelector('.summoner-name').innerHTML = accountData.name;
  },


  initializeMatchesCarousel: function() {
    if(app.matchesCarouselRendered) {
      $(app.matchesContainer).slick('unslick');
    }
    
    app.matchesCarouselRendered = true;

    $(app.matchesContainer).slick({
      slide: 'article',
      slidesToShow: 2,
    });
  },

  displaySummonerDetails: function(data) {
    document.querySelector('.summoner-container').style.display = 'block';
    let championPicks = {};
    for(let match of data.matches) {
      if(typeof(championPicks[match.champion]) === 'undefined') {
        championPicks[match.champion] = 0;
      }
      championPicks[match.champion]++;
    }

    let maxPick = 0;
    let mostPickedChampion = null;
    let totalPick = 0;
    for(let championId in championPicks) {
      let picked = championPicks[championId];
      totalPick += picked;
      if(picked > maxPick) {
        maxPick = picked;
        mostPickedChampion = championId;
      }
    }
    //console.log(data);
    //console.log(mostPickedChampion);
    //console.log(championPicks)


    let champion = app.getChampionById(mostPickedChampion);
    console.log(champion);

    let pickPercent = (maxPick/totalPick)*100
    document.querySelector('.summoner-container .favorite-champion img').setAttribute('src', app.client.getChampionSplash(champion.name));
    document.querySelector('.summoner-container .favorite-champion figcaption').innerHTML = 'Favorite champion : ' + champion.name + ' (picked ' + pickPercent+ '%)';
  },



  displaySupportGraph: function(data) {
    let roles = {
      SOLO: 0,
      DUO: 0,
      DUO_SUPPORT: 0,
      DUO_CARRY: 0,
    };
    for(let match of data.matches) {
      roles[match.role]++;
    }

    console.log(roles);

    let option = {
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
          orient: 'vertical',
          left: 10,
          data: ['Solo', 'Carry', 'Support', 'Duo']
      },
      series: [
          {
              name: 'Role',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                  show: false,
                  position: 'center'
              },
              emphasis: {
                  label: {
                      show: true,
                      fontSize: '30',
                      fontWeight: 'bold'
                  }
              },
              labelLine: {
                  show: false
              },
              data: [
                  {value: roles.SOLO, name: 'Solo'},
                  {value: roles.DUO_CARRY, name: 'Carry'},
                  {value: roles.DUO_SUPPORT, name: 'Support'},
                  {value: roles.DUO, name: 'Duo'},
              ]
          }
      ]
    };
    let graph = echarts.init(document.querySelector('.support-graph'));
    // use configuration item and data specified to show chart
    graph.setOption(option);
  },

  displayLaneGraph: function(data) {
    let lanes = {
      MID: 0,
      NONE: 0,
      TOP: 0,
      BOTTOM: 0,
      JUNGLE: 0
    }
    for(let match of data.matches) {
      lanes[match.lane]++;
    }

    console.log(lanes);

    let option = {
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
          orient: 'vertical',
          left: 10,
          data: ['Mid', 'Top', 'Bot', 'Jungle', 'Random']
      },
      series: [
          {
              name: 'Lane',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                  show: false,
                  position: 'center'
              },
              emphasis: {
                  label: {
                      show: true,
                      fontSize: '30',
                      fontWeight: 'bold'
                  }
              },
              labelLine: {
                  show: false
              },
              data: [
                  {value: lanes.MID, name: 'Mid'},
                  {value: lanes.TOP, name: 'Top'},
                  {value: lanes.BOTTOM, name: 'Bot'},
                  {value: lanes.JUNGLE, name: 'Jungle'},
                  {value: lanes.NONE, name: 'Random'}
              ]
          }
      ]
    };
    let graph = echarts.init(document.querySelector('.lane-graph'));
    // use configuration item and data specified to show chart
    graph.setOption(option);
  
  },

  displayMatches: function(data) {

    document.querySelector('.matches-container').style.display = 'block';

    app.matchesContainer.innerHTML = '';

    app.displaySummonerDetails(data);
    app.displayLaneGraph(data);
    app.displaySupportGraph(data);

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
  },

  //=============================================================

  getChampionById: function(id) {
    return app.champions[id];
  }

  
};



