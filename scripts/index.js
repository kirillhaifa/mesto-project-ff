const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function addCard(initialCards, del) {
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = initialCards.link;
  cardElement.querySelector(".card__title").textContent = initialCards.name;

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardDeleteButton.addEventListener('click', function () {
    del(cardElement);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

initialCards.forEach(function(initialCard) {
  placesList.append(addCard(initialCard, deleteCard));
});
