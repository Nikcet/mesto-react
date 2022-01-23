import React from "react";
import Card from "./Card";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { CardsContext, LikesContext } from "../contexts/CardsContext.js";

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const cards = React.useContext(CardsContext);
  // const setCardsList = React.useContext(LikesContext);
  // const [newCard, setNewCards] = React.useState([]);
  // console.log(cards);
  function handleCardLike(card) {
    // const isLiked = card.likes.some(like => like._id === currentUser._id);
    // console.log(card, isLiked);
    // if (!isLiked) {
    //   api.toggleCardLike(card._id, "PUT")
    //     .then(dataCard => {
    //       setCardsList(dataCard);
    //     })
    //     .catch(err => { console.log('Что-то не так с лайком: ', err) });
    // } else {
    //   api.toggleCardLike(card._id, "DELETE")
    //     .then(dataCard => {
    //       setCardsList(dataCard);
    //     })
    //     .catch(err => { console.log('Что-то не так с удалением лайка: ', err) });
    // }
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
            />
          )
        })}
      </section>
    </main>
  );
}
