import WeatherApi from "../utils/weatherApi.js";
import Header from "./Header";
import Main from "./Main";
import React from "react";
import Footer from "./Footer";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import {
  defaultClothingItems,
  weatherApiKey,
  convertTempFromKToF,
} from "../utils/constants.js";

function App() {
  //used states for location, in case someone is accessing this on mobile
  const [city, setCity] = React.useState("Current Location");
  const [temp, setTemp] = React.useState();
  const [genWeather, setGenWeather] = React.useState();
  const [latitude, setLatitude] = React.useState();
  const [longitude, setLongitude] = React.useState();
  const [activeModal, setActiveModal] = React.useState("");
  const [clothing, setClothing] = React.useState(defaultClothingItems);

  const [currentItem, setCurrentItem] = React.useState("");

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
  }, []);

  React.useEffect(() => {
    if (longitude && latitude) {
      const weatherApi = new WeatherApi(latitude, longitude);
      weatherApi
        .callWeatherApi(weatherApiKey)
        .then((data) => {
          setCity(data.name);
          setTemp(Math.round(convertTempFromKToF(data.main.temp)));
          setGenWeather(data.weather[0].main);
        })
        .catch((err) => console.error(err));
    }
  }, [latitude, longitude]);

  function handleEscToCloseModal(evt) {
    if (evt.key === "Escape") {
      setActiveModal("");
    }
  }

  React.useEffect(() => {
    document.addEventListener("keydown", handleEscToCloseModal);
    return () => {
      document.removeEventListener("keydown", handleEscToCloseModal);
    };
  }, []);

  function openFormModal() {
    setActiveModal("form");
  }

  function openImgModal(card) {
    setActiveModal("item-image");
    setCurrentItem(card);
  }

  function closeModal() {
    setActiveModal("");
  }

  function hndlOutsideClkToCloseModal(evt) {
    if (evt.target === evt.currentTarget) {
      setActiveModal("");
    }
  }

  return (
    <div className="page">
      <Header city={city} addClothesHandler={openFormModal} />
      <Main
        temp={temp}
        onImgClick={openImgModal}
        weatherType={genWeather}
        location={{ latitude, longitude }}
        clothing={clothing}
        setClothing={setClothing}
      />
      <Footer />
      <ModalWithForm
        activeModal={activeModal}
        name="add-garment"
        title="New garment"
        buttonText="Add garment"
        //should be called when the user clicks on the close button, clicks outside of the modal content, or presses the Escape button
        onClose={closeModal}
        onOutsideClick={hndlOutsideClkToCloseModal}
      >
        <div className="form__entries">
          <label className="form__label">
            Name
            <input
              type="text"
              className="form__input"
              placeholder="Name"
              required
            />
          </label>
          <label className="form__label">
            Image
            <input
              type="url"
              className="form__input"
              placeholder="Image URL"
              required
            />
          </label>
          <div className="form__radio-container">
            <h4 className="form__sub-title">Select the weather types:</h4>
            <label htmlFor="hot" className="form__label form__label_type_radio">
              <input
                type="radio"
                name="wthr-type"
                value="hot"
                id="hot"
                className="form__input form__input_type_radio"
              />
              <span className="form__radio-span">Hot</span>
              <div className="form__radio-opt">
                <div className="form__chk-radio-opt"></div>
              </div>
            </label>
            <label
              htmlFor="warm"
              className="form__label form__label_type_radio"
            >
              <input
                type="radio"
                name="wthr-type"
                value="warm"
                id="warm"
                className="form__input form__input_type_radio"
              />
              <span className="form__radio-span">Warm</span>{" "}
              <div className="form__radio-opt">
                <div className="form__chk-radio-opt"></div>
              </div>
            </label>
            <label
              htmlFor="cold"
              className="form__label form__label_type_radio"
            >
              <input
                type="radio"
                name="wthr-type"
                value="cold"
                id="cold"
                className="form__input form__input_type_radio"
              />
              <span className="form__radio-span">Cold</span>
              <div className="form__radio-opt">
                <div className="form__chk-radio-opt"></div>
              </div>
            </label>
          </div>
        </div>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        onClose={closeModal}
        onOutsideClick={hndlOutsideClkToCloseModal}
        // display={itemModalDisplay}
        card={currentItem}
      />
    </div>
  );
}

export default App;
