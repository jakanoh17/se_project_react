import React from "react";

function ModalWithForm({
  children,
  isOpen,
  name,
  title,
  submitButtonText,
  onClose,
  onOutsideClick,
  onSubmit,
}) {
  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}
      onClick={onOutsideClick}
    >
      <form
        action=""
        className="form modal__form"
        name={name}
        onSubmit={onSubmit}
      >
        <button
          type="button"
          className="modal__close-btn modal__close-btn_container_form"
          onClick={onClose}
        />
        <h3 className="form__title">{title}</h3>
        {children}
        <button
          type="submit"
          className="form__submit-btn form__submit-btn_disabled"
        >
          {submitButtonText}
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;
