import React from "react";
import ModalWithForm from "./ModalWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../utils/utils/useFormAndValidation";
function EditProfileModal({
  isOpen,
  onClose,
  onOutsideClick,
  api,
  setCurrentUserData,
}) {
  const currentUserData = React.useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  React.useEffect(() => {
    setValues({
      updatedUsername: currentUserData.name,
      updatedAvatar: currentUserData.avatar,
    });
  }, [currentUserData]);

  function handleSubmit() {
    const token = localStorage.getItem("jwt");
    const { updatedUsername: name, updatedAvatar: avatar } = values;
    api
      .editUserData(token, { name, avatar })
      .then((responseUserData) => {
        setCurrentUserData(responseUserData);
      })
      .catch(console.error);
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      name="edit-profile-form"
      title="Change profile data"
      submitButtonText="Save changes"
      onClose={onClose}
      onSubmit={handleSubmit}
      onOutsideClick={onOutsideClick}
      submitBtnIsEnabled={isValid}
    >
      <div className="form__entries">
        <label className="form__label">
          Name *
          <input
            type="text"
            className="form__input"
            id="updated-username"
            name="updatedUsername"
            value={values.updatedUsername || ""}
            onChange={handleChange}
            placeholder="Name"
            min={2}
            max={40}
            required
          />
          <span className="form__error-message">{errors.updatedUsername}</span>
        </label>
        <label className="form__label">
          Avatar *
          <input
            type="url"
            className="form__input"
            id="updated-avatar"
            name="updatedAvatar"
            value={values.updatedAvatar || ""}
            onChange={handleChange}
            placeholder="Avatar"
            min={2}
            max={40}
            required
          />
          <span className="form__error-message">{errors.updatedAvatar}</span>
        </label>
      </div>
    </ModalWithForm>
  );
}

export default EditProfileModal;
