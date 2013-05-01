<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <script src="http://www.openlayers.org/api/OpenLayers.js" type="text/javascript"></script>
    <script type="text/javascript" src="initCarte.js"></script>
    <script type="text/javascript" src="ajax_getVille.js"></script>
    <script type="text/javascript" src="ajax_getPop.js"></script>
    <script type="text/javascript" src="ajax_getSuggest.js"></script>
    <script type="text/javascript" src="ajax_isVilleValide.js"></script>
    <script type="text/javascript" src="ajax_getDepartement.js"></script>
    <link rel="stylesheet" type="text/css" href="home.css"/>
    <title> Regardeur de carte TW </title>


  </head>
  <body>
    <?php 
      include_once "init.php"
    ?>
    <div id="byCoordonate" class="popup">
      <fieldset>
	<legend>
	  Latitude et longitude
	</legend>
	<input id="longitude" type="text" name="longitude"></input>
	<input id="latitude" type="text" name="latitude"></input>
	<button id="go" onclick="bouton();">Go ! </button>
      </fieldset>
    </div>
    <div id="searchbar" class="popup">
      <fieldset>
	<legend>
	  Recherche libre
	</legend>
	<input onkeyup=searchAndGoToPlaces(this.value); id="searchinput" type="text" name="searchinput" placeholder="Recherche Libre"></input>
	<button id="search" onclick="searchAndGoToPlaces(document.querySelectorAll(".searchinput").value);">Go !</button>
      </fieldset>
    </div>
    <div id="macarte">
    </div>
  </body>
</html>
