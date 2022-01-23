import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import api from "../utils/Api";

export default function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [card, setCard] = React.useState({});

    React.useEffect(() => {
        setCard(props.card);
    }, [props.card]);

    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(like => like._id === currentUser._id);
    const cardLikeButtonClassName = isLiked ? 'elements__heart_active' : '';

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        // props.onCardLike(props.card);
        if (!isLiked) {
            api.toggleCardLike(card._id, "PUT")
                .then(dataCard => {
                    setCard(dataCard);
                })
                .catch(err => { console.log('Что-то не так с лайком: ', err) });
        } else {
            api.toggleCardLike(card._id, "DELETE")
                .then(dataCard => {
                    setCard(dataCard);
                })
                .catch(err => { console.log('Что-то не так с удалением лайка: ', err) });
        }
    }

    return (
        <div className="elements__card">
            <img src={props.card.link}
                alt={props.card.name}
                className="elements__image"
                onClick={handleClick} />
            {isOwn && <button type="button" className="elements__delete"></button>}
            <div className="elements__wrap">
                <h2 className="elements__name">{props.card.name}</h2>
                <div className="elements__heart-wrap">
                    <button type="button" className={`elements__heart ${cardLikeButtonClassName}`} onClick={handleLikeClick}></button>
                    <p className="elements__heart-number">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}