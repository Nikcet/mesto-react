import React from "react";
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

export function App() {
  const [isEditProfilePopupOpen, setProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setNewPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleEditProfileClick() {
    setProfilePopup(true);
  }

  function handleAddPlaceClick() {
    setNewPlacePopup(true);
  }

  function handleEditAvatarClick() {
    setAvatarPopup(true);
  }

  function handleCardClick(cardInfo) {
    setSelectedCard({
      ...cardInfo
    });
  }

  function closeAllPopups() {
    setProfilePopup(false);
    setNewPlacePopup(false);
    setAvatarPopup(false);
    setSelectedCard(null);
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        title="Редактировать профиль"
        name="edit-profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          id="popup__name"
          className="popup__input"
          placeholder="Имя"
          name="name"
          minLength="2"
          maxLength="40"
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
          required
        />
        <span className="popup__form-error popup__about-error"></span>

        <button type="submit" className="popup__submit-btn">
          Сохранить
        </button>
      </PopupWithForm>
      <PopupWithForm
        title="Новое место"
        name="add-card"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          id="popup__title"
          className="popup__input"
          placeholder="Название"
          name="name"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__form-error popup__title-error"></span>

        <input
          type="url"
          id="popup__pic-link"
          className="popup__input"
          placeholder="Ссылка на картинку"
          name="link"
          required
        />
        <span className="popup__form-error popup__pic-link-error"></span>

        <button type="submit" className="popup__submit-btn">
          Добавить
        </button>
      </PopupWithForm>
      <PopupWithForm
        title="Обновить аватар"
        name="update-avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="url"
          id="popup__ava-link"
          className="popup__input"
          placeholder="Ссылка на изображение"
          name="link"
          required
        />
        <span className="popup__form-error popup__pic-link-error"></span>
        <button type="submit" className="popup__submit-btn">
          Сохранить
        </button>
      </PopupWithForm>
      <PopupWithForm title="Вы уверены?" name="question">
        <button
          type="submit"
          className="popup__submit-btn popup__delete-btn"
          id="popup__delete"
        >
          Да
        </button>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}
