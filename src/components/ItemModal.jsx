function ItemModal({ activeModal, onClose, onOutsideClick, card }) {
  return (
    <div
      onClick={onOutsideClick}
      className={`modal modal_type_item ${
        activeModal == "item-image" ? "modal_opened" : ""
      }`}
    >
      <div className="modal__item">
        <button
          className="modal__close-btn modal__close-btn_container_enlg-item"
          type="button"
          onClick={onClose}
        ></button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__caption">
          <p className="modal__item-name">{card.name}</p>
          <p className="modal__weather">{`Weather: ${card.weather}`}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
