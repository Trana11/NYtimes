

function searchLibrary() {

    event.preventDefault();

    var searchTerms = $("#search-terms").val()
    var records = $("#article-number option:selected").val()

    //start year and end year blank still broken
    var startYear = $("#start-year-search").val()
    var endYear = $("#end-year-search").val()


    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': "9b80575ae5c7473ca8f85ebe9a5d4e67",
        'q': searchTerms,
        'begin_date': startYear + "0101",
        'end_date': endYear + "1231"
    });

    $.ajax({
        url: url,
        method: 'GET',
    }).then(function (result) {
        console.log(result)
        result.response.docs.forEach(function (doc) {
            var newDiv = $("<div>")
            var title = $("<p>")
            var link = $("<a>")
            link.append(doc.web_url)
            link.attr("href", doc.web_url)
            title.append(doc.headline.main)

            newDiv.append(title);
            newDiv.append(link);
            newDiv.addClass("card-body");
            newDiv.addClass("border");
            newDiv.addClass("borderprimary");

            //number of articles displayed is broken

            $("#articles").prepend(newDiv)


            console.log(doc.headline.main);
        })

    });

}
$("#search-submit").on("click", searchLibrary)

$("#clear-results").on("click", function (event) {
    event.preventDefault();
    $("#articles").empty();
})
