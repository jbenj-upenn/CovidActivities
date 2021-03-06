$(document).ready(function () {
    console.log("ready!");



    $("#bookBtn").on("click", function (event) {
        event.preventDefault();
        $("#mainCard").html(`
        <div class="container">
            <div class="field">
            <!-- search by title -->
                <label class="label">Covid Book Titles</label>
                <div class="control">
                    <input class="input" id= "titleSearch" type="text" placeholder="Search by Title" style="width: 45%">
                    <button class="button is-focused is-black searchButtons" id="searchButton2">Search</button>
                </div>
            </div>
            <!-- search by book -->
            <div class="field">
                <label class="label">Covid Book Authors</label>
                <div class="control">
                    <input class="input" id = "authorSearch" type="text" placeholder="Search by Author" style="width: 45%">
                    <button class="button is-focused is-black searchButtons" id="searchButton2">Search</button>
                </div>
            </div>
            <!-- search by subject -->
            <div class="field">
                <label class="label">Covid Book Subjects</label>
                <div class="control">
                    <input class="input" id= "subjectSearch" type="text" placeholder="Search by Subject" style="width: 45%">
                    <button class="button is-focused is-black searchButtons" id="searchButton2">Search</button>
                </div>
            </div>
            <div class="field">
            </div>
             <button class="button is-focused is-black" id="refreshPage">Return to Main Page</button>
            <div>
                <div class="control">
                    
                    <button class="button is-focused is-black emptyResults" id="searchButton2">Clear Results</button>
                   
                </div>

            <div class = "searchResults">
            </div>
        </div>`)







        $("#mainCard").on("click", ".searchButtons", function (event) {
            $(".searchResults").empty()
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
                queryURL = "https://www.googleapis.com/books/v1/volumes?q=+intitle:" + titleSearch + "&key=AIzaSyB_qVUwrTtb7vLduMA6jovLXJTJW8UBiIE";
            }
            else if (authorSearch !== "") {
                queryURL = "https://www.googleapis.com/books/v1/volumes?q=+inauthor:" + authorSearch + "&key=AIzaSyB_qVUwrTtb7vLduMA6jovLXJTJW8UBiIE";
            } else if (subjectSearch !== "") {
                queryURL = "https://www.googleapis.com/books/v1/volumes?q=+subject:" + subjectSearch + "&key=AIzaSyB_qVUwrTtb7vLduMA6jovLXJTJW8UBiIE";
                // code for its own .volumeInfo.title
            }
            else if (titleSearch !== "" && authorSearch !== "" && subjectSearch !== "") {
                queryURL = "https://www.googleapis.com/books/v1/volumes?q=+intitle:" + titleSearch + "+inauthor:" + authorSearch + "+subject:" + subjectSearch + "&key=AIzaSyB_qVUwrTtb7vLduMA6jovLXJTJW8UBiIE";
                console.log()
            }
            else if (titleSearch !== "" && authorSearch !== "") {
                queryURL = "https://www.googleapis.com/books/v1/volumes?q=+intitle:" + titleSearch + "+inauthor:" + authorSearch + "&key=AIzaSyB_qVUwrTtb7vLduMA6jovLXJTJW8UBiIE";
            }

            else if (titleSearch !== "" && subjectSearch !== "") {
                queryURL = "https://www.googleapis.com/books/v1/volumes?q=+intitle:" + titleSearch + "+subject:" + subjectSearch + "&key=AIzaSyB_qVUwrTtb7vLduMA6jovLXJTJW8UBiIE";
            }
            else if (authorSearch !== "" && subjectSearch !== "") {
                queryURL = "https://www.googleapis.com/books/v1/volumes?q=+inauthor:" + authorSearch + "+subject:" + subjectSearch + "&key=AIzaSyB_qVUwrTtb7vLduMA6jovLXJTJW8UBiIE";
            }

            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function (response) {
                    $("#titleSearch").empty();
                    $("#authorSearch").empty();
                    $("#subjectSearch").empty();

                    if (subjectSearch !== "") {
                        console.log(response)
                        response.items.forEach(book => {
                            $(".searchResults").append(`
                    <div class="card"> 
                    <div>
                    <i class="fas fa-book"></i>
                    <h1>${book.volumeInfo.title}</h1>
                    <img src=${book.volumeInfo.imageLinks.smallThumbnail}/>
                    </div>
                    </div>
                    `,)
                        })

                    }
                    else {
                        console.log(response)
                        response.items.forEach(book => {
                            $(".searchResults").append(`
                    <div class="card"> 
                    <div>
                     <i class="fas fa-book"></i>
                    <h1><a href="${book.volumeInfo.previewLink}">${book.volumeInfo.title}</h1>
                    <img src=${book.volumeInfo.imageLinks.smallThumbnail}/>
                    </div>
                    </div>
                    `,)
                        })
                        // this works!
                    }
                    // setting favorites 
                    $(".searchResults").on("click")

                    localStorage.setItem(JSON.stringify(response.items[0]))






                })


        })
        $("#mainCard").on("click", ".emptyResults", function (event) {
            $(".searchResults").empty()
        })
        $("#mainCard").on("click", "#refreshPage", function (event) {
            console.log("hey")
            window.location.reload()
        })
    })




    $("#recipeBtn").on("click", function (event) {
        event.preventDefault();
        $("#mainCard").html(`
         
            <div class="container columns is-one-third">
                <div class="column is-one-third">
                    <!-- Search by Ingredient -->
                    <div class="field has-addons">
                        <div class="control">
                            <input class="input" type="text" placeholder="Search by Ingredients" id="ingSearch">
                        </div>
                        <div class="control">
                            <a class="button is-black searchButton">Search</a>
                        </div>
                    </div>

                    <!-- Search by Cuisine Type -->
                    <div class="field has-addons">
                        <div class="control">
                            <input class="input" type="text" placeholder="Search by Cuisine Type" id="cuiSearch">
                        </div>
                        <div class="control">
                            <a class="button is-black searchButton">Search</a>
                        </div>
                    </div>

                    <!-- Search by Recipe Name -->
                    <div class="field has-addons">
                        <div class="control">
                            <input class="input" type="text" placeholder="Search by Recipe Name" id="recSearch">
                        </div>
                        <div class="control">
                            <a class="button is-black searchButton">Search</a>
                        </div>
                    </div>
                     <div>
                     <!-- Refresh Page --!>
                    <button class="button is-focused is-black" id="refreshPage">Return to Main Page</button>
                    </div>
                    <!-- Clear Button --!>
                    <div class="control">
                            <a class="button emptyResults is-black ">Clear Search</a>
                        </div>
                    </div>
                   
            </div>
        

        <!-- This is where the recipe search results are going to go -->
        <div id="foodResults" class="column">
            <!-- Recipe 1 -->
            <div column is-full>
                <article class="media">
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img id="img0">
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <a id="text0"></a>
                        </div>
                        <nav class="level is-mobile">
                            <div class="level-left">
                                <a class="level-item">
                                    <span class="icon is-small"><i class="fas fa-reply"></i></span>
                                </a>
                                <a class="level-item">
                                    <span class="icon is-small"><i class="fas fa-heart"></i></span>
                                </a>
                            </div>
                        </nav>
                    </div>
                </article>
            </div>
            <br>
            <!-- Recipe 2 -->
            <div column is-full>
                <article class="media">
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img id="img1">
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <a id="text1"></a>
                        </div>
                        <nav class="level is-mobile">
                            <div class="level-left">
                                <a class="level-item">
                                    <span class="icon is-small"><i class="fas fa-reply"></i></span>
                                </a>
                                <a class="level-item">
                                    <span class="icon is-small"><i class="fas fa-heart"></i></span>
                                </a>
                            </div>
                        </nav>
                    </div>
                </article>
            </div>
            <br>
            <!-- Recipe 3 -->
            <div column is-full>
                <article class="media">
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img id="img2">
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <a id="text2"></a>
                        </div>
                        <nav class="level is-mobile">
                            <div class="level-left">
                                <a class="level-item">
                                    <span class="icon is-small"><i class="fas fa-reply"></i></span>
                                </a>
                                <a class="level-item">
                                    <span class="icon is-small"><i class="fas fa-heart"></i></span>
                                </a>
                            </div>
                        </nav>
                    </div>
                </article>
            </div>
            <br>
            <!-- Recipe 4 -->
            <div column is-full>
                <article class="media">
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img id="img3">
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <a id="text3"></a>
                        </div>
                        <nav class="level is-mobile">
                            <div class="level-left">
                                <a class="level-item">
                                    <span class="icon is-small"><i class="fas fa-reply"></i></span>
                                </a>
                                <a class="level-item">
                                    <span class="icon is-small"><i class="fas fa-heart"></i></span>
                                </a>
                            </div>
                        </nav>
                    </div>
                </article>
            </div>
            <br>
            <!-- Recipe 5 -->
            <div column is-full>
                <article class="media">
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img id="img4">
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <a id="text4"></a>
                        </div>
                        <nav class="level is-mobile">
                            <div class="level-left">
                                <a class="level-item">
                                    <span class="icon is-small"><i class="fas fa-reply"></i></span>
                                </a>
                                <a class="level-item">
                                    <span class="icon is-small"><i class="fas fa-heart"></i></span>
                                </a>
                            </div>
                        </nav>
                    </div>
                </article>
            </div>
            
            </div>
            </div>
        
        </div>`)
    })

    $("#mainCard").on("click", ".searchButton", function (event) {
        event.preventDefault();
        console.log("clicked")

        var recipeSearch = $("#recSearch").val()
        var cuisineSearch = $("#cuiSearch").val()
        var ingredientSearch = $("#ingSearch").val()
        var queryURL = ""
        console.log(recipeSearch)

        if (recipeSearch === "" && cuisineSearch === "" && ingredientSearch === "") {
            $("#foodResults").html("Feilds Cannot be Empty")
        }
        else if (recipeSearch !== "") {
            queryURL = "https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=" + recipeSearch + "&app_id=df0c7466&app_key=9d5d7e94beb6606845f7c4cab6f31da7"
        }
        else if (cuisineSearch !== "") {
            queryURL = "https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=" + cuisineSearch + "&app_id=df0c7466&app_key=9d5d7e94beb6606845f7c4cab6f31da7"
        }
        else if (ingredientSearch !== "") {
            queryURL = "https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=" + ingredientSearch + "&app_id=df0c7466&app_key=9d5d7e94beb6606845f7c4cab6f31da7"
        }
        else if (recipeSearch !== "" && cuisineSearch !== "" && ingredientSearch !== "") {
            queryURL = "https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=" + ingredientSearch + "" + cuisineSearch + "" + recipeSearch + "&app_id=df0c7466&app_key=9d5d7e94beb6606845f7c4cab6f31da7"
        }
        else if (recipeSearch && cuisineSearch !== "") {
            queryURL = "https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=" + recipeSearch + cuisineSearch + "&app_id=df0c7466&app_key=9d5d7e94beb6606845f7c4cab6f31da7"
        }
        else if (recipeSearch !== "" && ingredientSearch !== "") {
            queryURL = "https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=" + ingredientSearch + recipeSearch + "&app_id=df0c7466&app_key=9d5d7e94beb6606845f7c4cab6f31da7"
        }
        else if (ingredientSearch !== "" && cuisineSearch !== "") {
            queryURL = "https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=" + ingredientSearch + cuisineSearch + "&app_id=df0c7466&app_key=9d5d7e94beb6606845f7c4cab6f31da7"

        }


        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
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
        $("#mainCard").on("click", ".emptyResults", function (event) {
            $(".searchResults").empty()
        })
        $("#mainCard").on("click", "#refreshPage", function (event) {
            console.log("hey")
            window.location.reload()
        })



    })
})
