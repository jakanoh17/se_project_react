import React from "react";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";

const Profile = React.memo(({ clothing, onImgClick }) => {
  return (
    <main className="profile">
      <SideBar />
      <ClothesSection clothing={clothing} onImgClick={onImgClick} />
    </main>
  );
});

export default Profile;
