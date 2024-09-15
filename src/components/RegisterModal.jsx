import ModalWithForm from "./ModalWithForm";
import React from "react";
import { useFormAndValidation } from "../utils/utils/useFormAndValidation";

const RegisterModal = React.memo(
  ({
    isOpen,
    onClose,
    registerAndLoginUser,
    onLoginBtnClk,
    onOutsideClick,
  }) => {
    const { values, handleChange, errors, isValid, resetForm, setIsValid } =
      useFormAndValidation();

    React.useEffect(() => {
      setIsValid(false);
    }, []);

    function handleSubmit() {
      registerAndLoginUser(values, resetForm);
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
        submitBtnIsEnabled={isValid}
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
              value={values.email || ""}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <span className="form__error-message">{errors.email}</span>
          </label>
          <label className="form__label">
            Password *
            <input
              type="password"
              id="register-password"
              name="password"
              value={values.password || ""}
              onChange={handleChange}
              className="form__input"
              placeholder="Password"
              required
            />
            <span className="form__error-message">{errors.password}</span>
          </label>
          <label className="form__label">
            Name *
            <input
              type="text"
              id="register-username"
              name="username"
              value={values.username || ""}
              onChange={handleChange}
              className="form__input"
              placeholder="Name"
              min={2}
              max={40}
              required
            />
            <span className="form__error-message">{errors.username}</span>
          </label>
          <label className="form__label">
            Avatar URL *
            <input
              type="url"
              id="register-avatar-url"
              name="avatar"
              value={values.avatar || ""}
              onChange={handleChange}
              className="form__input"
              placeholder="Avatar URL"
              required
            />
            <span className="form__error-message">{errors.avatar}</span>
          </label>
        </div>
      </ModalWithForm>
    );
  }
);

RegisterModal.displayName = "RegisterModal";

export default RegisterModal;
