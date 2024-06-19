function ItemModal(props) {
  return (
    <div className={`modal modal_type_item ${props.display}`}>
      <div className="item-card">
        <button
          className="modal__close-btn"
          type="button"
          onClick={props.onClose}
        ></button>
        {/* <img src={props.image} alt={props.name} className="item-card__image" /> */}
        <p className="item-card__name">{props.name}</p>
        <p className="item-card__weather">Weather: {props.weather}</p>
      </div>
    </div>
  );
}

export default ItemModal;
