"use strict"; // bbp module
////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ визначення ідентифікатору книги, робота з localStorage ↓↓↓ */

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
  }

  var lightningConductor = document.getElementById('lightning-conductor');
  var book = document.getElementById('book') || lightningConductor;
  var content = document.querySelector('.content-section__name') || lightningConductor;
  var boldLinks = document.getElementsByClassName('content__main-link') || lightningConductor;
  var subLinks = document.getElementsByClassName('content__sub-link') || lightningConductor;
  var sub2Links = document.getElementsByClassName('content__sub2-link') || lightningConductor;
  var sub3Links = document.getElementsByClassName('content__sub3-link') || lightningConductor;
  var h1 = document.getElementsByTagName('h1') || lightningConductor;
  var h2 = document.getElementsByTagName('h2') || lightningConductor;
  var h3 = document.getElementsByTagName('h3') || lightningConductor;
  var h4 = document.getElementsByTagName('h4') || lightningConductor;
  var h5 = document.getElementsByTagName('h5') || lightningConductor;
  var h6 = document.getElementsByTagName('h6') || lightningConductor;
  var b = document.getElementsByTagName('b') || lightningConductor;
  var i = document.getElementsByTagName('i') || lightningConductor;
  var i2 = document.getElementsByClassName('f-coni') || lightningConductor;
  var btext = document.getElementsByClassName('btext') || lightningConductor;
  var display = document.querySelector('.bbp__oa-block_display') || lightningConductor;
  var curName = document.querySelector('.bbp__oa-options-font-current-name') || lightningConductor;
  book.style.fontFamily = regFont;
  content.style.fontFamily = boldFont;

  var _iterator = _createForOfIteratorHelper(boldLinks),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var link = _step.value;
      link.style.fontFamily = boldFont;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var _iterator2 = _createForOfIteratorHelper(subLinks),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _link = _step2.value;
      _link.style.fontFamily = regFont;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  var _iterator3 = _createForOfIteratorHelper(sub2Links),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var _link2 = _step3.value;
      _link2.style.fontFamily = regFont;
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  var _iterator4 = _createForOfIteratorHelper(sub3Links),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var _link3 = _step4.value;
      _link3.style.fontFamily = regFont;
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  var _iterator5 = _createForOfIteratorHelper(h1),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var h = _step5.value;
      h.style.fontFamily = boldFont;
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }

  var _iterator6 = _createForOfIteratorHelper(h2),
      _step6;

  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var _h = _step6.value;
      _h.style.fontFamily = boldFont;
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }

  var _iterator7 = _createForOfIteratorHelper(h3),
      _step7;

  try {
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
      var _h2 = _step7.value;
      _h2.style.fontFamily = boldFont;
    }
  } catch (err) {
    _iterator7.e(err);
  } finally {
    _iterator7.f();
  }

  var _iterator8 = _createForOfIteratorHelper(h4),
      _step8;

  try {
    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
      var _h3 = _step8.value;
      _h3.style.fontFamily = boldFont;
    }
  } catch (err) {
    _iterator8.e(err);
  } finally {
    _iterator8.f();
  }

  var _iterator9 = _createForOfIteratorHelper(h5),
      _step9;

  try {
    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
      var _h4 = _step9.value;
      _h4.style.fontFamily = boldFont;
    }
  } catch (err) {
    _iterator9.e(err);
  } finally {
    _iterator9.f();
  }

  var _iterator10 = _createForOfIteratorHelper(h6),
      _step10;

  try {
    for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
      var _h5 = _step10.value;
      _h5.style.fontFamily = boldFont;
    }
  } catch (err) {
    _iterator10.e(err);
  } finally {
    _iterator10.f();
  }

  var _iterator11 = _createForOfIteratorHelper(b),
      _step11;

  try {
    for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
      var _i2 = _step11.value;
      _i2.style.fontFamily = boldFont;
    }
  } catch (err) {
    _iterator11.e(err);
  } finally {
    _iterator11.f();
  }

  var _iterator12 = _createForOfIteratorHelper(i),
      _step12;

  try {
    for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
      var a = _step12.value;
      a.style.fontFamily = italFont;
    }
  } catch (err) {
    _iterator12.e(err);
  } finally {
    _iterator12.f();
  }

  var _iterator13 = _createForOfIteratorHelper(i2),
      _step13;

  try {
    for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
      var _a = _step13.value;
      _a.style.fontFamily = italFont;
    }
  } catch (err) {
    _iterator13.e(err);
  } finally {
    _iterator13.f();
  }

  var _iterator14 = _createForOfIteratorHelper(btext),
      _step14;

  try {
    for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
      var _a2 = _step14.value;
      _a2.style.fontFamily = regFont;
    }
  } catch (err) {
    _iterator14.e(err);
  } finally {
    _iterator14.f();
  }

  display.style.fontFamily = regFont;
  curName.style.fontFamily = regFont;
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