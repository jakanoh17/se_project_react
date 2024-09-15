import React from "react";
import ModalWithForm from "./ModalWithForm";
import { useFormAndValidation } from "../utils/utils/useFormAndValidation";

const LoginModal = React.memo(
  ({ isOpen, onClose, onOutsideClick, onSignUpBtnClk, loginUser }) => {
    const { values, handleChange, errors, isValid, resetForm, setIsValid } =
      useFormAndValidation();

    React.useEffect(() => {
      setIsValid(false);
    }, []);

    function handleSubmit() {
      const { loginEmail: email, loginPassword: password } = values;
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
        submitBtnIsEnabled={isValid}
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
              value={values.loginEmail || ""}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <span className="form__error-message">{errors.loginEmail}</span>
          </label>
          <label className="form__label">
            Password
            <input
              type="password"
              id="login-password"
              name="loginPassword"
              value={values.loginPassword || ""}
              onChange={handleChange}
              className="form__input"
              placeholder="Password"
              required
            />
            <span className="form__error-message">{errors.loginPassword}</span>
          </label>
        </div>
      </ModalWithForm>
    );
  }
);

LoginModal.displayName = "LoginModal";

export default LoginModal;
