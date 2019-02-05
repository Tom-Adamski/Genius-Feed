var foo;

function load(){
    $.ajax({
        method: "POST",
        url: 'php/getsubscriptions.php',
        data: {}
      })
        .done(function( data ) {
          var resultJson = JSON.parse(data);
          display(resultJson);
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
    foo = artists;
    return artists;
}

function display(resultJson){
    $("#list-container").empty();

    var artists = createArtistsArray(resultJson);


    // Création de chaque encart d'artiste
    for(var i in artists){

        var id = artists[i]['id'], name = artists[i]['name'], url = artists[i]['image_url']
        console.log(url);

        var image = $('<div/>', {class: 'col-sm-2 nopadding' })
                .append($('<img/>',{class: 'img-fluid', src:url, }));
        var artistField = $('<div/>', {class: 'col-sm-8' })
                .append(name);
        
        /// TODO manage subscription
        var subButton = $('<div/>',{class: 'col-sm-2 nopadding'})
                .append($('<button/>',{class: 'btn btn-light', type: 'button', id:id}).append('<i class="far fa-plus-square"></i>'));

        //subButton.find('button').attr('onclick','subscribe('+id+',"'+name+'","'+url+'");');

        var cell = $('<div/>', {class: 'col-sm-6' }).append($('<div/>',{class: 'row border'}));

        cell.find(".row").append(image);
        cell.find(".row").append(artistField);
        /// TODO
        //cell.find(".row").append(subButton);

        $("#list-container").append(cell);
        
    }

    
}