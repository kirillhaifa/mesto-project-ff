import "./pages/index.css";
import { addCard, deleteCard, openCardImage, likeCard } from "./scripts/card";
import { openPopup, closePopup } from "./scripts/modal";
import {
  enableValidation,
  deactivateSubmitButton,
  clearValidation,
} from "./scripts/validation";
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
const popupTypeNewCardForm = popupTypeNewCard.querySelector(".popup__form");
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
const editAvatarSubmitButton = popupEditAvatar.querySelector(".popup__button");
const profileImageButton = document.querySelector(".profile__image-container");

export const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "popup__error_visible",
};
export let userId = "";

//отрисовка имени, профессии и карточек при загрузке страницы
const firstLoadRender = () => {
  Promise.all([userPromise(), getCardsFromServer()])
    .then(([userData, cardsData]) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileImage.style.backgroundImage = `url('${userData.avatar}')`;
      userId = userData._id;

      // Обработка данных о карточках
      const cards = Array.from(cardsData);
      cards.forEach((card) => {
        placesList.append(
          addCard(card, deleteCard, openCardImage, likeCard, userId)
        );
      });
    })
    .catch((error) => {
      console.error("Произошла ошибка при выполнении запросов:", error);
    });
};

firstLoadRender();

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
  deactivateSubmitButton(popupTypeNewCardForm, validationSettings);
});

//редактирование профиля

function handleEditProfileForm(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  submitButton.textContent = "Сохранение...";

  patchProfileInfo(nameInput.value, jobInput.value, submitButton)
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closePopup(popupTypeEdit);
    })
    .catch((err) => {
      console.log("Произошла ошибка при выполнении запросов: ", err);
    })
    .finally(() => (submitButton.textContent = "Сохранить"));
}

typeEditForm.addEventListener("submit", handleEditProfileForm);

//добавление новой карточки

function addNewCard(evt) {
  evt.preventDefault();

  const newCardObject = {
    name: popupInputTypeCardName.value,
    link: popupInputTypeUrl.value,
  };

  const submitButton = evt.submitter;
  submitButton.textContent = "Сохранение...";

  postCard(newCardObject)
    .then((data) => {
      placesList.prepend(
        addCard(data, deleteCard, openCardImage, likeCard, userId)
      );
      closePopup(popupTypeNewCard);
      clearValidation(popupTypeNewCardForm, validationSettings);
    })
    .catch((err) => {
      console.log("Ошибка. Фото не отправлено: ", err);
    })
    .finally(() => submitButton.textContent = "Сохранить");
}

newPlaceForm.addEventListener("submit", addNewCard);

//включение валидации
enableValidation(validationSettings);

//popup редактирования аватарки
profileImageButton.addEventListener("click", function () {
  openPopup(popupEditAvatar);
  editAvatarSubmitButton.textContent = "Сохранить";
});

//смена аватарки
function editAvatar(evt) {
  evt.preventDefault();

  if (editAvatarInput.value !== "") {
    //кнопка сохранить остается активной
    const submitButton = evt.submitter;
    submitButton.textContent = "Сохранение...";

    const avatarData = {
      avatar: editAvatarInput.value,
    };

    patchAvatar(avatarData)
      .then((data) => {
        const avatarLink = data.avatar;
        profileImage.style.backgroundImage = `url('${avatarLink}')`;
        closePopup(popupEditAvatar);
        clearValidation(editAvatarForm, validationSettings);
      })
      .catch((error) => {
        console.error("Ошибка при обновлении данных:", error);
      })
      .finally(() => submitButton.textContent = "Сохранить")
  }
}

editAvatarForm.addEventListener("submit", editAvatar);
