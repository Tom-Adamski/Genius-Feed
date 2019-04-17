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


function display(){
    db.songs.where('release_date').belowOrEqual(new Date().toISOString().split('T')[0]).
            toArray(array => displaySongs(array));
}

function displaySongs(songs){
    $("#list-container").empty();
    // Création de chaque encart de chansons
    for(var i in songs){

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
