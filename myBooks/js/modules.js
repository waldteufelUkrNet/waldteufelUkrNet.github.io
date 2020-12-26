"use strict"; // bbp module
////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ визначення ідентифікатору книги, робота з localStorage ↓↓↓ */

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var href = location.href;
var position = href.indexOf('books');
var bookId = href.slice(position + 6, position + 11);
var ls = localStorage;
var myBooks = JSON.parse(ls.getItem('myBooks')) || {};
var fontFamily, fontSize, fontColor; // налаштування стилів книги

if (!('generalSettings' in myBooks)) {
  myBooks.generalSettings = {};
  ls.setItem('myBooks', JSON.stringify(myBooks));
}

var bookTag = document.getElementById('book');

if (!('booksFontSettings' in myBooks.generalSettings)) {
  myBooks.generalSettings.booksFontSettings = {};
  myBooks.generalSettings.booksFontSettings.fontFamily = 'gost';
  myBooks.generalSettings.booksFontSettings.fontSize = '16px';
  myBooks.generalSettings.booksFontSettings.fontColor = '#000000';
  myBooks.generalSettings.booksFontSettings.bgColor = '#ffffff';
  ls.setItem('myBooks', JSON.stringify(myBooks));
} else {
  bookTag.style.fontSize = myBooks.generalSettings.booksFontSettings.fontSize;
  bookTag.style.color = myBooks.generalSettings.booksFontSettings.fontColor;
  bookTag.style.backgroundColor = myBooks.generalSettings.booksFontSettings.bgColor;
} // зміна значень в input'ах


document.querySelector('.textColorInput').value = myBooks.generalSettings.booksFontSettings.fontColor;
document.querySelector('.pageColorInput').value = myBooks.generalSettings.booksFontSettings.bgColor; // зміна значень в описах біля input'ів

document.querySelector('.fontNameIndicator').innerHTML = myBooks.generalSettings.booksFontSettings.fontFamily;
document.querySelector('.fontSizeIndicator').innerHTML = myBooks.generalSettings.booksFontSettings.fontSize;
document.querySelector('.fontColorIndicator').innerHTML = myBooks.generalSettings.booksFontSettings.fontColor;
document.querySelector('.pageColorIndicator').innerHTML = myBooks.generalSettings.booksFontSettings.bgColor; // зміна стилів демонстраційного вікна

var exampleIndicator = document.querySelector('.bbp__oa-block_display');
exampleIndicator.style.fontSize = myBooks.generalSettings.booksFontSettings.size;
exampleIndicator.style.color = myBooks.generalSettings.booksFontSettings.color;
exampleIndicator.style.backgroundColor = myBooks.generalSettings.booksFontSettings.bgColor; // тут ще шрифт

setFont(); // робота із закладкою (якщо вона є)

if (!('books' in myBooks)) {
  myBooks.books = _defineProperty({}, bookId, {
    bookmark: []
  });
} else {
  if (!(bookId in myBooks.books)) {
    myBooks.books[bookId] = {
      bookmark: []
    };
  }
}

if (myBooks.books[bookId].bookmark.length == 2) {
  showBookmarksBtns();
}
/* ↑↑↑ /визначення ідентифікатору книги, робота з localStorage ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ навішування обробників ↓↓↓ */
// кнопки головного меню


var bottomBookPanelBtns = document.getElementsByClassName('bbp__btn');

