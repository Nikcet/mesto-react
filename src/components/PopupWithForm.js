import React from "react";

export default function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""
        }`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__header">{props.title}</h2>
        <form className="popup__form" name={props.name} noValidate>
          {props.children}
          {props.id !== "popup__delete" ? <button type="submit" className="popup__submit-btn">
            {props.buttonText}
          </button> : <button
            type="submit"
            className="popup__submit-btn popup__delete-btn"
            id="popup__delete"
          >
            Да
          </button>}
        </form>
      </div>
    </div>
  );
}
