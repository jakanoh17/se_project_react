import Header from "./Header";
import Main from "./Main";
import React from "react";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import Profile from "./Profile.jsx";
import AddItemModal from "./AddItemModal.jsx";
import ModalWithForm from "./ModalWithForm.jsx";

import {
  defaultClothingItems,
  // validationConfig,
  // formValidators,
} from "../utils/constants.js";
import findPosition from "../utils/utils/findPosition.js";
import fetchWeatherData from "../utils/utils/fetchWeatherData.js";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext.js";
import { Routes, Route } from "react-router-dom";
// import FormValidator from "../utils/utils/FormValidator.js";

// GO THROUGH AND SEE WHICH COMPS NEED TO BE PURE OR NOT
function App() {
  const [city, setCity] = React.useState("");
  const [temp, setTemp] = React.useState({});
  const [genWeather, setGenWeather] = React.useState("");

  const [activeModal, setActiveModal] = React.useState(
    "delete-confirmation-form"
  );
  const [clothing, setClothing] = React.useState(defaultClothingItems);
  const [currentItem, setCurrentItem] = React.useState({});

  const [currentTemperatureUnit, setCurrentTemperatureUnit] =
    React.useState("F");

  // (function enableValidators() {
  //   const formList = document.querySelectorAll(validationConfig.formSelector);
  //   formList.forEach((form) => {
  //     const validator = new FormValidator(validationConfig, form);
  //     formValidators[form.id] = validator;
  //     validator.enableValidation();
  //   });
  // })();

  function openGarmentModal() {
    setActiveModal("garment-form");
  }

  function openImgModal(card) {
    setActiveModal("item-image");
    setCurrentItem(card);
  }

  function handleAddItemSubmit(newItem) {
    setClothing([newItem, ...clothing]);
    console.log(clothing);
  }

  function deleteClothes(item) {
    const foundItem = clothing.filter((element) => {
      return item._id == element._id;
    });
    console.log(foundItem);
  }

  const closeModal = React.useCallback(() => {
    setActiveModal("");
  }, []);

  const handleOutsideClkToCloseModal = React.useCallback((evt) => {
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  }, []);

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
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, setCurrentTemperatureUnit }}
      >
        <Header city={city} addClothesHandler={openGarmentModal} />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                temp={temp[currentTemperatureUnit]}
                onImgClick={openImgModal}
                weatherType={genWeather}
                clothing={clothing}
                setClothing={setClothing}
              />
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
        <AddItemModal
          isOpen={activeModal === "garment-form"}
          onCloseModal={closeModal}
          onOutsideClick={handleOutsideClkToCloseModal}
          onAddItem={handleAddItemSubmit}
        />
        <ItemModal
          isOpen={activeModal === "item-image"}
          onClose={closeModal}
          onOutsideClick={handleOutsideClkToCloseModal}
          // display={itemModalDisplay}
          card={currentItem}
        />
        <ModalWithForm
          isOpen={activeModal === "delete-confirmation-form"}
          name="delete-confirmation"
          title="Are you sure you want to delete this item? This action is
            irreversible."
          submitButtonText="Yes, delete item"
          onClose={closeModal}
          onOutsideClick={handleOutsideClkToCloseModal}
          onSubmit={deleteClothes}
        ></ModalWithForm>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
