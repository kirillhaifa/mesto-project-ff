//создание карточки

import { openPopup } from "./modal";

const cardTemplate = document.querySelector("#card-template").content;

export function addCard(initialCards, del, likeCard, openCardImage) {
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = initialCards.link;
  cardElement.querySelector(".card__title").textContent = initialCards.name;

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  //удаление карточки

  cardDeleteButton.addEventListener("click", function () {
    del(cardElement);
  });

  //открытие попапа картинки

  const popupTypeImage = document.querySelector(".popup_type_image");
  const popupImage = document.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");
  const cardImage = cardElement.querySelector(".card__image");
  const cardName = cardElement.querySelector(".card__title");

  function openCardImage (evt) {
    popupImage.setAttribute("src", cardImage.src);
    popupCaption.textContent = cardName.textContent;
    openPopup(popupTypeImage);
  }

  cardImage.addEventListener("click", openCardImage);

  //лайк в карточке

  const cardLikeButton = cardElement.querySelector(".card__like-button");

  function likeCard (evt) {
    cardLikeButton.classList.toggle("card__like-button_is-active");
  }

  cardLikeButton.addEventListener('click', likeCard)

  return cardElement;
}

//удаление карточки

export function deleteCard(cardElement) {
  cardElement.remove();
}


