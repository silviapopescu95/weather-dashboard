// To trigger the AJAX call
$("#search-city").on("click", function(event) {
    event.preventDefault();

    //Gets the text from city input box
    var city = $("#city-input").val();

    // Creating variable for API Key
    var APIKey = "e0c3e9cab48d34d878451828cf2fdc20";

    // Building the URL to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    // AJAX call for current conditions
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        //console log to see what the information stored in object
        console.log(queryURL);
        console.log(response);

        // Creates an element to hold city name
        var cityDisplay = $("<h1>").text(city);

        // Retrieves temperature in Kelvin
        var tempK = response.main.temp;
        // Converts temperature to Farhenheit
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        // Creates an element to hold tempF, rounding to one decimal place
        var temperature = $("<p>").text("Temperature: " + tempF.toFixed(1));

        // Creates variable for humidity and element to store it
        var humidity = $("<p>").text("Humidity: " + response.main.humidity);

        // Creates variable for wind speed and element to store it 
        var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed);

        //Creates variable for UV index and element to store it
        //var uvIndex = $("<p>").text("UV Index: " + response.);

        // Appends current data to card created in HTML
        $("#current-city-data").append(cityDisplay, temperature, humidity, windSpeed);
    });

    // Create variable for five day forecast URL
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;

    // AJAX call for five day forecase
    $.ajax({
        url: fiveDayURL,
        method: "GET"
    }).then(function(fiveDayResponse) {
        //console log to see what the information stored in object
        console.log(fiveDayURL);
        console.log(fiveDayResponse);

        // for loop to iterate over the next 5 days
        for (var i = 1; i <= 5; i++) {
            // Creates temperature variable and element to store it in
            var fiveDayTemp = $("<p>").text("Temp: " + ((fiveDayResponse.list[1].main.temp - 273.15) * 1.80 + 32).toFixed(1));

            //Create humidity variable and element to store it in
            var fiveDayHumidity = $("<p>").text("Humidity: " + fiveDayResponse.list[1].main.humidity);

            // Appends data to card created in HTML
            $("#five-day").append(fiveDayTemp, fiveDayHumidity);
        }
    })
});
