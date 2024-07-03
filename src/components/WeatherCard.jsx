import React from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ temp, weatherType }) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );
  const [weather, setWeather] = React.useState("clear");
  // const [dayOrNight, setDayOrNight] = React.useState("");
  // const [now, setNow] = React.useState(new Date().getHours());

  React.useEffect(() => {
    if (weatherType) {
      const lCaseWeather = weatherType.toLowerCase();
      setWeather(lCaseWeather);
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
        src={`/src/assets/${weather}.svg`}
        alt="Clouds"
        className={`wthr-card__clouds wthr-card__clouds_wthr-type_${weather}`}
      />
    </div>
  );
}

export default WeatherCard;
