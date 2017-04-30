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
})();
