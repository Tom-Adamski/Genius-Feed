var nameQuery;

var searchUrl = "https://api.genius.com/search?access_token=S0vCfM0Pfq1zQbUqiyqb82d9XlT3Nzf0pDea6f_IlZm3FF596UR2RQ4__dEm-Y-b";

var resultJson;


function search(){

    nameQuery = $("#name").val();

    $.ajax({
        method: "GET",
        url: searchUrl,
        data: { q: nameQuery}
      })
        .done(function( data ) {
          resultJson = data;
          display();
    });

}

function display(){
    $("#list-container").empty();

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



    for(var i in artists){

        var image = $('<div/>', {class: 'col-sm-2 nopadding' })
                .append($('<img/>',{class: 'img-fluid', src:artists[i].image_url, }));
        var artistField = $('<div/>', {class: 'col-sm-8' })
                .append(artists[i].name);
        var subButton = $('<div/>',{class: 'col-sm-2 nopadding'})
                .append($('<button/>',{class: 'btn btn-secondary', type: 'button'}).append("Subscribe"));


        var cell = $('<div/>', {class: 'col-sm-6' }).append($('<div/>',{class: 'row border'}));

        cell.find(".row").append(image);
        cell.find(".row").append(artistField);
        cell.find(".row").append(subButton);

        $("#list-container").append(cell);
        
    }

    
}