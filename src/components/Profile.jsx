import React from "react";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";

const Profile = React.memo(() => {
  return (
    <main className="profile">
      <SideBar />
      <ClothesSection />
    </main>
  );
});

export default Profile;
