<?php

if( isset($_POST["id"]) && isset($_POST["name"]) && isset($_POST["image_url"])){

    $bdd =  new PDO('mysql:host=localhost;dbname=genius-news', 'root', 'root');
    $query = "INSERT INTO artist (`id`,`name`, `image-url`) VALUES (?, ?, ?)";
    $req = $bdd->prepare($query);
    $req->bindParam(1, $_POST['id']);
    $req->bindParam(2, $_POST['name']);
    $req->bindParam(3, $_POST['image_url']);

    $req->execute();


}

?>