import React from "react";
import ModalWithForm from "./ModalWithForm";

const ConfirmationModal = React.memo(
  ({ isOpen, onClose, onOutsideClick, onSubmit }) => {
    return (
      <ModalWithForm
        isOpen={isOpen}
        title="Are you sure you want to delete this item? This action is irreversible."
        submitButtonText="Yes, delete item"
        onClose={onClose}
        onSubmit={onSubmit}
        onOutsideClick={onOutsideClick}
        submitBtnIsEnabled={true}
        name="del-confirmation"
        uniqueFormClass="deletion-form"
      >
        <button className="form__cancel-btn">Cancel</button>
      </ModalWithForm>
    );
  }
);

export default ConfirmationModal;
