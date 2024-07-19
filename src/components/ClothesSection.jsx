import React from "react";
import ItemCard from "./ItemCard";

const ClothesSection = React.memo(({ clothing, onImgClick, onAddNewClick }) => {
  return (
    <main className="clothes-section">
      <p className="clothes-section__title">Your items</p>
      <button
        type="button"
        className="clothes-section__button"
        onClick={onAddNewClick}
      >
        + Add new
      </button>
      <ul className="gallery__cards gallery__cards_location_profile">
        {clothing.map((card) => {
          return (
            <li key={card._id} className="gallery__card">
              <ItemCard item={card} onImgClick={onImgClick} />
            </li>
          );
        })}
      </ul>
    </main>
  );
});

export default ClothesSection;
