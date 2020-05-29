let LolApi = {

  proxyURL: './lol-api.proxy.php',


  fetchOption: {
    method: 'GET',
    mode: 'no-cors',
    cache: 'no-cache',
},

  getChampionThumbnailURL: function(chamionName) {
    return 'http://ddragon.leagueoflegends.com/cdn/10.11.1/img/champion/' + chamionName + '.png';
  },

  getChampions: function (doOnSuccess) {

    LolApi.query(
      '/data/champion.json',
      doOnSuccess
    );
  },

  getAccountByName: function(accountName, doOnSuccess) {
    LolApi.query(
      '/summoner/v4/summoners/by-name/' + accountName,
      doOnSuccess
    )
  },

  getMatches: function(accountInfo, doOnSuccess) {
    LolApi.query(
      '/match/v4/matchlists/by-account/' + accountInfo.accountId,
      doOnSuccess
    );
  },

  getMatchInfo(matchId, doOnSuccess) {
    LolApi.query(
      '/match/v4/matches/' + matchId,
      doOnSuccess
    );
  },


  query: function(endPoint, doOnSuccess, options) {
    if(typeof(options) === 'undefined') {
      options = LolApi.fetchOption;
    }

    /*
    Nous devons utiliser un proxy car Riot a une politique de sécurité qui interdit les appels ajax
    Nous devons donc un peu "bricoler" l'url de l'api pour pouvoir utiliser proxy
    https://riot-api-libraries.readthedocs.io/en/latest/mobile.html#
    */

    let proxyURL = LolApi.proxyURL + '?endpoint=' + endPoint;

    //==============================
    let request = fetch(proxyURL, options);

    request
      .then(LolApi.parseResponse)
      .then(doOnSuccess)
    ;
  },

  parseResponse: function (response) {
    return response.json();
  }


}
