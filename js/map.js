'use strict';

var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['flat', 'house', 'bungalo'];
var russianTypes = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var template = document.querySelector('#lodge-template').content;
var dialog = document.querySelector('.dialog');
var dialogClose = document.querySelector('.dialog__close');
var tokyoPinMap = document.querySelector('.tokyo__pin-map');

function getRandFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandInt(from, to) {
  return parseInt(Math.random() * (to - from) + from);
}

function getRandFeatures() {
  var result = [];

  for (var i = 0; i < features.length; i++) {
    if (Math.random() > 0.5) {
      result.push(features[i]);
    }
  }
  return result;
}

function generateApartments(count) {
  apartments = [];

  for (var i = 1; i <= count; i++) {

    var x = getRandInt(300, 900);
    var y = getRandInt(100, 500);

    apartments.push({
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },

      'offer': {
        'title': getRandFromArray(titles),
        'address': x + ',' + y,
        'price': getRandInt(1000, 1000000),
        'type': getRandFromArray(types),
        'rooms': getRandInt(1, 5),
        'guests': getRandInt(1, 25),
        'checkin': getRandFromArray(checkin),
        'checkout': getRandFromArray(checkout),
        'features': getRandFeatures(features),
        'description': '',
        'photos': []
      },

      'location': {
        'x': x,
        'y': y
      }
    })
  }
  return apartments;
}

function getApp(avatar) {
  for (var j = 0; j < apartments.length; j++) {
    if (apartments[j].author.avatar === avatar) {
      return apartments[j];
    }
  }
}


function renderPin(apartment) {
  var div = document.createElement('div');
  div.className = 'pin';
  div.setAttribute('style', 'left: ' + apartment.location.x + 'px; top: ' + apartment.location.y + 'px');
  var img = document.createElement('img');
  img.className = 'rounded';
  img.setAttribute('width', '40');
  img.setAttribute('height', '40');
  img.setAttribute('src', apartment.author.avatar);
  img.setAttribute('tabindex', '0');
  div.insertAdjacentHTML('afterBegin', img.outerHTML);
  return div;
}

function renderPanel(app) {
  var offerDialog = document.querySelector('#offer-dialog');
  var oldPanel = offerDialog.querySelector('.dialog__panel');
  var templateElement = template.cloneNode(true);
  var dialogTitle = offerDialog.querySelector('.dialog__title');
  templateElement.querySelector('.lodge__title').textContent = app.offer.title;
  templateElement.querySelector('.lodge__address').textContent = app.offer.address;
  templateElement.querySelector('.lodge__price').textContent = app.offer.price + '₽/ночь';
  templateElement.querySelector('.lodge__type').textContent = russianTypes[app.offer.type];
  templateElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + app.offer.guests + ' гостей в ' + app.offer.rooms + ' комнатах';
  templateElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + app.offer.checkin + ', выезд до ' + app.offer.checkout;
  templateElement.querySelector('.lodge__description').textContent = app.offer.description;
  dialogTitle.querySelector('img').setAttribute('src', app.author.avatar);
  var lodgeFeatures = templateElement.querySelector('.lodge__features');


  for (var i = 0; i < app.offer.features.length; i++) {
    var feature = document.createElement('span');
    feature.classList.add('feature__image');
    feature.classList.add('feature__image--' + app.offer.features[i]);
    lodgeFeatures.appendChild(feature);
  }

  offerDialog.replaceChild(templateElement, oldPanel);
}


var fragment = document.createDocumentFragment();
var apartments = generateApartments(8);

for (var i = 0; i < apartments.length; i++) {
  fragment.appendChild(renderPin(apartments[i]));
}
document.querySelector('.tokyo__pin-map').appendChild(fragment);

renderPanel(apartments[0]);

function clickHandler(event) {
  var checkPin = event.target.closest('.pin');
  if (checkPin) {
    delectPin();
    checkPin.classList.add('pin--active');

    var img = checkPin.querySelector('img');
    var src = img.getAttribute('src');

    var app = getApp(src);
    renderPanel(app);
    dialog.style.display = 'block';
  }
}
function delectPin() {
  var element = document.querySelector('.pin--active');
  if (element) {
    element.classList.remove('pin--active');
  }
}

function keydownHandler(event) {
  if (event.keyCode === 13) {
    clickHandler(event);
  }
  if (event.keyCode === 27) {
    closeDialogHandler();
  }
}


function closeDialogHandler() {
  dialog.style.display = 'none';
  delectPin();
}

tokyoPinMap.addEventListener('click', clickHandler);
tokyoPinMap.addEventListener('keydown', keydownHandler);

dialogClose.addEventListener('click', closeDialogHandler);
dialogClose.addEventListener('keydown', closeKeydownHandle);


function closeKeydownHandle(event) {
  if (event.keyCode === 13) {
    closeDialogHandler();
  }
}

dialogClose.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    closeDialogHandler();
  }
});

var title = document.querySelector('#title');
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
};

var timeElem = document.querySelector('#time');
console.log(timeElem);

timeElem.addEventListener('change', function (event) {
    var target = event.target.value;
    console.log(target);
    var timeOutElem = document.querySelector('#timeout');
    var optionValue = timeOutElem.querySelector('option[value="' + target + '"]');
    optionValue.setAttribute('selected', 'selected');

  }
);

var type = document.querySelector('#type');

type.addEventListener('change', function (event) {
  var target = event.target.value;
  if (target === 'Квартира') {
    price.setAttribute('placeholder', '0');
    price.removeAttribute('max', '100');
    price.setAttribute('min', '1000');
  } else if (target === 'Лачуга') {
    price.setAttribute('placeholder', '0');
    price.removeAttribute('max', '100');
    price.setAttribute('min', '0');
  } else {
    price.setAttribute('placeholder', '0');
    price.removeAttribute('max', '100');
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





