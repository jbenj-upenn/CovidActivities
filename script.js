$(document).ready(function () {
    console.log("ready!");


    $("#bookBtn").on("click", function (event) {
        event.preventDefault();
        $("#mainCard").html("<div><input id='bookSearch'> <button id='bookSearchButton' class='button' /></div > ")
    })

    $("#mainCard").on("click", "#bookSearchButton", function (event) {
        event.preventDefault();
        console.log("clicked")
        var bookSearchInput = $("#bookSearch").val()
        var queryURL = "https://www.googleapis.com/books/v1/volumes?q=+intitle" + bookSearchInput + "&key=AIzaSyB_qVUwrTtb7vLduMA6jovLXJTJW8UBiIE";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                console.log(response)
                response.items.forEach(book => {
                    $("#mainCard").append(`
                    <div class="card"> 
                    <h1>${book.volumeInfo.title}</h1>
                    <img src=${book.volumeInfo.imageLinks.smallThumbnail}/>
                    </div>`)
                })

                var bookTitle = response.items[0].volumeInfo.title


                console.log(bookTitle)

            })
    })





    $("#recipeBtn").on("click", function (event) {
        event.preventDefault();
        $("#mainCard").html("<div class = box><figure class = 'image-is-square'><button id= 'recipeSearchButton' class= 'button'/></figure></div>")
    })

    $("#mainCard").on("click", "#recipeSearchButton", function (event) {
        event.preventDefault();
        console.log("clicked")

        var userSearch = $("#searchInput").val()


        var queryURL = "https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=chicken&app_id=df0c7466&app_key=9d5d7e94beb6606845f7c4cab6f31da7&from=0&to=3&calories=591-722&health=alcohol-free"
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                localStorage.setItem("response", response)

                var data = localStorage.getItem(JSON.parse([0]))

                console.log(data)










            })

    })




    //     })

    // $("#luckyBtn").on("click", function (event) {}

})