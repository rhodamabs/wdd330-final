const api = {
  key: "def4cfa7ffd7c8f92e8d7a126fe116ed",
  base: "https://api.openweathermap.org/data/2.5/"
}

const now = new Date();
const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);
  
function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchBox.value);
  }
}
  
function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(data => {
      return data.json();
    }).then(displayResults);
}
  
function displayResults (data) {
  let city = document.querySelector('.location .city');
  city.innerText = `${data.name}, ${data.sys.country}`;

  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);
  
  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(data.main.temp)}<span>°F</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = data.weather[0].main;
 
  let hiLow = document.querySelector('.hi-low');
  hiLow.innerText = `${Math.round(data.main.temp_max)}°F / ${Math.round(data.main.temp_min)}°F`;

  // Banner
  if (data.weather[0].main === 'Rain' || data.weather[0].main === 'Snow') {
    document.getElementById("banner").style.display = "block";
  }

  const close = document.querySelector("#close");

  close.addEventListener("click", () => {
    banner.style.display = "none";
  });
}
  
function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
 
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];

  return `${day} ${month} ${date} `;
}


// 5 Day DropDown
function getFiveDayResults () {
  let query = document.getElementById("search-box").value;
  fetch(`${api.base}forecast?q=${query}&cnt=6&exclude=current,minutely,hourly&units=imperial&APPID=${api.key}`)
    .then(data2 => {
      return data2.json();
}).then(displayFiveDayResults);
}

function displayFiveDayResults(data2){
  let dailyForecast = data2.list;
  document.getElementById("fiveDayForecast").innerHTML = "";
  for (x = 1; x < dailyForecast.length; x++) {
    let day = dailyForecast[x];
    let today = new Date().getDay() + x;
    today = today % 7;
    let dayOfWeek = getDayOfWeek(today);
    let icon = day.weather[0].icon;
    let highTemp = day.main.temp_max;
    let lowTemp = day.main.temp_min;
    displayWeatherDay(dayOfWeek,icon, highTemp, lowTemp)
  }
}
let getDayOfWeek = function(dayNum){
  const weekDay = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  return (weekDay[dayNum]);
}

let displayWeatherDay = function(dayOfWeek, icon, highTemp, lowTemp) {
  let out = "<span class='day'>" + dayOfWeek + "</span>";
  out += "<div class='weatherDay'><img src='http://openweathermap.org/img/wn/" + icon + "@2x.png'>";
  out += "<p>" + Math.round(highTemp) + "°F / " + Math.round(lowTemp) + "°F</p>";
  out += "<hr></hr>";
  document.getElementById("fiveDayForecast").innerHTML += out;
}


// Dark Theme
var icon = document.getElementById("icon");
icon.onclick = function() {
  document.body.classList.toggle("dark-theme");
  if(document.body.classList.contains("dark-theme")){
    icon.src = "../images/sun.png";
  }else{
    icon.src = "../images/moon.png"
  }
}