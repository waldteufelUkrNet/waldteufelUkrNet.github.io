"use strict"; // bbp module
////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ визначення ідентифікатору книги, робота з localStorage ↓↓↓ */

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var href = location.href;
var position = href.indexOf('books');
var bookId = href.slice(position + 6, position + 11);
var ls = localStorage;
var myBooks = JSON.parse(ls.getItem('myBooks')) || {};
var fontName, fontSize, fontColor; // налаштування стилів книги

if (!('generalSettings' in myBooks)) {
  myBooks.generalSettings = {};
}

if (!('booksFontSettings' in myBooks.generalSettings)) {
  myBooks.generalSettings.booksFontSettings = {};
  var bookTag = document.getElementById('book');
  myBooks.generalSettings.booksFontSettings.fontName = getComputedStyle(bookTag).fontFamily;
  myBooks.generalSettings.booksFontSettings.size = getComputedStyle(bookTag).fontSize;
  myBooks.generalSettings.booksFontSettings.color = getComputedStyle(bookTag).color;
  myBooks.generalSettings.booksFontSettings.bgColor = '#ffffff';
  ls.setItem('myBooks', JSON.stringify(myBooks));
} else {
  var _bookTag = document.getElementById('book');

  _bookTag.style.fontSize = myBooks.generalSettings.booksFontSettings.size;
  _bookTag.style.color = myBooks.generalSettings.booksFontSettings.color;
  _bookTag.style.backgroundColor = myBooks.generalSettings.booksFontSettings.bgColor;
  var font = myBooks.generalSettings.booksFontSettings.fontName;
  document.querySelector('.bbp__oa-options-font-current-name').innerHTML = font;
  setFont(font);
}

document.querySelector('.textColorInput').value = myBooks.generalSettings.booksFontSettings.color;
document.querySelector('.pageColorInput').value = myBooks.generalSettings.booksFontSettings.bgColor;
document.querySelector('.fontNameIndicator').innerHTML = myBooks.generalSettings.booksFontSettings.fontName;
document.querySelector('.fontSizeIndicator').innerHTML = myBooks.generalSettings.booksFontSettings.size;
document.querySelector('.fontColorIndicator').innerHTML = myBooks.generalSettings.booksFontSettings.color;
document.querySelector('.pageColorIndicator').innerHTML = myBooks.generalSettings.booksFontSettings.bgColor;
var exampleIndicator = document.querySelector('.bbp__oa-block_display');
exampleIndicator.style.fontSize = myBooks.generalSettings.booksFontSettings.size;
exampleIndicator.style.color = myBooks.generalSettings.booksFontSettings.color;
exampleIndicator.style.backgroundColor = myBooks.generalSettings.booksFontSettings.bgColor; // робота із закладкою (якщо вона є)

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

/* ↓↓↓ навішування обробників на кнопки головного меню ↓↓↓ */


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
          ls.setItem('myBooks', JSON.stringify(myBooks)); // показати кнопки

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
}

var fontSizeBtns = document.getElementsByClassName('fontSize');
addEventListenerToObject('click', fontSizeBtns, resizeFont);

document.querySelector('.bbp__oa-options-font-current-name').onclick = function () {
  document.querySelector('.bbp__oa-options-font-list').classList.toggle('bbp__oa-options-font-list_active');
};

document.addEventListener('click', function () {
  if (event.target.closest('.bbp__oa-options-font-current-name')) return;

  if (document.querySelector('.bbp__oa-options-font-list_active')) {
    document.querySelector('.bbp__oa-options-font-list_active').classList.remove('bbp__oa-options-font-list_active');
  }
});
document.querySelector('.textColorInput').oninput = setFontColor;
document.querySelector('.pageColorInput').oninput = setPageColor;
var selectedBtns = document.getElementsByClassName('selected');
addEventListenerToObject('click', selectedBtns, markText); // вибір шрифта

var fontItem = document.getElementsByClassName('bbp__oa-options-font-item');
addEventListenerToObject('click', fontItem, handleFont);
/* ↑↑↑ /навішування обробників на кнопки головного меню ↑↑↑ */
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
  var exampleIndicator = document.querySelector('.bbp__oa-block_display');
  var buttonBehavior = event.currentTarget.dataset.behavior;
  var indicator = document.querySelector('.fontSizeIndicator');
  var book = document.getElementById('book');
  var fontSize = +getComputedStyle(book).fontSize.slice(0, 2);
  var newFontSize;

  if (buttonBehavior == '+') {
    newFontSize = fontSize + 1;
    if (newFontSize > 99) newFontSize = 99;
  } else if (buttonBehavior == '-') {
    newFontSize = fontSize - 1;
    if (newFontSize < 10) newFontSize = 10;
  }

  book.style.fontSize = newFontSize + 'px';
  exampleIndicator.style.fontSize = newFontSize + 'px';
  indicator.innerHTML = newFontSize + 'px';
  myBooks.generalSettings.booksFontSettings.size = newFontSize + 'px';
  ls.setItem('myBooks', JSON.stringify(myBooks));
}

function setFontColor() {
  var textColor = event.currentTarget.value;
  var exampleIndicator = document.querySelector('.bbp__oa-block_display');
  var indicator = document.querySelector('.fontColorIndicator');
  var book = document.getElementById('book');
  exampleIndicator.style.color = textColor;
  book.style.color = textColor;
  indicator.innerHTML = textColor;
  myBooks.generalSettings.booksFontSettings.color = textColor;
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

function markText() {
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
  } // усі вузли виділення огортаємо в окремий не стандартний тег


  var nodes = selectedText.getRangeAt(0).cloneContents(); // console.log(nodes);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = nodes.childNodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var node = _step.value;
      var html = void 0;

      if (node.innerHTML) {
        html = node.innerHTML;
        node.innerHTML = '<mspan class="' + markedClass + '">' + html + '</mspan>';
      } else {
        console.log('data');
        html = node.data;
      }
    } // console.log(nodes);
    // замінюємо у предку старе виділення на перероблене

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

  parentNode.innerHTML = parentNode.innerHTML.replace(selectedText, nodes.toString()); // 4 зробити запис в ls: anchorNode, anchorOffset, focusNode, focusOffset + клас
  // перехресні виділення?
  // console.log( selectedText.toString() );
  // console.log( selectedText.getRangeAt(0).cloneContents() );
}

function handleFont() {
  var font = this.innerHTML;
  document.querySelector('.fontNameIndicator').innerHTML = font;
  document.querySelector('.bbp__oa-options-font-current-name').innerHTML = font;
  myBooks.generalSettings.booksFontSettings.fontName = font;
  ls.setItem('myBooks', JSON.stringify(myBooks));
  setFont(font);
}

