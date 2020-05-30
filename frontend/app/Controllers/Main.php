<?php

namespace LolBoard\Controllers;

class Main extends Core {

    public function home()
    {

        $viewVars = [
        ];

        // On appelle la méthode show() de l'objet courant
        // En argument, on fournit le fichier de Vue
        // Par convention, chaque fichier de vue sera dans un sous-dossier du nom du Controller
        $this->show('main/home', $viewVars);
    }
}
