<?php
include_once "setVilles.php";
include_once "villes.php";
$population = $_POST["population"];
$op = $_REQUEST["op"];
$res = null;
foreach ($villes as $commune=>$ville)
    {
        if ($op == "inf")
            {
                if ($ville->population < $population)
                    {
                        $res[$commune]=$ville;
                    }
            }
        else if ($op == "sup")
            {
                if ($ville->population > $population)
                    {
                        $res[$commune]=$ville;
                    }
            }
        
    }
echo json_encode($res);

?>