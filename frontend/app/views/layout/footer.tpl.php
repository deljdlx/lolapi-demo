<?php
require(__DIR__ . '/../partials/footer.tpl.php');
?>
    

    <!-- loader -->
    <div id="loader" class="show fullscreen"><svg class="circular" width="48px" height="48px"><circle class="path-bg" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke="#eeeeee"/><circle class="path" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke-miterlimit="10" stroke="#cf1d16"/></svg></div>

    <script src="vendor/theme/js/jquery-3.2.1.min.js"></script>
    <script src="vendor/theme/js/popper.min.js"></script>
    <script src="vendor/theme/js/bootstrap.min.js"></script>
    <script src="vendor/theme/js/owl.carousel.min.js"></script>
    <script src="vendor/theme/js/jquery.waypoints.min.js"></script>
    <script src="vendor/theme/js/aos.js"></script>

    <script src="vendor/theme/js/jquery.magnific-popup.min.js"></script>
    <script src="vendor/theme/js/magnific-popup-options.js"></script>
    

    <script src="vendor/theme/js/main.js"></script>

    <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>


    <script src="https://cdn.jsdelivr.net/npm/echarts@4.7.0/dist/echarts.min.js"></script>



    <script src="assets/javascript/api/Repository.js"></script>
    <script src="assets/javascript/api/Entity.js"></script>

    <script src="assets/javascript/api/Match.js"></script>
    <script src="assets/javascript/api/Participant.js"></script>
    <script src="assets/javascript/api/Participation.js"></script>
    <script src="assets/javascript/api/LeagueRank.js"></script>

    <script src="assets/javascript/api/Summoner.js"></script>
    <script src="assets/javascript/api/Champion.js"></script>
    <script src="assets/javascript/api/Client.js"></script>


    <script src="assets/javascript/LolApiWorkbench.js"></script>

    <script src="assets/javascript/Components/MatchCarousel.js"></script>
    <script src="assets/javascript/Components/LanePiChart.js"></script>
    <script src="assets/javascript/Components/RolePiChart.js"></script>
    <script src="assets/javascript/Components/SummonerDetails.js"></script>


    
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        const application = new LolApiWorkbench();
        application.initialize();
      });

    </script>
    
  </body>
</html>