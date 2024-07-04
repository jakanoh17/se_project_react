import React from "react";
import ModalWithForm from "./ModalWithForm";

function AddItemModal({ isOpen, onCloseModal, onOutsideClick, onAddItem }) {
  const [name, setName] = React.useState("");
  const [link, setImgLink] = React.useState("");
  const [weather, setWeather] = React.useState("");

  function onNameChange(evt) {
    setName(evt.target.value);
  }

  function onImgLinkChange(evt) {
    setImgLink(evt.target.value);
  }

  function onWeatherChange(evt) {
    setWeather(evt.target.value);
  }

  function handleSubmit(evt) {
    onAddItem({ name, weather, link });
    evt.preventDefault();
  }

  // React.useEffect(() => {
  //   if (isOpen);
  // }, [isOpen]);

  return (
    <ModalWithForm
      isOpen={isOpen}
      name="add-garment"
      title="New garment"
      submitButtonText="Add garment"
      onClose={onCloseModal}
      onOutsideClick={onOutsideClick}
      onSubmit={handleSubmit}
    >
      <div className="form__entries">
        <label className="form__label">
          Name
          <input
            type="text"
            className="form__input"
            id="new-garment-name"
            value={name}
            onChange={onNameChange}
            placeholder="Name"
            min={2}
            max={40}
            required
          />
          <span className="form__error-message form__error-message_visible new-garment-name-err-msg"></span>
        </label>
        <label className="form__label">
          Image
          <input
            type="url"
            id="new-garment-url"
            name="Img_url"
            value={link}
            onChange={onImgLinkChange}
            className="form__input"
            placeholder="Image URL"
            required
          />
          <span className="form__error-message form__error-message_visible new-garment-url-err-msg"></span>
        </label>
        <div className="form__radio-container">
          <h4 className="form__sub-title">Select the weather types:</h4>
          <label className="form__label form__label_type_radio">
            <input
              type="radio"
              name="wthr-type"
              value="hot"
              onChange={onWeatherChange}
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
              name="wthr-type"
              value="warm"
              onChange={onWeatherChange}
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
              name="wthr-type"
              value="cold"
              onChange={onWeatherChange}
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

export default AddItemModal;
