function getSuggest(recherche) {
    var xmlhttp;
    var listeville=null;
    var unparsed;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    function toListeVille(data) {
	if (data)
        {
            //console.log(data);
	    listeville = JSON.parse(data);
        }
        //	console.log("Data : ");
        //	console.log(data);
        //	console.log("Retournons l'objet ville créé : ");
        //	console.log(ville);
        //	return ville;
    }
    
    xmlhttp.onreadystatechange=function()
    {
	if (xmlhttp.readyState==4 && xmlhttp.status==200)
	{
	    toListeVille(xmlhttp.responseText);
	}
    }


    xmlhttp.open("POST","getSuggest.php",false);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("recherche="+recherche);
    return listeville;
}
