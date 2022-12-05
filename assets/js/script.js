// my wather API code 4c3954b1395c7d9228bb76f474415aa0
var saveBtn = $('.btn');
var savedCities = [];

var citySearch;

//save searched input
saveBtn.on("click", function () {
    citySearch = $(this).prev().val();
    getCityLocation();
});

//Fetch api coordinates

function getCityLocation(response) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + citySearch + '&appid=4c3954b1395c7d9228bb76f474415aa0')
        .then(function (response) {
            if (response === 404) {
                console.log('Enter a real city');
            }
            return response.json();
        })
        .then(function (data) {
            savedCities += citySearch;
            localStorage.setItem("cities", JSON.stringify(savedCities));
            console.log(data);
        })
    }
//Fetch 5 day weather forcast api corrdinates

//display current weather

//display 5 day forcast

//display searched cities