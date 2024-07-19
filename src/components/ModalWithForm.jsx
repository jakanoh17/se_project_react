import React from "react";

const ModalWithForm = React.memo(
  ({
    children,
    name,
    title,
    submitButtonText,
    onClose,
    onSubmit,
    submitBtnIsEnabled,
    uniqueFormClass,
  }) => {
    return (
      <form
        action=""
        className={`form modal__form form_type_${name}`}
        name={`${name}-form`}
        onSubmit={onSubmit}
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
      </form>
    );
  }
);

export default ModalWithForm;
