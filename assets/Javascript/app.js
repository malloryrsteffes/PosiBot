$(document).ready(function () {
    M.AutoInit();

    // HI, POSIBOT EVENT LISTENER --------------------------------------------------------------
    $("#firstClick").on("click", function(){
        $("#firstChatBox").hide();
        $(this).hide();
        $("#secondChatBox").css("visibility", "visible");
        $("#firstNameInput").css("visibility", "visible");

    })

    // FIRST NAME ENTER EVENT LISTENER --------------------------------------------------------
    $("#first_name2").on("keyup", function(event){
        if(event.keyCode == 13){
            $("#firstNameInput").hide();
            var firstName = $("#first_name2").val().trim();
            console.log(firstName);
            $("#firstNameFiller").text(firstName);
            $("#thirdChatBox").css("visibility", "visible");
        }
    });

    // HAPPY BUTTON EVENT LISTENER -------------------------------------------------------------
    $("#happyBtn").on("click", function () {

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
        $("#contentContainer").empty();

            // Randomizes the motivational poster pulled.
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
                var inspoImage = $("<img>")
                inspoImage.attr("src", inspoURL)

                $("#contentContainer").append(inspoImage);

            })
    });
   

    // BORED BUTTON EVENT LISTENER -------------------------------------------------------------
    $("#boredBtn").on("click", function () {
        // Call movie API-------------------------------------------------------------------------------
        $("#contentContainer").empty();

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

                initMap();

            });

        var map;
        var infoWindow;
        // var service;

        function initMap() {
            // origin = 28.3852, 81.56
            map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 28.3852, lng: 81.5639 },
                zoom: 16
            });

            infoWindow = new google.maps.InfoWindow;

            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    console.log(pos.lat);
                    console.log(pos.lng);

                    findPlaces(pos.lat, pos.lng);

                    infoWindow.setPosition(pos);
                    infoWindow.setContent('Location found.');
                    infoWindow.open(map);
                    map.setCenter(pos);
                }, function () {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }
            // var request = {
            //     location: map.center,
            //     radius: "500",
            //     type: ["restaurant"]
            // };

            // service = new google.maps.places.PlacesService(map);
            // service.nearbySearch(request, callback);

            // function callback(results, status) {
            //     if (status == google.maps.places.PlacesServiceStatus.OK) {
            //         for (var i = 0; i < results.length; i++) {
            //             var place = results[i];
            //             createMarker(results[i]);
            //         }

            //     }
            // };

            function findPlaces(lat, lng) {

                $.ajax({
                    url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lng + "&radius=1500&type=restaurant&key=AIzaSyBalsCc3sNclUyPdty0itcxzXTBs9pypoo",
                    method: "GET"
                }).then(function (response) {
                    console.log(response.results);

                    var locations = [];
                    for (let index = 0; index < response.results.length; index++) {
                        var currentInfo = [response.results[index].name, response.results[index].geometry.location.lat, response.results[index].geometry.location.lng]
                        locations.push(currentInfo);
                    }
                    console.log(locations);


                    var map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 15,
                        center: new google.maps.LatLng(lat, lng),
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    });

                    var infowindow = new google.maps.InfoWindow();

                    var marker, i;

                    for (i = 0; i < locations.length; i++) {
                        marker = new google.maps.Marker({
                            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                            map: map
                        });

                        google.maps.event.addListener(marker, 'click', (function (marker, i) {
                            return function () {
                                infowindow.setContent(locations[i][0]);
                                infowindow.open(map, marker);
                            }
                        })(marker, i));
                    }


                });

            }
        };

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
            infoWindow.open(map);
        }

    });



});





