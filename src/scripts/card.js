import { openPopup } from "./modal";
import {
  deletePostFromServer,
  putLikeOnServer,
  deleteLikeFromServer,
  userPromise,
  config,
  postCard,
} from "./api";

const cardTemplate = document.querySelector("#card-template").content;
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

export function addCard(
  item,
  handleDeleteCard,
  handleOpenCardImage,
  handleLikeCard,
  userId
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
    item.likes.forEach((like) => {
      if (userId === like._id) {
        cardLikeButton.classList.add("card__like-button_is-active");
      }
    });
  }

  //фильтр своих карточек для функции удаления
  if (item.owner && (item.owner._id !== userId)) {
    cardDeleteButton.classList.add("card__delete-button-hidden");
  }

  //удаление карточки
  cardDeleteButton.addEventListener("click", function deletePostAndListener() {
    deletePostFromServer(item)
      .then(() => handleDeleteCard(cardElement))
      .catch((error) => {
        console.error("Произошла ошибка при выполнении запроса DELETE", error);
      });
  });

  //открытие попапа картинки
  function handleOpenCardImage() {
    openCardImage(item.name, item.link);
  }

  cardImage.addEventListener("click", handleOpenCardImage);

  //лайк в карточке
  function handleLikeCard() {
    //предотвращение накопления слушателей
    if (!cardLikeButton.classList.contains("card__like-button_is-active")) {
      putLikeOnServer(cardElement, item)
        .then((data) => {
          cardLikesNumber.textContent = data.likes.length;
          likeCard(cardLikeButton);
        })
        .catch((error) => {
          console.error("Произошла ошибка при выполнении запроса PUT", error);
        });
    } else {
      deleteLikeFromServer(cardElement, item)
        .then((data) => {
          cardLikesNumber.textContent = data.likes.length;
          likeCard(cardLikeButton);
        })
        .catch((error) => {
          console.error(
            "Произошла ошибка при выполнении запроса DELETE",
            error
          );
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
export function likeCard(cardLikeButton) {
  cardLikeButton.classList.toggle("card__like-button_is-active");
}
