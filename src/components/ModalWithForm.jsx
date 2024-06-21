import React from "react";

function ModalWithForm(props) {
  return (
    <div
      className={`modal modal_type_${props.name} ${
        props.activeModal == "form" ? "modal_opened" : ""
      }`}
      onClick={props.onOutsideClick}
    >
      <form action="" className="form" name={props.name}>
        <button
          type="button"
          className="modal__close-btn modal__close-btn_container_form"
          onClick={props.onClose}
        ></button>
        <h3 className="form__title">{props.title}</h3>
        {props.children}
        <button
          type="submit"
          className="form__submit-btn form__submit-btn_disabled"
          disabled
        >
          {props.buttonText}
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;
