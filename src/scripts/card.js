import { closePopup, openPopup } from "./modal";
import { postCard } from "./api";
import {
  deletePostFromServer,
  putLikeOnServer,
  deleteLikeFromServer,
  userPromise,
  config,
} from "./api";

const cardTemplate = document.querySelector("#card-template").content;
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupConfirmDelete = document.querySelector(".popup_confirm-delete");

export function addCard(
  item,
  handleDeleteCard,
  handleOpenCardImage,
  handleLikeCard
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardName = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikesNumber = cardElement.querySelector(".card__like-number");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardName.textContent = item.name;

  if (item.likes) {
    cardLikesNumber.textContent = item.likes.length;
    userPromise()
      .then((data) => {
        item.likes.forEach((like) => {
          if (data._id === like._id) {
            cardLikeButton.classList.add("card__like-button_is-active");
          }
        });
      })
      .catch((error) => {
        console.error(
          "Произошла ошибка при получении _id пользователя:",
          error
        );
      });
  }

  //фильтр своих карточек для функции удаления
  if (item.owner && item.owner._id !== "ffa88994e7b5c2966757f3da") {
    cardDeleteButton.classList.add("card__delete-button-hidden");
  }

  //удаление карточки
  cardDeleteButton.addEventListener("click", function () {
    openPopup(popupConfirmDelete);
    const confrimDeleteButton = popupConfirmDelete.querySelector(
      ".confirm-delete-button"
    );
    confrimDeleteButton.addEventListener("click", function deleteAndClose() {
      handleDeleteCard(cardElement);
      deletePostFromServer(item);
      closePopup(popupConfirmDelete);
      //удаление слушателя при удалении карточки
      confrimDeleteButton.removeEventListener("click", deleteAndClose);
    });
  });

  //открытие попапа картинки
  function handleOpenCardImage() {
    openCardImage(item.name, item.link);
  }

  cardImage.addEventListener("click", handleOpenCardImage);

  //лайк в карточке
  function handleLikeCard() {
    likeCard(cardLikeButton, item);
    if (cardLikeButton.classList.contains("card__like-button_is-active")) {
      putLikeOnServer(cardElement, item).then((data) => {
        const cardLikesNumber = cardElement.querySelector(".card__like-number");
        cardLikesNumber.textContent = data.likes.length;
      });
    } else {
      deleteLikeFromServer(cardElement, item).then((data) => {
        const cardLikesNumber = cardElement.querySelector(".card__like-number");
        cardLikesNumber.textContent = data.likes.length;
      });
    }
  }

  cardLikeButton.addEventListener("click", handleLikeCard);

  return cardElement;
}

//удаление карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

// открытие попапа картинки
export function openCardImage(cardName, cardLink) {
  popupImage.setAttribute("src", cardLink);
  popupImage.setAttribute("alt", cardName);
  popupCaption.textContent = cardName;
  openPopup(popupTypeImage);
}

// лайк в карточке
export function likeCard(cardLikeButton, cardElement, item) {
  cardLikeButton.classList.toggle("card__like-button_is-active");
}
