import React from "react";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";

const Profile = React.memo(
  ({
    clothing,
    onImgClick,
    onAddNewClick,
    openEditProfileModal,
    setIsLoggedIn,
    onCardLike,
    isLoggedIn,
    setCurrentUserData,
  }) => {
    return (
      <main className="profile">
        <SideBar
          onChangeProfileClick={openEditProfileModal}
          setIsLoggedIn={setIsLoggedIn}
          setCurrentUserData={setCurrentUserData}
        />
        <ClothesSection
          clothing={clothing}
          onImgClick={onImgClick}
          onAddNewClick={onAddNewClick}
          onCardLike={onCardLike}
          isLoggedIn={isLoggedIn}
        />
      </main>
    );
  }
);

Profile.displayName = "Profile";

export default Profile;
