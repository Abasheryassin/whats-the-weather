// my wather API code 4c3954b1395c7d9228bb76f474415aa0
var saveBtn = $('.btn');
var savedCities = {};

var citySearch;

//save searched input
saveBtn.on("click", function () {
    citySearch = $(this).prev().val();
    getCityLocation();
});

//Fetch api coordinates and 5 day weather cast

function getCityLocation(response) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + citySearch + '&cnt=50&appid=4c3954b1395c7d9228bb76f474415aa0&units=imperial')
        .then(function (response) {
            if (response === 404) {
                console.log('Enter a real city');
            }
            return response.json();
        })
        .then(function (data){
            var location = [data.city.coord.lat, data.city.coord.lon]
            console.log(data);
            displayWeather(data);
            currentWeather(location);
            return data;
        })
    }
//Fetch current weather forcast
function currentWeather (location) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+ location[0] + '&lon=' + location[1] + '&exclude={part}&appid=4c3954b1395c7d9228bb76f474415aa0')
    .then(function (response) {
        if (response === 404) {
            console.log('Enter a real city');
        }
        return response.json();
    })
    .then(function (dataCurrent) {
        console.log(dataCurrent);
    })
}

//display current weather
//function displayCurrentWeather(data) {}
//display 5 day forcast
function displayWeather(data) {
    var cityName = $("<h2></h2>").text(data.city.name);

    for (var i = x = 0; i < 5; i++, x += 8){
        var newDiv = $('<div></div>');
        newDiv.addClass('design');

        var temp = $("<p></p>").text('Temp: ' + data.list[x].main.temp + ' deg F');
        var humidity = $("<p></p>").text('Humidity: ' + data.list[x].main.humidity + '%');
        var windSpeed = $("<p></p>").text('Wind Speed: ' + data.list[x].wind.speed + 'mph');
        var weatherIcon = $("<p></p>").text(data.list[x].weather[0].icon);

        newDiv.append(weatherIcon, temp, humidity, windSpeed);
        $('#forcast5').append(newDiv);
    }

    //$('#currentcity').append(cityName, temp, humidity, windSpeed);
    //$('h2').append(weatherIcon);
}

//save and display searched cities
function saveCities (data) {
    savedCities[citySearch] ;
    localStorage.setItem("cities", JSON.stringify(savedCities));
}

function display5Day(data) {
}