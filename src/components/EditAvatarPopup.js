import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(event) {
        event.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        })
    }

    return (
        <PopupWithForm
            title="Обновить аватар"
            name="update-avatar"
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonText="Сохранить"
            onSubmit={handleSubmit}
        >
            <input
                type="url"
                id="popup__ava-link"
                className="popup__input"
                placeholder="Ссылка на изображение"
                name="link"
                ref={avatarRef}
                required
            />
            <span className="popup__form-error popup__pic-link-error"></span>
        </PopupWithForm>
    )
}