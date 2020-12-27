"use strict";
// top-book-panel module
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ FULL SCREEN MODE ON/OFF ↓↓↓ */
  let isFSOn = false;
  document.querySelector('.top-book-panel__btn')
          .addEventListener('click', function(event) {
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
  });

  document.onfullscreenchange = pagination;
/* ↑↑↑ /FULL SCREEN MODE ON/OFF ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ SET NAMES AND META-TAGS ↓↓↓ */
  // визначаємо id книги з рядка адреси
  let href     = location.href;
  let bookPos  = href.indexOf('books');
  let indexPos = href.indexOf('index');
  let id       = href.slice( bookPos+6,indexPos-1 );

  // за отриманим id знаходимо в базі книгу
  let dataBaseItem = books.filter( function(item) {
    return item.id == id
  } )[0];
  // вносимо дані про книгу в змінні та вписуємо в теги
  let author     = dataBaseItem.author;
  let bookName   = dataBaseItem.name;

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
  window.addEventListener('load', function() {
    setTimeout(function(){
      pagination()
    },1000);
  });

  document.getElementById('book').onscroll = pagination;
/* ↑↑↑ /PAGINATION ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ FUNCTIONS DECLARATION ↓↓↓ */
  function pagination() {
    let book              = document.getElementById('book'),
        visibleBookHeight = book.offsetHeight,
        fullBookHeight    = book.scrollHeight,
        bookScrollTop     = book.scrollTop;

    let pageNumber = Math.ceil(bookScrollTop/visibleBookHeight);
    if (pageNumber == 0) pageNumber = 1;
    let pagesAmount = Math.floor(fullBookHeight/visibleBookHeight);

    // вписування значень сторінок
    document.querySelector('.top-book-panel__read').innerHTML = pageNumber;
    document.querySelector('.top-book-panel__not-read').innerHTML = pagesAmount;

    // правильні відмінкові закінчення для слова "сторінка"
    if ( String(pagesAmount).endsWith('1') && !String(pagesAmount).endsWith('11') ) {
      document.querySelectorAll('.top-book-panel__symbol')[1].innerHTML = 'сторінки';
    } else {
      document.querySelectorAll('.top-book-panel__symbol')[1].innerHTML = 'сторінок';
    }

    // анімація
    let maxLineWidth = document.querySelector('.top-book-panel__read-line-wrapper').offsetWidth;
    let currentLineWidth = maxLineWidth*pageNumber/pagesAmount;
    document.querySelector('.top-book-panel__read-line').style.width = currentLineWidth + 'px';
  }
/* ↑↑↑ /FUNCTIONS DECLARATION ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////