import React from "react";
import "../blocks/toggle-switch.css";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
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
}

export default ToggleSwitch;
