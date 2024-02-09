import { data } from "autoprefixer";
import {
  placesList,
  profileTitle,
  profileDescription,
  profileImage,
} from "../index";
import { addCard, deleteCard, openCardImage, likeCard } from "./card";
import { closePopup } from "./modal";

export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-5", //${config.baseUrl}
  headers: {
    authorization: "287a0cd9-05f4-403e-a349-e1db0f0f2b12",
    "Content-Type": "application/json",
  },
};

//отправка данных профиля
export const patchProfileInfo = (name, job) => {
  const openedPopup = document.querySelector(".popup_is-opened");
  const addButton = openedPopup.querySelector(".button");
  addButton.textContent = "Сохранение...";

  fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      about: `${job}`,
    }),
  })
    .then((res) => {
      addButton.textContent = "Сохранить";
      if (res.ok) {
        res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      addButton.textContent = "Сохранить";
      console.log("Произошла ошибка при выполнении запросов: ", err);
    });
};

// Запрос данных о пользователе
export function userPromise() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error("Ошибка. Запрос данных о пользователе не выполнен: ", err);
      return null;
    });
}

// Запрос карточек
export const getCardsFromServer = () =>
  fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log("Ошибка. Запрос карточек не выполнен: ", err);
    });

//добавление новой карточки на сервер
export function postCard(newCardObject) {
  const openedPopup = document.querySelector(".popup_is-opened");
  const addButton = openedPopup.querySelector(".button");
  addButton.textContent = "Сохранение...";

  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: newCardObject.name,
      link: newCardObject.link,
    }),
  })
    .then((res) => {
      if (res.ok) {
        addButton.textContent = "Сохранить";
        return res.json();
      }
      else {
        addButton.textContent = "Сохранить";
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log("Ошибка. Фото не отправлено: ", err);
      addButton.textContent = "Сохранить";
    });
}

export function deletePostFromServer(item) {
  const openedPopup = document.querySelector(".popup_is-opened");
  const addButton = openedPopup.querySelector(".button");
  addButton.textContent = "Удаление...";

  fetch(`${config.baseUrl}/cards/${item._id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        addButton.textContent = "Да";
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((error) => {
      console.error("Произошла ошибка при выполнении запроса DELETE", error);
      addButton.textContent = "Да";
    });
}

export const putLikeOnServer = (cardElement, item) => {
  return fetch(`${config.baseUrl}/cards/likes/${item._id}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((error) => {
      console.error("Произошла ошибка при выполнении запроса PUT", error);
    });
}
//stop
export const deleteLikeFromServer = (cardElement, item) => {
  return fetch(`${config.baseUrl}/cards/likes/${item._id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((error) => {
      console.error("Произошла ошибка при выполнении запроса DELETE", error);
    });
}

export function patchAvatar(inputValue) {
  const openedPopup = document.querySelector(".popup_is-opened");
  const addButton = openedPopup.querySelector(".button");
  addButton.textContent = "Сохранение...";

  const avatarData = {
    avatar: inputValue,
  };

  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(avatarData),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((data) => {
      addButton.textContent = "Сохранить";
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Произошла ошибка при выполнении запроса PATCH", error);
      addButton.textContent = "Сохранить";
    });
}
