import React from "react";
import ModalWithForm from "./ModalWithForm";

const LoginModal = React.memo(
  ({ isOpen, onClose, onOutsideClick, onSignUpBtnClk, loginUser }) => {
    const [inputValues, setInputValues] = React.useState({});
    const [errMsgs, setErrMsgs] = React.useState({});

    const [submitBtnIsEnabled, setSubmitBtnIsEnabled] = React.useState(false);

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

    function resetForm() {
      setInputValues({});
    }

    function handleSubmit() {
      const { loginEmail: email, loginPassword: password } = inputValues;
      loginUser({ email, password }, resetForm);
    }

    const secondFormBtn = (
      <button
        type="button"
        className="form__login-btn"
        onClick={onSignUpBtnClk}
      >
        or Sign Up
      </button>
    );
    return (
      <ModalWithForm
        isOpen={isOpen}
        name="login-form"
        title="Log In"
        submitButtonText="Log in"
        onClose={onClose}
        onSubmit={handleSubmit}
        onOutsideClick={onOutsideClick}
        submitBtnIsEnabled={submitBtnIsEnabled}
        uniqueFormClass="auth-modal"
        secondFormBtn={secondFormBtn}
      >
        <div className="form__entries">
          <label className="form__label">
            Email
            <input
              type="email"
              className="form__input"
              id="login-email"
              name="loginEmail"
              value={inputValues.loginEmail || ""}
              onChange={onInputChange}
              placeholder="Email"
              required
            />
            <span className="form__error-message">{errMsgs.email}</span>
          </label>
          <label className="form__label">
            Password
            <input
              type="password"
              id="login-password"
              name="loginPassword"
              value={inputValues.loginPassword || ""}
              onChange={onInputChange}
              className="form__input"
              placeholder="Password"
              required
            />
            <span className="form__error-message">{errMsgs.password}</span>
          </label>
        </div>
      </ModalWithForm>
    );
  }
);

LoginModal.displayName = "LoginModal";

export default LoginModal;
