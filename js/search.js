var searchUrl = "https://api.genius.com/search?access_token=S0vCfM0Pfq1zQbUqiyqb82d9XlT3Nzf0pDea6f_IlZm3FF596UR2RQ4__dEm-Y-b";

function search(){

    var nameQuery = $("#name").val();

    $.ajax({
        method: "GET",
        url: searchUrl,
        data: { q: nameQuery}
      })
        .done(function( data ) {
            var resultJson = data;
          display(resultJson);
    });

}

function createArtistsArray(resultJson){
    var artists = [];

    for(var i in resultJson.response.hits){
        
        var artist = {
            name: resultJson.response.hits[i].result.primary_artist.name,
            id: resultJson.response.hits[i].result.primary_artist.id,
            image_url: resultJson.response.hits[i].result.primary_artist.image_url
        };

        var unique = true;
        for(var j in artists){
            if(artist.id == artists[j].id){
                unique = false;
                break;
            }
        }

        if(unique)
            artists.push(artist);
    }
    return artists;
}

function display(resultJson){
    $("#list-container").empty();

    var artists = createArtistsArray(resultJson);


    // Création de chaque encart d'artiste
    for(var i in artists){
        
        //artist container
        var cell = $('<div/>', {class: 'col-sm-6' }).append($('<div/>',{class: 'row border center-items'}));

        //content values
        var id = artists[i].id, name = artists[i].name, url = artists[i].image_url

        //content fields
        var image = $('<div/>', {class: 'col-sm-2 nopadding' })
                .append($('<img/>',{class: 'img-fluid', src:url, }));
        var artistField = $('<div/>', {class: 'col-sm-9' })
                .append(name);
        var subButton = $('<div/>',{class: 'col-sm-1 nopadding'})
                .append($('<button/>',{class: 'btn btn-light', type: 'button', id:id}).append('<i class="far fa-plus-square"></i>'));

        subButton.find('button').attr('onclick','subscribe('+id+',"'+name+'","'+url+'");');

        

        cell.find(".row").append(image);
        cell.find(".row").append(artistField);
        cell.find(".row").append(subButton);

        $("#list-container").append(cell);
        
    }

    
}

//TODO
function subscribe(id, name, url){
    db.artists.add({
        id: id,
        name: name,
        image_url: url
	});
}