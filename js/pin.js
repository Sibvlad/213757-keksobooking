'use strict';

window.pin = (function () {
  return {
    render: function (apartment) {
      var div = document.createElement('div');
      div.className = 'pin';
      div.id = 'pin' + apartment.id;
      div.setAttribute('style', 'left: ' + apartment.location.x + 'px; top: ' + apartment.location.y + 'px');
      var img = document.createElement('img');
      img.className = 'rounded';
      img.setAttribute('width', '40');
      img.setAttribute('height', '40');
      img.setAttribute('src', apartment.author.avatar);
      img.setAttribute('tabindex', '0');
      div.insertAdjacentHTML('afterBegin', img.outerHTML);
      div.addEventListener('click', window.showCard);

      return div;
    },
    deselectPin: function () {
      var element = document.querySelector('.pin--active');
      if (element) {
        element.classList.remove('pin--active');
      }
    },
    hidePins: function () {
      var list = document.querySelectorAll('.tokyo__pin-map > .pin:not(.pin__main)');
      for (var i = 0; i < list.length; i++) {
        list[i].classList.add('invisible');
      }
    },
    showPin: function (id) {
      var element = document.querySelector('#pin' + id);
      if (element) {
        element.classList.remove('invisible');
      }
    }
  };
})();
