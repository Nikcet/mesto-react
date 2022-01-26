import React from "react";
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsContext } from "../contexts/CardsContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Loading from "../utils/Loading";

export function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cardsList, setCardsList] = React.useState([]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(undefined);
  const [activePopup, setActivePopup] = React.useState(null);

  // Монтирование информации о пользователе
  React.useEffect(() => {
    Promise.resolve(api.getUserInfo())
      .then(dataUser => {
        setCurrentUser(dataUser);
      })
      .catch(err =>
        console.log("Что-то не так с информацией пользователя.", err)
      )
  }, []);

  // Монтирование карточек
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
    setActivePopup(document.querySelector('.popup_type_edit-profile'));
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setActivePopup(document.querySelector('.popup_type_add-card'));
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setActivePopup(document.querySelector('.popup_type_update-avatar'));
  }

  function handleCardClick(cardInfo) {
    setSelectedCard({
      ...cardInfo
    });
  }

  // Закрывает попапы
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(undefined);
  }

  // Обновляет данные о пользователе
  function handleUpdateUser(datas) {
    Loading(true, activePopup);
    api.sendProfileDatasToServer(datas.name, datas.about)
      .then(profileDatas => {
        setCurrentUser(profileDatas);
        closeAllPopups();
      })
      .catch(err => { console.log("Что-то не так с отправкой данных на сервер", err) })
      .finally(() => {Loading(false, activePopup)})
  }

  // Обновляет аватар
  function handleUpdateAvatar({ avatar }) {
    Loading(true, activePopup);
    api.sendAvatarToServer(avatar)
      .then(user => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => { console.log("Не обновляется аватар", err) })
      .finally(() => {Loading(false, activePopup)})
  }

  // Добавляет карточку
  function handleAddPlaceSubmit(card) {
    Loading(true, activePopup);
    api.postCard(card)
      .then(newCard => {
        setCardsList([newCard, ...cardsList]);
        closeAllPopups();
      })
      .catch(err => { console.log("Не добавляется карточка", err) })
      .finally(() => {Loading(false, activePopup)})
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
            onUpdateCards={setCardsList}
          />
        </CardsContext.Provider>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm title="Вы уверены?" name="question" buttonText="Да" id="popup_delete"></PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}
