<?php
$slides = [
  'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Veigar_0.jpg',
  'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_0.jpg',
  'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Leona_2.jpg',
  'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Alistar_10.jpg'
];
?>

<div class="slider-wrap">
  <section class="home-slider owl-carousel">
    <?php
    foreach($slides as $index => $image) {
      echo '
        <div class="slider-item" style="background-image: url(' . $image . ');">
          <div class="container">
            <div class="row slider-text align-items-center justify-content-center">
              <div class="col-md-8 text-center col-sm-12 ">
                <h1 data-aos="fade-up mb-5">Lol api playground</h1>
                <p data-aos="fade-up" data-aos-delay="200"><a href="https://github.com/deljdlx/lolapi-demo/tree/develop" class="btn btn-white btn-outline-white">Get the sources</a></p>
              </div>
            </div>
          </div>
        </div>
      ';
    }
    ?>
  </section>
<!-- END slider -->
</div> 