
const APIKey = "7b51adeaefa46b13afad2d8fa4f7189e"

function addResult(){

    inputCity = document.getElementById("myInput").value;  
    historyList = getInfo();
    var searchCity =$("<div>") 
    searchCity.attr('id',inputCity) 
    searchCity.text(inputCity) 
    searchCity.addClass("h4")

    
    if (historyList.includes(inputCity) === false){
        $(".history").append(searchCity)
    }
    $(".subtitle").attr("style","display:inline")
    addInfo(inputCity);
    
}; 

$(".history").on('click', function(event){
    event.preventDefault();
    $(".subtitle").attr("style","display:inline")
     document.getElementById("myInput").value =  event.target.id;
    getResult(); 
});

document.getElementById("searchBtn").addEventListener("click", addResult);
document.getElementById("searchBtn").addEventListener('click', getResult);

function getResult(){   

    $(".five-day").empty();
    $(".city").empty()

   inputCity = document.getElementById("myInput").value;   
    var countryCode='US';    
    var cityCode=inputCity;       
    
    var geoLon;   
    var geoLat;
        
    var cityName =$("<h>")    
    cityName.addClass("h3")  
    var temp = $("<div>")    
    var wind = $("<div>")    
    var humidity = $("<div>")   
    var uvIndex = $("<div>")  
    var icon =$("<img>")
    icon.addClass("icon");    
    var dateTime = $("<div>")

    $(".city").addClass("list-group")
    $(".city").append(cityName)    
    $(".city").append(dateTime)    
    $(".city").append(icon)    
    $(".city").append(temp)    
    $(".city").append(wind)    
    $(".city").append(humidity)
    
    
    var geoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityCode + "," + countryCode + "&limit=5&appid=" + APIKey
         
      fetch(geoUrl)
    
        .then(function (response) {
          return response.json();
        })
    
        .then(function (data) {
          geoLon = data[0].lon;
          geoLat = data[0].lat;
    
          var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + geoLat + "&lon="+ geoLon + "&units=imperial&appid=" + APIKey;
            
          fetch(weatherUrl)

          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data)
            
            weatherIcon= data.list[0].weather[0].icon;
            imgSrc = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
            icon.attr('src',imgSrc)
        
            cityName.text(cityCode);

            var date = new Date(data.list[0].dt * 1000);
            dateTime.text("("+ (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + ")");

            temp.text("Temperature: "+ data.list[0].main.temp + " F");
            humidity.text("Humidity: " + data.list[0].main.humidity + " %");
            wind.text("Wind Speed: " + data.list[0].wind.speed + " MPH");

            for (var i=1;i<6;i++){

                var blueContainer = $("<div>")
                this["futureDate"+i] = $("<h>")
                this["futureIcon"+i] = $("<img>")
                this["futureTemp"+i] = $("<div>")
                this["futureWind"+i] = $("<div>")
                this["futureHumidity"+i] = $("<div>")

                this["forecastDay"+i] = new Date(data.list[i].dt * 1000);     
     
                (this["futureDate"+i]).text(((this["forecastDay"+i]).getMonth()+1) + "/" + (this["forecastDay"+i]).getDate() + "/" + (this["forecastDay"+i]).getFullYear());
                (this["futureTemp"+i]).text("Temperature: "+ data.list[i].main.temp + " F");
                (this["futureWind"+i]).text("Wind: "+ data.list[i].wind.speed + " MPH");
                (this["futureHumidity"+i]).text("Humidity: " + data.list[i].main.humidity + " %");
                (this["weatherIcon"+i])= data.list[i].weather[0].icon;
        
                DateimgSrc = "https://openweathermap.org/img/wn/" + (this["weatherIcon"+i]) + "@2x.png";  
                (this["futureIcon"+i]).attr('src',DateimgSrc)

                $(".five-day").append(blueContainer)
                blueContainer.append((this["futureDate"+i]));
                blueContainer.append((this["futureIcon"+i]));
                blueContainer.append((this["futureTemp"+i]));
                blueContainer.append((this["futureWind"+i]));
                blueContainer.append((this["futureHumidity"+i]));

                blueContainer.addClass("weather-card")
            }

          })
    })
}

function getInfo() {
    var currentList =localStorage.getItem("city");
    if (currentList !== null ){
        freshList = JSON.parse(currentList);
        return freshList;
    } else {
        freshList = [];
    }
    return freshList;
}

function addInfo (n) {
    var addedList = getInfo();

    if (historyList.includes(inputCity) === false){
        addedList.push(n);
    }
   
    localStorage.setItem("city", JSON.stringify(addedList));
};

function renderInfo () {
    var historyList = getInfo();
    for (var i = 0; i < historyList.length; i++) {
        var inputCity = historyList[i];
        var searchCity =$("<div>") 
        searchCity.attr('id',inputCity) 
        searchCity.text(inputCity) 
        searchCity.addClass("h4")

        $(".history").append(searchCity)
    }
};

renderInfo();