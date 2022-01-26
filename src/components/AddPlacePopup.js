import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
    const nameRef = React.useRef();
    const linkRef = React.useRef();

    function handleSubmit(event) {
        event.preventDefault();

        props.onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value
        })
    }

    return (
        <PopupWithForm
            title="Новое место"
            name="add-card"
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonText="Добавить"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                id="popup__title"
                className="popup__input"
                placeholder="Название"
                name="name"
                minLength="2"
                maxLength="30"
                ref={nameRef}
                required
            />
            <span className="popup__form-error popup__title-error"></span>

            <input
                type="url"
                id="popup__pic-link"
                className="popup__input"
                placeholder="Ссылка на картинку"
                name="link"
                ref={linkRef}
                required
            />
            <span className="popup__form-error popup__pic-link-error"></span>
        </PopupWithForm>
    )
}