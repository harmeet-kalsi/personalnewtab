const bgImg = document.getElementById("background-image");
const quote = document.getElementById("quotes");
const author = document.getElementById("author");
const time = document.getElementById("time");
const am_pm = document.getElementById("ampm");
const greet = document.getElementById("greet");
const cityName = document.getElementById("city");
const temperature = document.getElementById("temp");
const weatherIcon = document.getElementById("weatherImage");
let fDay1 = document.getElementById("fDay1");
let fDay2 = document.getElementById("fDay2");
let fDay3 = document.getElementById("fDay3");
let fTemp1 = document.getElementById("fTemp1");
let fTemp2 = document.getElementById("fTemp2");
let fTemp3 = document.getElementById("fTemp3");
let fImage1 = document.getElementById("fImage1");
let fImage2 = document.getElementById("fImage2");
let fImage3 = document.getElementById("fImage3");

//  TIME AND DAY  //

let date;
let currentHour;
let currentMinutes;
let hours;
let minutes;
let ampm;
let wishGreet;
let day1;
let day2;
let day3;

function updateTime() {
  date = new Date();
  currentHour = date.getHours();
  currentMinutes = date.getMinutes();
  hours = currentHour < 10 ? `0${currentHour}` : currentHour;
  minutes = currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes;
  ampm = hours < 12 ? "AM" : "PM";
  time.innerText = `${hours}:${minutes} ${ampm}`;
  if (hours > 12 && hours < 16) {
    greet.innerText = `Afternoon`;
  } else if (hours >= 16 && hours < 20) {
    greet.innerText = `Evening`;
  } else if (hours >= 20 && hours < 0) {
    greet.innerText = `Night`;
  } else {
    greet.innerText = `Morning`;
  }
}

setInterval(() => {
  updateTime();
}, 1000);

// RANDOM BACKGROUND UNSPLASH  //

const backgroundAPI = `-oD0URzcGtCchciz8xBkHj5yfVqq6fhXmLDdw6sDq2U`;
const bgImgURL = `https://api.unsplash.com/photos/random/?client_id=${backgroundAPI}&collections=nature&orientation=landscape`;

fetch(bgImgURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    bgImg.src = data.urls.regular;
  });

//  WEATHER API //
// const weatherIconURL = `https://cdn.weatherbit.io/static/img/icons/t04d.png`;

const weatherBitAPI = `ff8e8c18b6d544f89b021bc6b86230a5`;
const city = `Toronto`;
const weatherURL = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${weatherBitAPI}&include=minutely`;

fetch(weatherURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let weatherData = data;
    cityName.innerText = weatherData.data[0].city_name;
    temperature.innerText = `${weatherData.data[0].temp}°C`;
    weatherIcon.src = `https://cdn.weatherbit.io/static/img/icons/${weatherData.data[0].weather.icon}.png`;
  });

// FORECAST DATA  //

const forecastURL = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weatherBitAPI}&city=${city}`;

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const today = new Date();
const todayDay = today.getDay();
const tomorrow = days[(todayDay + 1) % 7];
const dayAfter = days[(todayDay + 2) % 7];
const thirdDay = days[(todayDay + 3) % 7];

fetch(forecastURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    const forcastData = data;
    const minTomorrow = Math.floor(forcastData.data[0].low_temp);
    const maxTomorrow = Math.floor(forcastData.data[0].high_temp);
    const minDayAfter = Math.floor(forcastData.data[1].low_temp);
    const maxDayAfter = Math.floor(forcastData.data[1].high_temp);
    const minThirdDay = Math.floor(forcastData.data[2].low_temp);
    const maxThirdDay = Math.floor(forcastData.data[2].high_temp);
    const fIcon1 = `https://cdn.weatherbit.io/static/img/icons/${forcastData.data[0].weather.icon}.png`;
    const fIcon2 = `https://cdn.weatherbit.io/static/img/icons/${forcastData.data[1].weather.icon}.png`;
    const fIcon3 = `https://cdn.weatherbit.io/static/img/icons/${forcastData.data[2].weather.icon}.png`;
    console.log(fIcon1);

    fDay1.innerText = tomorrow;
    fDay2.innerText = dayAfter;
    fDay3.innerText = thirdDay;

    fTemp1.innerText = `${minTomorrow}°/${maxTomorrow}°`;
    fTemp2.innerText = `${minDayAfter}°/${maxDayAfter}°`;
    fTemp3.innerText = `${minThirdDay}°/${maxThirdDay}°`;

    fImage1.src = fIcon1;
    fImage2.src = fIcon2;
    fImage3.src = fIcon3;
  });

//  RANDOM QUOTES API  //

const quotesAPI = `e0ff50b35386445aabc4592229648e29`;
const max_length = 120;
const quotesURL = `https://api.apileague.com/retrieve-random-quote?api-key=${quotesAPI}&max-length=${max_length}`;

fetch(quotesURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let fetchData = data;
    quote.innerText = fetchData.quote;
    author.innerText = fetchData.author;
  });
