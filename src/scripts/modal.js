//универсальное закрытие попапов
const popupCloses = document.querySelectorAll(".popup__close");

export function closePopup(popUp) {
  popUp.addEventListener("click", function (evt) {
    if (evt.target === popUp) {
      popUp.classList.remove("popup_is-opened");
    }
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      popUp.classList.remove("popup_is-opened");
    }
  });

  popupCloses.forEach(function (popupCloseButton) {
    popupCloseButton.addEventListener("click", function (evt) {
      popUp.classList.remove("popup_is-opened");
    });
  });

  popUp.addEventListener("submit", function (evt) {
    popUp.classList.remove("popup_is-opened");
  });
}

//Универсальное открытие попапа

export function openPopup (popUp) {
  popUp.classList.add("popup_is-opened");
  closePopup(popUp);
}