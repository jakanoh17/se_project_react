import React from "react";
import ModalWithForm from "./ModalWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfileModal({
  isOpen,
  onClose,
  onOutsideClick,
  apiRef,
  setCurrentUserData,
}) {
  const currentUserData = React.useContext(CurrentUserContext);

  const [inputValues, setInputValues] = React.useState({});
  const [errMsgs, setErrMsgs] = React.useState({});
  const [submitBtnIsEnabled, setSubmitBtnIsEnabled] = React.useState(false);

  React.useEffect(() => {
    setInputValues({
      updatedUsername: currentUserData.name,
      updatedAvatar: currentUserData.avatar,
    });
  }, [currentUserData]);

  function handleSubmit() {
    const { updatedUsername: name, updatedAvatar: avatar } = inputValues;
    apiRef.current
      .editUserData({ name, avatar })
      .then((responseUserData) => {
        setCurrentUserData(responseUserData);
      })
      .catch((err) => console.error(err));
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

    if (errors || emptyInputs || inputObjValues.length < 2) {
      setSubmitBtnIsEnabled(false);
    } else {
      setSubmitBtnIsEnabled(true);
    }
  }, [errMsgs, inputValues]);

  return (
    <ModalWithForm
      isOpen={isOpen}
      name="edit-profile-form"
      title="Change profile data"
      submitButtonText="Save changes"
      onClose={onClose}
      onSubmit={handleSubmit}
      onOutsideClick={onOutsideClick}
      submitBtnIsEnabled={submitBtnIsEnabled}
    >
      <div className="form__entries">
        <label className="form__label">
          Name *
          <input
            type="text"
            className="form__input"
            id="updated-username"
            name="updatedUsername"
            value={inputValues.updatedUsername || ""}
            onChange={onInputChange}
            placeholder="Name"
            min={2}
            max={40}
            required
          />
          <span className="form__error-message">{errMsgs.updatedUsername}</span>
        </label>
        <label className="form__label">
          Avatar *
          <input
            type="url"
            className="form__input"
            id="updated-avatar"
            name="updatedAvatar"
            value={inputValues.updatedAvatar || ""}
            onChange={onInputChange}
            placeholder="Avatar"
            min={2}
            max={40}
            required
          />
          <span className="form__error-message">{errMsgs.updatedAvatar}</span>
        </label>
      </div>
    </ModalWithForm>
  );
}

export default EditProfileModal;
