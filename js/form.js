'use strict';

window.form = (function () {
  var timeElem = document.querySelector('#time');
  var timeOutElem = document.querySelector('#timeout');

  var timesIn = [
    '12',
    '13',
    '14'
  ];
  var timesOut = [
    '12',
    '13',
    '14'
  ];

  window.synchronizeFields(timeElem, timeOutElem, timesIn, timesOut, 'value');

  var type = document.querySelector('#type');
  var price = document.querySelector('#price');

  var noticeTypes = [
    'flat',
    'shack',
    'palace'
  ];
  var noticePrices = [
    '1000',
    '0',
    '10000'
  ];

  window.synchronizeFields(type, price, noticeTypes, noticePrices, 'value');

  var roomElem = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var noticeRoomNumbers = [
    '1',
    '2',
    '100'
  ];
  var noticeCapacities = [
    '3',
    '3',
    '0'
  ];

  window.synchronizeFields(roomElem, capacity, noticeRoomNumbers, noticeCapacities, 'value');

  var title = document.querySelector('#title');
  var address = document.querySelector('#address');
  address.setAttribute('readonly', '');
  title.required = true;
  title.setAttribute('minlength', '30');
  title.setAttribute('maxlength', '100');


  price.required = true;
  price.setAttribute('placeholder', '1000');
  price.setAttribute('min', '1000');
  price.setAttribute('max', ' 1 000 000');
  isNumeric(price.value);

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  // var timeElem = document.querySelector('#time');
  //
  // timeElem.addEventListener('change', function (event) {
  //   var target = event.target.value;
  //   var timeOutElem = document.querySelector('#timeout');
  //   var optionValue = timeOutElem.querySelector('option[value="' + target + '"]');
  //   optionValue.setAttribute('selected', 'selected');
  // });
  //
  // var type = document.querySelector('#type');
  //
  // type.addEventListener('change', function (event) {
  //   var target = event.target.value;
  //   if (target === 'Квартира') {
  //     price.setAttribute('placeholder', '0');
  //     price.removeAttribute('max');
  //     price.setAttribute('min', '1000');
  //   } else if (target === 'Лачуга') {
  //     price.setAttribute('placeholder', '0');
  //     price.removeAttribute('max');
  //     price.setAttribute('min', '0');
  //   } else {
  //     price.setAttribute('placeholder', '0');
  //     price.removeAttribute('max');
  //     price.setAttribute('min', '10000');
  //   }
  // });
  //
  // var roomElem = document.querySelector('#room_number');
  //
  // roomElem.addEventListener('change', function (event) {
  //   var target = event.target.value;
  //   var capacity = document.querySelector('#capacity');
  //   if (target === '1' || target === '2') {
  //     var capOptionOne = capacity.querySelector('option[value="1"]');
  //     capOptionOne.setAttribute('selected', 'selected');
  //   } else if (target === '100') {
  //     var capOptionTwo = capacity.querySelector('option[value="2"]');
  //     capOptionTwo.setAttribute('selected', 'selected');
  //   }
  // });
})();
