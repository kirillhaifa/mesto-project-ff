import { initialCards } from "./scripts/cards";
import "./pages/index.css";
import { addCard, deleteCard } from "./scripts/card";
import { openPopup, closePopup } from "./scripts/modal";



// создание карточек из массива и их удаление
const placesList = document.querySelector(".places__list");

initialCards.forEach(function (initialCard) {
  placesList.append(addCard(initialCard, deleteCard));
});

//попапы
//константы попапов

const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");

//попап редактированя профиля

profileEditButton.addEventListener("click", function (evt) {
  openPopup(popupTypeEdit)
});

//попап добавления карточки

const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");

profileAddButton.addEventListener("click", function (evt) {
  openPopup(popupTypeNewCard)
});


//редактирование профиля

const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

function handleFormSubmit(evt) {
  evt.preventDefault();
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  nameInput.value = "";
  jobInput.value = "";
}

formElement.addEventListener("submit", handleFormSubmit);

//добавление новой карточки

const NewPlaceForm = document.forms["new-place"];

function addNewCard(evt) {
  evt.preventDefault();

  const popupInputTypeCardName = popupTypeNewCard.querySelector(
    ".popup__input_type_card-name"
  );
  const popupInputTypeUrl = popupTypeNewCard.querySelector(
    ".popup__input_type_url"
  );

  initialCards.unshift({
    name: popupInputTypeCardName.value,
    link: popupInputTypeUrl.value,
  });

  popupInputTypeCardName.value = "";
  popupInputTypeUrl.value = "";

  placesList.prepend(addCard(initialCards[0], deleteCard));
}

NewPlaceForm.addEventListener("submit", addNewCard);
