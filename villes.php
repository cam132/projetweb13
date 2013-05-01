<?php
/**Gere les listes de villes, l'import depuis un CSV ...
 */
include_once "Ville.class.php";

/** Crée une ville a partir d'une chaine de la forme
 *  INSEE, Commune, Latitude, Longitude, Population
 * --- Pour le moment, INSEE et Population sont ignorés
 */
function ville_of_string($string) {
    $l = explode (",",$string);
    return new Ville($l[0],$l[1],$l[2],$l[3],$l[4]);
    }


/** Retourne une table de hashage ville.commune->ville
 * à partir d'un CSV filename dont le chemin est passé en paramètre
 */
function villes_of_file($filename) {
    $l = array();
    $source = fopen($filename,"r");
    $ligne = true;
    if ($source)
        {
            while (!feof($source))
                {
//Penser à gérer le cas de la dernière ligne
                    $newline=fgets($source);
                    if ($newline)
                        {
                            $ville=ville_of_string($newline);
                            $l[$ville->commune]=$ville;
                        }
                }
            fclose($source);
        }
    else
        {
            throw new exception("Liste de ville non trouvée !");
        }
    return $l;
}

//*Renvoie une ville
function print_villes ($array) {
    foreach($array as $k=>$v)
        {
            echo $k;
        }
}

/* Répond si oui ou non une commune existe dans une liste de ville
 */
function is_ville_valide($villes,$string) {
    return (isset($villes[$string]));
}

/** Renvoie les coordonnées d'une ville si la commune existe,
 * 0 sinon
 */
function coord_of_ville($villes,$string){
    if (array_key_exists ($string,$villes))
        return $villes[$string]->getLongitude().",".$villes[$string]->getLatitude();
    else
        return 0;
}
?>