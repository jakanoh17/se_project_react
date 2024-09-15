import React from "react";
import ModalWithForm from "./ModalWithForm";
import { useFormAndValidation } from "../utils/utils/useFormAndValidation";

const AddItemModal = React.memo(
  ({ isOpen, onClose, onOutsideClick, onAddItem }) => {
    const {
      values,
      handleChange,
      errors,
      isValid,
      resetForm,
      setValues,
      setIsValid,
    } = useFormAndValidation();
    React.useEffect(() => {
      setIsValid(false);
    }, []);

    function resetAddCardForm() {
      document.querySelector(".form_type_add-garment").reset();
      resetForm();
    }

    function handleSubmit() {
      onAddItem(values, resetAddCardForm);
    }

    return (
      <ModalWithForm
        isOpen={isOpen}
        name="add-garment"
        title="New garment"
        submitButtonText="Add garment"
        onClose={onClose}
        onSubmit={handleSubmit}
        onOutsideClick={onOutsideClick}
        submitBtnIsEnabled={isValid}
      >
        <div className="form__entries">
          <label className="form__label">
            Name
            <input
              type="text"
              className="form__input"
              id="new-garment-name"
              name="name"
              value={values.name || ""}
              onChange={handleChange}
              placeholder="Name"
              min={2}
              max={40}
              required
            />
            <span className="form__error-message">{errors.name}</span>
          </label>
          <label className="form__label">
            Image
            <input
              type="url"
              id="new-garment-url"
              name="imageUrl"
              value={values.imageUrl || ""}
              onChange={handleChange}
              className="form__input"
              placeholder="Image URL"
              required
            />
            <span className="form__error-message">{errors.imageUrl}</span>
          </label>
          <div className="form__radio-container">
            <h4 className="form__sub-title">Select the weather types:</h4>
            <label className="form__label form__label_type_radio">
              <input
                type="radio"
                name="weather"
                value="hot"
                onClick={handleChange}
                id="hot"
                className="form__input form__input_type_radio"
              />
              <span className="form__radio-span">Hot</span>
              <div className="form__radio-opt">
                <div className="form__chk-radio-opt"></div>
              </div>
            </label>
            <label className="form__label form__label_type_radio">
              <input
                type="radio"
                name="weather"
                value="warm"
                onClick={handleChange}
                id="warm"
                className="form__input form__input_type_radio"
              />
              <span className="form__radio-span">Warm</span>{" "}
              <div className="form__radio-opt">
                <div className="form__chk-radio-opt"></div>
              </div>
            </label>
            <label className="form__label form__label_type_radio">
              <input
                type="radio"
                name="weather"
                value="cold"
                onClick={handleChange}
                id="cold"
                className="form__input form__input_type_radio"
              />
              <span className="form__radio-span">Cold</span>
              <div className="form__radio-opt">
                <div className="form__chk-radio-opt"></div>
              </div>
            </label>
          </div>
        </div>
      </ModalWithForm>
    );
  }
);

AddItemModal.displayName = "AddItemModal";
export default AddItemModal;
