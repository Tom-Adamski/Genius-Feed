var db = new Dexie("music_database");

db.version(1).stores({
    artists: 'id,name,image_url',
});
db.version(2).stores({
    artists: 'id,name,image_url',
    songs: 'id,title, artist_name,image_url,feat_name'
});
db.version(3).stores({
    artists: 'id,name,image_url',
    songs: 'id,title, artist_name, release_date, image_url, feat_name'
});
          


function updateSongs(){

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