for (var i = 0; i < bottomBookPanelBtns.length; i++) {
  (function (n) {
    bottomBookPanelBtns[n].onclick = function (event) {
      // підсвітка натисненої кнопки
      event.currentTarget.classList.add('bbp__btn_active');

      (function (i) {
        setTimeout(function () {
          i.classList.remove('bbp__btn_active');
        }, 100);
      })(event.currentTarget); // персоналізована поведінка


      var buttonId = event.currentTarget.getAttribute('id');

      switch (buttonId) {
        case 'bookmark':
          // прибрати стару закладку
          if (document.querySelector('.bookmark-in-first-screen')) document.querySelector('.bookmark-in-first-screen').remove();
          if (document.querySelector('.bookmark-in-text')) document.querySelector('.bookmark-in-text').remove(); // визначаємо елемент, який знаходиться на координатах зверху по центру книги

          var topCoord = document.querySelector('#book').getBoundingClientRect().top + 20;
          var leftCoord = document.querySelector('.main').offsetWidth / 2;
          var DOMelem = document.elementFromPoint(leftCoord, topCoord); // визначаємо тег елементу і його порядковий номер у масиві однотипних елементів

          var DOMelemTagName = DOMelem.tagName.toLowerCase();
          var arrOfTags = document.querySelectorAll('#book ' + DOMelemTagName);
          var sequenceNumber;

          for (var _i = 0; _i < arrOfTags.length; _i++) {
            if (arrOfTags[_i] == DOMelem) {
              sequenceNumber = _i;
              break;
            }
          } // створюємо закладку тег/номер, записуємо в localStorage


          myBooks.books[bookId].bookmark = [DOMelemTagName, sequenceNumber];
          ls.setItem('myBooks', JSON.stringify(myBooks)); // згенерувати кнопки

          showBookmarksBtns();
          break;

        case 'selectText':
          toggleOptionsPanel('selectText');
          break;

        case 'options':
          toggleOptionsPanel('options');
          break;

        case 'goHome':
          var _href = location.href;

          var _position = _href.indexOf('books');

          if (_position != -1) {
            location.href = _href.slice(0, _position) + _href.slice(_position + 12);
          }

          break;

        case 'scrollUp':
          scrollingWindow('scrollUp');
          break;

        case 'scrollDown':
          scrollingWindow('scrollDown');
          break;

        case 'scrollTop':
          scrollingWindow('scrollTop');
          break;
      }
    };
  })(i);
} // панель налаштувань
// розмір шрифту


var fontSizeBtns = document.getElementsByClassName('fontSize');
addEventListenerToObject('click', fontSizeBtns, resizeFont); // випадаючий список шрифтів

document.querySelector('.bbp__oa-options-font-current-name').onclick = function () {
  document.querySelector('.bbp__oa-options-font-list').classList.toggle('bbp__oa-options-font-list_active');
};

document.addEventListener('click', function () {
  if (event.target.closest('.bbp__oa-options-font-current-name')) return;

  if (document.querySelector('.bbp__oa-options-font-list_active')) {
    document.querySelector('.bbp__oa-options-font-list_active').classList.remove('bbp__oa-options-font-list_active');
  }
}); // вибір шрифту

var fontItem = document.getElementsByClassName('bbp__oa-options-font-item');
addEventListenerToObject('click', fontItem, setFont); // кольори шрифту та тла

document.querySelector('.textColorInput').oninput = setFontColor;
document.querySelector('.pageColorInput').oninput = setPageColor;
var selectedBtns = document.getElementsByClassName('selected');
addEventListenerToObject('click', selectedBtns, prepareSelection);
/* ↑↑↑ /навішування обробників ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ FUNCTIONS DECLARATION ↓↓↓ */

/**
 * [showBookmarksBtns створення кнопок закладки]
 */

