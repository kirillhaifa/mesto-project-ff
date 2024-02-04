import { clearValidation } from "./validation";
import { validationSettings } from "../index";

//обработка нажатия esc

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

//универсальное закрытие попапов

export function closePopup(popUp) {
  popUp.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

//открытие попапа

export function openPopup(popUp) {
  popUp.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscape);

  const form = popUp.querySelector(".popup__form");
  if (form) {
    clearValidation(form, validationSettings);
  }
}
