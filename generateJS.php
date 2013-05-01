<?php
// On va maintenant générer du javascript
include "init.php"
?>



<script type="text/javascript">
//Crée une fonction javascript getListeVille() qui permet de récupérere la hastable des Ville de PHP,
function getListeVille() {
    var data = <?php echo json_encode($villes) ?>;
    return data;
}
</script>
