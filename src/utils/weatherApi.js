export default class WeatherApi {
  constructor(lat, long) {
    this.lat = lat;
    this.long = long;
  }

  callWeatherApi() {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.long}&appid=95b5ff3b2cba1d235f3db91c36b13015`,
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
