class MatchCarousel
{

  summoner = null;
  participations = [];
  
  container = null;
  listContailer = null;


  constructor(summoner) {
    this.summoner = summoner;
    this.participations = this.summoner.getParticipations();
    this.container = document.querySelector('.matches-container');
    this.listContainer = document.querySelector('.matches-container .matches');
  }

  
  render(max = 10) {
    let index = 0;
    for(let participation of this.participations) {
      this.renderParticipation(participation);
      index++;
      if(index>max) {
        break;
      }
    }
    this.initializeMatchesCarousel();
  }



  renderParticipation(participation) {

    const match = participation.getMatch();

    const date = new Date(match.getGameCreation());
    const champion = participation.getChampion();
    const duration = Math.round(match.getDuration() / 60);
    

    let template = document.getElementById('match-template');
    let element = template.content.cloneNode(true).querySelector('article');

    
    element.querySelector('.date').innerHTML = '<span class="date">' + date.toLocaleDateString() + ' </span><span class="hour">' + date.toLocaleTimeString() + '</span>';
    element.querySelector('.champion-splash').setAttribute('src', 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' + champion.getName() + '_0.jpg');

    element.querySelector('.kill-number').innerHTML = participation.getKills();
    element.querySelector('.death-number').innerHTML = participation.getDeaths();
    element.querySelector('.assist-number').innerHTML = participation.getAssists();


    if(participation.isWin()) {
      element.classList.add('win');
    }
    else {
      element.classList.add('lose');
    }


    this.listContainer.appendChild(element);
    this.container.style.display = 'block';
    console.log(this.container);

    /*



    
    

    let duration = Math.round(this.data.gameDuration/60);

   

    if(hasWin) {
      element.classList.add('win');
    }
    else {
      element.classList.add('lose');
    }

    

    
    if(this.matchesContainer.querySelectorAll('a').length == this.matchesInCarousel) {
      this.initializeMatchesCarousel();
    }
    */
  }






  initializeMatchesCarousel() {

    $(this.listContainer).slick({
      slide: 'article',
      slidesToShow: 4,
    });
  }


  destroy() {
    $(this.listContainer).slick('unslick');
  }



  
}