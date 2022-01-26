import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleSubmit(event) {
        event.preventDefault();

        props.onAddPlace({
            name,
            link,
        })
    }

    function handleChangeName(event) {
        setName(event.target.value);
    }

    function handleChangeLink(event) {
        setLink(event.target.value);
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
                onChange={handleChangeName}
                value={name}
                required
            />
            <span className="popup__form-error popup__title-error"></span>

            <input
                type="url"
                id="popup__pic-link"
                className="popup__input"
                placeholder="Ссылка на картинку"
                name="link"
                onChange={handleChangeLink}
                value={link}
                required
            />
            <span className="popup__form-error popup__pic-link-error"></span>
        </PopupWithForm>
    )
}