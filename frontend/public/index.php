<?php
require __DIR__.'/../vendor/autoload.php';

use LolBoard\Controllers\Main;

//!démarrage de la session (ceci va nous permettre de stocker des variables persistantes entres les rafraichissements de page (dans $_SESSION))
session_start();


//calcul du baseURI sans avoir besoin d'utiliser le fichier.htaccess
$baseURI = $_SERVER['REQUEST_URI'];
$baseURI = str_replace('index.php', '', $baseURI);
$baseURI = preg_replace('`/$`', '', $baseURI);


// création de l'objet router
// Cet objet va gérer les routes pour nous, et surtout il va 
$router = new AltoRouter();
$router->setBasePath($baseURI);

$router->map(
  'GET',
  '/',
  [
      'controller' => Main::class,
      'method' => 'home'
  ],
  'main-home'
);


$match = $router->match();


$controllerName = $match['target']['controller'];
$methodName =  $match['target']['method'];

$controller = new $controllerName($router);
call_user_func_array([$controller, $methodName], $match['params']);


