import ModalWithForm from "./ModalWithForm";
import React from "react";

const RegisterModal = React.memo(
  ({
    isOpen,
    onClose,
    registerAndLoginUser,
    onLoginBtnClk,
    onOutsideClick,
  }) => {
    const [inputs, setInputs] = React.useState({});
    const [errMsgs, setErrMsgs] = React.useState({});

    const [submitBtnIsEnabled, setSubmitBtnIsEnabled] = React.useState(false);

    function onInputChange(evt) {
      const newInputObj = { ...inputs };
      newInputObj[evt.target.name] = evt.target.value;
      setInputs(newInputObj);

      let newErrMsgsObj = { ...errMsgs };
      if (!evt.target.validity.valid) {
        newErrMsgsObj[evt.target.name] = evt.target.validationMessage;
        setErrMsgs(newErrMsgsObj);
      } else {
        newErrMsgsObj[evt.target.name] = "";
        setErrMsgs(newErrMsgsObj);
      }
    }

    React.useEffect(() => {
      const errMsgsObjValues = Object.values(errMsgs);
      const errors = errMsgsObjValues.some((value) => value != "");

      const inputObjValues = Object.values(inputs);
      const emptyInputs = inputObjValues.some((value) => value == "");

      if (errors || emptyInputs || inputObjValues.length < 4) {
        setSubmitBtnIsEnabled(false);
      } else {
        setSubmitBtnIsEnabled(true);
      }
    }, [errMsgs, inputs]);

    function resetForm() {
      setInputs({});
    }

    function handleSubmit() {
      registerAndLoginUser(inputs, resetForm);
    }

    const secondFormBtn = (
      <button type="button" className="form__login-btn" onClick={onLoginBtnClk}>
        or Log In
      </button>
    );

    return (
      <ModalWithForm
        isOpen={isOpen}
        name="register-form"
        title="Sign Up"
        submitButtonText="Sign Up"
        onClose={onClose}
        onSubmit={handleSubmit}
        onOutsideClick={onOutsideClick}
        submitBtnIsEnabled={submitBtnIsEnabled}
        uniqueFormClass="auth-modal"
        secondFormBtn={secondFormBtn}
      >
        <div className="form__entries">
          <label className="form__label">
            Email *
            <input
              type="email"
              className="form__input"
              id="email"
              name="email"
              value={inputs.email || ""}
              onChange={onInputChange}
              placeholder="Email"
              required
            />
            <span className="form__error-message">{errMsgs.email}</span>
          </label>
          <label className="form__label">
            Password *
            <input
              type="password"
              id="register-password"
              name="password"
              value={inputs.password || ""}
              onChange={onInputChange}
              className="form__input"
              placeholder="Password"
              required
            />
            <span className="form__error-message">{errMsgs.password}</span>
          </label>
          <label className="form__label">
            Name *
            <input
              type="text"
              id="register-username"
              name="username"
              value={inputs.username || ""}
              onChange={onInputChange}
              className="form__input"
              placeholder="Name"
              min={2}
              max={40}
              required
            />
            <span className="form__error-message">{errMsgs.username}</span>
          </label>
          <label className="form__label">
            Avatar URL *
            <input
              type="url"
              id="register-avatar-url"
              name="avatar"
              value={inputs.avatar || ""}
              onChange={onInputChange}
              className="form__input"
              placeholder="Avatar URL"
              required
            />
            <span className="form__error-message">{errMsgs.avatar}</span>
          </label>
        </div>
      </ModalWithForm>
    );
  }
);

RegisterModal.displayName = "RegisterModal";

export default RegisterModal;
