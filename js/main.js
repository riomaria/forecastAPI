const cityData = {
  496638: 'Сергиев Посад',
  511359: 'Переславль-Залесский',
  501183: 'Ростов',
  468902: 'Ярославль',
  543878: 'Кострома',
  555312: 'Иваново',
  485824: 'Суздаль',
  473247: 'Владимир',
};

const param = {
  'url': 'https://api.openweathermap.org/data/2.5/',
  'appid': 'f8cfbd783a68ed8454b069696ff75586',
  'time': ['weather','forecast'],
}

const timeDay = param['time'][0];
const timeDays = param['time'][1];

const citySet = document.querySelector('.dropdown__item');

function getWeather () {
  fetch(`${param['url']}${timeDay}?id=${citySet.value}&appid=${param['appid']}`)
  .then(weather => {
    return weather.json();
  }).then(showWeather);
};


function showWeather(data) {
  const cityName = document.querySelector('.product__title');
  const outItem = document.querySelectorAll('.product__value');
  console.log(data);

  // Russian name of sity
	let rusNameCity;
  const translateCityName = function () {
    const cityId = data['id'];
    rusNameCity = cityData[cityId];
    return rusNameCity;
  }

  // Temperature

  const temperature = Math.round(data['main']['temp']) - 273;
  const temperatureFeels = Math.round(data['main']['feels_like']) - 273;

  // Get icon

  const iconWeather = document.querySelector('.product__icon');
	const getImage = function () {
		const numberIcon = data.weather[0]['icon'];
		const url = `https://openweathermap.org/img/wn/${numberIcon}@2x.png`;
		return url;
	}

  cityName.textContent = translateCityName();
  iconWeather.setAttribute('src', getImage());
  outItem[0].innerHTML = temperature + '&#8451;'; // temperature
  outItem[1].innerHTML = temperatureFeels + '&#8451;'; // feels like
  outItem[2].textContent = data['wind']['speed'] + 'м/c'; // wind speed
  outItem[3].textContent = data.weather[0]['description'] // weather description
}

getWeather();

citySet.addEventListener('change', () => {
	getWeather();
});
