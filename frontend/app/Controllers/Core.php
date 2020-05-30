<?php

namespace LolBoard\Controllers;

class Core
{

    protected $router;
    protected $baseURI;

    public function __construct($router)
    {
        $this->router = $router;
    }

    public function setBaseURI($baseURI)
    {
        $this->baseURI = $baseURI;
    }

    protected function show(string $viewName, $viewVars = []) {

        $router = $this->router;
        $viewVars['baseUri'] = $this->baseURI;
        extract($viewVars);


        // $viewVars est disponible dans chaque fichier de vue
        require_once __DIR__.'/../views/layout/header.tpl.php';
        require_once __DIR__.'/../views/'.$viewName.'.tpl.php';
        require_once __DIR__.'/../views/layout/footer.tpl.php';
    }
}
