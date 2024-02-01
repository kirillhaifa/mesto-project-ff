import { closePopup, openPopup } from "./modal";

const cardTemplate = document.querySelector("#card-template").content;
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

export function addCard(item, handleDeleteCard, handleOpenCardImage, handleLikeCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardName = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = item.link;
  cardImage.alt = item.name; 
  cardName.textContent = item.name;

  //удаление карточки
  cardDeleteButton.addEventListener("click", function () {
    handleDeleteCard(cardElement);
  });

  //открытие попапа картинки
  function handleOpenCardImage() {
    openCardImage(item.name, item.link);
  }

  cardImage.addEventListener("click", handleOpenCardImage); 
  //если правильно понимаю, стрелочная функция для этого не обязательна?

  //лайк в карточке
  function handleLikeCard() {
    likeCard(cardLikeButton);
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
export function likeCard(cardLikeButton) {
  cardLikeButton.classList.toggle("card__like-button_is-active");
}

console.log()
