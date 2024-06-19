import WeatherCard from "./WeatherCard";
import React from "react";
import ItemCard from "./ItemCard";
import { defaultClothingItems } from "../utils/constants.js";

function Main(props) {
  const [clothing, setClothing] = React.useState(defaultClothingItems);

  React.useEffect(() => {
    if (props.temp) {
      const weather = determineWeatherType();
      const filteredClothes = defaultClothingItems.filter((item) => {
        return weather == item.weather;
      });
      setClothing(filteredClothes);
    }
  }, [props.temp]);

  function determineWeatherType() {
    return props.temp > 80 ? "hot" : props.temp > 60 ? "warm" : "cold";
  }

  return (
    <>
      <WeatherCard temp={props.temp} />
      <div className="gallery gallery__container">
        <h2 className="gallery__header">
          Today is {props.temp || "--"}° F / You may want to wear:
        </h2>
        <ul className="gallery__cards">
          {clothing.map((item) => {
            return (
              <ItemCard
                key={item._id}
                image={item.link}
                title={item.name}
                onImgClick={props.onImgClick}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Main;
