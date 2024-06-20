function ItemCard(props) {
  return (
    <div className="gallery__card-content">
      <img
        onClick={props.onImgClick}
        src={props.image}
        alt={props.title}
        className="gallery__card-image"
      />
      <h3 className="gallery__card-title">{props.title}</h3>
    </div>
  );
}

export default ItemCard;
