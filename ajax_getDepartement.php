<?php
include_once "setVilles.php";
include_once "villes.php";
$recherche = $_POST["recherche"];
$res=null;
foreach ($villes as $commune=>$ville)
    { //Renvoyons toutes les villes dont les deux premiers chiffres du code INSEE correspondent à la recherche
        if (substr($ville->codeinsee,0,2)==$recherche)
            $res[$commune]=$ville;
    }
echo json_encode($res);
?>