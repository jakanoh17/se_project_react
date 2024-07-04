export default class WeatherApi {
  constructor(lat, long) {
    this.lat = lat;
    this.long = long;
  }

  callWeatherApi(apiKey) {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.long}&appid=${apiKey}`,
      {
        method: "GET",
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      } else return Promise.reject(`Api fetch error: ${res.status}`);
    });
  }
}
