// Book Button Functions
var bookBtn = $("#bookBtn");
var foodBtn = $("#recipeBtn");

foodBtn.on("click", function () {
    window.open("foodSearchRes.html", "Recipe Search");
    return false;
})

// Recipe Ajax Calls

$("#foodSearchBtn").on("click", function (event) {
    event.preventDefault();
    var ingredient = $("#ingredientSearch").val();
    var cuisineType = $("#cuisineTypeSearch").val();
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=" + ingredient + "&app_id=6c9b8077&app_key=059073cffca1764d3468e9cc3a69efca";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        $("#img0").attr("src", response.hits[0].recipe.image);
        $("#img1").attr("src", response.hits[1].recipe.image);
        $("#img2").attr("src", response.hits[2].recipe.image);
        $("#img3").attr("src", response.hits[3].recipe.image);
        $("#img4").attr("src", response.hits[4].recipe.image);

        $("#text0").text(response.hits[0].recipe.label).attr("href", response.hits[0].recipe.url);
        $("#text1").text(response.hits[1].recipe.label).attr("href", response.hits[1].recipe.url);
        $("#text2").text(response.hits[2].recipe.label).attr("href", response.hits[2].recipe.url)
        $("#text3").text(response.hits[3].recipe.label).attr("href", response.hits[3].recipe.url)
        $("#text4").text(response.hits[4].recipe.label).attr("href", response.hits[4].recipe.url)
    })
})