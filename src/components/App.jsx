import Header from "./Header";
import Main from "./Main";
import React from "react";
import Footer from "./Footer";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import { defaultClothingItems } from "../utils/constants.js";
import findPosition from "../utils/findPosition.js";
import fetchWeatherData from "../utils/fetchWeatherData.js";

function App() {
  const [city, setCity] = React.useState("");
  const [temp, setTemp] = React.useState("");
  const [genWeather, setGenWeather] = React.useState("");

  const [activeModal, setActiveModal] = React.useState("");
  const [clothing, setClothing] = React.useState(defaultClothingItems);
  const [currentItem, setCurrentItem] = React.useState({});

  function openGarmentModal() {
    setActiveModal("garment-form");
  }

  function openImgModal(card) {
    setActiveModal("item-image");
    setCurrentItem(card);
  }

  React.useEffect(() => {
    findPosition()
      .then((pos) => {
        return fetchWeatherData(pos);
      })
      .then((climate) => {
        setCity(climate.city);
        setTemp(climate.temp);
        setGenWeather(climate.genWeather);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const closeModal = React.useCallback(() => {
    setActiveModal("");
  }, []);

  const handleOutsideClkToCloseModal = React.useCallback((evt) => {
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  }, []);

  React.useEffect(() => {
    function handleEscToCloseModal(evt) {
      if (evt.key === "Escape") {
        closeModal();
      }
    }

    if (activeModal) {
      document.addEventListener("keydown", handleEscToCloseModal);
    }

    return () => {
      document.removeEventListener("keydown", handleEscToCloseModal);
    };
  }, [closeModal, activeModal]);

  return (
    <div className="page">
      <Header city={city} addClothesHandler={openGarmentModal} />
      <Main
        temp={temp}
        onImgClick={openImgModal}
        weatherType={genWeather}
        clothing={clothing}
        setClothing={setClothing}
      />
      <Footer />
      <ModalWithForm
        isOpen={activeModal === "garment-form"}
        name="add-garment"
        title="New garment"
        buttonText="Add garment"
        onClose={closeModal}
        onOutsideClick={handleOutsideClkToCloseModal}
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
            <label className="form__label form__label_type_radio">
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
            <label className="form__label form__label_type_radio">
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
            <label className="form__label form__label_type_radio">
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
        onOutsideClick={handleOutsideClkToCloseModal}
        // display={itemModalDisplay}
        card={currentItem}
      />
    </div>
  );
}

export default App;
