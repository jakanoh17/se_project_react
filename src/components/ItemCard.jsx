import React from "react";

const ItemCard = React.memo(({ item, onImgClick, onCardLike, isLoggedIn }) => {
  const [isLiked, setIsLiked] = React.useState(false);

  function handleImgClick() {
    onImgClick(item);
  }

  function handleLike() {
    onCardLike(item._id, isLiked);
    setIsLiked(!isLiked);
  }
  return (
    <div className="gallery__card-content">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="gallery__card-image"
        onClick={handleImgClick}
      />
      <div className="gallery__card-header">
        <h3 className="gallery__card-title">{item.name}</h3>
        {isLoggedIn && (
          <button
            type="button"
            className={`gallery__like-button ${
              isLiked ? "gallery__like-button_selected" : ""
            }`}
            onClick={handleLike}
          ></button>
        )}
      </div>
    </div>
  );
});

export default ItemCard;
