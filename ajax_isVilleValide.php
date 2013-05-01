<?php
include_once "setVilles.php";
include_once "villes.php";
$recherche = $_POST["recherche"];
echo json_encode(is_ville_valide($villes,$recherche));
?>