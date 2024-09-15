import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Profile from "./Profile.jsx";
import ItemModal from "./ItemModal";
import AddItemModal from "./AddItemModal.jsx";
import ConfirmationModal from "./ConfirmationModal.jsx";
import RegisterModal from "./RegisterModal.jsx";
import LoginModal from "./LoginModal.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

import findPosition from "../utils/utils/findPosition.js";
import fetchWeatherData from "../utils/utils/fetchWeatherData.js";
import Api from "../utils/utils/Api.js";
import AuthorizeUser from "../utils/utils/auth.js";

import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfileModal from "./EditProfileModal.jsx";

const authorizeUser = new AuthorizeUser("http://localhost:3001");
const api = new Api("http://localhost:3001");

function App() {
  const [city, setCity] = React.useState("");
  const [temp, setTemp] = React.useState({});
  const [genWeather, setGenWeather] = React.useState("");

  const [activeModal, setActiveModal] = React.useState("");
  const [clothing, setClothing] = React.useState([]);
  const [currentItem, setCurrentItem] = React.useState({});

  const [currentTemperatureUnit, setCurrentTemperatureUnit] =
    React.useState("F");

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUserData, setCurrentUserData] = React.useState({
    name: "",
    avatar: "",
    email: "",
  });

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

  function openRegisterModal() {
    setActiveModal("register-form");
  }

  function openLoginModal() {
    setActiveModal("login-form");
  }

  function openEditProfileModal() {
    setActiveModal("edit-profile-form");
  }
  // check for jwt upon initial visit
  React.useEffect(() => {
    if ("jwt" in localStorage) {
      const token = localStorage.getItem("jwt");
      getUserData(token);
    }
  }, []);

  function loginUser({ email, password }, resetForm) {
    authorizeUser
      .loginUser({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        getUserData(data.token);
        setIsLoggedIn(true);
        resetForm();
      })
      .catch(console.error);
  }

  function registerAndLoginUser(
    { email, password, username, avatar },
    resetForm
  ) {
    authorizeUser
      .registerUser({ email, password, username, avatar })
      .then(() => {
        loginUser({ email, password });
        resetForm();
      })
      .catch(console.error);
  }

  function getUserData(token) {
    api
      .getUserData(token)
      .then((responseUserData) => {
        setCurrentUserData(responseUserData);
        setIsLoggedIn(true);
      })
      .catch(console.error);
  }

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
      .catch(console.error);
  }, []);

  function handleCardLike(itemId, isLiked, setLike) {
    const token = localStorage.getItem("jwt");

    !isLiked
      ? api
          .addCardLike(token, itemId)
          .then((updatedCard) => {
            setClothing((cards) =>
              cards.map((item) => (item._id === itemId ? updatedCard : item))
            );
            setLike(!isLiked);
          })
          .catch(console.error)
      : api
          .removeCardLike(token, itemId)
          .then((updatedCard) => {
            setClothing((cards) =>
              cards.map((item) => (item._id === itemId ? updatedCard : item))
            );
            setLike();
          })
          .catch(console.error);
  }

  function addNewCard(newItem, resetForm) {
    if (isLoggedIn) {
      const token = localStorage.getItem("jwt");

      api
        .postNewCard(token, newItem)
        .then((responseBody) => {
          setClothing((prevClothing) => [responseBody.data, ...prevClothing]);
          closeModals();
          resetForm();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function handleCardDelete() {
    if (isLoggedIn) {
      const token = localStorage.getItem("jwt");
      api
        .deleteCard(token, currentItem._id)
        .then(() => {
          setClothing(
            clothing.filter((element) => {
              return currentItem._id != element._id;
            })
          );
          closeModals();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  const closeModals = React.useCallback(() => {
    setActiveModal("");
  }, []);

  const handleOutsideClkToCloseModal = React.useCallback(
    (evt) => {
      if (evt.target === evt.currentTarget) {
        closeModals();
      }
    },
    [closeModals]
  );

  // INITIALLY GET CARDS
  React.useEffect(() => {
    api
      .getCards()
      .then((data) => {
        console.log(123);
        setClothing(data.reverse());
      })
      .catch(console.error);
  }, []);

  //CLOSE MODAL
  React.useEffect(() => {
    function handleEscToCloseModal(evt) {
      if (evt.key === "Escape") {
        closeModals();
      }
    }

    if (activeModal) {
      document.addEventListener("keydown", handleEscToCloseModal);
    }

    return () => {
      document.removeEventListener("keydown", handleEscToCloseModal);
    };
  }, [closeModals, activeModal]);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, setCurrentTemperatureUnit }}
    >
      <CurrentUserContext.Provider value={currentUserData}>
        <div className="page">
          <Header
            city={city}
            isLoggedIn={isLoggedIn}
            addClothesHandler={openGarmentModal}
            onSignUpBtnClk={openRegisterModal}
            onLoginBtnClk={openLoginModal}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  temp={temp[currentTemperatureUnit]}
                  onImgClick={openImgModal}
                  weatherType={genWeather}
                  clothing={clothing}
                  onCardLike={handleCardLike}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    clothing={clothing}
                    onImgClick={openImgModal}
                    onAddNewClick={openGarmentModal}
                    openEditProfileModal={openEditProfileModal}
                    setIsLoggedIn={setIsLoggedIn}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                    setCurrentUserData={setCurrentUserData}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
          <AddItemModal
            isOpen={activeModal === "garment-form"}
            onClose={closeModals}
            onOutsideClick={handleOutsideClkToCloseModal}
            onAddItem={addNewCard}
          />
          <ItemModal
            isOpen={activeModal === "item-image"}
            onClose={closeModals}
            onOutsideClick={handleOutsideClkToCloseModal}
            card={currentItem}
            openConfirmPageHandler={openConfirmationModal}
          />
          <ConfirmationModal
            isOpen={activeModal === "delete-confirmation-form"}
            onClose={closeModals}
            onOutsideClick={handleOutsideClkToCloseModal}
            onSubmit={handleCardDelete}
          />
          <RegisterModal
            isOpen={activeModal === "register-form"}
            onClose={closeModals}
            onOutsideClick={handleOutsideClkToCloseModal}
            registerAndLoginUser={registerAndLoginUser}
            onLoginBtnClk={openLoginModal}
          />
          <LoginModal
            isOpen={activeModal === "login-form"}
            onClose={closeModals}
            onOutsideClick={handleOutsideClkToCloseModal}
            onSignUpBtnClk={openRegisterModal}
            loginUser={loginUser}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile-form"}
            onClose={closeModals}
            onOutsideClick={handleOutsideClkToCloseModal}
            api={api}
            setCurrentUserData={setCurrentUserData}
          />
        </div>{" "}
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
