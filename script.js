fetch('https://api.openweathermap.org/data/2.5/forecast?lat=39&lon=-119&appid=7b51adeaefa46b13afad2d8fa4f7189e')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });