import WeatherCard from "./WeatherCard";
import React from "react";
import ItemCard from "./ItemCard";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

const Main = React.memo(({ temp, onImgClick, weatherType, clothing }) => {
  const [filteredClothes, setFilteredClothes] = React.useState([]);

  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );

  function determineWeatherType() {
    if (currentTemperatureUnit === "F") {
      return temp > 80 ? "hot" : temp > 60 ? "warm" : "cold";
    } else return temp > 27 ? "hot" : temp > 16 ? "warm" : "cold";
  }

  React.useEffect(() => {
    if (temp) {
      const weather = determineWeatherType();
      setFilteredClothes(
        clothing.filter((item) => {
          return weather == item.weather;
        })
      );
    }
  }, [temp, clothing]);

  return (
    <main>
      <WeatherCard temp={temp} weatherType={weatherType} />
      <div className="gallery gallery__container">
        <h2 className="gallery__header">
          Today is {temp + `\u00B0${currentTemperatureUnit}` || "--"} / You may
          want to wear:
        </h2>
        <ul className="gallery__cards">
          {filteredClothes.map((item) => {
            return (
              <li key={item._id} className="gallery__card">
                <ItemCard item={item} onImgClick={onImgClick} />
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
});

export default Main;
