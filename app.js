$(document).ready(function () {

    // Setup Key Bindings
    $("#searchBtn").on("click", searchCall_click);    
});

$(document).keypress(function (e) {   
    if (e.which === 13) {
        searchCall_click();
    }
});

function searchCall_click() {
    $("#resultDiv").html("");
    var queryData = $("#searchBox").val();
    $.ajax({
        url: "https://en.wikipedia.org/w/api.php",
        method: "GET",
        data: {
            format: "json",
            action: "query",
            generator: "search",
            gsrlimit: "20",
            prop: "pageimages|extracts",
            exintro: "5",
            explaintext: "4",
            exsentences: "4",
            exlimit: "max",
            origin: '*',
            gsrsearch: queryData
        },       
        success: function (data) {            
            if (data.query !== undefined) {
                formatData(data.query.pages);
            } else {
                alert("Sorry your search returned no results");
            }
        },
        error: function (response) {            
            alert(response.statusText);
        }
    });
}

function formatData(responseData) {   
    var formattedData = [];

    for (var rank in responseData) {
        formattedData.push([rank, responseData[rank]]);
    }
    
    formattedData.sort(function (a, b) {       
        return a[1]["index"] - b[1]["index"];
    });
   
   displayData(formattedData);    
}

function displayData(formattedData) {   
    formattedData.forEach(function (e) {
        $("#resultDiv").append("<a href='" + "https://en.wikipedia.org/wiki/" + e[1].title + "'><div class='col-md-12 articleDiv'>"
                + "<h2>" + e[1].title + "</h2>"
                + "<p>" + e[1].extract + "</p>"

                + "</div></a>");
    });
}

