class Repository
{
  client =  null;
  champions = {};


  constructor() {
    console.log('init')
    this.client = new Client();
    this.client.getChampions(this.registerChampions.bind(this));
  }



  getChampionSplash(championName, skinId) {
    return this.client.getChampionSplash(championName, skinId);
  }

  registerChampions(response) {
    for(let championName in response.data) {
      let champion = response.data[championName];
      this.champions[champion.key] = new Champion(this, response.data[championName]);
    }
  }

  
  getChampionById(id) {
    return this.champions[id];
  }

  loadSummonerByName(name, doAfter) {
    this.client.getAccountByName(name, (accountInfo) => {

      const summoner = new Summoner(this, accountInfo);

      //Retrieve all matches (API call)


      this.client.getMatches(accountInfo, (response) => {
        
        summoner.setMatches(response.matches);

        summoner.loadMatchesDetails().then((values) =>  {
          summoner.computeStatistiques();
          doAfter(summoner);
        });
     });
    });
  }





}