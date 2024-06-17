import headerLogo from "../assets/logo.svg";
import headerAvatar from "../assets/avatar.png";
import "../blocks/Header.css";

function Header(props) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentLocation = props.city;

  function handleAddClothesClick() {
    setDisplay(" modal__opened");
  }

  return (
    <div className="header">
      <div
        className="header__left-side
        "
      >
        <img className="header__logo" src={headerLogo} alt="Header logo" />
        <p className="header__date-loc">
          {currentDate}, {currentLocation}
        </p>
      </div>
      <div className="header__right-side">
        <button
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <p className="header__name">Crayon</p>
        <img className="header__avatar" src={headerAvatar} alt="Avatar" />
      </div>
    </div>
  );
}

export default Header;