function showBookmarksBtns() {
  var book = document.getElementById('book');
  var bookmarkInFirstScreen = '\
                                  <div class="bookmark-in-first-screen">\
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">\
                                      <path d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"></path>\
                                    </svg>\
                                    <div class="bookmark-in-first-screen__btns-wrapper">\
                                      <button type="button" class="bookmark-in-first-screen__btn" onclick="removeBookmarksBtns()">\
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\
                                          <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"></path>\
                                        </svg>\
                                        <span>стерти</span>\
                                      </button>\
                                      <button type="button" class="bookmark-in-first-screen__btn" onclick="goToBookmark()">\
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\
                                          <path d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm72 20v-40c0-6.6 5.4-12 12-12h116v-67c0-10.7 12.9-16 20.5-8.5l99 99c4.7 4.7 4.7 12.3 0 17l-99 99c-7.6 7.6-20.5 2.2-20.5-8.5v-67H140c-6.6 0-12-5.4-12-12z"></path>\
                                        </svg>\
                                        <span>перейти</span>\
                                      </button>\
                                    </div>\
                                  </div>\
                                ';
  book.insertAdjacentHTML('beforeEnd', bookmarkInFirstScreen);
  var bookmarkInText = '\
                          <div class="bookmark-in-text" onclick="removeBookmarksBtns()">\
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">\
                              <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>\
                            </svg>\
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">\
                              <path d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"></path>\
                            </svg>\
                          </div>\
                         ';
  var tag = myBooks.books[bookId].bookmark[0];
  var number = myBooks.books[bookId].bookmark[1];
  var arrOfTags = document.querySelectorAll('#book ' + tag);
  var markeredTag = arrOfTags[number];
  var topCoord = markeredTag.getBoundingClientRect().top;
  var bookHeight = document.getElementById('book').offsetHeight;
  markeredTag.insertAdjacentHTML('beforeBegin', bookmarkInText);
  goToBookmark();
}
/**
 * [removeBookmarksBtns прибирання закладки]
 */


function removeBookmarksBtns() {
  //видалити обитві кнопки та почистити локальне сховище
  document.querySelector('.bookmark-in-first-screen').remove();
  document.querySelector('.bookmark-in-text').remove();
  myBooks.books[bookId].bookmark = [];
  ls.setItem('myBooks', JSON.stringify(myBooks));
}
/**
 * [goToBookmark відкриття книги в місці закладки]
 */


function goToBookmark() {
  var tag = myBooks.books[bookId].bookmark[0];
  var number = myBooks.books[bookId].bookmark[1];
  var arrOfTags = document.querySelectorAll('#book ' + tag);
  var markeredTag = arrOfTags[number];
  markeredTag.scrollIntoView({
    behavior: 'smooth'
  });
}
/**
 * [toggleOptionsPanel закриття/відкриття панелей налаштувань]
 * @param {[String]} panel [id панелі]
 */


function toggleOptionsPanel(panel) {
  if (panel == 'options') {
    if (document.querySelector('.bbp__oa_options').classList.contains('bbp__oa_active')) {
      document.querySelector('.bbp__oa_active').classList.remove('bbp__oa_active');
    } else {
      if (document.querySelector('.bbp__oa_active')) {
        document.querySelector('.bbp__oa_active').classList.remove('bbp__oa_active');
      }

      document.querySelector('.bbp__oa_options').classList.add('bbp__oa_active');
    }
  } else if (panel == 'selectText') {
    if (document.querySelector('.bbp__oa_colors').classList.contains('bbp__oa_active')) {
      document.querySelector('.bbp__oa_active').classList.remove('bbp__oa_active');
    } else {
      if (document.querySelector('.bbp__oa_active')) {
        document.querySelector('.bbp__oa_active').classList.remove('bbp__oa_active');
      }

      document.querySelector('.bbp__oa_colors').classList.add('bbp__oa_active');
    }
  }
}
/**
 * [scrollingWindow плавна прокрутка сторінки]
 * @param {[String]} how [напрям прокрутки]
 */


function scrollingWindow(how) {
  var topPoint;
  var book = document.getElementById('book');

  if (how == 'scrollTop') {
    topPoint = 0;
  } else {
    var currentScroll = book.scrollTop;
    var scrollValue = book.offsetHeight;

    if (how == 'scrollUp') {
      topPoint = currentScroll - scrollValue + 20;
    } else if (how == 'scrollDown') {
      topPoint = currentScroll + scrollValue - 20;
    }
  }

  book.scroll({
    top: topPoint,
    behavior: 'smooth'
  });
}
/**
 * [resizeFont змінює розмір шрифту книги]
 */


