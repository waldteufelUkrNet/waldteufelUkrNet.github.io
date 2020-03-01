"use strict"; // bbp module
////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ визначення ідентифікатору книги, робота з localStorage ↓↓↓ */

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var href = location.href;
var position = href.indexOf('books');
var bookId = href.slice(position + 6, position + 11);
var ls = localStorage;
var myBooks = JSON.parse(ls.getItem('myBooks')) || {}; // alert("myBooks", JSON.stringify(myBooks) );
// alert( JSON.stringify(myBooks) );

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
} // робота із закладкою (якщо вона є)


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
/* ↑↑↑ /навішування обробників на кнопки головного меню ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ FUNCTIONS DECLARATION ↓↓↓ */

/**
 * [showBookmarksBtns створенн кнопок закладки]
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
  indicator.innerHTML = newFontSize;
}
/* ↑↑↑ /FUNCTIONS DECLARATION ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
// зберігання налаштувань в тілі невидимого тегу?
//
// налаштування: вибір шрифту, розмір шрифту, колір шрифту, колір тла, скидання усіх опцій
//
// виділення тексту: кнопки "витерти усі виділення" / "витерти конкретне виділення", складний парсинг виділеного тексту, помилка при кліку на кнопку без вибору тексту
////////////////////////////////////////////////////////////////////////////////
// document.addEventListener("DOMContentLoaded", ready);
// function ready() {
// ////////////////////////////////////////////////////////////////////////////////
// let selectedText, selectedNode;
// document.getElementById('selectText').onclick = function(){
//   document.querySelector('.bbp__color-field').classList.toggle('bbp__color-field_active');
//   selectedText = window.getSelection();
//   alert("selectedText:", selectedText, selectedText.toString());
//   selectedNode = selectedText.anchorNode.parentNode;
// };
// let colorBtns = document.getElementsByClassName('bbp__color');
// for ( let i = 0; i < colorBtns.length; i++ ) {
//   (function(n){
//     colorBtns[n].onclick = function(event) {
//       // підсвічуємо текст
//       let colorClass = 'selected_' + event.target.getAttribute('data-color');
//       let newText    = '<span class="' + colorClass + '">' + selectedText + '</span>';
//       selectedNode.innerHTML = selectedNode.innerHTML.replace(selectedText, newText);
//       // ховаємо панель
//       document.querySelector('.bbp__color-field').classList.toggle('bbp__color-field_active');
//       // зберігаємо зміни в ls
//       let bookInnerHTML = document.getElementById('book').innerHTML;
//       ebooks = JSON.parse(ls.ebooks);
//       ebooks[book].bookInnerHTML = bookInnerHTML;
//       ls.setItem('ebooks', JSON.stringify(ebooks) );
//     };
//   }(i));
// }
////////////////////////////////////////////////////////////////////////////////
// }
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