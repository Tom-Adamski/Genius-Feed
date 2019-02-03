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

    var name = resultJson.response.hits[0].result.primary_artist.name;

    $("#list-container").append('<div class="col-sm-12">'+name+'</div>')
}