function resizeFont() {
  var buttonBehavior = event.currentTarget.dataset.behavior;
  var fontSize = +myBooks.generalSettings.booksFontSettings.fontSize.slice(0, 2);
  var newFontSize;

  if (buttonBehavior == '+') {
    newFontSize = fontSize + 1;
    if (newFontSize > 99) newFontSize = 99;
  } else if (buttonBehavior == '-') {
    newFontSize = fontSize - 1;
    if (newFontSize < 10) newFontSize = 10;
  }

  document.querySelector('html #book').style.fontSize = newFontSize + 'px';
  document.querySelector('.bbp__oa-block_display').style.fontSize = newFontSize + 'px';
  document.querySelector('.fontSizeIndicator').innerHTML = newFontSize + 'px';
  myBooks.generalSettings.booksFontSettings.fontSize = newFontSize + 'px';
  ls.setItem('myBooks', JSON.stringify(myBooks));
}

function setFontColor() {
  var fontColor = event.currentTarget.value;
  var exampleIndicator = document.querySelector('.bbp__oa-block_display');
  var indicator = document.querySelector('.fontColorIndicator');
  var book = document.getElementById('book');
  exampleIndicator.style.color = fontColor;
  book.style.color = fontColor;
  indicator.innerHTML = fontColor;
  myBooks.generalSettings.booksFontSettings.fontColor = fontColor;
  ls.setItem('myBooks', JSON.stringify(myBooks));
}

function setPageColor() {
  var pageColor = event.currentTarget.value;
  var exampleIndicator = document.querySelector('.bbp__oa-block_display');
  var indicator = document.querySelector('.pageColorIndicator');
  var book = document.getElementById('book');
  exampleIndicator.style.backgroundColor = pageColor;
  book.style.backgroundColor = pageColor;
  indicator.innerHTML = pageColor;
  myBooks.generalSettings.booksFontSettings.bgColor = pageColor;
  ls.setItem('myBooks', JSON.stringify(myBooks));
}