function setFont(font) {
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

  switch (font) {
    case 'arial':
      book.style.fontFamily = 'ar';
      content.style.fontFamily = 'ab';
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = boldLinks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var link = _step2.value;
          link.style.fontFamily = 'ab';
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
        for (var _iterator3 = subLinks[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _link = _step3.value;
          _link.style.fontFamily = 'ar';
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
        for (var _iterator4 = sub2Links[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _link2 = _step4.value;
          _link2.style.fontFamily = 'ar';
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
        for (var _iterator5 = sub3Links[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _link3 = _step5.value;
          _link3.style.fontFamily = 'ar';
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
        for (var _iterator6 = h1[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var h = _step6.value;
          h.style.fontFamily = 'ab';
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
        for (var _iterator7 = h2[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var _h = _step7.value;
          _h.style.fontFamily = 'ab';
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
        for (var _iterator8 = h3[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var _h2 = _step8.value;
          _h2.style.fontFamily = 'ab';
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
        for (var _iterator9 = h4[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var _h3 = _step9.value;
          _h3.style.fontFamily = 'ab';
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
        for (var _iterator10 = h5[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var _h4 = _step10.value;
          _h4.style.fontFamily = 'ab';
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
        for (var _iterator11 = h6[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var _h5 = _step11.value;
          _h5.style.fontFamily = 'ab';
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
        for (var _iterator12 = b[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var _i2 = _step12.value;
          _i2.style.fontFamily = 'ab';
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
        for (var _iterator13 = i[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
          var a = _step13.value;
          a.style.fontFamily = 'ai';
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
        for (var _iterator14 = i2[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
          var _a = _step14.value;
          _a.style.fontFamily = 'ai';
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

      var _iteratorNormalCompletion15 = true;
      var _didIteratorError15 = false;
      var _iteratorError15 = undefined;

      try {
        for (var _iterator15 = btext[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
          var _a2 = _step15.value;
          _a2.style.fontFamily = 'ar';
        }
      } catch (err) {
        _didIteratorError15 = true;
        _iteratorError15 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion15 && _iterator15["return"] != null) {
            _iterator15["return"]();
          }
        } finally {
          if (_didIteratorError15) {
            throw _iteratorError15;
          }
        }
      }

      display.style.fontFamily = 'ar';
      curName.style.fontFamily = 'ar';
      break;

    case 'consola':
      book.style.fontFamily = 'cr';
      content.style.fontFamily = 'cb';
      var _iteratorNormalCompletion16 = true;
      var _didIteratorError16 = false;
      var _iteratorError16 = undefined;

      try {
        for (var _iterator16 = boldLinks[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
          var _link4 = _step16.value;
          _link4.style.fontFamily = 'cb';
        }
      } catch (err) {
        _didIteratorError16 = true;
        _iteratorError16 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion16 && _iterator16["return"] != null) {
            _iterator16["return"]();
          }
        } finally {
          if (_didIteratorError16) {
            throw _iteratorError16;
          }
        }
      }

      var _iteratorNormalCompletion17 = true;
      var _didIteratorError17 = false;
      var _iteratorError17 = undefined;

      try {
        for (var _iterator17 = subLinks[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
          var _link5 = _step17.value;
          _link5.style.fontFamily = 'cr';
        }
      } catch (err) {
        _didIteratorError17 = true;
        _iteratorError17 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion17 && _iterator17["return"] != null) {
            _iterator17["return"]();
          }
        } finally {
          if (_didIteratorError17) {
            throw _iteratorError17;
          }
        }
      }

      var _iteratorNormalCompletion18 = true;
      var _didIteratorError18 = false;
      var _iteratorError18 = undefined;

      try {
        for (var _iterator18 = sub2Links[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
          var _link6 = _step18.value;
          _link6.style.fontFamily = 'cr';
        }
      } catch (err) {
        _didIteratorError18 = true;
        _iteratorError18 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion18 && _iterator18["return"] != null) {
            _iterator18["return"]();
          }
        } finally {
          if (_didIteratorError18) {
            throw _iteratorError18;
          }
        }
      }

      var _iteratorNormalCompletion19 = true;
      var _didIteratorError19 = false;
      var _iteratorError19 = undefined;

      try {
        for (var _iterator19 = sub3Links[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
          var _link7 = _step19.value;
          _link7.style.fontFamily = 'cr';
        }
      } catch (err) {
        _didIteratorError19 = true;
        _iteratorError19 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion19 && _iterator19["return"] != null) {
            _iterator19["return"]();
          }
        } finally {
          if (_didIteratorError19) {
            throw _iteratorError19;
          }
        }
      }

      var _iteratorNormalCompletion20 = true;
      var _didIteratorError20 = false;
      var _iteratorError20 = undefined;

      try {
        for (var _iterator20 = h1[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
          var _h6 = _step20.value;
          _h6.style.fontFamily = 'cb';
        }
      } catch (err) {
        _didIteratorError20 = true;
        _iteratorError20 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion20 && _iterator20["return"] != null) {
            _iterator20["return"]();
          }
        } finally {
          if (_didIteratorError20) {
            throw _iteratorError20;
          }
        }
      }

      var _iteratorNormalCompletion21 = true;
      var _didIteratorError21 = false;
      var _iteratorError21 = undefined;

      try {
        for (var _iterator21 = h2[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
          var _h7 = _step21.value;
          _h7.style.fontFamily = 'cb';
        }
      } catch (err) {
        _didIteratorError21 = true;
        _iteratorError21 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion21 && _iterator21["return"] != null) {
            _iterator21["return"]();
          }
        } finally {
          if (_didIteratorError21) {
            throw _iteratorError21;
          }
        }
      }

      var _iteratorNormalCompletion22 = true;
      var _didIteratorError22 = false;
      var _iteratorError22 = undefined;

      try {
        for (var _iterator22 = h3[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
          var _h8 = _step22.value;
          _h8.style.fontFamily = 'cb';
        }
      } catch (err) {
        _didIteratorError22 = true;
        _iteratorError22 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion22 && _iterator22["return"] != null) {
            _iterator22["return"]();
          }
        } finally {
          if (_didIteratorError22) {
            throw _iteratorError22;
          }
        }
      }

      var _iteratorNormalCompletion23 = true;
      var _didIteratorError23 = false;
      var _iteratorError23 = undefined;

      try {
        for (var _iterator23 = h4[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
          var _h9 = _step23.value;
          _h9.style.fontFamily = 'cb';
        }
      } catch (err) {
        _didIteratorError23 = true;
        _iteratorError23 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion23 && _iterator23["return"] != null) {
            _iterator23["return"]();
          }
        } finally {
          if (_didIteratorError23) {
            throw _iteratorError23;
          }
        }
      }

      var _iteratorNormalCompletion24 = true;
      var _didIteratorError24 = false;
      var _iteratorError24 = undefined;

      try {
        for (var _iterator24 = h5[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
          var _h10 = _step24.value;
          _h10.style.fontFamily = 'cb';
        }
      } catch (err) {
        _didIteratorError24 = true;
        _iteratorError24 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion24 && _iterator24["return"] != null) {
            _iterator24["return"]();
          }
        } finally {
          if (_didIteratorError24) {
            throw _iteratorError24;
          }
        }
      }

      var _iteratorNormalCompletion25 = true;
      var _didIteratorError25 = false;
      var _iteratorError25 = undefined;

      try {
        for (var _iterator25 = h6[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
          var _h11 = _step25.value;
          _h11.style.fontFamily = 'cb';
        }
      } catch (err) {
        _didIteratorError25 = true;
        _iteratorError25 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion25 && _iterator25["return"] != null) {
            _iterator25["return"]();
          }
        } finally {
          if (_didIteratorError25) {
            throw _iteratorError25;
          }
        }
      }

      var _iteratorNormalCompletion26 = true;
      var _didIteratorError26 = false;
      var _iteratorError26 = undefined;

      try {
        for (var _iterator26 = b[Symbol.iterator](), _step26; !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
          var _i3 = _step26.value;
          _i3.style.fontFamily = 'cb';
        }
      } catch (err) {
        _didIteratorError26 = true;
        _iteratorError26 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion26 && _iterator26["return"] != null) {
            _iterator26["return"]();
          }
        } finally {
          if (_didIteratorError26) {
            throw _iteratorError26;
          }
        }
      }

      var _iteratorNormalCompletion27 = true;
      var _didIteratorError27 = false;
      var _iteratorError27 = undefined;

      try {
        for (var _iterator27 = i[Symbol.iterator](), _step27; !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
          var _a3 = _step27.value;
          _a3.style.fontFamily = 'ci';
        }
      } catch (err) {
        _didIteratorError27 = true;
        _iteratorError27 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion27 && _iterator27["return"] != null) {
            _iterator27["return"]();
          }
        } finally {
          if (_didIteratorError27) {
            throw _iteratorError27;
          }
        }
      }

      var _iteratorNormalCompletion28 = true;
      var _didIteratorError28 = false;
      var _iteratorError28 = undefined;

      try {
        for (var _iterator28 = i2[Symbol.iterator](), _step28; !(_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done); _iteratorNormalCompletion28 = true) {
          var _a4 = _step28.value;
          _a4.style.fontFamily = 'ci';
        }
      } catch (err) {
        _didIteratorError28 = true;
        _iteratorError28 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion28 && _iterator28["return"] != null) {
            _iterator28["return"]();
          }
        } finally {
          if (_didIteratorError28) {
            throw _iteratorError28;
          }
        }
      }

      var _iteratorNormalCompletion29 = true;
      var _didIteratorError29 = false;
      var _iteratorError29 = undefined;

      try {
        for (var _iterator29 = btext[Symbol.iterator](), _step29; !(_iteratorNormalCompletion29 = (_step29 = _iterator29.next()).done); _iteratorNormalCompletion29 = true) {
          var _a5 = _step29.value;
          _a5.style.fontFamily = 'cr';
        }
      } catch (err) {
        _didIteratorError29 = true;
        _iteratorError29 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion29 && _iterator29["return"] != null) {
            _iterator29["return"]();
          }
        } finally {
          if (_didIteratorError29) {
            throw _iteratorError29;
          }
        }
      }

      display.style.fontFamily = 'cr';
      curName.style.fontFamily = 'cr';
      break;

    case 'gost':
      book.style.fontFamily = 'gost';
      content.style.fontFamily = 'bold';
      var _iteratorNormalCompletion30 = true;
      var _didIteratorError30 = false;
      var _iteratorError30 = undefined;

      try {
        for (var _iterator30 = boldLinks[Symbol.iterator](), _step30; !(_iteratorNormalCompletion30 = (_step30 = _iterator30.next()).done); _iteratorNormalCompletion30 = true) {
          var _link8 = _step30.value;
          _link8.style.fontFamily = 'bold';
        }
      } catch (err) {
        _didIteratorError30 = true;
        _iteratorError30 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion30 && _iterator30["return"] != null) {
            _iterator30["return"]();
          }
        } finally {
          if (_didIteratorError30) {
            throw _iteratorError30;
          }
        }
      }

      var _iteratorNormalCompletion31 = true;
      var _didIteratorError31 = false;
      var _iteratorError31 = undefined;

      try {
        for (var _iterator31 = subLinks[Symbol.iterator](), _step31; !(_iteratorNormalCompletion31 = (_step31 = _iterator31.next()).done); _iteratorNormalCompletion31 = true) {
          var _link9 = _step31.value;
          _link9.style.fontFamily = 'gost';
        }
      } catch (err) {
        _didIteratorError31 = true;
        _iteratorError31 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion31 && _iterator31["return"] != null) {
            _iterator31["return"]();
          }
        } finally {
          if (_didIteratorError31) {
            throw _iteratorError31;
          }
        }
      }

      var _iteratorNormalCompletion32 = true;
      var _didIteratorError32 = false;
      var _iteratorError32 = undefined;

      try {
        for (var _iterator32 = sub2Links[Symbol.iterator](), _step32; !(_iteratorNormalCompletion32 = (_step32 = _iterator32.next()).done); _iteratorNormalCompletion32 = true) {
          var _link10 = _step32.value;
          _link10.style.fontFamily = 'gost';
        }
      } catch (err) {
        _didIteratorError32 = true;
        _iteratorError32 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion32 && _iterator32["return"] != null) {
            _iterator32["return"]();
          }
        } finally {
          if (_didIteratorError32) {
            throw _iteratorError32;
          }
        }
      }

      var _iteratorNormalCompletion33 = true;
      var _didIteratorError33 = false;
      var _iteratorError33 = undefined;

      try {
        for (var _iterator33 = sub3Links[Symbol.iterator](), _step33; !(_iteratorNormalCompletion33 = (_step33 = _iterator33.next()).done); _iteratorNormalCompletion33 = true) {
          var _link11 = _step33.value;
          _link11.style.fontFamily = 'gost';
        }
      } catch (err) {
        _didIteratorError33 = true;
        _iteratorError33 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion33 && _iterator33["return"] != null) {
            _iterator33["return"]();
          }
        } finally {
          if (_didIteratorError33) {
            throw _iteratorError33;
          }
        }
      }

      var _iteratorNormalCompletion34 = true;
      var _didIteratorError34 = false;
      var _iteratorError34 = undefined;

      try {
        for (var _iterator34 = h1[Symbol.iterator](), _step34; !(_iteratorNormalCompletion34 = (_step34 = _iterator34.next()).done); _iteratorNormalCompletion34 = true) {
          var _h12 = _step34.value;
          _h12.style.fontFamily = 'bold';
        }
      } catch (err) {
        _didIteratorError34 = true;
        _iteratorError34 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion34 && _iterator34["return"] != null) {
            _iterator34["return"]();
          }
        } finally {
          if (_didIteratorError34) {
            throw _iteratorError34;
          }
        }
      }

      var _iteratorNormalCompletion35 = true;
      var _didIteratorError35 = false;
      var _iteratorError35 = undefined;

      try {
        for (var _iterator35 = h2[Symbol.iterator](), _step35; !(_iteratorNormalCompletion35 = (_step35 = _iterator35.next()).done); _iteratorNormalCompletion35 = true) {
          var _h13 = _step35.value;
          _h13.style.fontFamily = 'bold';
        }
      } catch (err) {
        _didIteratorError35 = true;
        _iteratorError35 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion35 && _iterator35["return"] != null) {
            _iterator35["return"]();
          }
        } finally {
          if (_didIteratorError35) {
            throw _iteratorError35;
          }
        }
      }

      var _iteratorNormalCompletion36 = true;
      var _didIteratorError36 = false;
      var _iteratorError36 = undefined;

      try {
        for (var _iterator36 = h3[Symbol.iterator](), _step36; !(_iteratorNormalCompletion36 = (_step36 = _iterator36.next()).done); _iteratorNormalCompletion36 = true) {
          var _h14 = _step36.value;
          _h14.style.fontFamily = 'bold';
        }
      } catch (err) {
        _didIteratorError36 = true;
        _iteratorError36 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion36 && _iterator36["return"] != null) {
            _iterator36["return"]();
          }
        } finally {
          if (_didIteratorError36) {
            throw _iteratorError36;
          }
        }
      }

      var _iteratorNormalCompletion37 = true;
      var _didIteratorError37 = false;
      var _iteratorError37 = undefined;

      try {
        for (var _iterator37 = h4[Symbol.iterator](), _step37; !(_iteratorNormalCompletion37 = (_step37 = _iterator37.next()).done); _iteratorNormalCompletion37 = true) {
          var _h15 = _step37.value;
          _h15.style.fontFamily = 'bold';
        }
      } catch (err) {
        _didIteratorError37 = true;
        _iteratorError37 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion37 && _iterator37["return"] != null) {
            _iterator37["return"]();
          }
        } finally {
          if (_didIteratorError37) {
            throw _iteratorError37;
          }
        }
      }

      var _iteratorNormalCompletion38 = true;
      var _didIteratorError38 = false;
      var _iteratorError38 = undefined;

      try {
        for (var _iterator38 = h5[Symbol.iterator](), _step38; !(_iteratorNormalCompletion38 = (_step38 = _iterator38.next()).done); _iteratorNormalCompletion38 = true) {
          var _h16 = _step38.value;
          _h16.style.fontFamily = 'bold';
        }
      } catch (err) {
        _didIteratorError38 = true;
        _iteratorError38 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion38 && _iterator38["return"] != null) {
            _iterator38["return"]();
          }
        } finally {
          if (_didIteratorError38) {
            throw _iteratorError38;
          }
        }
      }

      var _iteratorNormalCompletion39 = true;
      var _didIteratorError39 = false;
      var _iteratorError39 = undefined;

      try {
        for (var _iterator39 = h6[Symbol.iterator](), _step39; !(_iteratorNormalCompletion39 = (_step39 = _iterator39.next()).done); _iteratorNormalCompletion39 = true) {
          var _h17 = _step39.value;
          _h17.style.fontFamily = 'bold';
        }
      } catch (err) {
        _didIteratorError39 = true;
        _iteratorError39 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion39 && _iterator39["return"] != null) {
            _iterator39["return"]();
          }
        } finally {
          if (_didIteratorError39) {
            throw _iteratorError39;
          }
        }
      }

      var _iteratorNormalCompletion40 = true;
      var _didIteratorError40 = false;
      var _iteratorError40 = undefined;

      try {
        for (var _iterator40 = b[Symbol.iterator](), _step40; !(_iteratorNormalCompletion40 = (_step40 = _iterator40.next()).done); _iteratorNormalCompletion40 = true) {
          var _i4 = _step40.value;
          _i4.style.fontFamily = 'bold';
        }
      } catch (err) {
        _didIteratorError40 = true;
        _iteratorError40 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion40 && _iterator40["return"] != null) {
            _iterator40["return"]();
          }
        } finally {
          if (_didIteratorError40) {
            throw _iteratorError40;
          }
        }
      }

      var _iteratorNormalCompletion41 = true;
      var _didIteratorError41 = false;
      var _iteratorError41 = undefined;

      try {
        for (var _iterator41 = i[Symbol.iterator](), _step41; !(_iteratorNormalCompletion41 = (_step41 = _iterator41.next()).done); _iteratorNormalCompletion41 = true) {
          var _a6 = _step41.value;
          _a6.style.fontFamily = 'condensed_italic';
        }
      } catch (err) {
        _didIteratorError41 = true;
        _iteratorError41 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion41 && _iterator41["return"] != null) {
            _iterator41["return"]();
          }
        } finally {
          if (_didIteratorError41) {
            throw _iteratorError41;
          }
        }
      }

      var _iteratorNormalCompletion42 = true;
      var _didIteratorError42 = false;
      var _iteratorError42 = undefined;

      try {
        for (var _iterator42 = i2[Symbol.iterator](), _step42; !(_iteratorNormalCompletion42 = (_step42 = _iterator42.next()).done); _iteratorNormalCompletion42 = true) {
          var _a7 = _step42.value;
          _a7.style.fontFamily = 'condensed_italic';
        }
      } catch (err) {
        _didIteratorError42 = true;
        _iteratorError42 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion42 && _iterator42["return"] != null) {
            _iterator42["return"]();
          }
        } finally {
          if (_didIteratorError42) {
            throw _iteratorError42;
          }
        }
      }

      var _iteratorNormalCompletion43 = true;
      var _didIteratorError43 = false;
      var _iteratorError43 = undefined;

      try {
        for (var _iterator43 = btext[Symbol.iterator](), _step43; !(_iteratorNormalCompletion43 = (_step43 = _iterator43.next()).done); _iteratorNormalCompletion43 = true) {
          var _a8 = _step43.value;
          _a8.style.fontFamily = 'gost';
        }
      } catch (err) {
        _didIteratorError43 = true;
        _iteratorError43 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion43 && _iterator43["return"] != null) {
            _iterator43["return"]();
          }
        } finally {
          if (_didIteratorError43) {
            throw _iteratorError43;
          }
        }
      }

      display.style.fontFamily = 'gost';
      curName.style.fontFamily = 'gost';
      break;

    case 'roboto':
      book.style.fontFamily = 'rr';
      content.style.fontFamily = 'rb';
      var _iteratorNormalCompletion44 = true;
      var _didIteratorError44 = false;
      var _iteratorError44 = undefined;

      try {
        for (var _iterator44 = boldLinks[Symbol.iterator](), _step44; !(_iteratorNormalCompletion44 = (_step44 = _iterator44.next()).done); _iteratorNormalCompletion44 = true) {
          var _link12 = _step44.value;
          _link12.style.fontFamily = 'rb';
        }
      } catch (err) {
        _didIteratorError44 = true;
        _iteratorError44 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion44 && _iterator44["return"] != null) {
            _iterator44["return"]();
          }
        } finally {
          if (_didIteratorError44) {
            throw _iteratorError44;
          }
        }
      }

      var _iteratorNormalCompletion45 = true;
      var _didIteratorError45 = false;
      var _iteratorError45 = undefined;

      try {
        for (var _iterator45 = subLinks[Symbol.iterator](), _step45; !(_iteratorNormalCompletion45 = (_step45 = _iterator45.next()).done); _iteratorNormalCompletion45 = true) {
          var _link13 = _step45.value;
          _link13.style.fontFamily = 'rr';
        }
      } catch (err) {
        _didIteratorError45 = true;
        _iteratorError45 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion45 && _iterator45["return"] != null) {
            _iterator45["return"]();
          }
        } finally {
          if (_didIteratorError45) {
            throw _iteratorError45;
          }
        }
      }

      var _iteratorNormalCompletion46 = true;
      var _didIteratorError46 = false;
      var _iteratorError46 = undefined;

      try {
        for (var _iterator46 = sub2Links[Symbol.iterator](), _step46; !(_iteratorNormalCompletion46 = (_step46 = _iterator46.next()).done); _iteratorNormalCompletion46 = true) {
          var _link14 = _step46.value;
          _link14.style.fontFamily = 'rr';
        }
      } catch (err) {
        _didIteratorError46 = true;
        _iteratorError46 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion46 && _iterator46["return"] != null) {
            _iterator46["return"]();
          }
        } finally {
          if (_didIteratorError46) {
            throw _iteratorError46;
          }
        }
      }

      var _iteratorNormalCompletion47 = true;
      var _didIteratorError47 = false;
      var _iteratorError47 = undefined;

      try {
        for (var _iterator47 = sub3Links[Symbol.iterator](), _step47; !(_iteratorNormalCompletion47 = (_step47 = _iterator47.next()).done); _iteratorNormalCompletion47 = true) {
          var _link15 = _step47.value;
          _link15.style.fontFamily = 'rr';
        }
      } catch (err) {
        _didIteratorError47 = true;
        _iteratorError47 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion47 && _iterator47["return"] != null) {
            _iterator47["return"]();
          }
        } finally {
          if (_didIteratorError47) {
            throw _iteratorError47;
          }
        }
      }

      var _iteratorNormalCompletion48 = true;
      var _didIteratorError48 = false;
      var _iteratorError48 = undefined;

      try {
        for (var _iterator48 = h1[Symbol.iterator](), _step48; !(_iteratorNormalCompletion48 = (_step48 = _iterator48.next()).done); _iteratorNormalCompletion48 = true) {
          var _h18 = _step48.value;
          _h18.style.fontFamily = 'rb';
        }
      } catch (err) {
        _didIteratorError48 = true;
        _iteratorError48 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion48 && _iterator48["return"] != null) {
            _iterator48["return"]();
          }
        } finally {
          if (_didIteratorError48) {
            throw _iteratorError48;
          }
        }
      }

      var _iteratorNormalCompletion49 = true;
      var _didIteratorError49 = false;
      var _iteratorError49 = undefined;

      try {
        for (var _iterator49 = h2[Symbol.iterator](), _step49; !(_iteratorNormalCompletion49 = (_step49 = _iterator49.next()).done); _iteratorNormalCompletion49 = true) {
          var _h19 = _step49.value;
          _h19.style.fontFamily = 'rb';
        }
      } catch (err) {
        _didIteratorError49 = true;
        _iteratorError49 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion49 && _iterator49["return"] != null) {
            _iterator49["return"]();
          }
        } finally {
          if (_didIteratorError49) {
            throw _iteratorError49;
          }
        }
      }

      var _iteratorNormalCompletion50 = true;
      var _didIteratorError50 = false;
      var _iteratorError50 = undefined;

      try {
        for (var _iterator50 = h3[Symbol.iterator](), _step50; !(_iteratorNormalCompletion50 = (_step50 = _iterator50.next()).done); _iteratorNormalCompletion50 = true) {
          var _h20 = _step50.value;
          _h20.style.fontFamily = 'rb';
        }
      } catch (err) {
        _didIteratorError50 = true;
        _iteratorError50 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion50 && _iterator50["return"] != null) {
            _iterator50["return"]();
          }
        } finally {
          if (_didIteratorError50) {
            throw _iteratorError50;
          }
        }
      }

      var _iteratorNormalCompletion51 = true;
      var _didIteratorError51 = false;
      var _iteratorError51 = undefined;

      try {
        for (var _iterator51 = h4[Symbol.iterator](), _step51; !(_iteratorNormalCompletion51 = (_step51 = _iterator51.next()).done); _iteratorNormalCompletion51 = true) {
          var _h21 = _step51.value;
          _h21.style.fontFamily = 'rb';
        }
      } catch (err) {
        _didIteratorError51 = true;
        _iteratorError51 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion51 && _iterator51["return"] != null) {
            _iterator51["return"]();
          }
        } finally {
          if (_didIteratorError51) {
            throw _iteratorError51;
          }
        }
      }

      var _iteratorNormalCompletion52 = true;
      var _didIteratorError52 = false;
      var _iteratorError52 = undefined;

      try {
        for (var _iterator52 = h5[Symbol.iterator](), _step52; !(_iteratorNormalCompletion52 = (_step52 = _iterator52.next()).done); _iteratorNormalCompletion52 = true) {
          var _h22 = _step52.value;
          _h22.style.fontFamily = 'rb';
        }
      } catch (err) {
        _didIteratorError52 = true;
        _iteratorError52 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion52 && _iterator52["return"] != null) {
            _iterator52["return"]();
          }
        } finally {
          if (_didIteratorError52) {
            throw _iteratorError52;
          }
        }
      }

      var _iteratorNormalCompletion53 = true;
      var _didIteratorError53 = false;
      var _iteratorError53 = undefined;

      try {
        for (var _iterator53 = h6[Symbol.iterator](), _step53; !(_iteratorNormalCompletion53 = (_step53 = _iterator53.next()).done); _iteratorNormalCompletion53 = true) {
          var _h23 = _step53.value;
          _h23.style.fontFamily = 'rb';
        }
      } catch (err) {
        _didIteratorError53 = true;
        _iteratorError53 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion53 && _iterator53["return"] != null) {
            _iterator53["return"]();
          }
        } finally {
          if (_didIteratorError53) {
            throw _iteratorError53;
          }
        }
      }

      var _iteratorNormalCompletion54 = true;
      var _didIteratorError54 = false;
      var _iteratorError54 = undefined;

      try {
        for (var _iterator54 = b[Symbol.iterator](), _step54; !(_iteratorNormalCompletion54 = (_step54 = _iterator54.next()).done); _iteratorNormalCompletion54 = true) {
          var _i5 = _step54.value;
          _i5.style.fontFamily = 'rb';
        }
      } catch (err) {
        _didIteratorError54 = true;
        _iteratorError54 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion54 && _iterator54["return"] != null) {
            _iterator54["return"]();
          }
        } finally {
          if (_didIteratorError54) {
            throw _iteratorError54;
          }
        }
      }

      var _iteratorNormalCompletion55 = true;
      var _didIteratorError55 = false;
      var _iteratorError55 = undefined;

      try {
        for (var _iterator55 = i[Symbol.iterator](), _step55; !(_iteratorNormalCompletion55 = (_step55 = _iterator55.next()).done); _iteratorNormalCompletion55 = true) {
          var _a9 = _step55.value;
          _a9.style.fontFamily = 'ri';
        }
      } catch (err) {
        _didIteratorError55 = true;
        _iteratorError55 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion55 && _iterator55["return"] != null) {
            _iterator55["return"]();
          }
        } finally {
          if (_didIteratorError55) {
            throw _iteratorError55;
          }
        }
      }

      var _iteratorNormalCompletion56 = true;
      var _didIteratorError56 = false;
      var _iteratorError56 = undefined;

      try {
        for (var _iterator56 = i2[Symbol.iterator](), _step56; !(_iteratorNormalCompletion56 = (_step56 = _iterator56.next()).done); _iteratorNormalCompletion56 = true) {
          var _a10 = _step56.value;
          _a10.style.fontFamily = 'ri';
        }
      } catch (err) {
        _didIteratorError56 = true;
        _iteratorError56 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion56 && _iterator56["return"] != null) {
            _iterator56["return"]();
          }
        } finally {
          if (_didIteratorError56) {
            throw _iteratorError56;
          }
        }
      }

      var _iteratorNormalCompletion57 = true;
      var _didIteratorError57 = false;
      var _iteratorError57 = undefined;

      try {
        for (var _iterator57 = btext[Symbol.iterator](), _step57; !(_iteratorNormalCompletion57 = (_step57 = _iterator57.next()).done); _iteratorNormalCompletion57 = true) {
          var _a11 = _step57.value;
          _a11.style.fontFamily = 'rr';
        }
      } catch (err) {
        _didIteratorError57 = true;
        _iteratorError57 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion57 && _iterator57["return"] != null) {
            _iterator57["return"]();
          }
        } finally {
          if (_didIteratorError57) {
            throw _iteratorError57;
          }
        }
      }

      display.style.fontFamily = 'rr';
      curName.style.fontFamily = 'rr';
      break;

    case 'segoe':
      book.style.fontFamily = 'segr';
      content.style.fontFamily = 'segb';
      var _iteratorNormalCompletion58 = true;
      var _didIteratorError58 = false;
      var _iteratorError58 = undefined;

      try {
        for (var _iterator58 = boldLinks[Symbol.iterator](), _step58; !(_iteratorNormalCompletion58 = (_step58 = _iterator58.next()).done); _iteratorNormalCompletion58 = true) {
          var _link16 = _step58.value;
          _link16.style.fontFamily = 'segb';
        }
      } catch (err) {
        _didIteratorError58 = true;
        _iteratorError58 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion58 && _iterator58["return"] != null) {
            _iterator58["return"]();
          }
        } finally {
          if (_didIteratorError58) {
            throw _iteratorError58;
          }
        }
      }

      var _iteratorNormalCompletion59 = true;
      var _didIteratorError59 = false;
      var _iteratorError59 = undefined;

      try {
        for (var _iterator59 = subLinks[Symbol.iterator](), _step59; !(_iteratorNormalCompletion59 = (_step59 = _iterator59.next()).done); _iteratorNormalCompletion59 = true) {
          var _link17 = _step59.value;
          _link17.style.fontFamily = 'segr';
        }
      } catch (err) {
        _didIteratorError59 = true;
        _iteratorError59 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion59 && _iterator59["return"] != null) {
            _iterator59["return"]();
          }
        } finally {
          if (_didIteratorError59) {
            throw _iteratorError59;
          }
        }
      }

      var _iteratorNormalCompletion60 = true;
      var _didIteratorError60 = false;
      var _iteratorError60 = undefined;

      try {
        for (var _iterator60 = sub2Links[Symbol.iterator](), _step60; !(_iteratorNormalCompletion60 = (_step60 = _iterator60.next()).done); _iteratorNormalCompletion60 = true) {
          var _link18 = _step60.value;
          _link18.style.fontFamily = 'segr';
        }
      } catch (err) {
        _didIteratorError60 = true;
        _iteratorError60 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion60 && _iterator60["return"] != null) {
            _iterator60["return"]();
          }
        } finally {
          if (_didIteratorError60) {
            throw _iteratorError60;
          }
        }
      }

      var _iteratorNormalCompletion61 = true;
      var _didIteratorError61 = false;
      var _iteratorError61 = undefined;

      try {
        for (var _iterator61 = sub3Links[Symbol.iterator](), _step61; !(_iteratorNormalCompletion61 = (_step61 = _iterator61.next()).done); _iteratorNormalCompletion61 = true) {
          var _link19 = _step61.value;
          _link19.style.fontFamily = 'segr';
        }
      } catch (err) {
        _didIteratorError61 = true;
        _iteratorError61 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion61 && _iterator61["return"] != null) {
            _iterator61["return"]();
          }
        } finally {
          if (_didIteratorError61) {
            throw _iteratorError61;
          }
        }
      }

      var _iteratorNormalCompletion62 = true;
      var _didIteratorError62 = false;
      var _iteratorError62 = undefined;

      try {
        for (var _iterator62 = h1[Symbol.iterator](), _step62; !(_iteratorNormalCompletion62 = (_step62 = _iterator62.next()).done); _iteratorNormalCompletion62 = true) {
          var _h24 = _step62.value;
          _h24.style.fontFamily = 'segb';
        }
      } catch (err) {
        _didIteratorError62 = true;
        _iteratorError62 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion62 && _iterator62["return"] != null) {
            _iterator62["return"]();
          }
        } finally {
          if (_didIteratorError62) {
            throw _iteratorError62;
          }
        }
      }

      var _iteratorNormalCompletion63 = true;
      var _didIteratorError63 = false;
      var _iteratorError63 = undefined;

      try {
        for (var _iterator63 = h2[Symbol.iterator](), _step63; !(_iteratorNormalCompletion63 = (_step63 = _iterator63.next()).done); _iteratorNormalCompletion63 = true) {
          var _h25 = _step63.value;
          _h25.style.fontFamily = 'segb';
        }
      } catch (err) {
        _didIteratorError63 = true;
        _iteratorError63 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion63 && _iterator63["return"] != null) {
            _iterator63["return"]();
          }
        } finally {
          if (_didIteratorError63) {
            throw _iteratorError63;
          }
        }
      }

      var _iteratorNormalCompletion64 = true;
      var _didIteratorError64 = false;
      var _iteratorError64 = undefined;

      try {
        for (var _iterator64 = h3[Symbol.iterator](), _step64; !(_iteratorNormalCompletion64 = (_step64 = _iterator64.next()).done); _iteratorNormalCompletion64 = true) {
          var _h26 = _step64.value;
          _h26.style.fontFamily = 'segb';
        }
      } catch (err) {
        _didIteratorError64 = true;
        _iteratorError64 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion64 && _iterator64["return"] != null) {
            _iterator64["return"]();
          }
        } finally {
          if (_didIteratorError64) {
            throw _iteratorError64;
          }
        }
      }

      var _iteratorNormalCompletion65 = true;
      var _didIteratorError65 = false;
      var _iteratorError65 = undefined;

      try {
        for (var _iterator65 = h4[Symbol.iterator](), _step65; !(_iteratorNormalCompletion65 = (_step65 = _iterator65.next()).done); _iteratorNormalCompletion65 = true) {
          var _h27 = _step65.value;
          _h27.style.fontFamily = 'segb';
        }
      } catch (err) {
        _didIteratorError65 = true;
        _iteratorError65 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion65 && _iterator65["return"] != null) {
            _iterator65["return"]();
          }
        } finally {
          if (_didIteratorError65) {
            throw _iteratorError65;
          }
        }
      }

      var _iteratorNormalCompletion66 = true;
      var _didIteratorError66 = false;
      var _iteratorError66 = undefined;

      try {
        for (var _iterator66 = h5[Symbol.iterator](), _step66; !(_iteratorNormalCompletion66 = (_step66 = _iterator66.next()).done); _iteratorNormalCompletion66 = true) {
          var _h28 = _step66.value;
          _h28.style.fontFamily = 'segb';
        }
      } catch (err) {
        _didIteratorError66 = true;
        _iteratorError66 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion66 && _iterator66["return"] != null) {
            _iterator66["return"]();
          }
        } finally {
          if (_didIteratorError66) {
            throw _iteratorError66;
          }
        }
      }

      var _iteratorNormalCompletion67 = true;
      var _didIteratorError67 = false;
      var _iteratorError67 = undefined;

      try {
        for (var _iterator67 = h6[Symbol.iterator](), _step67; !(_iteratorNormalCompletion67 = (_step67 = _iterator67.next()).done); _iteratorNormalCompletion67 = true) {
          var _h29 = _step67.value;
          _h29.style.fontFamily = 'segb';
        }
      } catch (err) {
        _didIteratorError67 = true;
        _iteratorError67 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion67 && _iterator67["return"] != null) {
            _iterator67["return"]();
          }
        } finally {
          if (_didIteratorError67) {
            throw _iteratorError67;
          }
        }
      }

      var _iteratorNormalCompletion68 = true;
      var _didIteratorError68 = false;
      var _iteratorError68 = undefined;

      try {
        for (var _iterator68 = b[Symbol.iterator](), _step68; !(_iteratorNormalCompletion68 = (_step68 = _iterator68.next()).done); _iteratorNormalCompletion68 = true) {
          var _i6 = _step68.value;
          _i6.style.fontFamily = 'segb';
        }
      } catch (err) {
        _didIteratorError68 = true;
        _iteratorError68 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion68 && _iterator68["return"] != null) {
            _iterator68["return"]();
          }
        } finally {
          if (_didIteratorError68) {
            throw _iteratorError68;
          }
        }
      }

      var _iteratorNormalCompletion69 = true;
      var _didIteratorError69 = false;
      var _iteratorError69 = undefined;

      try {
        for (var _iterator69 = i[Symbol.iterator](), _step69; !(_iteratorNormalCompletion69 = (_step69 = _iterator69.next()).done); _iteratorNormalCompletion69 = true) {
          var _a12 = _step69.value;
          _a12.style.fontFamily = 'segi';
        }
      } catch (err) {
        _didIteratorError69 = true;
        _iteratorError69 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion69 && _iterator69["return"] != null) {
            _iterator69["return"]();
          }
        } finally {
          if (_didIteratorError69) {
            throw _iteratorError69;
          }
        }
      }

      var _iteratorNormalCompletion70 = true;
      var _didIteratorError70 = false;
      var _iteratorError70 = undefined;

      try {
        for (var _iterator70 = i2[Symbol.iterator](), _step70; !(_iteratorNormalCompletion70 = (_step70 = _iterator70.next()).done); _iteratorNormalCompletion70 = true) {
          var _a13 = _step70.value;
          _a13.style.fontFamily = 'segi';
        }
      } catch (err) {
        _didIteratorError70 = true;
        _iteratorError70 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion70 && _iterator70["return"] != null) {
            _iterator70["return"]();
          }
        } finally {
          if (_didIteratorError70) {
            throw _iteratorError70;
          }
        }
      }

      var _iteratorNormalCompletion71 = true;
      var _didIteratorError71 = false;
      var _iteratorError71 = undefined;

      try {
        for (var _iterator71 = btext[Symbol.iterator](), _step71; !(_iteratorNormalCompletion71 = (_step71 = _iterator71.next()).done); _iteratorNormalCompletion71 = true) {
          var _a14 = _step71.value;
          _a14.style.fontFamily = 'serg';
        }
      } catch (err) {
        _didIteratorError71 = true;
        _iteratorError71 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion71 && _iterator71["return"] != null) {
            _iterator71["return"]();
          }
        } finally {
          if (_didIteratorError71) {
            throw _iteratorError71;
          }
        }
      }

      display.style.fontFamily = 'segr';
      curName.style.fontFamily = 'segr';
      break;

    case 'times new roman':
      book.style.fontFamily = 'tnrr';
      content.style.fontFamily = 'tnrb';
      var _iteratorNormalCompletion72 = true;
      var _didIteratorError72 = false;
      var _iteratorError72 = undefined;

      try {
        for (var _iterator72 = boldLinks[Symbol.iterator](), _step72; !(_iteratorNormalCompletion72 = (_step72 = _iterator72.next()).done); _iteratorNormalCompletion72 = true) {
          var _link20 = _step72.value;
          _link20.style.fontFamily = 'tnrb';
        }
      } catch (err) {
        _didIteratorError72 = true;
        _iteratorError72 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion72 && _iterator72["return"] != null) {
            _iterator72["return"]();
          }
        } finally {
          if (_didIteratorError72) {
            throw _iteratorError72;
          }
        }
      }

      var _iteratorNormalCompletion73 = true;
      var _didIteratorError73 = false;
      var _iteratorError73 = undefined;

      try {
        for (var _iterator73 = subLinks[Symbol.iterator](), _step73; !(_iteratorNormalCompletion73 = (_step73 = _iterator73.next()).done); _iteratorNormalCompletion73 = true) {
          var _link21 = _step73.value;
          _link21.style.fontFamily = 'tnrr';
        }
      } catch (err) {
        _didIteratorError73 = true;
        _iteratorError73 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion73 && _iterator73["return"] != null) {
            _iterator73["return"]();
          }
        } finally {
          if (_didIteratorError73) {
            throw _iteratorError73;
          }
        }
      }

      var _iteratorNormalCompletion74 = true;
      var _didIteratorError74 = false;
      var _iteratorError74 = undefined;

      try {
        for (var _iterator74 = sub2Links[Symbol.iterator](), _step74; !(_iteratorNormalCompletion74 = (_step74 = _iterator74.next()).done); _iteratorNormalCompletion74 = true) {
          var _link22 = _step74.value;
          _link22.style.fontFamily = 'tnrr';
        }
      } catch (err) {
        _didIteratorError74 = true;
        _iteratorError74 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion74 && _iterator74["return"] != null) {
            _iterator74["return"]();
          }
        } finally {
          if (_didIteratorError74) {
            throw _iteratorError74;
          }
        }
      }

      var _iteratorNormalCompletion75 = true;
      var _didIteratorError75 = false;
      var _iteratorError75 = undefined;

      try {
        for (var _iterator75 = sub3Links[Symbol.iterator](), _step75; !(_iteratorNormalCompletion75 = (_step75 = _iterator75.next()).done); _iteratorNormalCompletion75 = true) {
          var _link23 = _step75.value;
          _link23.style.fontFamily = 'tnrr';
        }
      } catch (err) {
        _didIteratorError75 = true;
        _iteratorError75 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion75 && _iterator75["return"] != null) {
            _iterator75["return"]();
          }
        } finally {
          if (_didIteratorError75) {
            throw _iteratorError75;
          }
        }
      }

      var _iteratorNormalCompletion76 = true;
      var _didIteratorError76 = false;
      var _iteratorError76 = undefined;

      try {
        for (var _iterator76 = h1[Symbol.iterator](), _step76; !(_iteratorNormalCompletion76 = (_step76 = _iterator76.next()).done); _iteratorNormalCompletion76 = true) {
          var _h30 = _step76.value;
          _h30.style.fontFamily = 'tnrb';
        }
      } catch (err) {
        _didIteratorError76 = true;
        _iteratorError76 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion76 && _iterator76["return"] != null) {
            _iterator76["return"]();
          }
        } finally {
          if (_didIteratorError76) {
            throw _iteratorError76;
          }
        }
      }

      var _iteratorNormalCompletion77 = true;
      var _didIteratorError77 = false;
      var _iteratorError77 = undefined;

      try {
        for (var _iterator77 = h2[Symbol.iterator](), _step77; !(_iteratorNormalCompletion77 = (_step77 = _iterator77.next()).done); _iteratorNormalCompletion77 = true) {
          var _h31 = _step77.value;
          _h31.style.fontFamily = 'tnrb';
        }
      } catch (err) {
        _didIteratorError77 = true;
        _iteratorError77 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion77 && _iterator77["return"] != null) {
            _iterator77["return"]();
          }
        } finally {
          if (_didIteratorError77) {
            throw _iteratorError77;
          }
        }
      }

      var _iteratorNormalCompletion78 = true;
      var _didIteratorError78 = false;
      var _iteratorError78 = undefined;

      try {
        for (var _iterator78 = h3[Symbol.iterator](), _step78; !(_iteratorNormalCompletion78 = (_step78 = _iterator78.next()).done); _iteratorNormalCompletion78 = true) {
          var _h32 = _step78.value;
          _h32.style.fontFamily = 'tnrb';
        }
      } catch (err) {
        _didIteratorError78 = true;
        _iteratorError78 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion78 && _iterator78["return"] != null) {
            _iterator78["return"]();
          }
        } finally {
          if (_didIteratorError78) {
            throw _iteratorError78;
          }
        }
      }

      var _iteratorNormalCompletion79 = true;
      var _didIteratorError79 = false;
      var _iteratorError79 = undefined;

      try {
        for (var _iterator79 = h4[Symbol.iterator](), _step79; !(_iteratorNormalCompletion79 = (_step79 = _iterator79.next()).done); _iteratorNormalCompletion79 = true) {
          var _h33 = _step79.value;
          _h33.style.fontFamily = 'tnrb';
        }
      } catch (err) {
        _didIteratorError79 = true;
        _iteratorError79 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion79 && _iterator79["return"] != null) {
            _iterator79["return"]();
          }
        } finally {
          if (_didIteratorError79) {
            throw _iteratorError79;
          }
        }
      }

      var _iteratorNormalCompletion80 = true;
      var _didIteratorError80 = false;
      var _iteratorError80 = undefined;

      try {
        for (var _iterator80 = h5[Symbol.iterator](), _step80; !(_iteratorNormalCompletion80 = (_step80 = _iterator80.next()).done); _iteratorNormalCompletion80 = true) {
          var _h34 = _step80.value;
          _h34.style.fontFamily = 'tnrb';
        }
      } catch (err) {
        _didIteratorError80 = true;
        _iteratorError80 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion80 && _iterator80["return"] != null) {
            _iterator80["return"]();
          }
        } finally {
          if (_didIteratorError80) {
            throw _iteratorError80;
          }
        }
      }

      var _iteratorNormalCompletion81 = true;
      var _didIteratorError81 = false;
      var _iteratorError81 = undefined;

      try {
        for (var _iterator81 = h6[Symbol.iterator](), _step81; !(_iteratorNormalCompletion81 = (_step81 = _iterator81.next()).done); _iteratorNormalCompletion81 = true) {
          var _h35 = _step81.value;
          _h35.style.fontFamily = 'tnrb';
        }
      } catch (err) {
        _didIteratorError81 = true;
        _iteratorError81 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion81 && _iterator81["return"] != null) {
            _iterator81["return"]();
          }
        } finally {
          if (_didIteratorError81) {
            throw _iteratorError81;
          }
        }
      }

      var _iteratorNormalCompletion82 = true;
      var _didIteratorError82 = false;
      var _iteratorError82 = undefined;

      try {
        for (var _iterator82 = b[Symbol.iterator](), _step82; !(_iteratorNormalCompletion82 = (_step82 = _iterator82.next()).done); _iteratorNormalCompletion82 = true) {
          var _i7 = _step82.value;
          _i7.style.fontFamily = 'tnrb';
        }
      } catch (err) {
        _didIteratorError82 = true;
        _iteratorError82 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion82 && _iterator82["return"] != null) {
            _iterator82["return"]();
          }
        } finally {
          if (_didIteratorError82) {
            throw _iteratorError82;
          }
        }
      }

      var _iteratorNormalCompletion83 = true;
      var _didIteratorError83 = false;
      var _iteratorError83 = undefined;

      try {
        for (var _iterator83 = i[Symbol.iterator](), _step83; !(_iteratorNormalCompletion83 = (_step83 = _iterator83.next()).done); _iteratorNormalCompletion83 = true) {
          var _a15 = _step83.value;
          _a15.style.fontFamily = 'tnri';
        }
      } catch (err) {
        _didIteratorError83 = true;
        _iteratorError83 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion83 && _iterator83["return"] != null) {
            _iterator83["return"]();
          }
        } finally {
          if (_didIteratorError83) {
            throw _iteratorError83;
          }
        }
      }

      var _iteratorNormalCompletion84 = true;
      var _didIteratorError84 = false;
      var _iteratorError84 = undefined;

      try {
        for (var _iterator84 = i2[Symbol.iterator](), _step84; !(_iteratorNormalCompletion84 = (_step84 = _iterator84.next()).done); _iteratorNormalCompletion84 = true) {
          var _a16 = _step84.value;
          _a16.style.fontFamily = 'tnri';
        }
      } catch (err) {
        _didIteratorError84 = true;
        _iteratorError84 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion84 && _iterator84["return"] != null) {
            _iterator84["return"]();
          }
        } finally {
          if (_didIteratorError84) {
            throw _iteratorError84;
          }
        }
      }

      var _iteratorNormalCompletion85 = true;
      var _didIteratorError85 = false;
      var _iteratorError85 = undefined;

      try {
        for (var _iterator85 = btext[Symbol.iterator](), _step85; !(_iteratorNormalCompletion85 = (_step85 = _iterator85.next()).done); _iteratorNormalCompletion85 = true) {
          var _a17 = _step85.value;
          _a17.style.fontFamily = 'tnrr';
        }
      } catch (err) {
        _didIteratorError85 = true;
        _iteratorError85 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion85 && _iterator85["return"] != null) {
            _iterator85["return"]();
          }
        } finally {
          if (_didIteratorError85) {
            throw _iteratorError85;
          }
        }
      }

      display.style.fontFamily = 'tnrr';
      curName.style.fontFamily = 'tnrr';
      break;
  }
}
/* ↑↑↑ /FUNCTIONS DECLARATION ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
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