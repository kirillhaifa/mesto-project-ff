const regexforInput = /^[a-zA-Zа-яёА-ЯЁ\s\-]+$/;

//вывод ошибки при невалидности инпута

export function showInputError(input, validationSettings) {
  const errorMessage = input.nextElementSibling;
  errorMessage.textContent = input.validationMessage;
  input.classList.add(validationSettings.inputErrorClass);
}

//удаление ошибки инпута

export function removeInputError(input, validationSettings) {
  const errorMessage = input.nextElementSibling;
  errorMessage.textContent = "";
  input.classList.remove(validationSettings.inputErrorClass);
}

//отключение кнопки сабмит

export function deactivateSubmitButton(form, validationSettings) {
  const submitButton = form.querySelector(
    validationSettings.submitButtonSelector
  );
  if (submitButton) {
    submitButton.classList.add(validationSettings.inactiveButtonClass);
  }
}

//включение кнопки сабмит

export function activateSubmitButton(form, validationSettings) {
  const submitButton = form.querySelector(
    validationSettings.submitButtonSelector
  );

  if (submitButton) {
    submitButton.classList.remove(validationSettings.inactiveButtonClass);
  }
}

//проверка валидности инпута

export function inputIsValid(input, validationSettings) {
  if (!input.validity.valid) {
    showInputError(input, validationSettings);
  } else if (
    !input.value.match(regexforInput) &&
    (input.classList.contains("popup__input_type_name") ||
      input.classList.contains("popup__input_type_card-name"))
  ) {
    showInputError(input, validationSettings);
    const errorMessage = input.nextElementSibling;
    errorMessage.textContent = input.dataset.errorMessage
  } else {
    removeInputError(input, validationSettings);
    return true;
  }
}

//проверка валидности всех инпутов формы для включения кнопки сабмит

export function formIsValid(form, validationSettings) {
  const inputs = Array.from(
    form.querySelectorAll(validationSettings.inputSelector)
  );
  const allInputsValid = inputs.every(function (input) {
    return inputIsValid(input, validationSettings);
  });

  if (allInputsValid) {
    activateSubmitButton(form, validationSettings);
  } else {
    deactivateSubmitButton(form, validationSettings);
  }
}

//очистка ошибок формы редактирования профиля

export function clearValidation(form, validationSettings) {
  form.reset()
  const inputs = Array.from(
    form.querySelectorAll(validationSettings.inputSelector)
  );
  inputs.forEach(function (input) {
    removeInputError(input, validationSettings);
    activateSubmitButton(form, validationSettings);
  });
}

//включение валидации

export function enableValidation(validationSettings) {
  const forms = Array.from(
    document.querySelectorAll(validationSettings.formSelector)
  );
  forms.forEach(function (form) {
    const inputs = Array.from(
      form.querySelectorAll(validationSettings.inputSelector)
    );
    inputs.forEach(function (input) {
      input.addEventListener("input", function () {
        inputIsValid(input, validationSettings);
        formIsValid(form, validationSettings);
      });
    });
  });
}
