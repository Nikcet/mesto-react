import React from "react";

export default function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <div className="elements__card">
            <img src={props.card.link}
                alt={props.card.name}
                className="elements__image"
                onClick={handleClick} />
            <button type="button" className="elements__delete"></button>
            <div className="elements__wrap">
                <h2 className="elements__name">{props.card.name}</h2>
                <div className="elements__heart-wrap">
                    <button type="button" className="elements__heart"></button>
                    <p className="elements__heart-number">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}