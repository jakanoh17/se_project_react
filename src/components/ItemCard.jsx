function ItemCard(props) {
  return (
    <li
      className="gallery__card"
      style={{ backgroundImage: `url(${props.image})` }}
      onClick={props.onImgClick}
    >
      <div className="gallery__card-title-container">
        <p className="gallery__card-title">{props.title || "Card Title"}</p>
      </div>
    </li>
  );
}

export default ItemCard;
