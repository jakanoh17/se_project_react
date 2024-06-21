function ItemCard({ item, onImgClick }) {
  function handleImgClick() {
    onImgClick(item);
  }

  return (
    <div className="gallery__card-content">
      <img
        src={item.link}
        alt={item.name}
        className="gallery__card-image"
        onClick={handleImgClick}
      />
      <h3 className="gallery__card-title">{item.name}</h3>
    </div>
  );
}

export default ItemCard;
