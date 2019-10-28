console.log("It works");
$(document).ready(function() {

    var animals = ["dog", "cat", "rabbit", "hamster", "goldfish", "skunk", "bird", "panda", "Bison", "dolphin", "ape", "lobster", "cow", "deer", "duck", "wolf", "pygmy goat", "bear", "horse", "pony", "capybara", "teacup pig", "salamander"];

    function displayGifButtons() {
        console.log(animals);
        $("#buttons-view").empty();
        for (i = 0; i < animals.length; i++) {
            var bv = $("<button>");
            bv.css("background-color", "lightblue");
            bv.css("margin", "3px");
            bv.addClass("button-view");
            bv.attr("data-type", animals[i]);
            bv.text(animals[i]);
            $("#buttons-view").append(bv);
        }

    }
    displayGifButtons();


    $("#add-animal").on("click", function () {
        event.preventDefault();
        var animal = $("#animal-input").val();
        animals.push(animal);
        displayGifButtons();

    });

    $(document).on('click', '.button-view', function () {
        var animal = $(this).attr("data-type");
        console.log(animal);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + '&api_key=Ix1raiCGZ0fEifNhIWfEVTp545KoT9dU&limit=10&offset=0&rating=PG&lang=en';

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var response = response.data;
            console.log(response);
            $("#animals-view").empty();
            for (var i = 0; i < response.length; i++) { //NOT overwrite the existing gifs.
                var animalDiv = $("<div>");
                var p = $("<p>").text("Rating:" + response[i].rating);
                var animalImg = $("<img>");

                animalDiv.css("float", "left") 
                animalImg.attr("src", response[i].images.original_still.url);
                animalImg.attr("data-still", response[i].images.original_still.url);
                animalImg.attr("data-animate", response[i].images.original.url);
                animalImg.attr("data-state", "still");
                animalImg.addClass("gif-img");
                animalDiv.append(p);
                animalDiv.append(animalImg);
                $("#animals-view").append(animalDiv);
            }
        });
    });

    $(document).on("click", ".gif-img", function () {
        console.log("works");
        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if (state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }
    });


});