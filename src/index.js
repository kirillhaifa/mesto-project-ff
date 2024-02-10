import { initialCards } from "./scripts/cards";
import "./pages/index.css";
import { addCard, deleteCard, openCardImage, likeCard } from "./scripts/card";
import { openPopup, closePopup } from "./scripts/modal";
import { enableValidation, deactivateSubmitButton } from "./scripts/validation";
import { data } from "autoprefixer";
import {
  userPromise,
  postCard,
  patchAvatar,
  patchProfileInfo,
  getCardsFromServer,
} from "./scripts/api";

//константы
export const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const typeEditForm = popupTypeEdit.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
const newPlaceForm = document.forms["new-place"];
const popupInputTypeCardName = popupTypeNewCard.querySelector(
  ".popup__input_type_card-name"
);
const popupInputTypeUrl = popupTypeNewCard.querySelector(
  ".popup__input_type_url"
);
const popups = document.querySelectorAll(".popup");
export const profileImage = document.querySelector(".profile__image");
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
const editAvatarForm = popupEditAvatar.querySelector(".popup__form");
const editAvatarInput = popupEditAvatar.querySelector(
  ".popup__input_edit_avatar"
);
const profileImageButton = document.querySelector(".profile__image-container");

export const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "popup__error_visible",
};

//отрисовка имени и профессии при загрузке страницы
function renderUserData() {
  userPromise()
    .then((data) => {
      return data;
    })
    .then((data) => {
      (profileTitle.textContent = data.name),
        (profileDescription.textContent = data.about),
        (profileImage.style.backgroundImage = `url('${data.avatar}')`);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос данных о пользователе не выполнен: ", err);
    });
}

renderUserData();

//загрузка карточек при загрузке страницы
function renderCards() {
  getCardsFromServer()
    .then((data) => {
      return data;
    })
    .then((data) => {
      const cards = Array.from(data);
      cards.forEach(function (card) {
        placesList.append(addCard(card, deleteCard, openCardImage, likeCard));
      });
    })
    .catch((err) => {
      console.log("Ошибка. Запрос карточек не выполнен: ", err);
    });
}

renderCards();

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
  const openedPopup = document.querySelector(".popup_is-opened");
  const popupForm = openedPopup.querySelector(".popup__form");
  deactivateSubmitButton(popupForm, validationSettings);
});

//редактирование профиля

function handleEditProfileForm(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  const openedPopup = document.querySelector(".popup_is-opened");
  const addButton = openedPopup.querySelector(".button");

  if (addButton) {
    addButton.textContent = "Сохранение...";
  }

  patchProfileInfo(nameInput.value, jobInput.value, addButton)
    .then(closePopup(popupTypeEdit))
    .catch((err) => {
      console.log("Произошла ошибка при выполнении запросов: ", err);
    })
    .finally((addButton.textContent = "Сохранить"));
}

typeEditForm.addEventListener("submit", handleEditProfileForm);

//добавление новой карточки

function addNewCard(evt) {
  evt.preventDefault();

  const newCardObject = {
    name: popupInputTypeCardName.value,
    link: popupInputTypeUrl.value,
  };

  const openedPopup = document.querySelector(".popup_is-opened");
  const addButton = openedPopup.querySelector(".button");
  if (addButton) {
    addButton.textContent = "Сохранение...";
  }

  postCard(newCardObject)
    .then((data) => {
      placesList.prepend(addCard(data, deleteCard, openCardImage, likeCard));
      closePopup(popupTypeNewCard);
    })
    .catch((err) => {
      console.log("Ошибка. Фото не отправлено: ", err);
    })
    .finally((addButton.textContent = "Сохранить"));
}

newPlaceForm.addEventListener("submit", addNewCard);

//включение валидации
enableValidation(validationSettings);

//popup редактирования аватарки
profileImageButton.addEventListener("click", function () {
  openPopup(popupEditAvatar);

  const openedPopup = document.querySelector(".popup_is-opened");
  const addButton = openedPopup.querySelector(".button");
  if (addButton) {
    addButton.textContent = "Сохранить";
  }
});

//смена аватарки
function editAvatar(evt) {
  evt.preventDefault();

  if (editAvatarInput.value !== "") {
    //кнопка сохранить остается активной

    const openedPopup = document.querySelector(".popup_is-opened");
    const addButton = openedPopup.querySelector(".button");
    if (addButton) {
      addButton.textContent = "Сохранение...";
    }

    const avatarData = {
      avatar: editAvatarInput.value,
    };

    patchAvatar(avatarData)
      .then((data) => {
        const avatarLink = data.avatar;
        profileImage.style.backgroundImage = `url('${avatarLink}')`;
        closePopup(popupEditAvatar);
      })
      .catch((error) => {
        console.error("Ошибка при обновлении данных:", error);
      });
  }
  closePopup(popupEditAvatar);
}

editAvatarForm.addEventListener("submit", editAvatar);
