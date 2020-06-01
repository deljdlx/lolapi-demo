class LolApiWorkbench
{


  repository = null;


  accountInfo = null;

  constructor() {
    this.repository = new Repository();
  }

  initialize() {
    console.log('init')
    this.matchesContainer = document.querySelector('.matches');
    document.getElementById('search-invocator').addEventListener('submit', this.handleSearchInvocatorSubmit.bind(this));
  }


  handleSearchInvocatorSubmit(event) {
    event.preventDefault();
    let search = document.querySelector('input[name="invocator"]').value;
    console.log('Search ' + search)
    this.repository.loadSummonerByName(search, this.displaySummonerDetails.bind(this))

  }



  displaySummonerDetails(summoner) {
    let carousel = new MatchCarousel(summoner);
    carousel.render();

    let summonerDetails = new SummonerDetails(summoner);
    summonerDetails.render();

    let laneChart = new LanePiChart(summoner);
    laneChart.render();

    let roleChart = new RolePiChart(summoner);
    roleChart.render();
  }

};