function setFont() {
  var font;

  if (!this) {
    font = myBooks.generalSettings.booksFontSettings.fontFamily;
  } else {
    font = this.innerHTML;
  }

  myBooks.generalSettings.booksFontSettings.fontFamily = font;
  ls.setItem('myBooks', JSON.stringify(myBooks)); // зміна значень в активному ел-ті списку та його описі

  document.querySelector('.bbp__oa-options-font-current-name').innerHTML = font;
  document.querySelector('.fontNameIndicator').innerHTML = font; // зміна стилю демонстраційного вікна та самої книги

  var boldFont, regFont, italFont;

  switch (font) {
    case 'arial':
      boldFont = 'ab';
      regFont = 'ar';
      italFont = 'ai';
      break;

    case 'consola':
      boldFont = 'cb';
      regFont = 'cr';
      italFont = 'ci';
      break;

    case 'gost':
      boldFont = 'bold';
      regFont = 'gost';
      italFont = 'condensed_italic';
      break;

    case 'roboto':
      boldFont = 'rb';
      regFont = 'rr';
      italFont = 'ri';
      break;

    case 'segoe':
      boldFont = 'segb';
      regFont = 'segr';
      italFont = 'segi';
      break;

    case 'times new roman':
      boldFont = 'tnrb';
      regFont = 'tnrr';
      italFont = 'tnri';
      break;

    case 'bulgaria':
      boldFont = 'bmp';
      regFont = 'bmp';
      italFont = 'bmp';
      break;
  }

  var lightningConductor = document.getElementById('lightning-conductor'),
      book = document.getElementById('book') || lightningConductor,
      content = document.querySelector('.content-section__name') || lightningConductor,
      boldLinks = document.getElementsByClassName('content__main-link') || lightningConductor,
      subLinks = document.getElementsByClassName('content__sub-link') || lightningConductor,
      sub2Links = document.getElementsByClassName('content__sub2-link') || lightningConductor,
      sub3Links = document.getElementsByClassName('content__sub3-link') || lightningConductor,
      h1 = document.getElementsByTagName('h1') || lightningConductor,
      h2 = document.getElementsByTagName('h2') || lightningConductor,
      h3 = document.getElementsByTagName('h3') || lightningConductor,
      h4 = document.getElementsByTagName('h4') || lightningConductor,
      h5 = document.getElementsByTagName('h5') || lightningConductor,
      h6 = document.getElementsByTagName('h6') || lightningConductor,
      b = document.getElementsByTagName('b') || lightningConductor,
      i = document.getElementsByTagName('i') || lightningConductor,
      i2 = document.getElementsByClassName('f-coni') || lightningConductor,
      btext = document.getElementsByClassName('btext') || lightningConductor,
      display = document.querySelector('.bbp__oa-block_display') || lightningConductor,
      curName = document.querySelector('.bbp__oa-options-font-current-name') || lightningConductor,
      bookName = document.getElementsByClassName('name-section__book')[0] || lightningConductor,
      authorName = document.getElementsByClassName('name-section__author')[0] || lightningConductor;
  book.style.fontFamily = regFont;
  content.style.fontFamily = boldFont;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = boldLinks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var link = _step.value;
      link.style.fontFamily = boldFont;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = subLinks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _link = _step2.value;
      _link.style.fontFamily = regFont;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = sub2Links[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _link2 = _step3.value;
      _link2.style.fontFamily = regFont;
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = sub3Links[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var _link3 = _step4.value;
      _link3.style.fontFamily = regFont;
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
        _iterator4["return"]();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = h1[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var h = _step5.value;
      h.style.fontFamily = boldFont;
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
        _iterator5["return"]();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = h2[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var _h = _step6.value;
      _h.style.fontFamily = boldFont;
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
        _iterator6["return"]();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }

  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = h3[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var _h2 = _step7.value;
      _h2.style.fontFamily = boldFont;
    }
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
        _iterator7["return"]();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }

  var _iteratorNormalCompletion8 = true;
  var _didIteratorError8 = false;
  var _iteratorError8 = undefined;

  try {
    for (var _iterator8 = h4[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
      var _h3 = _step8.value;
      _h3.style.fontFamily = boldFont;
    }
  } catch (err) {
    _didIteratorError8 = true;
    _iteratorError8 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
        _iterator8["return"]();
      }
    } finally {
      if (_didIteratorError8) {
        throw _iteratorError8;
      }
    }
  }

  var _iteratorNormalCompletion9 = true;
  var _didIteratorError9 = false;
  var _iteratorError9 = undefined;

  try {
    for (var _iterator9 = h5[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
      var _h4 = _step9.value;
      _h4.style.fontFamily = boldFont;
    }
  } catch (err) {
    _didIteratorError9 = true;
    _iteratorError9 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
        _iterator9["return"]();
      }
    } finally {
      if (_didIteratorError9) {
        throw _iteratorError9;
      }
    }
  }

  var _iteratorNormalCompletion10 = true;
  var _didIteratorError10 = false;
  var _iteratorError10 = undefined;

  try {
    for (var _iterator10 = h6[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
      var _h5 = _step10.value;
      _h5.style.fontFamily = boldFont;
    }
  } catch (err) {
    _didIteratorError10 = true;
    _iteratorError10 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
        _iterator10["return"]();
      }
    } finally {
      if (_didIteratorError10) {
        throw _iteratorError10;
      }
    }
  }

  var _iteratorNormalCompletion11 = true;
  var _didIteratorError11 = false;
  var _iteratorError11 = undefined;

  try {
    for (var _iterator11 = b[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
      var _i2 = _step11.value;
      _i2.style.fontFamily = boldFont;
    }
  } catch (err) {
    _didIteratorError11 = true;
    _iteratorError11 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
        _iterator11["return"]();
      }
    } finally {
      if (_didIteratorError11) {
        throw _iteratorError11;
      }
    }
  }

  var _iteratorNormalCompletion12 = true;
  var _didIteratorError12 = false;
  var _iteratorError12 = undefined;

  try {
    for (var _iterator12 = i[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
      var a = _step12.value;
      a.style.fontFamily = italFont;
    }
  } catch (err) {
    _didIteratorError12 = true;
    _iteratorError12 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
        _iterator12["return"]();
      }
    } finally {
      if (_didIteratorError12) {
        throw _iteratorError12;
      }
    }
  }

  var _iteratorNormalCompletion13 = true;
  var _didIteratorError13 = false;
  var _iteratorError13 = undefined;

  try {
    for (var _iterator13 = i2[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
      var _a = _step13.value;
      _a.style.fontFamily = italFont;
    }
  } catch (err) {
    _didIteratorError13 = true;
    _iteratorError13 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
        _iterator13["return"]();
      }
    } finally {
      if (_didIteratorError13) {
        throw _iteratorError13;
      }
    }
  }

  var _iteratorNormalCompletion14 = true;
  var _didIteratorError14 = false;
  var _iteratorError14 = undefined;

  try {
    for (var _iterator14 = btext[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
      var _a2 = _step14.value;
      _a2.style.fontFamily = regFont;
    }
  } catch (err) {
    _didIteratorError14 = true;
    _iteratorError14 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion14 && _iterator14["return"] != null) {
        _iterator14["return"]();
      }
    } finally {
      if (_didIteratorError14) {
        throw _iteratorError14;
      }
    }
  }

  display.style.fontFamily = regFont;
  curName.style.fontFamily = regFont;
  bookName.style.fontFamily = regFont;
  authorName.style.fontFamily = regFont;
}
/**
 * [prepareSelection визначення меж виділення, запис цих меж у ls, виклик функції підсвітки]
 */


