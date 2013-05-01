function getVille(recherche) {
    var xmlhttp;
    var ville=null;
    var unparsed;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    function toVille(data) {
	if (data)
	    ville = JSON.parse(data);
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
	    toVille(xmlhttp.responseText);
	}
    }


    xmlhttp.open("POST","getVille.php",false);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("recherche="+recherche);
    return ville;
}
