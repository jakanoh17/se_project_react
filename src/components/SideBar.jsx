import React from "react";
import { ProfileInfoContext } from "../contexts/ProfileInfoContext";
import CurrentUserContext from "../contexts/CurrentUserContext";
const SideBar = React.memo(
  ({ onChangeProfileClick, setIsLoggedIn, setCurrentUserData }) => {
    const { name, avatar } = React.useContext(CurrentUserContext);

    // const avatarExtensionRegExp = /\.(jpeg|jpg|gif|png|svg|webp|bmp|tiff)$/i;

    function logoutUser() {
      localStorage.removeItem("jwt");
      setCurrentUserData({});
      setIsLoggedIn(false);
    }

    return (
      <aside className="sidebar">
        <div className="sidebar__profile">
          {avatar ? (
            <img className="sidebar__avatar" src={avatar} alt={name} />
          ) : (
            <div className="sidebar__avatar-placeholder">{name[0]}</div>
          )}
          <p className="sidebar__name">{name}</p>{" "}
        </div>
        <button
          type="button"
          className="sidebar__button"
          onClick={onChangeProfileClick}
        >
          Change profile data
        </button>
        <button type="button" className="sidebar__button" onClick={logoutUser}>
          Log out
        </button>
      </aside>
    );
  }
);

export default SideBar;
