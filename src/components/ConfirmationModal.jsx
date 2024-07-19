import React from "react";
import ModalWithForm from "./ModalWithForm";

const ConfirmationModal = React.memo(
  ({ isOpen, onClose, onOutsideClick, onSubmit }) => {
    return (
      <div
        className={`modal modal_type_del-confirmation ${
          isOpen ? "modal_opened" : ""
        }`}
        onClick={onOutsideClick}
      >
        <ModalWithForm
          title="Are you sure you want to delete this item? This action is irreversible."
          submitButtonText="Yes, delete item"
          onClose={onClose}
          onSubmit={onSubmit}
          submitBtnIsEnabled={true}
          name="del-confirmation"
          uniqueFormClass="deletion-form"
        >
          <button className="form__cancel-btn">Cancel</button>
        </ModalWithForm>
      </div>
    );
  }
);

export default ConfirmationModal;
