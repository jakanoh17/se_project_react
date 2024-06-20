import WeatherApi from "../utils/weatherApi.js";
import Header from "./Header";
import Main from "./Main";
import React from "react";
import Footer from "./Footer";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";

function App() {
  //used states for location, in case someone is accessing this on mobile
  const [latitude, setLatitude] = React.useState();
  const [longitude, setLongitude] = React.useState();
  const [city, setCity] = React.useState("Current Location");
  const [temp, setTemp] = React.useState();
  const [genWeather, setGenWeather] = React.useState();

  const [formModalDisplay, setFormModalDisplay] = React.useState("");
  const [itemModalDisplay, setItemModalDisplay] = React.useState("");

  const [currentItem, setCurrentItem] = React.useState("");
  const openedModalClass = "modal_opened";

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
        .callWeatherApi()
        .then((data) => {
          setCity(data.name);
          setTemp(Math.round(((data.main.temp - 273.15) * 9) / 5 + 32));
          setGenWeather(data.weather[0].main);
        })
        .catch((err) => console.error(err));
    }
  }, [latitude, longitude]);

  function openModal(evt) {
    const tgtClassList = Array.from(evt.currentTarget.classList);

    if (tgtClassList.includes("header__add-clothes-btn")) {
      setFormModalDisplay(openedModalClass);
    }
    if (tgtClassList.includes("gallery__card")) {
      setItemModalDisplay(openedModalClass);
      setCurrentItem(evt.curentTarget);
    }
  }

  function closeModal(evt) {
    const tgtClassList = Array.from(evt.currentTarget.classList);

    if (tgtClassList.includes("modal__close-btn_container_enlg-item")) {
      setItemModalDisplay("");
    }
    if (tgtClassList.includes("modal__close-btn_container_form")) {
      setFormModalDisplay("");
    }
  }

  function handleEscToCloseModal(evt) {
    if (evt.key === "Escape") {
      setFormModalDisplay("");
      setItemModalDisplay("");
    }
  }

  function hndlOutsideClkToCloseModal(evt) {
    if (evt.target === evt.currentTarget) {
      setFormModalDisplay("");
      setItemModalDisplay("");
    }
  }

  return (
    <div className="page" onKeyDown={handleEscToCloseModal}>
      <Header city={city} addClothesHandler={openModal} />
      <Main temp={temp} onImgClick={openModal} />
      <Footer />
      <ModalWithForm
        display={formModalDisplay}
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
        onClose={closeModal}
        onOutsideClick={hndlOutsideClkToCloseModal}
        display={itemModalDisplay}
        card={currentItem}
      />
    </div>
  );
}

export default App;
