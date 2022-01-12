function onResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res}`);
}

class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    // Получает все карточки
    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(onResponse)
    }

    // Получает информацию о пользователе
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        })
            .then(onResponse)
    }

    // Отправляет информацию о пользователе на сервер
    sendProfileDatasToServer(name, about) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about,
            })
        })
            .then(onResponse)
    }

    // Отправляет аватар пользователя на сервер
    sendAvatarToServer(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({avatar}),
        })
            .then(onResponse)
    }

    // Отправляет карточку на сервер
    postCard({ name, link }) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link,
            })
        })
            .then(onResponse)
    }

    // Удаляет карточку с сервера
    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
    }

    // Лайки крутятся, зачет за ПР9 мутится
    toggleCardLike(cardId, method) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method,
            headers: this._headers,
        })
            .then(onResponse)
    }
}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-30',
    headers: {
        authorization: '38da116f-1cff-4ad4-9431-1c3278c91d81',
        'Content-Type': 'application/json'
    }
})

export default api;