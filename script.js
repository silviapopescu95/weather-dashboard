// To trigger the AJAX call
$("#search-city").on("click", function(event) {
    event.preventDefault();

    //Gets the text from city input box
    var city = $("#city-input").val();

    // Creating variable for API Key
    var APIKey = "e0c3e9cab48d34d878451828cf2fdc20";

    // Building the URL to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    // AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        //console log to see what the information stored in object
        console.log(queryURL);
        console.log(response);

        // Retrieves temperature in Kelvin
        var tempK = response.main.temp;
        // Converts temperature to Farhenheit
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        // Creates an element to hold tempF
        var temperature = $("<p>").text("Temperature: " + tempF);

        // Creates variable for humidity and element to store it
        var humidity = $("<p>").text("Humidity: " + response.main.humidity);

        // Creates variable for wind speed and element to store it 
        var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed);

        //Creates variable for UV index and element to store it
        //var uvIndex = $("<p>").text("UV Index: " + response.);

        // Append data to card created in HTML
        $("#current-city-data").append(temperature, humidity, windSpeed);
    });
});
