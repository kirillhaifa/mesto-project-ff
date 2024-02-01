const regexforInput = /^[a-zA-Zа-яёА-ЯЁ\s\-]+$/;

export function showInputError(input, validationSettings) {
  const errorMessage = input.nextElementSibling;
  errorMessage.textContent = input.validationMessage;
  input.classList.add(validationSettings.inputErrorClass);
}

export function deactivateSubmitButton(input, validationSettings) {
  const form = input.closest(validationSettings.formSelector);
  const submitButton = form.querySelector(validationSettings.submitButtonSelector);
  submitButton.classList.add(validationSettings.inactiveButtonClass);
}

export function removeInputError(input, validationSettings) {
  const errorMessage = input.nextElementSibling;
  errorMessage.textContent = "";
  input.classList.remove(validationSettings.inputErrorClass);
}

export function activateSubmitButton(input, validationSettings) {
  const form = input.closest(validationSettings.formSelector);
  const inputs = form.querySelectorAll(validationSettings.inputSelector);
  const submitButton = form.querySelector(validationSettings.submitButtonSelector);

  const allInputsValid = Array.from(inputs).every(function (input) {
    return input.validity.valid;
  });

  if (allInputsValid) {
    submitButton.classList.remove(validationSettings.inactiveButtonClass);
  }
}

export function isValid(input, validationSettings) {
  if (!input.validity.valid) {
    showInputError(input, validationSettings);
    deactivateSubmitButton(input, validationSettings);
  } else if (
    !input.value.match(regexforInput) &&
    !input.classList.contains(validationSettings.inputTypeUrl)
  ) {
    showInputError(input, validationSettings);
    const errorMessage = input.nextElementSibling;
    errorMessage.textContent =
      "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";
    deactivateSubmitButton(input, validationSettings);
  } else {
    removeInputError(input, validationSettings);
    activateSubmitButton(input, validationSettings);
  }
}

export function enableValidation (validationSettings) {
  const popupInputs = Array.from(document.querySelectorAll(validationSettings.inputSelector))

  popupInputs.forEach(function (input) {
    input.addEventListener("input", function () {
      isValid(input, validationSettings);
    });
  });
}



