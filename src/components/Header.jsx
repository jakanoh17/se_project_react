import headerLogo from "../assets/logo.svg";
import headerAvatar from "../assets/avatar.png";
import ToggleSwitch from "./ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ city, addClothesHandler }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div
        className="header__left-side
        "
      >
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
          <p className="header__name">Crayon</p>{" "}
          <img className="header__avatar" src={headerAvatar} alt="Avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
