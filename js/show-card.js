'use strict';

window.showCard = (function (event) {
  var checkPin = event.target.closest('.pin');
  if (checkPin) {
    window.pin.deselectPin();
    checkPin.classList.add('pin--active');
    window.card.updatePanel(window.map.getApp(checkPin.id));
    window.map.dialog.style.display = 'block';
  }
});
