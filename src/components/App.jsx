import Header from "./Header";
import Main from "./Main";
import React from "react";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import Profile from "./Profile.jsx";
import AddItemModal from "./AddItemModal.jsx";
import ConfirmationModal from "./ConfirmationModal.jsx";

import { defaultClothingItems } from "../utils/constants.js";
import findPosition from "../utils/utils/findPosition.js";
import fetchWeatherData from "../utils/utils/fetchWeatherData.js";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext.js";
import { Routes, Route } from "react-router-dom";
import Api from "../utils/utils/Api.js";

function App() {
  const [city, setCity] = React.useState("");
  const [temp, setTemp] = React.useState({});
  const [genWeather, setGenWeather] = React.useState("");

  const [activeModal, setActiveModal] = React.useState("");
  const [clothing, setClothing] = React.useState(defaultClothingItems);
  const [currentItem, setCurrentItem] = React.useState({});

  const [currentTemperatureUnit, setCurrentTemperatureUnit] =
    React.useState("F");

  const api = new Api("http://localhost:3001");

  function openGarmentModal() {
    setActiveModal("garment-form");
  }

  function openImgModal(card) {
    setActiveModal("item-image");
    setCurrentItem(card);
  }

  function openConfirmationModal() {
    setActiveModal("delete-confirmation-form");
  }

  function addNewCard(newItem) {
    api
      .postNewCard(newItem)
      .then((data) => {
        setClothing([data, ...clothing]);
      })
      .catch((err) => {
        console.error(err);
      });
    closeModal();
  }

  function handleCardDelete(evt) {
    api
      .deleteCard(currentItem._id)
      .then(() => {
        setClothing(
          clothing.filter((element) => {
            return currentItem._id != element._id;
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
    closeModal();
    evt.preventDefault();
  }

  const closeModal = React.useCallback(() => {
    setActiveModal("");
  }, []);

  const handleOutsideClkToCloseModal = React.useCallback((evt) => {
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  }, []);

  //GET INITIAL CARDS
  React.useEffect(() => {
    api
      .getCards()
      .then((data) => {
        setClothing(data.reverse());
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //GET WEATHER DATA
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

  //CLOSE MODAL
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
          onAddItem={addNewCard}
        />
        <ItemModal
          isOpen={activeModal === "item-image"}
          onClose={closeModal}
          onOutsideClick={handleOutsideClkToCloseModal}
          card={currentItem}
          openConfirmPageHandler={openConfirmationModal}
        />
        <ConfirmationModal
          isOpen={activeModal === "delete-confirmation-form"}
          name="del-confirmation"
          deleteButtonText={"Yes, delete item"}
          onClose={closeModal}
          onOutsideClick={handleOutsideClkToCloseModal}
          onSubmit={handleCardDelete}
        >
          <p className="form__deletion-text">
            Are you sure you want to delete this item? This action is
            irreversible.
          </p>
        </ConfirmationModal>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
