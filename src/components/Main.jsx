import WeatherCard from "./WeatherCard";
import React from "react";
import ItemCard from "./ItemCard";

function Main(props) {
  React.useEffect(() => {
    if (props.temp) {
      const weather = determineWeatherType();
      const filteredClothes = props.clothing.filter((item) => {
        return weather == item.weather;
      });
      props.setClothing(filteredClothes);
    }
  }, [props.temp]);

  function determineWeatherType() {
    return props.temp > 80 ? "hot" : props.temp > 60 ? "warm" : "cold";
  }

  return (
    <main>
      <WeatherCard temp={props.temp} weatherType={props.weatherType} />
      <div className="gallery gallery__container">
        <h2 className="gallery__header">
          Today is {props.temp || "--"}° F / You may want to wear:
        </h2>
        <ul className="gallery__cards">
          {props.clothing.map((item) => {
            return (
              <li key={item._id} className="gallery__card">
                <ItemCard item={item} onImgClick={props.onImgClick} />
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}

export default Main;
