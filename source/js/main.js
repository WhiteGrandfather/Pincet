'use strict';

(function () {
  var ESC_KEY = 'Escape';

  var buttonWrapperElement = document.querySelector('.capture-block__button-wrapper');
  var buttonElement = buttonWrapperElement.querySelector('.button');
  var popupElement = document.querySelector('.popup');
  var formWindowElement = popupElement.querySelector('.popup__form-window');
  var SuccessWindowElement = popupElement.querySelector('.popup__success-window');

  var onPopupAreaClick = function (event) {
    if(event.target.classList.contains('popup')) {
      event.stopPropagation();
      onPopupClose();
    };
  };

  var getEscEvent = function (escEvt, action) {
    if (escEvt.key === ESC_KEY) {
      action();
    };
  };

  var onPopupButtonClose = function (event) {
    if (event.target.classList.contains('popup__button-close')) {
      onPopupClose()
    };
  };

  var onEscPopupClose = function (event) {
    getEscEvent(event, onPopupClose);
  };

  var onPopupOpen = function (event) {
    popupElement.classList.remove('popup--closed');

    buttonElement.removeEventListener('click', onPopupOpen);
    document.removeEventListener('mousemove', window.animation);
    popupElement.addEventListener('click', onPopupButtonClose);
    document.addEventListener('keydown', onEscPopupClose);
    popupElement.addEventListener('click', onPopupAreaClick);
    popupElement.addEventListener('submit', onFormSend);
  };

  var onPopupClose = function (event) {
    popupElement.classList.add('popup--closed');

    if (!popupElement.classList.contains('popup__form-window--closed')) {
      formWindowElement.classList.remove('popup__form-window--closed');
      SuccessWindowElement.classList.add('popup__success-window');
    };

    buttonElement.addEventListener('click', onPopupOpen);
    document.addEventListener('mousemove', window.animation);
    popupCloseButtonElement.removeEventListener('click', onPopupClose);
    document.removeEventListener('keydown', onEscPopupClose);
    popupElement.removeEventListener('click', onPopupAreaClick);
    popupElement.removeEventListener('submit', onFormSend);
  };

  var onFormSend = function (event) {
    event.preventDefault();
    SuccessWindowElement.classList.remove('popup__success-window--closed');
    formWindowElement.classList.add('popup__form-window--closed');
  };

  document.addEventListener('mousemove', window.animation);
  buttonElement.addEventListener('click', onPopupOpen);
})();
