import React from "react";
import { ProfileInfoContext } from "../contexts/ProfileInfoContext";

const SideBar = React.memo(() => {
  const { avatar, userName } = React.useContext(ProfileInfoContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <img className="sidebar__avatar" src={avatar} alt="Avatar" />
        <p className="sidebar__name">{userName}</p>{" "}
      </div>{" "}
    </aside>
  );
});

export default SideBar;
