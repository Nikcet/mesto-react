import React from "react";
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsContext } from "../contexts/CardsContext";

export function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cardsList, setCardsList] = React.useState([]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(undefined);

  React.useEffect(() => {
    Promise.resolve(api.getUserInfo())
      .then(dataUser => {
        setCurrentUser(dataUser);
      })
      .catch(err =>
        console.log("Что-то не так с информацией пользователя.", err)
      )
  }, []);

  React.useEffect(() => {
    Promise.resolve(api.getCards())
      .then(dataCards => {
        setCardsList(dataCards);
      })
      .catch(err => {
        console.log("Что-то не так с карточками.", err)
      })
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(cardInfo) {
    setSelectedCard({
      ...cardInfo
    });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(undefined);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <CardsContext.Provider value={cardsList}>
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
          />
        </CardsContext.Provider>
        <Footer />
        <PopupWithForm
          title="Редактировать профиль"
          name="edit-profile"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          buttonText="Сохранить"
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
        </PopupWithForm>
        <PopupWithForm
          title="Новое место"
          name="add-card"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          buttonText="Добавить"
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
        </PopupWithForm>
        <PopupWithForm
          title="Обновить аватар"
          name="update-avatar"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          buttonText="Сохранить"
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
        </PopupWithForm>
        <PopupWithForm title="Вы уверены?" name="question" buttonText="Да" id="popup_delete"></PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}
