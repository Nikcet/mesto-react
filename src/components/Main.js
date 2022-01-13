// import avatar from "../images/kusto.jpg";
import React from "react";
import api from "../utils/Api.js";
import Card from "./Card";

export default function Main(props) {
  const [userId, setUserId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.resolve(api.getUserInfo())
      .then(dataUser => {
        setUserDatas(dataUser._id, dataUser.name, dataUser.about, dataUser.avatar);
      })
      .catch(err =>
        console.log("Что-то не так с информацией пользователя.", err)
      )
  }, []);

  React.useEffect(() => {
    Promise.resolve(api.getCards())
      .then(dataCards => {
        setUserCards(dataCards);
      })
      .catch(err => {
        console.log("Что-то не так с карточками.", err)
      })
  }, []);

  function setUserDatas(id, name, about, avatar) {
    setUserId(id);
    setUserName(name);
    setUserDescription(about);
    setUserAvatar(avatar);
  }

  function setUserCards(cards) {
    setCards(cards);
  }

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info-wrap">
          <div className="profile__avatar-overley">
            <img src={userAvatar} alt={userName} className="profile__avatar" />
            <button
              type="button"
              className="profile__avatar-edit-btn"
              onClick={props.onEditAvatar}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__info-elems">
              <h1 className="profile__name">{userName}</h1>
              <button
                type="button"
                className="profile__edit-button"
                aria-label="Редактировать профиль"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__description">{userDescription}</p>
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
            />
          )
        })}
      </section>
    </main>
  );
}
