$(document).ready(function () {
    M.AutoInit();

    // HI, POSIBOT EVENT LISTENER --------------------------------------------------------------
    $("#firstClick").on("click", function(){
        $("#firstChatBox").hide();
        $(this).hide();
        $("#secondChatBox").css("visibility", "visible");
        $("#firstNameInput").css("visibility", "visible");

    })

    // FIRST NAME ENTER KEYUP EVENT LISTENER --------------------------------------------------------
    $("#first_name2").on("keyup", function(event){
        if(event.keyCode == 13){
            $("#firstNameInput").hide();
            var firstName = $("#first_name2").val().trim();
            console.log(firstName);
            $("#firstNameFiller").text(firstName);
            $("#thirdChatBox").css("visibility", "visible");
            $(".emoBtns").css("visibility", "visible");

        }
    });

    // HAPPY BUTTON EVENT LISTENER -------------------------------------------------------------
    $("#happyBtn").on("click", function () {
        $("#thirdChatBox").css("visibility", "hidden");
        $("#happyChatBox").css("visibility", "visible");
        $("#boredChatBox").css("visibility", "hidden");
        $("#sadChatBox").css("visibility", "hidden");
        $("#contentContainer").empty();

        // Randomizes the GIFs called 
        var gifArray = ["funny", "silly", "hilarious", "memes", "fun", "cute", "adorable"]
        var rotate = Math.floor(gifArray.length * Math.random());
        var searchTerm = gifArray[rotate];

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=86gmopU2iKrSWy2FWvm1h5sM3An49fxH&limit=6%rating=g";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var results = response.data;

            for (i = 0; i < results.length; i++) {

                // Appends GIFs to the page 
                console.log(results[i].images.fixed_height.url);
                var gifLink = results[i].images.fixed_height.url;
                var newGIF = $("<img>");
                newGIF.attr("src", gifLink);
                newGIF.attr("margin", "10px");

                var newCard = $("<div class='card gray lighten-5'>");
                var newImageCard = $("<div class='card-image'>");
                newImageCard.append(newGIF);
                newCard.append(newImageCard);

                var newDiv = $("<div class='col s4 scale-in scale-out'>");
                newDiv.append(newCard);
                $("#contentContainer").append(newDiv);

            }
        });

    });

    // SAD BUTTON EVENT LISTENER -------------------------------------------------------------
    $("#sadBtn").on("click", function () {
        $("#thirdChatBox").css("visibility", "hidden");
        $("#sadChatBox").css("visibility", "visible");
        $("#happyChatBox").css("visibility", "hidden");
        $("#boredChatBox").css("visibility", "hidden");
        $("#contentContainer").empty();

            // Randomizes the motivational poster pulled
            var quoteTerms = ["Happiness", "Positive", "Kindness", "Motivational", "Positivity", "Healing", "Peace"];
            var rotate = Math.floor(quoteTerms.length * Math.random());
            var searchTerm = quoteTerms[rotate];
            console.log(searchTerm);

            var queryURL = "https://healthruwords.p.rapidapi.com/v1/quotes/?id=&t=" + searchTerm + "&maxR=1&size=large&x-rapidapi-key=47a09357cdmsha246dfcbbe7126cp1e273fjsn44b6d4b18cfa";

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": queryURL,
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "healthruwords.p.rapidapi.com",
                    "x-rapidapi-key": "47a09357cdmsha246dfcbbe7126cp1e273fjsn44b6d4b18cfa"
                }
            };
            $.ajax(settings).done(function (response) {
                console.log(response);
                console.log(response[0].media);

                // Appends quote to the page
                var inspoURL = response[0].media;
                var inspoImage = $("<img class='inspoImg'>")
                inspoImage.attr("src", inspoURL)

                $("#contentContainer").append(inspoImage);

            })
    });
   

    // BORED BUTTON EVENT LISTENER -------------------------------------------------------------
    $("#boredBtn").on("click", function () {
        $("#thirdChatBox").css("visibility", "hidden");
        $("#happyChatBox").css("visibility", "hidden");
        $("#sadChatBox").css("visibility", "hidden");
        $("#boredChatBox").css("visibility", "visible");
        $("#contentContainer").empty();

            // Call movie API
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get&p=1&t=drama&st=adv",
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
                    "x-rapidapi-key": "ee5a25ac2amsh561efa9458e89adp1f477ajsnaf4e1c6c82dd"
                }
            }

            $.ajax(settings).done(function (response) {
                console.log(response);

                // Supposed to randomize the movies shown. Not working.
                // var movieArray = [];
                // movieArray.push(response.ITEMS); 
                // console.log("Array: " + JSON.stringify(movieArray));




                // Loop through 15 movies
                for (i = 0; i < 15; i++) {

                    // var movieArray = [];
                    // movieArray.push(response.ITEMS);
                    // var rotateMovie = movieArray[Math.floor(Math.floor(Math.random()*movieArray.length))];
                    // console.log(rotateMovie);

                    var imagePath = response.ITEMS[i].image;

                    var synopsis = $("<p>" + response.ITEMS[i].synopsis + "</p>");
                    var newImage = $("<img>");
                    newImage.attr("src", imagePath);

                    var newDiv = $("<div class='col s3 scale-in scale-out'>");
                    var newCard = $("<div class='card gray lighten-5'>");
                    var newImageCard = $("<div class='card-image'>");
                    var newCardContent = $("<div class='card-content'>");
                    newImageCard.append(newImage)
                    newCardContent.append(synopsis)
                    newCard.append(newImageCard);
                    newCard.append(newCardContent);

                    newDiv.append(newCard);

                    $("#contentContainer").append(newDiv);
                }
                var netflixPointer = $("<h6 class='center'> Bored? Me too. I've been watching these new Netflix releases lately - head <a href='https://www.netflix.com' target='_blank'>here</a> to watch any of them! </h6>")
                $("#contentContainer").prepend(netflixPointer);



            });
    })
});




