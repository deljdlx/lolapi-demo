class Client
{

  proxyURL = './api-proxy.php';

  fetchOption = {
    method: 'GET',
    mode: 'no-cors',
    cache: 'no-cache',
  };

  getChampionThumbnailURL(championName) {
    return 'http://ddragon.leagueoflegends.com/cdn/10.11.1/img/champion/' + championName + '.png';
  }

  getChampionSplash(championName) {
    return 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' + championName + '_0.jpg'
  }

  getChampions(doOnSuccess) {

    this.query(
      '/data/champion.json',
      doOnSuccess
    );
  }

  getAccountByName(accountName, doOnSuccess) {
    this.query(
      '/summoner/v4/summoners/by-name/' + accountName,
      doOnSuccess
    )
  }

  getMatches(accountInfo, doOnSuccess) {
    return this.query(
      '/match/v4/matchlists/by-account/' + accountInfo.accountId,
      doOnSuccess
    );
  }

  getMatchInfo(matchId, doOnSuccess) {
    return this.query(
      '/match/v4/matches/' + matchId,
      doOnSuccess
    );
  }


  query(endPoint, doOnSuccess, options) {
    if(typeof(options) === 'undefined') {
      options = this.fetchOption;
    }

    /*
    Nous devons utiliser un proxy car Riot a une politique de sécurité qui interdit les appels ajax
    Nous devons donc un peu "bricoler" l'url de l'api pour pouvoir utiliser proxy
    https://riot-api-libraries.readthedocs.io/en/latest/mobile.html#
    */

    let proxyURL = this.proxyURL + '?endpoint=' + endPoint;

    //==============================
    let request = fetch(proxyURL, options);

    let promise = request.then(this.parseResponse);
    if(doOnSuccess) {
      promise = promise.then(doOnSuccess)
    }
    return promise;
  }

  parseResponse(response) {
    return response.json();
  }
}
