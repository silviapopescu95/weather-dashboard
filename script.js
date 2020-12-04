$(document).ready(function() {

    // To trigger the AJAX call
    $("#search-city").on("click", function(event) {
        event.preventDefault();
       
        //Gets the text from city input box
        var city = $("#city-input").val();

        // Creating variable for API Key
        var APIKey = "e0c3e9cab48d34d878451828cf2fdc20";

        // Building the URL to query the database
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
        
        // Passes query URL into search AJAX call
        searchCity(queryURL);

          // Storing previous search history
          var recentSearchButton = $(`<button>`).text(city);
          $("#recent-search").append(recentSearchButton);
          $("#recent-search button").on("click", function() {
            event.preventDefault();

            var APIKey = "e0c3e9cab48d34d878451828cf2fdc20";
            var buttonText = $(this).text().trim();
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + buttonText + "&appid=" + APIKey;
            searchCity(queryURL);
          });

        // AJAX call for current conditions
        function searchCity(queryURL) 
        { $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
             // Clears previous city data
            $("#current-city-data").empty();
            $("#card-deck").empty();

            //console log to see what the information stored in object
            console.log(queryURL);
            console.log(response);

            // Creates an element to hold city name
            var cityDisplay = $("<h1>").text(city);

            // To show icon for today's weather
            var todayIconURL = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
            var todayIcon = $("<img>").attr("src", todayIconURL).css("width", "64px").css("height", "64px");
        
            // Creates variable for today's date and an element to store it
            var today = $("<h4>").text(moment().format('l'));

            // Retrieves temperature in Kelvin and converts to Fahrenheit
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;

            // Creates an element to hold tempF, rounding to one decimal place
            var temperature = $("<p>").text("Temperature: " + tempF.toFixed(1));

            // Creates variable for humidity and element to store it
            var humidity = $("<p>").text("Humidity: " + response.main.humidity);

            // Creates variable for wind speed and element to store it 
            var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed);

            //Creates variable for UV index and element to store it
            var uvURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lat + "&appid=" + APIKey;
            getUV(uvURL);

            // Appends current data to card created in HTML
            $("#current-city-data").append(cityDisplay, todayIcon, today, temperature, humidity, windSpeed);
        });
    }
        
       function getUV(queryURL) { 
           $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var uvIndex = $("<p>").text("UV Index: " + response.value);
            
            // Adding color to UV Index based on value from response
            if (response.value <= 3) {
                uvIndex.addClass("green");
            } else if (response.value <= 6) {
                uvIndex.addClass("yellow");                
            } else {
                uvIndex.addClass("red");
            }

            $("#current-city-data").append(uvIndex);
        });
        }

        // Create variable for five day forecast URL
        var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;

        // AJAX call for five day forecase
        $.ajax({
            url: fiveDayURL,
            method: "GET"
        }).then(function(response) {
            //console log to see what the information stored in object
            console.log(fiveDayURL);
            console.log(response);
            
            // for loop to iterate over the next 5 days
            for (let i = 1; i <= 41; i+=8) {

                // Variable to simplify tranversing the DOM
                var loopResponse = response.list[i];
            
                // Separates and formats date, creates variable and element to store it in
                var getDate = loopResponse.dt_txt.split(" ");
                var splitDate = getDate[0].split("-");
                var formatDate = $("<h5>").text(splitDate[1] + "/" + splitDate[2] + "/" + splitDate[0]);
                
                // Creates variable for icon and creates element to store it
                var iconURL = "http://openweathermap.org/img/w/" + loopResponse.weather[0].icon + ".png";
                var displayIcon = $("<img>").attr("src", iconURL).css("width", "64px").css("height", "64px");

                // Creates temperature variable, converts from Kelvin to Fahrhenheit and element to store it in
                var fiveDayTemp = $("<p>").text("Temp: " + ((loopResponse.main.temp - 273.15) * 1.80 + 32).toFixed(1));

                //Create humidity variable and element to store it in
                var fiveDayHumidity = $("<p>").text("Humidity: " + loopResponse.main.humidity);


                //Create a card for each iteration
                var cardCreate = $("<div>").addClass("card text-white bg-primary mb-3").attr("id", "one-card");

                // Append to the deck
                $("#card-deck").append(cardCreate);

                // Then we target the card body by the id we gave it of daily-forecast, and append all of our data to it
                cardCreate.append(formatDate, displayIcon, fiveDayTemp, fiveDayHumidity);
            }
        });
    });
});
