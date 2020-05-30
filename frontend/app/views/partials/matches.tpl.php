<section class="section matches-container">

    <div class="clearfix mb-5 pb-5">
        <div class="container-fluid mb-5">
            <div class="row" data-aos="fade">
            <div class="col-md-12 text-center heading-wrap">
                <h2>Recent fights</h2>
            </div>
            </div>
        </div>

        <div class="matches"></div>
    </div>

    <template id="match-template">
        <article class="match">
            <a href="#" class="item-dishes" data-aos="fade-right" data-aos-delay="100">
                <div class="text">
                    <div class="date"></div>

                    <div class="kda">
                        <div class="stat">
                            <h4>Kills</h4>
                            <div class="value kill-number"></div>
                        </div>
                        <div class="stat">
                            <h4>Deaths</h4>
                            <div class="value death-number"></div>
                        </div>
                        <div class="stat">
                            <h4>Assists</h4>
                            <div class="value assist-number"></div>
                        </div>
                    </div>

                </div>
                <img src="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Alistar_10.jpg" alt="" class="img-fluid champion-splash">
            </a>
        </article>
    </template>

</section>