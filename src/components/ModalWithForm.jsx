import React from "react";

const ModalWithForm = React.memo(
  ({
    children,
    isOpen,
    name,
    title,
    submitButtonText,
    onClose,
    onSubmit,
    onOutsideClick,
    submitBtnIsEnabled,
    uniqueFormClass,
    secondFormBtn,
  }) => {
    function handleFormSubmit(evt) {
      evt.preventDefault();
      onSubmit();
      onClose();
    }

    return (
      <div
        className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}
        onClick={onOutsideClick}
      >
        <form
          action=""
          className={`form form_type_${name}`}
          name={`${name}-form`}
          onSubmit={handleFormSubmit}
        >
          <button
            type="button"
            className="modal__close-btn modal__close-btn_container_form"
            onClick={onClose}
          />
          <h3
            className={`form__title ${
              uniqueFormClass ? `form__title_type_${uniqueFormClass}` : ""
            }`}
          >
            {title}
          </h3>
          {children}
          <button
            type="submit"
            className={`form__submit-btn ${
              submitBtnIsEnabled ? "" : "form__submit-btn_disabled"
            } ${
              uniqueFormClass ? `form__submit-btn_type_${uniqueFormClass}` : ""
            }`}
            disabled={!submitBtnIsEnabled}
          >
            {submitButtonText}
          </button>
          {secondFormBtn}
        </form>
      </div>
    );
  }
);

export default ModalWithForm;
