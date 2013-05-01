var map = null
var calqueMarqueurs = null;
var oldtextecherche;

/* Initialise tout
*/
function initAll() {
    drawmap();
//    listeville = getListeVille();
}

/** Dessine la carte de base
*/
function drawmap () {
    map = new OpenLayers.Map('macarte');
    //Ajoutons le controle au clavier
    map.addControl(new OpenLayers.Control.KeyboardDefaults());
    map.addLayer(new OpenLayers.Layer.OSM());
//Allons au centre de la France =]
gotoFrance();
}

/* Transforme deux nombres en une coordonnée openLayer
*/
function getCoordonnee(longitude,latitude) {
    var projCarte = map.getProjectionObject();
    var projSpherique = new OpenLayers.Projection("EPSG:4326");
    var coord = new OpenLayers.LonLat(longitude,latitude);
    coord.transform(projSpherique,projCarte);
    return coord; 
}


function gotoFrance()
{
gotocoordonee(1.875278,46.60611);
    map.zoomTo(5);
}
/* Centre la vue sur les coordonnées passées en paramètres
*/
function gotocoordonee(longitude,latitude) {
    //    alert(longitude + " " + latitude);
    var coord = getCoordonnee(longitude,latitude)
    map.setCenter(coord,11);
    //    alert("done ? : " + coord);
}

/* Centre la vue et zoom sur une ville passé en paramètre
*/
function goToVille(ville) {
    if(ville)
    {
	var longitude=ville.longitude;
	var latitude=ville.latitude;
	gotocoordonee(longitude,latitude);
    }
}

//Renvoie vrai si le texte recherché est de la forme pop:xxxxx
function isPop(textecherche)
{
    return textecherche.match(/^pop[<|>][0-9]+$/i)
}

function villeToMarqueur(ville) {
	var longitude = ville.longitude;
	var latitude = ville.latitude;
	//console.log("listToMarqueurs : " + commune + " long : " + longitude + " lat : " + latitude);
	var coord = getCoordonnee(longitude,latitude);
	var tmpMarqueur = new OpenLayers.Marker(coord);
	//console.log(coord);
    tmpMarqueur.onClu
	calqueMarqueurs.addMarker(tmpMarqueur);

}

/* Dessine sur la carte les marqueurs correspondant aux villes contenu dans un tableau[commune] passé en paramètre
*/
function listToMarqueurs(liste) {
    if (calqueMarqueurs)
    {
	console.log("listToMarqueurs : clearing marquers layer");
	calqueMarqueurs.destroy();
    }
    calqueMarqueurs = new OpenLayers.Layer.Markers("Repères");
    for (var commune in liste)
    {
	villeToMarqueur(liste[commune]);
    }
    map.addLayer(calqueMarqueurs);
}

/* Dessine une popup contenant le nom de la ville et sa population sur une ville passée en paramètre
*/
function villeToPopUp(ville) {
    console.log("Poping up : " + ville.commune);
    var popup = new OpenLayers.Popup(ville.commune,
				 getCoordonnee(ville.longitude,ville.latitude),
				 new OpenLayers.Size(200,50),
				 ville.codeinsee + " " + ville.commune + " <br> Population = " + ville.population + "habs" ,
				 true);
    popup.setOpacity(0.75);
    popup.setBorder("5px");
    map.addPopup(popup);
}

function listToString(liste) {
    var res;
    for (var commune in liste)
    {
        res = res + ", "+commune;
    }
    return res;
}

/* Fonction appelé quand l'utilisateur presse une touche dans la barre de recherche :
* On vérifie que le contenu de la barre est changé,
* On affiche sur la carte des marqueurs suggérant la ville recherché
* si l'utilisateur demande une population, on affiche sur la carte des marqueurs sur les villes validant la population demandée
* (qui peut etre inférieure ou supérieure à un nombre)
* si l'utilisateur demande une ville connu, on s'y déplace et on affiche une popup contenant des informations supplémentaires
*/
function searchAndGoToPlaces(textecherche) {
    //On vérifie que le texte est changé; en effet, l'évenement onmouseup (voir dans home.php) continue d'etre rappelé meme si l'utilisateur
    //n'appuie pas sur une touche supplémentaire
    if (textecherche != "" && textecherche != oldtextecherche)
    {
	oldtextecherche = textecherche;
	//On place les suggestions
	listToMarqueurs(getSuggest(textecherche));
	if (textecherche == "France")
{
gotoFrance();
}
	else if (isPop(textecherche))
	{//L'utilisateur demande une population
            var op;
	    //On détermine la comparaison demandée
            if (textecherche.charAt(3)=="<")
		op="inf";
            else if ((textecherche).charAt(3)==">")
		op="sup";
	    //On récupère la valeur de la population demandée
	    var pop = parseInt(textecherche.substring(4,textecherche.length));
	    console.log("searchAndGoToPlaces : looking for pop = " + pop);
	    //On demande à php de nous renvoyé une liste de ville validant la condition
            var list=getPop(pop,op);
	    //On affiche la liste sur la carte
	    listToMarqueurs(list);
	}
	else if (isVilleValide(textecherche))
	{
	    console.log("searchAndGoToPlaces : going to " +textecherche)
	    //On demande à php de nous renvoyé la ville correspondant à la recherche
	    var ville = getVille(textecherche);
	    goToVille(ville);
	    villeToPopUp(ville);
	}
    }
}

window.addEventListener("load",initAll,false);
