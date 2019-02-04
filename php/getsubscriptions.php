<?php

$bdd =  new PDO('mysql:host=localhost;dbname=genius-news', 'root', 'root');

$bdd->query("SET CHARACTER SET utf8;");

$query = "SELECT * FROM artist";
$req = $bdd->prepare($query);

$reponse = $req->execute() or die('Erreur');
$result = $req->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);


?>