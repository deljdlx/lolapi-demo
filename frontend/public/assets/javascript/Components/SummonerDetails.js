class SummonerDetails
{

  summoner = null;

  container = null;

  constructor(summoner) {
    this.summoner = summoner;

    this.container = document.querySelector('.summoner-container');
  }




  render() {
    this.container.style.display = 'block';


    let champion = this.summoner.getFavoriteChampion();
    console.log(champion);

    let pickPercent = this.summoner.geChampionUsageById(champion.getId()) * 100
    this.container.querySelector('.favorite-champion img').setAttribute('src', champion.getSplash());
    this.container.querySelector('.favorite-champion figcaption').innerHTML = 'Favorite champion : ' + champion.getName() + ' (picked ' + pickPercent+ '%)';


    this.container.querySelector('.summoner-name').innerHTML = this.summoner.getName() + "'s resume";
  }

}