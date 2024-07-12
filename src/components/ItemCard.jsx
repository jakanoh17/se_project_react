import React from "react";

const ItemCard = React.memo(({ item, onImgClick }) => {
  function handleImgClick() {
    onImgClick(item);
  }

  return (
    <div className="gallery__card-content">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="gallery__card-image"
        onClick={handleImgClick}
      />
      <h3 className="gallery__card-title">{item.name}</h3>
    </div>
  );
});

export default ItemCard;
