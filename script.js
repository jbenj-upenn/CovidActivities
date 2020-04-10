$(document).ready(function () {
    console.log("ready!");



    $("#bookBtn").on("click", function (event) {
        event.preventDefault();
        $("#mainCard").html(`<div class="container">
    <div class="field">
        <label class="label">Covid Book Titles</label>
        <div class="control">
            <i class="fas fa-book"></i>
            <input class="input" id= "titleSearch" type="text" placeholder="Search by Title" style="width: 45%">
            <button class="button is-focused is-black searchButtons" id="searchButton2">Search</button>
            <i class="fas fa-book"></i>
        </div>
    </div>
    <div class="field">
        <label class="label">Covid Book Authors</label>
        <div class="control">
            <i class="fas fa-book"></i>
            <input class="input" id = "authorSearch" type="text" placeholder="Search by Author" style="width: 45%">
            <button class="button is-focused is-black searchButtons" id="searchButton2">Search</button>
            <i class="fas fa-book"></i>
        </div>
    </div>
    <div class="field">
        <label class="label">Covid Book Subjects</label>
        <div class="control">
            <i class="fas fa-book"></i>
            <input class="input" id= "subjectSearch" type="text" placeholder="Search by Subject" style="width: 45%">
            <button class="button is-focused is-black searchButtons" id="searchButton2">Search</button>
            <i class="fas fa-book"></i>
        </div>
    </div>
     <div class="field">
        <label class="label">Covid Book Subjects</label>
        <div class="control">
            <i class="fas fa-book"></i>
            <button class="button is-focused is-black emptyResults" id="searchButton2">Clear Results</button>
            <i class="fas fa-book"></i>
        </div>
    </div>
    <div class = "searchResults">
    </div>

    </div>`)



    })



    $("#mainCard").on("click", ".searchButtons", function (event) {
        event.preventDefault();
        console.log("clicked")
        var titleSearch = $("#titleSearch").val()
        var authorSearch = $("#authorSearch").val()
        var subjectSearch = $("#subjectSearch").val()
        var queryURL = ""

        if (titleSearch === "" && authorSearch === "" && subjectSearch === "") {
            $(".searchResults").html("Feilds Cannot be Empty")
            // still letting the user search find a way to stop
        }
        else if (titleSearch !== "") {
            queryURL = "https://www.googleapis.com/books/v1/volumes?q=+intitle" + titleSearch + "&key=AIzaSyB_qVUwrTtb7vLduMA6jovLXJTJW8UBiIE";
        }
        else if (authorSearch !== "") {
            queryURL = "https://www.googleapis.com/books/v1/volumes?q=+inauthor" + authorSearch + "&key=AIzaSyB_qVUwrTtb7vLduMA6jovLXJTJW8UBiIE";
        } else if (subjectSearch !== "") {
            queryURL = "https://www.googleapis.com/books/v1/volumes?q=+subject" + subjectSearch + "&key=AIzaSyB_qVUwrTtb7vLduMA6jovLXJTJW8UBiIE";
            // code for its own .volumeInfo.title
        }
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                if (subjectSearch !== "") {
                    console.log(response)
                    response.items.forEach(book => {
                        $(".searchResults").append(`
                    <div class="card"> 
                    <div>
                    <h1>${bookTitle.volumeInfo.title}</h1>
                    <img src=${items.volumeInfo.imageLinks.smallThumbnail}/>
                    </div>
                    </div>
                    `,)
                    })
                    // this doesnt work still... 
                }
                else {
                    console.log(response)
                    response.items.forEach(book => {
                        $(".searchResults").append(`
                    <div class="card"> 
                    <div>
                    <h1>${book.volumeInfo.title}</h1>
                    <img src=${book.volumeInfo.imageLinks.smallThumbnail}/>
                    </div>
                    </div>
                    `,)
                    })
                    // this works!
                }

                var bookTitle = response.items[0].volumeInfo.title


                console.log(bookTitle)

            })


    })
    $("#mainCard").on("click", ".emptyResults", function (event) {
        $(".searchResults").empty()
    })





    $("#recipeBtn").on("click", function (event) {
        event.preventDefault();
        $("#mainCard").html(`
        <div class="field">
            <label class="label">Covid Food Finder</label>
            <div class="control">
            <i class="fas fa-book"></i>
            <input class="input" id= "foodInput" type="text" placeholder="Search by Food" style="width: 45%">
            <button class="button is-focused is-black" id="recipeSearchButton">Search</button>
            <i class="fas fa-book"></i>
            <div class = "searchResults">
            </div>
         </div>
        </div>`)
    })

    $("#mainCard").on("click", "#recipeSearchButton", function (event) {
        event.preventDefault();
        console.log("clicked")

        var userSearch = $("#foodInput").val()
        console.log(userSearch)
        var queryURL = "https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=" + userSearch + "&app_id=df0c7466&app_key=9d5d7e94beb6606845f7c4cab6f31da7&from=0&to=3&calories=591-722&health=alcohol-free"

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response)
                response.hits.forEach(recipe => {
                    $(".searchResults").append(`
                    <div class="card"> 
                    <div>
                    <h1>${recipe.label}</h1>
                    <img src=${recipe.label.image}/>
                    </div>
                    </div>
                    `,)
                })
            })





    })

})


