var artistsUrl = "https://api.genius.com/artists/";
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

        loadingCount++; //permet d'afficher une fois que tous les artistes ont leur chanson chargée

        $.ajax({
            method: "GET",
            crossDomain:true,
            url: artistsUrl + artists[i]['id'] + songsSuffix,
            data: { page: "1", sort:"release_date", per_page:"1", access_token:accessToken}
          })
            .done(function( json ) {
                addToSongsArray(json);
                displaySongs();
        });     
    }
}

function addToSongsArray(json){

    var hits = json.response.songs;
    for(var i in hits){
        
        var song = {
            title: hits[i]['title'],
            id: hits[i]['id'],
            image_url: hits[i]['header_image_url']
        };
        
        /* UNIQUE
        var unique = true;
        for(var j in artists){
            if(artist.id == artists[j].id){
                unique = false;
                break;
            }
        }*/

        /*
            SORT
        */

        songs.push(song);
        loadingCount--;
    }
}

function displaySongs(){
    if(loadingCount == 0){ // toutes les chansons ont été chargées
        $("#list-container").empty();
        console.log("Start displaying");
        console.log(songs);
        // Création de chaque encart de chansons
        for(var i in songs){
            //song container
            var cell = $('<div/>', {class: 'col-sm-6' }).append($('<div/>',{class: 'row border center-items'}));

            //content values
            var id = songs[i]['id'], title = songs[i]['title'], url = songs[i]['image_url'];

            //content fields
            var image = $('<div/>', {class: 'col-sm-2 nopadding' })
                    .append($('<img/>',{class: 'img-fluid', src:url, }));
            var titleField = $('<div/>', {class: 'col-sm-8' })
                    .append(title);
        
            
            cell.find(".row").append(image);
            cell.find(".row").append(titleField);
        
            $("#list-container").append(cell);
        
        }



    }
}