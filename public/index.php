<!doctype html>

<html>
<head>
    <title>Test Lol api</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

    <h1>Lol Api workbench</h1>
    <section class="search">
        <form id="search-invocator">
            <input placeholder="Invocateur" name="invocateur" value="furiie"/><button>Chercher</button>
            
        </form>
    </section>

    <section class="matches"></section>
    



    <template id="match-template">
        <article class="match">
            <div class="header"></div>
            <div class="detail">
                <div class="champion">
                    <img class="champion-thumbnail" src="http://ddragon.leagueoflegends.com/cdn/10.11.1/img/champion/Orianna.png"/>
                    <div class="level"></div>
                </div>

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
            
        </article>
    </template>


    <script src="assets/javascript/LolApi.js"></script>
    <script src="assets/javascript/app.js"></script>

    <script>
        document.addEventListener('DOMContentLoaded', app.init);
    </script>
</body>
</html>

