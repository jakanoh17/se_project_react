import React from "react";
import headerLogo from "../assets/logo.svg";
import ToggleSwitch from "./ToggleSwitch";
import { Link } from "react-router-dom";
import { ProfileInfoContext } from "../contexts/ProfileInfoContext";

const Header = React.memo(({ city, addClothesHandler }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const { avatar, userName } = React.useContext(ProfileInfoContext);

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
        <button
          type="button"
          className="header__add-clothes-btn"
          onClick={addClothesHandler}
        >
          + Add clothes
        </button>
        <Link to="/profile" className="header__link">
          <p className="header__name">{userName}</p>{" "}
          <img className="header__avatar" src={avatar} alt="Avatar" />
        </Link>
      </div>
    </header>
  );
});

export default Header;
