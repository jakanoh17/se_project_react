import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

const ItemModal = React.memo(
  ({ isOpen, onClose, onOutsideClick, card, openConfirmPageHandler }) => {
    const { _id } = React.useContext(CurrentUserContext);

    return (
      <div
        onClick={onOutsideClick}
        className={`modal modal_type_item ${isOpen ? "modal_opened" : ""}`}
      >
        <div className="modal__item">
          <button
            className="modal__close-btn modal__close-btn_container_enlg-item"
            type="button"
            onClick={onClose}
          ></button>
          <img src={card.imageUrl} alt={card.name} className="modal__image" />
          <div className="modal__caption">
            <p className="modal__item-name">{card.name}</p>
            <p className="modal__weather">{`Weather: ${card.weather}`}</p>
            {isOpen && card.owner === _id && (
              <button
                type="button"
                className="modal__delete-btn"
                onClick={openConfirmPageHandler}
              >
                Delete item
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default ItemModal;
