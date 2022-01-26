import React from "react";
import Card from "./Card";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { CardsContext } from "../contexts/CardsContext.js";

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const cards = React.useContext(CardsContext);

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        props.onUpdateCards(state => state.map(item => item._id === card._id ? newCard : item));
      })
      .catch(err => { console.log("Лайки не работают", err) })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        api.getCards()
          .then(newCards => props.onUpdateCards(newCards))
          .catch(err => { console.log("Не получаются карточки", err) })
      })
      .catch(err => { console.log("Не удаляется карточка", err) })
  }

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info-wrap">
          <div className="profile__avatar-overley">
            <img src={currentUser.avatar} alt={currentUser.name} className="profile__avatar" />
            <button
              type="button"
              className="profile__avatar-edit-btn"
              onClick={props.onEditAvatar}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__info-elems">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-button"
                aria-label="Редактировать профиль"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить карточку"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.map(item => {
          return (
            <Card
              key={item._id}
              card={item}
              onCardClick={props.onCardClick}
              onCardLike={handleCardLike}
              onDeleteCard={handleCardDelete}
            />
          )
        })}
      </section>
    </main>
  );
}
