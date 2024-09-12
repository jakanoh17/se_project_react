import React from "react";
import headerLogo from "../assets/logo.svg";
import ToggleSwitch from "./ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";

const Header = React.memo(
  ({ city, addClothesHandler, isLoggedIn, onSignUpBtnClk, onLoginBtnClk }) => {
    const currentDate = new Date().toLocaleString("default", {
      month: "long",
      day: "numeric",
    });
    const { name, avatar } = React.useContext(CurrentUserContext);
    // const avatarExtensionRegExp = /\.(jpeg|jpg|gif|png|svg|webp|bmp|tiff)$/i;

    return (
      <header className="header header__container">
        <div className="header__left-side">
          <Link to="/">
            <img className="header__logo" src={headerLogo} alt="Header logo" />
          </Link>
          <p className="header__date-loc">
            {currentDate}, {city}
          </p>
        </div>
        <div className="header__right-side">
          <ToggleSwitch />
          {isLoggedIn && (
            <>
              <button
                type="button"
                className="header__add-clothes-btn"
                onClick={addClothesHandler}
              >
                + Add clothes
              </button>
              <Link to="/profile" className="header__link">
                <p className="header__name">{name}</p>{" "}
                {avatar ? (
                  <img className="header__avatar" src={avatar} alt={name} />
                ) : (
                  <div className="header__avatar-placeholder">{name[0]}</div>
                )}
              </Link>
            </>
          )}
          {!isLoggedIn && (
            <>
              {" "}
              <button
                type="button"
                className="header__signup-btn"
                onClick={onSignUpBtnClk}
              >
                Sign Up
              </button>
              <button
                type="button"
                className="header__login-btn"
                onClick={onLoginBtnClk}
              >
                Log In
              </button>
            </>
          )}
        </div>
      </header>
    );
  }
);

export default Header;
