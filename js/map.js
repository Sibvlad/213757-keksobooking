'use strict';

window.map = (function () {

  var fragment = document.createDocumentFragment();
  var dialogClose = document.querySelector('.dialog__close');
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var _appartments = [];

  return {
    render: function (apartments) {
      _appartments = apartments;
      for (var i = 0; i < apartments.length; i++) {
        var pin = window.pin.render(apartments[i]);
        fragment.appendChild(pin);
      }
      tokyoPinMap.appendChild(fragment);
      window.card.updatePanel(apartments[0]);
      tokyoPinMap.addEventListener('keydown', keydownHandler);
      dialogClose.addEventListener('click', window.card.closePanel);
      dialogClose.addEventListener('keydown', closeKeydownHandle);
      var mainPin = tokyoPinMap.querySelector('.pin__main');
      mainPin.addEventListener('mousedown', onPinMove);
    },
    getApp: function (id) {
      for (var j = 0; j < _appartments.length; j++) {
        if (_appartments[j].author.avatar === id) {
          return _appartments[j];
        }
      }
      return '';
    },
    onError: function (message) {
      var errorBlock = document.querySelector('.header__error');
      errorBlock.textContent = message;
      errorBlock.classList.remove('invisible');
    },
    dialog: document.querySelector('.dialog')
  };


  function onPinMove(evt) {
    evt.preventDefault();

    var target = evt.target.closest('.pin');

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      target.style.top = (target.offsetTop - shift.y) + 'px';
      target.style.left = (target.offsetLeft - shift.x) + 'px';

      var address = document.querySelector('#address');
      address.value = 'x: ' + (target.offsetLeft + 32) + ', y: ' + (target.offsetTop + 94);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      tokyoPinMap.removeEventListener('mousemove', onMouseMove);
      tokyoPinMap.removeEventListener('mouseup', onMouseUp);
    };

    tokyoPinMap.addEventListener('mousemove', onMouseMove);
    tokyoPinMap.addEventListener('mouseup', onMouseUp);
  }

  function keydownHandler(event) {
    if (event.keyCode === 13) {
      window.showCard(event);
    }
    if (event.keyCode === 27) {
      window.card.closePanel();
    }
  }

  function closeKeydownHandle(event) {
    if (event.keyCode === 13) {
      window.card.closePanel();
    }
  }
})();

window.load('https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data', window.map.render, window.map.onError);
