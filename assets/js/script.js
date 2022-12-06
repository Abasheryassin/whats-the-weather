// my wather API code 4c3954b1395c7d9228bb76f474415aa0
var saveBtn = $('.btn');
var forcastBlock = $('#forcast5');
var currentBlock = $('#currentcity');
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
            forcastBlock.empty();
            currentBlock.empty();
            return response.json();
        })
        .then(function (data){
            var location = [data.city.coord.lat, data.city.coord.lon]
            console.log(data);
            displayFutureWeather(data);
            currentWeather(location);
            return data;
        })
    }
    //Fetch current weather forcast
    function currentWeather (location) {
        fetch('https://api.openweathermap.org/data/2.5/weather?lat='+ location[0] + '&lon=' + location[1] + '&exclude={part}&appid=4c3954b1395c7d9228bb76f474415aa0&units=imperial')
        .then(function (response) {
            return response.json();
        })
        .then(function (dataCurrent) {
            displayCurrentWeather(dataCurrent);
        })
    }
    
    //display current weather
    function displayCurrentWeather(data) {
        var cityName = $('<h2></h2>').text(data.name);
        var temp = $("<p></p>").text('Temp: ' + data.main.temp + ' deg F');
        var humidity = $("<p></p>").text('Humidity: ' + data.main.humidity + '%');
        var windSpeed = $("<p></p>").text('Wind Speed: ' + data.wind.speed + 'mph');
        var Icon = data.weather[0].icon;
        var weatherIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/"+Icon+"@2x.png");
        
        
        currentBlock.append(cityName, temp, humidity, windSpeed);
        cityName.append(weatherIcon);
    }

    //display 5 day forcast
    function displayFutureWeather(data) {
        var title = $("<h2></h2>").text('5 Day Forcast!');
        forcastBlock.append(title);
        for (var i = x = 0; i < 5; i++, x += 8){
            var newDiv = $('<div></div>');
            newDiv.addClass('design');
            
            var temp = $("<p></p>").text('Temp: ' + data.list[x].main.temp + ' deg F');
            var humidity = $("<p></p>").text('Humidity: ' + data.list[x].main.humidity + '%');
            var windSpeed = $("<p></p>").text('Wind Speed: ' + data.list[x].wind.speed + 'mph');
            var Icon = data.list[x].weather[0].icon;
            var weatherIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/"+Icon+"@2x.png");
            
            newDiv.append(weatherIcon, temp, humidity, windSpeed);
            forcastBlock.append(newDiv);
        }

    }
    
    //save and display searched cities
    function saveCities (data) {
        var savecityname = data.city.name;
        savedCities[savecityname];
        localStorage.setItem("cities", JSON.stringify(savedCities));
    }