//вывод ошибки при невалидности инпута

function showInputError(input, validationSettings) {
  const errorMessage = input.nextElementSibling;
  errorMessage.textContent = input.validationMessage;
  input.classList.add(validationSettings.inputErrorClass);
}

//удаление ошибки инпута

function removeInputError(input, validationSettings) {
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
    submitButton.disabled = true;
  }
}

//включение кнопки сабмит

function activateSubmitButton(form, validationSettings) {
  const submitButton = form.querySelector(
    validationSettings.submitButtonSelector
  );

  if (submitButton) {
    submitButton.classList.remove(validationSettings.inactiveButtonClass);
    submitButton.disabled = false;
  }
}

//проверка валидности инпута

function inputIsValid(input, validationSettings) {
  if (input.validity.patternMismatch) {
    showInputError(input, validationSettings);
    const errorMessage = input.nextElementSibling;
    errorMessage.textContent = input.dataset.errorMessage;
  } else if (!input.validity.valid) {
    showInputError(input, validationSettings);
  } else {
    removeInputError(input, validationSettings);
    return true;
  }
}

//проверка валидности всех инпутов формы для включения кнопки сабмит

function formIsValid(form, validationSettings) {
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
  form.reset();
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
