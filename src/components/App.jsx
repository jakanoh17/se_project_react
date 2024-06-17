import "../blocks/App.css";
import Header from "./Header";
import Main from "./Main";
import React from "react";
import Footer from "./Footer";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import WeatherApi from "../utils/weatherApi";

function App() {
  //used states for location, in case someone is accessing this on mobile
  const [latitude, setLatitude] = React.useState();
  const [longitude, setLongitude] = React.useState();
  const [city, setCity] = React.useState("Current Location");
  const [temp, setTemp] = React.useState();
  const [genWeather, setGenWeather] = React.useState();

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error(`Error retrieving geolocation: ${error}`);
        }
      );
    } else {
      console.error("Geolocation is not supported on this browser.");
    }
  }, [latitude, longitude]);

  React.useEffect(() => {
    if (longitude && latitude) {
      const weatherApi = new WeatherApi(latitude, longitude);
      weatherApi
        .callWeatherApi()
        .then((data) => {
          setCity(data.name);
          setTemp(Math.round(((data.main.temp - 273.15) * 9) / 5 + 32));
          setGenWeather(data.weather[0].main);
        })
        .catch((err) => console.error(err));
    }
  }, [latitude, longitude]);

  return (
    <div className="page">
      <Header city={city}/>
      <Main temp={temp} />
      <Footer />
      <ModalWithForm />
      <ItemModal />
    </div>
  );
}

export default App;
