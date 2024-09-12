import React from "react";
import ModalWithForm from "./ModalWithForm";

const AddItemModal = React.memo(
  ({ isOpen, onClose, onOutsideClick, onAddItem }) => {
    const [inputValues, setInputValues] = React.useState({});
    const [errMsgs, setErrMsgs] = React.useState({});

    const [submitBtnIsEnabled, setSubmitBtnIsEnabled] = React.useState(false);

    function handleSubmit() {
      onAddItem(inputValues);
      setInputValues({});
      document.querySelector(".form_type_add-garment").reset();
    }

    function onInputChange(evt) {
      const newInputObj = { ...inputValues };
      newInputObj[evt.target.name] = evt.target.value;
      setInputValues(newInputObj);
      let newErrMsgsObj = { ...errMsgs };
      if (!evt.target.validity.valid) {
        newErrMsgsObj[evt.target.name] = evt.target.validationMessage;
        setErrMsgs(newErrMsgsObj);
      } else {
        newErrMsgsObj[evt.target.name] = "";
        setErrMsgs(newErrMsgsObj);
      }
    }

    // FORM VALIDATION
    React.useEffect(() => {
      const errMsgsObjValues = Object.values(errMsgs);
      const errors = errMsgsObjValues.some((value) => value != "");

      const inputObjValues = Object.values(inputValues);
      const emptyInputs = inputObjValues.some((value) => value == "");
      if (errors || emptyInputs || inputObjValues.length < 3) {
        setSubmitBtnIsEnabled(false);
      } else {
        setSubmitBtnIsEnabled(true);
      }
    }, [errMsgs, inputValues]);

    return (
      <ModalWithForm
        isOpen={isOpen}
        name="add-garment"
        title="New garment"
        submitButtonText="Add garment"
        onClose={onClose}
        onSubmit={handleSubmit}
        onOutsideClick={onOutsideClick}
        submitBtnIsEnabled={submitBtnIsEnabled}
      >
        <div className="form__entries">
          <label className="form__label">
            Name
            <input
              type="text"
              className="form__input"
              id="new-garment-name"
              name="name"
              value={inputValues.name || ""}
              onChange={onInputChange}
              placeholder="Name"
              min={2}
              max={40}
              required
            />
            <span className="form__error-message">{errMsgs.name}</span>
          </label>
          <label className="form__label">
            Image
            <input
              type="url"
              id="new-garment-url"
              name="imageUrl"
              value={inputValues.imageUrl || ""}
              onChange={onInputChange}
              className="form__input"
              placeholder="Image URL"
              required
            />
            <span className="form__error-message">{errMsgs.imageUrl}</span>
          </label>
          <div className="form__radio-container">
            <h4 className="form__sub-title">Select the weather types:</h4>
            <label className="form__label form__label_type_radio">
              <input
                type="radio"
                name="weather"
                value="hot"
                onClick={onInputChange}
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
                onClick={onInputChange}
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
                onClick={onInputChange}
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
