import React from "react";

function ModalWithForm() {
  const [display, setDisplay] = React.useState("");

  return (
    <div className={`modal${display}`}>
      <form action="" className="modal__form"></form>
    </div>
  );
}

export default ModalWithForm;
