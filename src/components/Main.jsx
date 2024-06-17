import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";

function Main(props) {
  return (
    <>
      <WeatherCard temp={props.temp} />
      <div className="gallery gallery__container">
        <h2 className="gallery__header">
          Today is {props.temp}° F / You may want to wear:
        </h2>
        <ItemCard />
      </div>
    </>
  );
}

export default Main;
