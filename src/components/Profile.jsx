import React from "react";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";

const Profile = React.memo(({ clothing, onImgClick, onAddNewClick }) => {
  return (
    <main className="profile">
      <SideBar />
      <ClothesSection
        clothing={clothing}
        onImgClick={onImgClick}
        onAddNewClick={onAddNewClick}
      />
    </main>
  );
});

export default Profile;
