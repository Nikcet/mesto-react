import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(event) {
        setName(event.target.value);
    }

    function handleChangeDescription(event) {
        setDescription(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="edit-profile"
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonText="Сохранить"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                id="popup__name"
                className="popup__input"
                placeholder="Имя"
                name="name"
                minLength="2"
                maxLength="40"
                onChange={handleChangeName}
                value={name}
                required
            />
            <span className="popup__form-error popup__name-error"></span>

            <input
                type="text"
                id="popup__about"
                className="popup__input"
                placeholder="О себе"
                name="description"
                minLength="2"
                maxLength="200"
                onChange={handleChangeDescription}
                value={description}
                required
            />
            <span className="popup__form-error popup__about-error"></span>
        </PopupWithForm>
    )
}