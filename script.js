const APIKey = "7b51adeaefa46b13afad2d8fa4f7189e"

var cityEl = document.getElementById("myInput").value
var geoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityEl + "&limit=5&appid=" + APIKey

var geoLon;   
var geoLat;
var dataUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + geoLat + "&lon="+ geoLon + "&units=imperial&appid=" + APIKey

var searchEl = document.getElementById("searchBtn")
var historyEl = document.getElementById("history")
var fiveDayEl = document.getElementById("fiveDay")
var currentTempEl = document.getElementById("temperature");
var currentHumidityEl = document.getElementById("humidity");
var currentWindEl = document.getElementById("windSpeed");
var currentUVEl = document.getElementById("UV-index");