function prepareSelection() {
  var selectedText = window.getSelection();
  if (!selectedText.anchorNode) return;
  var markedClass = 'selected_' + this.dataset.select;
  var anchorNode = selectedText.anchorNode,
      anchorOffset = selectedText.anchorOffset,
      focusNode = selectedText.focusNode,
      focusOffset = selectedText.focusOffset; // знаходимо спільного предка для усіх тегів виділення
  // через Range не підходить, бо focus може бути перед anchor

  var parentNode = anchorNode.parentNode;

  while (!parentNode.contains(focusNode)) {
    parentNode = parentNode.parentNode;
  } // формуємо мітку предка: [tag, counting number]


  var parentMark = [parentNode.tagName.toLowerCase()];

  if (parentNode.getAttribute('id') == 'book') {
    // div#book - найвищий елемент, братів не має
    parentMark.push('book');
  } else {
    var bookElementsList = document.querySelectorAll('#book ' + parentMark[0]);

    for (var _i3 = 0; _i3 < bookElementsList.length; _i3++) {
      if (bookElementsList[_i3] == parentNode) {
        parentMark.push(_i3);
        break;
      }
    }
  } // формуємо інфо по виділенню


  var mark = {
    parent: parentMark,
    markedClass: markedClass,
    start: calculateMarkPosition(anchorNode, anchorOffset, parentNode),
    end: calculateMarkPosition(focusNode, focusOffset, parentNode)
  }; // зберігаємо дані в ls

  myBooks = JSON.parse(ls.getItem('myBooks')) || {};

  if (!('books' in myBooks)) {
    myBooks.books = _defineProperty({}, bookId, {
      selections: []
    });
  } else {
    if (!(bookId in myBooks.books)) {
      myBooks.books[bookId] = {
        selections: []
      };
    } else {
      if (!('selections' in myBooks.books[bookId])) {
        myBooks.books[bookId].selections = [];
      }
    }
  }

  var selectionsArr = myBooks.books[bookId].selections;
  selectionsArr.push(mark);
  ls.setItem('myBooks', JSON.stringify(myBooks)); // викликаємо функцію підсвітки

  markText(mark);
}
/**
 * [calculateMarkPosition розрахунок положення початку/кінця виділення]
 * @param {[DOM-object]} node [anchorNode/focusNode]
 * @param {[Number]}     offset [anchorOffset/focusOffset]
 * @param {[DOM-object]} parentNode [вузол, який містить повністю усе виділення]
 * @return {[Array]}     [cформована мітка: положення початку/кінця виділення відносно елементу, який містить виділення]
 */


