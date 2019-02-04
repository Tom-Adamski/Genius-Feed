<?php

if( isset($_GET["id"]) && isset($_GET["name"]) && isset($_GET["image-url"])){

    $bdd =  new PDO('mysql:host=localhost;dbname=genius-news', 'root', 'root');
    $query = "INSERT INTO artist (`id`,`name`, `image-url`) VALUES (?, ?, ?)";
    $req = $bdd->prepare($query);
    $req->bindParam(1, $_GET['id']);
    $req->bindParam(2, $_GET['name']);
    $req->bindParam(3, $_GET['image-url']);

    $req->execute();


}

//http://localhost/genius-news/php/subscribe.php?id=5&name=kdb&image-url=test.com

?>