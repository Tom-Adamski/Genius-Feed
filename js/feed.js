var artistsUrl = "https://api.genius.com/artists/";
var songsUrl = "https://api.genius.com/songs/"
var songsSuffix = "/songs";

var accessToken = "rQtoe-mTiZO_EFGvaopmbn3eWKnMyolMAL_m7XzQyZkgxAeeM3zsU_sRfzKrmKYC";

var loadingCount = 0;
var songs = [];


function loadFetchDisplay(){
    //load artists
    $.ajax({
        method: "POST",
        url: 'php/getsubscriptions.php',
        data: {}
      })
        .done(function( data ) {
            var resultJson = JSON.parse(data);
            var artists = createArtistsArray(resultJson);
            fetchSongs(artists);
    });
}

function createArtistsArray(resultJson){
    var artists = [];
    for(var i in resultJson){
        var artist = {
            name: resultJson[i]['name'],
            id: resultJson[i]['id'],
            image_url: resultJson[i]['image-url']
        };
        artists.push(artist);
    }
    return artists;
}

function fetchSongs(artists){

    songs = [];
    // Pour chaque artiste
    for(var i in artists){
        (function (i) {
            loadingCount++; //permet d'afficher seulement une fois que tous les artistes ont leur chanson chargée
            var featName = artists[i]['name'];

            $.ajax({
                method: "GET",
                crossDomain:true,
                url: artistsUrl + artists[i]['id'] + songsSuffix,
                data: { page: "1", sort:"release_date", per_page:"1", access_token:accessToken}
            })
                .done(function(json) {
                    // when executing AJAX the iterator is already at the end, sending the wrong feat name
                    //console.log(artists[i]['name']);
                    console.log(featName);
                    addToSongsArray(json, featName);
            });    
        })(i); 
    }
}

function addToSongsArray(json, featName){

    var hits = json.response.songs;
    for(var i in hits){
        
        var song = {
            title: hits[i]['title'],
            id: hits[i]['id'],
            image_url: hits[i]['header_image_url'],
            artist_name:hits[i]['primary_artist']['name']
        };

        if(song.artist_name != featName)
            song['feat_name']= featName;

        getDateAddToArray(song);
    }
}

function getDateAddToArray(song){

    $.ajax({
        method: "GET",
        crossDomain:true,
        url: songsUrl + song.id,
        data: {access_token:accessToken}
      })
        .done(function( json ) {
            song['release_date'] = json['response']['song']['release_date'];
            songs.push(song);
            loadingCount--;
            displaySongs();
    }); 
}

function displaySongs(){
    if(loadingCount == 0){ // toutes les chansons ont été chargées
        $("#list-container").empty();
        console.log(songs);
        // Création de chaque encart de chansons
        for(var i in songs){

            //song container
            var row = $('<div/>', {class: 'row border center-items' });

            //content values
            var id = songs[i]['id'], title = songs[i]['title'], 
                url = songs[i]['image_url'], release_date = songs[i]['release_date']
                artist_name = songs[i]['artist_name'], feat_name = null;

            if(songs[i]['feat_name'] != null)
                feat_name = songs[i]['feat_name'];


            //content fields
            var image = $('<div/>', {class: 'col-sm-2 nopadding' })
                    .append($('<img/>',{class: 'img-fluid', src:url, }));
            var contentField = $('<div/>', {class: 'col-sm-10' });

            var titleField = $('<div/>', {class: 'row' }).append(title);
            var artistField = $('<div/>', {class: 'row' }).append(artist_name);
            var featField = $('<div/>', {class: 'row' }).append(feat_name);
            var dateField = $('<div/>', {class: 'row' }).append(release_date);

            contentField.append(titleField).append(artistField).append(featField).append(dateField);
        
            
            row.append(image);
            row.append(contentField);
        
            $("#list-container").append(row);
        
        }



    }
}