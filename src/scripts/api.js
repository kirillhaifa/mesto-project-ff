const checkResponse = ((res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
})

export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-5", //${config.baseUrl}
  headers: {
    authorization: "287a0cd9-05f4-403e-a349-e1db0f0f2b12",
    "Content-Type": "application/json",
  },
};

//отправка данных профиля
export const patchProfileInfo = (name, job) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      about: `${job}`,
    }),
  }).then(checkResponse);
};

// Запрос данных о пользователе
export function userPromise() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(checkResponse);
}

// Запрос карточек
export const getCardsFromServer = () =>
  fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(checkResponse);

//добавление новой карточки на сервер
export const postCard = (newCardObject) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: newCardObject.name,
      link: newCardObject.link,
    }),
  }).then(checkResponse);
};

export function deletePostFromServer(item) {
  return fetch(`${config.baseUrl}/cards/${item._id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

//cardElement не используеся в api, но используется в card. 
//если удалить тут, перестает работать
export const putLikeOnServer = (cardElement, item) => {
  return fetch(`${config.baseUrl}/cards/likes/${item._id}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
};

export const deleteLikeFromServer = (cardElement, item) => {
  return fetch(`${config.baseUrl}/cards/likes/${item._id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

export function patchAvatar(avatarData) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(avatarData),
  }).then(checkResponse);
}