function calculateMarkPosition(node, offset, parentNode) {
  var mark;
  var nodeType = node.nodeType; // 1 - element; 3 - text

  if (nodeType == 1) {
    console.log("nodeType", nodeType); // tag - визначаємо його положення відносно parentNode,
    // мітка виду ['tag', tagName, tagCountingNumber]

    var parentElement = node.parentElement;
    console.log("parentElement", parentElement);

    if (parentElement.getAttribute('id') == 'book') {
      var nodeTagName = node.tagName.toLowerCase();
      console.log("nodeTagName", nodeTagName);
      var arrOfAncestorsChildren = parentElement.querySelectorAll(nodeTagName);

      for (var _i4 = 0; _i4 < arrOfAncestorsChildren.length; _i4++) {
        if (arrOfAncestorsChildren[_i4] == node) {
          return ['tag', nodeTagName, _i4];
        }
      }
    } else {
      var parentElementTagName = parentElement.tagName.toLowerCase();

      var _arrOfAncestorsChildren = parentNode.querySelectorAll(parentElementTagName);

      for (var _i5 = 0; _i5 < _arrOfAncestorsChildren.length; _i5++) {
        if (_arrOfAncestorsChildren[_i5] == parentElement) {
          return ['text', parentElementTagName, _i5];
        }
      }
    }
  } else if (nodeType == 3) {
    // text
    // якщо це текст, то батьком його обов'язково буде елемент.
    var _parentElement = node.parentElement;

    if (_parentElement == parentNode) {
      // якщо батько текстового вузла є предком виділення
      // мітка виду ['text', textNodeCountingNumber, offset]
      var childrenNodes = _parentElement.childNodes;

      for (var _i6 = 0; _i6 < childrenNodes.length; _i6++) {
        if (childrenNodes[_i6].data == node.data) {
          return ['text', _i6, offset];
        }
      }
    } else {
      // якщо батько текстового вузла є дочірнім елементом предка виділення
      // мітка виду ['text', parentTagName, parentTagCountingNumber, textNodeCountingNumber, offset]
      // визначаємо положення батьківського елемента відносно предка виділення
      var _parentElementTagName = _parentElement.tagName.toLowerCase();

      var _arrOfAncestorsChildren2 = parentNode.querySelectorAll(_parentElementTagName);

      for (var _i7 = 0; _i7 < _arrOfAncestorsChildren2.length; _i7++) {
        if (_arrOfAncestorsChildren2[_i7] == _parentElement) {
          mark = ['text', _parentElementTagName, _i7];
          break;
        }
      } // визначаємо положення текстового вузла відносно батька


      var _childrenNodes = _parentElement.childNodes;

      for (var _i8 = 0; _i8 < _childrenNodes.length; _i8++) {
        if (_childrenNodes[_i8].data == node.data) {
          mark.push(_i8, offset);
          return mark;
        }
      }
    }
  }
}

function markText(mark) {
  console.log("mark", mark); // перехресні виділення?
}
/* ↑↑↑ /FUNCTIONS DECLARATION ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
// https://stackoverflow.com/questions/6520192/how-to-get-the-text-node-of-an-element
// "use strict";
// // consol module
// ////////////////////////////////////////////////////////////////////////////////
// /* ↓↓↓ ??? ↓↓↓ */
//   let isConsolOpen = false;
//   document.getElementById('consol-button').onclick = function() {
//     if (isConsolOpen) {
//       document.getElementById('consol').style.height = '0px';
//     } else {
//       document.getElementById('consol').style.height = '50vh';
//     }
//      isConsolOpen = !isConsolOpen;
//   };
//   document.getElementById('ls-button').onclick = function() {
//     localStorage.clear();
//     conlog('localStorage: ' + JSON.stringify(localStorage));
//   };
//   function conlog (value) {
//     let p = '<p>' + value + '</p>';
//     document.getElementById('consol').insertAdjacentHTML('beforeEnd',p);
//   };
// /* ↑↑↑ /??? ↑↑↑ */
// ////////////////////////////////////////////////////////////////////////////////
"use strict";
"use strict"; // top-book-panel module
////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ FULL SCREEN MODE ON/OFF ↓↓↓ */

