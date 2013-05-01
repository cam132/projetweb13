<?php
include_once "setVilles.php";
include_once "villes.php";
$recherche = $_POST["recherche"];
$res = null;
foreach ($villes as $commune=>$ville)
    {
        if (strpos($commune,$recherche) !== false)
            $res[$commune]=$ville;
    }
echo json_encode($res);
?>
