import WeatherApi from "./WeatherApi.js";
import {
  weatherApiKey,
  convertTempFromKToF,
  convertTempFromKToC,
} from "../constants.js";

function fetchWeatherData({ latitude, longitude }) {
  const weatherApi = new WeatherApi(latitude, longitude);
  const climateObj = weatherApi
    .callWeatherApi(weatherApiKey)
    .then((data) => {
      return {
        city: data.name,
        temp: {
          F: Math.round(convertTempFromKToF(data.main.temp)),
          C: Math.round(convertTempFromKToC(data.main.temp)),
        },
        genWeather: data.weather[0].main,
      };
    })
    .catch(console.error);

  return new Promise((resolve, reject) => {
    resolve(climateObj);
    reject("fetchWeatherData function has failed");
  });
}

export default fetchWeatherData;
