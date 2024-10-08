import React from "react";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import { styledWeatherTypes } from "../utils/constants";
import atmosphere from "../assets/atmosphere.svg";
import clouds from "../assets/clouds.svg";
import rain from "../assets/rain.svg";
import thunderstorm from "../assets/thunderstorm.svg";
import snow from "../assets/snow.svg";

const WeatherCard = React.memo(({ temp, weatherType }) => {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );
  const [weather, setWeather] = React.useState("clear");
  const weatherImgs = {
    atmosphere,
    clouds,
    rain,
    thunderstorm,
    snow,
    clear:
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  };
  // const [dayOrNight, setDayOrNight] = React.useState("");
  // const [now, setNow] = React.useState(new Date().getHours());

  React.useEffect(() => {
    if (weatherType) {
      if (styledWeatherTypes.includes(weatherType)) {
        const lCaseWeather = weatherType.toLowerCase();
        setWeather(lCaseWeather);
      } else setWeather("atmosphere");
    }
  }, [weatherType]);

  // check if day or night
  // React.useEffect(() => {
  //   if (now) {
  //     now >= 6 && now <= 21 ? setDayOrNight("day") : setDayOrNight("night");
  //     console.log(dayOrNight);
  //   }
  // }, [now]);

  return (
    <div
      className={`wthr-card wthr-card__card wthr-card__wthr-type_${weather}`}
    >
      <h1 className="wthr-card__temp">
        {temp + `\u00B0${currentTemperatureUnit}` || "--"}
      </h1>
      <div
        className={`wthr-card__celest-bod wthr-card__celest-bod_wthr-type_${weather}`}
      ></div>
      <img
        src={weatherImgs[weather]}
        alt="Clouds"
        className={`wthr-card__clouds wthr-card__clouds_wthr-type_${weather}`}
      />
    </div>
  );
});

WeatherCard.displayName = "WeatherCard";
export default WeatherCard;
