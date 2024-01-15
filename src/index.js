import { initialCards } from "./scripts/cards";
import "./pages/index.css";
import { addCard, deleteCard, openCardImage, likeCard } from "./scripts/card";
import { openPopup, closePopup } from "./scripts/modal";

//константы

const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const typeEditForm = popupTypeEdit.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const newPlaceForm = document.forms["new-place"];
const popupInputTypeCardName = popupTypeNewCard.querySelector(
  ".popup__input_type_card-name"
);
const popupInputTypeUrl = popupTypeNewCard.querySelector(
  ".popup__input_type_url"
);
const popups = document.querySelectorAll(".popup");

// создание карточек из массива и их удаление

initialCards.forEach(function (initialCard) {
  placesList.append(addCard(initialCard, deleteCard, openCardImage, likeCard));
});

//попапы
//слушатели закрытия модальных окон при клике по крестику и заднему плану

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

//попап редактированя профиля

profileEditButton.addEventListener("click", function (evt) {
  openPopup(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

//попап добавления карточки

profileAddButton.addEventListener("click", function (evt) {
  openPopup(popupTypeNewCard);
});

//редактирование профиля

function handleEditProfileForm(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  popupTypeEdit.classList.remove("popup_is-opened");
}

typeEditForm.addEventListener("submit", handleEditProfileForm);

//добавление новой карточки

function addNewCard(evt) {
  evt.preventDefault();

  const newCardObject = {
    name: popupInputTypeCardName.value,
    link: popupInputTypeUrl.value,
  };

  placesList.prepend(
    addCard(newCardObject, deleteCard, openCardImage, likeCard)
  );
  popupTypeNewCard.classList.remove("popup_is-opened");
  newPlaceForm.reset();
}

newPlaceForm.addEventListener("submit", addNewCard);
