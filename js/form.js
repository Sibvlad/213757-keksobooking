'use strict';

window.form = (function () {
  var title = document.querySelector('#title');
  var address = document.querySelector('#address');
  address.setAttribute('readonly', '');
  title.required = true;
  title.setAttribute('minlength', '30');
  title.setAttribute('maxlength', '100');


  var price = document.querySelector('#price');
  price.required = true;
  price.setAttribute('placeholder', '1000');
  price.setAttribute('min', '30');
  price.setAttribute('max', '100');
  isNumeric(price.value);

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  var timeElem = document.querySelector('#time');

  timeElem.addEventListener('change', function (event) {
    var target = event.target.value;
    var timeOutElem = document.querySelector('#timeout');
    var optionValue = timeOutElem.querySelector('option[value="' + target + '"]');
    optionValue.setAttribute('selected', 'selected');
  });

  var type = document.querySelector('#type');

  type.addEventListener('change', function (event) {
    var target = event.target.value;
    if (target === 'Квартира') {
      price.setAttribute('placeholder', '0');
      price.removeAttribute('max');
      price.setAttribute('min', '1000');
    } else if (target === 'Лачуга') {
      price.setAttribute('placeholder', '0');
      price.removeAttribute('max');
      price.setAttribute('min', '0');
    } else {
      price.setAttribute('placeholder', '0');
      price.removeAttribute('max');
      price.setAttribute('min', '10000');
    }
  });

  var roomElem = document.querySelector('#room_number');

  roomElem.addEventListener('change', function (event) {
    var target = event.target.value;
    var capacity = document.querySelector('#capacity');
    if (target === '1' || target === '2') {
      var capOptionOne = capacity.querySelector('option[value="1"]');
      capOptionOne.setAttribute('selected', 'selected');
    } else if (target === '100') {
      var capOptionTwo = capacity.querySelector('option[value="2"]');
      capOptionTwo.setAttribute('selected', 'selected');
    }
  });
})();
