import React from "react";
import avatar from "../assets/avatar.png";

export const ProfileInfoContext = React.createContext();

export const profileInfo = { avatar: avatar, userName: "Crayon" };
