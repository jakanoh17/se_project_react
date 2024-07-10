import React from "react";

const ConfirmationModal = React.memo(
  ({
    children,
    isOpen,
    name,
    deleteButtonText,
    onClose,
    onOutsideClick,
    onSubmit,
  }) => {
    return (
      <div
        className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}
        onClick={onOutsideClick}
      >
        <form
          action=""
          className="form modal__form modal__form_type_confirmation"
          name={name}
          onSubmit={onSubmit}
        >
          <button
            type="button"
            className="modal__close-btn modal__close-btn_container_form"
            onClick={onClose}
          />
          {children}
          <button
            type="submit"
            className="form__submit-btn form__submit-btn_type_del-item"
          >
            {deleteButtonText}
          </button>
          <button type="button" className="form__cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    );
  }
);

export default ConfirmationModal;
