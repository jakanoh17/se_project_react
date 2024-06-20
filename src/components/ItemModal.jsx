function ItemModal(props) {
  const imgSrc = props.card.src;
  console.log(imgSrc);

  return (
    <div
      onClick={props.onOutsideClick}
      className={`modal modal_type_item ${props.display}`}
    >
      <div className="modal__item">
        <button
          className="modal__close-btn modal__close-btn_container_enlg-item"
          type="button"
          onClick={props.onClose}
        ></button>
        <img src={imgSrc} alt={props.name} className="modal__image" />
        <div className="modal__caption">
          <p className="modal__item-name">{props.name}</p>
          <p className="modal__weather">Weather: {props.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
