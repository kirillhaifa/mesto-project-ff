//универсальное закрытие попапов

export function closePopup(popUp) {
  const popupCloseButton = popUp.querySelector(".popup__close");

  function removeClassOpened(item) {
    //предложенное Вами название используется в другом месте, 
    //поэтому я дал другое название
    item.classList.remove("popup_is-opened");
  }

  function handleEscape(evt) {
    if (evt.key === "Escape") {
      removeClassOpened(popUp);
      removeEventListenersPopUp();
    }
  }

  function handlePopupClick(evt) {
    if (evt.target === popUp) {
      removeClassOpened(popUp);
      removeEventListenersPopUp();
    }
  }

  function handlePopupCloseButtonClick (evt) {
    removeClassOpened(popUp);
    removeEventListenersPopUp();
  }

  function removeEventListenersPopUp() {
    document.removeEventListener("keydown", handleEscape);
    popUp.removeEventListener("click", handlePopupClick);
    popupCloseButton.removeEventListener("click", handlePopupClick);
  }


  document.addEventListener("keydown", handleEscape);
  popupCloseButton.addEventListener("click", handlePopupCloseButtonClick);
  popUp.addEventListener("click", handlePopupClick);
}

//открытие попапа

export function openPopup(popUp) {
  popUp.classList.add("popup_is-opened");
  closePopup(popUp)
  //по Вашему замечанию нужно либо навешивать слушатели один раз
  //либо удалять их правильно при закрытии попапа
  //я реализовал второй вариант
}
