var artistsUrl = "https://api.genius.com/artists/";
var songsUrl = "https://api.genius.com/songs/"
var songsSuffix = "/songs";

var accessToken = "rQtoe-mTiZO_EFGvaopmbn3eWKnMyolMAL_m7XzQyZkgxAeeM3zsU_sRfzKrmKYC";

//var loadingCount = 0;
//var songs = [];


function loadFetchDisplay(){
    db.artists.toArray(artists => fetchSongs(artists));
}


//TODO Use loadingCount to check when update is finished
function update(){
    db.artists.toArray(function(artists){
        songs = [];
        for(var i in artists){
            (function (i) {
                //loadingCount++; //permet d'afficher seulement une fois que tous les artistes ont leur chanson chargée
                var featName = artists[i]['name'];

                $.ajax({
                    method: "GET",
                    crossDomain:true,
                    url: artistsUrl + artists[i]['id'] + songsSuffix,
                    data: { page: "1", sort:"release_date", per_page:"1", access_token:accessToken}
                })
                    .done(function(json) {
                        // when executing AJAX the iterator is already at the end, sending the wrong feat name
                        saveSong(json, featName);
                });    
            })(i); 
        }
    });
}

function saveSong(json,featName){
    var hits = json.response.songs;
    for(var i in hits){
        
        var song = {
            title: hits[i]['title'],
            id: hits[i]['id'],
            image_url: hits[i]['header_image_url'],
            artist_name:hits[i]['primary_artist']['name']
        };

        if(song.artist_name != featName)
            song['feat_name'] = featName;
        else
            song['feat_name'] = null;
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
            console.log('Titre '+song['title']+' date '+song['release_date']);

            db.songs.put({
                id: song['id'],
                title: song['title'],
                artist_name: song['artist_name'],
                release_date: song['release_date'],
                image_url: song['image_url'],
                feat_name: song['feat_name']
            });
            //loadingCount--;
    }); 
}

function display(){
    db.songs.toArray(array => displaySongs(array));
}

function displaySongs(songs){
    $("#list-container").empty();
    // Création de chaque encart de chansons
    for(var i in songs){

        console.log(songs[i]);

        //song container
        var row = $('<div/>', {class: 'row border center-items' });

        //content values
        var id = songs[i]['id'], 
            title = songs[i]['title'], 
            url = songs[i]['image_url'], 
            release_date = songs[i]['release_date']
            artist_name = songs[i]['artist_name'], 
            feat_name = null;

        if(songs[i]['feat_name'] != null)
            feat_name = songs[i]['feat_name'];


        //content fields
        var image = $('<div/>', {class: 'col-sm-2 nopadding' })
                .append($('<img/>',{class: 'img-fluid', src:url, }));
        var contentField = $('<div/>', {class: 'col-sm-10' });

        var titleField = $('<div/>', {class: 'row' }).append("Titre : "+title);
        var artistField = $('<div/>', {class: 'row' }).append("Artiste : "+artist_name); 
        var dateField = $('<div/>', {class: 'row' }).append("Sortie : "+release_date);

        contentField.append(titleField).append(artistField).append(dateField);
        
        if(feat_name != null){
            var featField = $('<div/>', {class: 'row' }).append("Featuring : "+feat_name);
            contentField.append(featField)
        }
        
        row.append(image);
        row.append(contentField);
    
        $("#list-container").append(row);
    
    }
}

function flush(){
    db.songs.clear();
}