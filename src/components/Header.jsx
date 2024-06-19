import headerLogo from "../assets/logo.svg";
import headerAvatar from "../assets/avatar.png";

function Header(props) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentLocation = props.city;

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
          onClick={props.addClothesHandler}
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
