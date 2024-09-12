import React from "react";
import ItemCard from "./ItemCard";
import CurrentUserContext from "../contexts/CurrentUserContext";

const ClothesSection = React.memo(
  ({ clothing, onImgClick, onAddNewClick, onCardLike, isLoggedIn }) => {
    const currentUserData = React.useContext(CurrentUserContext);

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
            if (currentUserData._id === card.owner) {
              return (
                <li key={card._id} className="gallery__card">
                  <ItemCard
                    item={card}
                    onImgClick={onImgClick}
                    onCardLike={onCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                </li>
              );
            }
          })}
        </ul>
      </main>
    );
  }
);

export default ClothesSection;
