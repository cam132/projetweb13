<?php

//Lit dans $_POST un nom de ville, renvoie l'objet ville correspondant
include_once "setVilles.php";
include_once "villes.php";
$recherche = $_POST["recherche"];
if (is_ville_valide($villes,$recherche))
    echo json_encode($villes[$recherche]);

?>