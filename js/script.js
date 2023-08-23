const apiKey = "6fac21f48593e3f3a7f6ce97bebfb9fa";

const searchInput = document.querySelector("#search_input");
const searchBtn = document.querySelector("#search_button");
const diaCidade = document.querySelector(".dia-cidade");
const diaAtual = document.querySelector(".dia-atual");
const descricao = document.querySelector(".descricao");
const horario = document.querySelector(".horario-atual");
const clima = document.querySelector(".clima");
const temperatura = document.querySelector(".temperatura span");
const umidade = document.querySelector(".umidade");

// Funções
const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  return data;
};

const showWeatherData = async (city) => {
  const data = await getWeatherData(city);
  const date = new Date();
  console.log(data);
  diaCidade.innerText = data.name;
  temperatura.innerHTML = parseInt(data.main.temp) + "&deg;C";
  descricao.innerText = data.weather[0].description;
  const weatherIcon = data.weather[0].icon;

  if (weatherIcon === "01d" || weatherIcon === "01n") {
    // Clear sky
    clima.innerHTML = '<i class="fas fa-sun" style="color: #f9bf3b;"></i>';
  } else if (weatherIcon === "02d" || weatherIcon === "02n") {
    // Few clouds
    clima.innerHTML = '<i class="fas fa-cloud-sun" style="color: #f1c40f;"></i>';
  } else if (weatherIcon === "03d" || weatherIcon === "03n") {
    // Scattered clouds
    clima.innerHTML = '<i class="fas fa-cloud" style="color: #95a5a6;"></i>';
  } else if (weatherIcon === "04d" || weatherIcon === "04n") {
    // Broken clouds
    clima.innerHTML = '<i class="fas fa-cloud" style="color: #95a5a6;"></i>';
  } else if (weatherIcon === "09d" || weatherIcon === "09n") {
    // Shower rain
    clima.innerHTML = '<i class="fas fa-cloud-showers-heavy" style="color: #3498db;"></i>';
  } else if (weatherIcon === "10d" || weatherIcon === "10n") {
    // Rain
    clima.innerHTML = '<i class="fas fa-cloud-rain" style="color: #3498db;"></i>';
  } else if (weatherIcon === "11d" || weatherIcon === "11n") {
    // Thunderstorm
    clima.innerHTML = '<i class="fas fa-bolt" style="color: #e74c3c;"></i>';
  } else if (weatherIcon === "13d" || weatherIcon === "13n") {
    // Snow
    clima.innerHTML = '<i class="fas fa-snowflake" style="color: #ecf0f1;"></i>';
  } else if (weatherIcon === "50d" || weatherIcon === "50n") {
    // Mist
    clima.innerHTML = '<i class="fas fa-smog" style="color: #bdc3c7;"></i>';
  }
  

  umidade.innerText = `Umidade: ${data.main.humidity}%`;
  if (data.main.humidity === undefined) {
    umidade.innerText = "Umidade indisponível";
  }
  
  const cityHours = date.getHours();
  const cityMinutes = date.getMinutes();
  horario.innerText = `${cityHours}:${cityMinutes < 10 ? "0" : ""}${cityMinutes}`;
  
  const weekdays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
  const currentDayIndex = date.getDay();
  diaAtual.innerText = weekdays[currentDayIndex];
};

// Eventos
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const city = searchInput.value;
  showWeatherData(city);
});

searchBtn.addEventListener("keyup", (e) => {
  if(e.code === "Enter") {
    const city = e.target.value;

    showWeatherData(city);
  }
})