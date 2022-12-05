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
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + citySearch + '&appid=4c3954b1395c7d9228bb76f474415aa0&units=imperial')
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
            return data;
        })
    }
//Fetch current weather forcast
// function currentWeather (location) {
//     fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+ location[0] + '&lon=' + location[1] + '&exclude={part}&appid=4c3954b1395c7d9228bb76f474415aa0')
//     .then(function (response) {
//         if (response === 404) {
//             console.log('Enter a real city');
//         }
//         return response.json();
//     })
//     .then(function (dataCurrent) {
//         console.log(dataCurrent);
//     })
// }

//display current weather
//function displayCurrentWeather(data) {}
//display 5 day forcast
function displayWeather(data) {
    var cityName = $("<h2></h2>").text(data.city.name);
    var temp = $("<p></p>").text('Temp: ' + data.list[0].main.temp + ' deg F');
    var humidity = $("<p></p>").text('Humidity: ' + data.list[0].main.humidity + '%');
    var windSpeed = $("<p></p>").text('Wind Speed: ' + data.list[0].wind.speed + 'mph');
    var weatherCondition = $("<p></p>").text('Weather condition: ' + data.list[0].weather[0].description);
    var weatherIcon = $("<p></p>").text(data.list[0].weather[0].icon);

    $('#currentcity').append(cityName, temp, humidity, windSpeed, weatherCondition);
    $('h2').append(weatherIcon);
}

//save and display searched cities
function saveCities (data) {
    savedCities[citySearch] ;
    localStorage.setItem("cities", JSON.stringify(savedCities));
}