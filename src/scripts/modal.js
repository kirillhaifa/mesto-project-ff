import { removeInputError } from "./validation";
//обработка нажатия esc

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
  1;
}

//универсальное закрытие попапов

export function closePopup(popUp) {
  popUp.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);

  //если открыть попап редактирования профиля, ввести неверные данные,
  //закрыть его и открыть заново, значения останутся прежние,
  //а чтобы не было старых сообщений об ошибке и кнопка была активна
  //нужна эта часть кода

  const inputs = popUp.querySelectorAll(".popup__input");
  inputs.forEach(function (input, validationSettings) {
    if (
      input.classList.contains("popup__input_type_name") ||
      input.classList.contains("popup__input_type_description")
    ) {
      removeInputError(input, {inputErrorClass: 'form__input_type_error'}); 
      //вызван не весь объект settings, а только один класс
    }
  });
}

//открытие попапа

export function openPopup(popUp) {
  popUp.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscape);

  //кнопка попапа редактирования должна быть активной при открытии
  if (popUp.classList.contains("popup_type_edit")) {
    const submitButton = popUp.querySelector(".popup__button");
    submitButton.classList.remove("popup__button_disabled");
  }

  //а кнопка поля ввода новой карточки неактивной
  if (popUp.classList.contains("popup_type_new-card")) {
    const submitButton = popUp.querySelector(".popup__button");
    submitButton.classList.add("popup__button_disabled");
  }
}