var isFSOn = false;
document.querySelector('.top-book-panel__btn').addEventListener('click', function (event) {
  if (isFSOn) {
    // close
    event.currentTarget.classList.remove('top-book-panel__btn_active');
    document.exitFullscreen();
  } else {
    // open
    event.currentTarget.classList.add('top-book-panel__btn_active');
    document.documentElement.requestFullscreen();
  }

  isFSOn = !isFSOn;
  pagination();
});
/* ↑↑↑ /FULL SCREEN MODE ON/OFF ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ SET NAMES AND META-TAGS ↓↓↓ */
// визначаємо id книги з рядка адреси

var href = location.href;
var bookPos = href.indexOf('books');
var indexPos = href.indexOf('index');
var id = href.slice(bookPos + 6, indexPos - 1); // за отриманим id знаходимо в базі книгу

var dataBaseItem = books.filter(function (item) {
  return item.id == id;
})[0]; // вносимо дані про книгу в змінні та вписуємо в теги

var author = dataBaseItem.author;
var bookName = dataBaseItem.name;
document.querySelector('.top-book-panel__author').innerHTML = author;
document.querySelector('.top-book-panel__book-name').innerHTML = bookName;
document.querySelector('head meta[name="author"]').setAttribute('content', author);
document.querySelector('head meta[name="book-name"]').setAttribute('content', bookName);
document.querySelector('head meta[name="book-id"]').setAttribute('content', id);
document.querySelector('.name-section__author').innerHTML = author;
document.querySelector('.name-section__book').innerHTML = bookName;
/* ↑↑↑ /SET NAMES AND META-TAGS ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ PAGINATION ↓↓↓ */
// затримка - для коректних розрахунків після повного рендерингу

setTimeout(function () {
  pagination();
}, 1000);
document.getElementById('book').onscroll = pagination;
/* ↑↑↑ /PAGINATION ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ FUNCTIONS DECLARATION ↓↓↓ */

function pagination() {
  var book = document.getElementById('book');
  var visibleBookHeight = book.offsetHeight;
  var fullBookHeight = book.scrollHeight;
  var bookScrollTop = book.scrollTop;
  var pageNumber = Math.ceil(bookScrollTop / visibleBookHeight);
  if (pageNumber == 0) pageNumber = 1;
  var pagesAmount = Math.floor(fullBookHeight / visibleBookHeight); // вписування значень сторінок

  document.querySelector('.top-book-panel__read').innerHTML = pageNumber;
  document.querySelector('.top-book-panel__not-read').innerHTML = pagesAmount; // правильні відмінкові закінчення для слова "сторінка"

  if (String(pagesAmount).endsWith('1') && !String(pagesAmount).endsWith('11')) {
    document.querySelectorAll('.top-book-panel__symbol')[1].innerHTML = 'сторінки';
  } else {
    document.querySelectorAll('.top-book-panel__symbol')[1].innerHTML = 'сторінок';
  } // анімація


  var maxLineWidth = document.querySelector('.top-book-panel__read-line-wrapper').offsetWidth;
  var currentLineWidth = maxLineWidth * pageNumber / pagesAmount;
  document.querySelector('.top-book-panel__read-line').style.width = currentLineWidth + 'px';
}
/* ↑↑↑ /FUNCTIONS DECLARATION ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
"use strict"; // loader module
////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ LOADER ↓↓↓ */

var loader = document.querySelector('.loader');
var bookInner = document.querySelector('#book');
bookInner.style.overflow = 'hidden';

window.onload = function () {
  setTimeout(function () {
    loader.classList.remove('loader_active');
    bookInner.style.overflow = '';
  }, 1000);
};
/* ↑↑↑ /LOADER ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ FUNCTIONS DECLARATION ↓↓↓ */

/* ↑↑↑ /FUNCTIONS DECLARATION ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////