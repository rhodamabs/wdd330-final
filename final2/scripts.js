const api = {
  key: "def4cfa7ffd7c8f92e8d7a126fe116ed",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);
  
function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchBox.value);
  }
}
  
function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}
  
function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);
  
  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;
 
  let hiLow = document.querySelector('.hi-low');
  hiLow.innerText = `${Math.round(weather.main.temp_max)}°F / ${Math.round(weather.main.temp_min)}°F`;
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



// Banner
const now = new Date();
if (now.getDay() === 1 || now.getDay() === 2) {
  document.getElementById("banner").style.display = "block";
}

const close = document.querySelector("#close");

close.addEventListener("click", () => {
    banner.style.display = "none";
});

// Dark Theme
var icon = document.getElementById("icon");
icon.onclick = function() {
  document.body.classList.toggle("dark-theme");
  if(document.body.classList.contains("dark-theme")){
    icon.src = "images/sun.png";
  }else{
    icon.src = "images/moon.png"
  }
}