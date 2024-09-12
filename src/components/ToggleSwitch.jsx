import React from "react";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = React.memo(() => {
  const { currentTemperatureUnit, setCurrentTemperatureUnit } =
    React.useContext(CurrentTemperatureUnitContext);
  const [checked, setChecked] = React.useState(false);

  function handleToggleSwitchChange() {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
    setChecked(!checked);
  }

  return (
    <div className="header__toggle-switch toggle-switch">
      <input
        id="temp-switch-input"
        checked={checked}
        type="checkbox"
        className="toggle-switch__input"
        onChange={handleToggleSwitchChange}
      />
      <label className="toggle-switch__label" htmlFor="temp-switch-input">
        <span className="toggle-switch__span" />
        <p
          className={`toggle-switch__temp-unit ${
            currentTemperatureUnit == "F"
              ? "toggle-switch__temp-unit_active"
              : ""
          }`}
        >
          F
        </p>
        <p
          className={`toggle-switch__temp-unit ${
            currentTemperatureUnit == "C"
              ? "toggle-switch__temp-unit_active"
              : ""
          }`}
        >
          C
        </p>
      </label>
    </div>
  );
});

ToggleSwitch.displayName = "ToggleSwitch";
export default ToggleSwitch;
