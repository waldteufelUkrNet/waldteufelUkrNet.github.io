"use strict";
// bottom-book-panel module
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ визначення ідентифікатору книги, робота з localStorage ↓↓↓ */
  let href     = location.href;
  let position = href.indexOf('books');
  let bookId   = href.slice(position+6, position+11);
  let ls       = localStorage;
  let myBooks  = JSON.parse( ls.getItem('myBooks') ) || {};
  // console.log("myBooks", JSON.stringify(myBooks) );
  // alert( JSON.stringify(myBooks) );

  if ( !('books' in myBooks) ) {
    myBooks.books = {[bookId]: {bookmark: []} }
  } else {
    if ( !(bookId in myBooks.books) ) {
      myBooks.books[bookId] = {bookmark: []}
    }
  }

  // робота із закладкою (якщо вона є)
  if (myBooks.books[bookId].bookmark.length == 2) {
    showBookmarksBtns();
  }
/* ↑↑↑ /визначення ідентифікатору книги, робота з localStorage ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ навішування обробників на кнопки головного меню ↓↓↓ */
  let bottomBookPanelBtns = document.getElementsByClassName('bottom-book-panel__btn');
  for ( let i = 0; i < bottomBookPanelBtns.length; i++ ) {
    (function(n){
      bottomBookPanelBtns[n].onclick = function(event) {

        // підсвітка натисненої кнопки
        event.currentTarget.classList.add('bottom-book-panel__btn_active');
        (function(i){
          setTimeout( function(){
          i.classList.remove('bottom-book-panel__btn_active');
        },100);
        })(event.currentTarget);

        // персоналізована поведінка
        let buttonId = event.currentTarget.getAttribute('id');
        switch(buttonId) {
          case 'bookmark':

            if ( document.querySelector('.bookmark-in-first-screen') ) document.querySelector('.bookmark-in-first-screen').remove();
            if ( document.querySelector('.bookmark-in-text') ) document.querySelector('.bookmark-in-text').remove();

            // визначаємо елемент, який знаходиться на координатах зверху по центру книги
            let topCoord  = document.querySelector('#book').getBoundingClientRect().top + 20;
            let leftCoord = document.querySelector('.main').offsetWidth/2;
            let DOMelem   = document.elementFromPoint(leftCoord,topCoord);

            // визначаємо тег елементу і його порядковий номер у масиві однотипних елементів
            let DOMelemTagName = DOMelem.tagName.toLowerCase();
            let arrOfTags      = document.querySelectorAll('#book ' + DOMelemTagName);
            let sequenceNumber;
            for(let i = 0; i < arrOfTags.length; i++) {
              if (arrOfTags[i] == DOMelem) {
                sequenceNumber = i;
                break;
              }
            }

            // створюємо закладку тег/номер, записуємо в localStorage
            myBooks.books[bookId].bookmark = [DOMelemTagName, sequenceNumber];
            ls.setItem( 'myBooks', JSON.stringify(myBooks) );

            // показати кнопки
            showBookmarksBtns();

            break;
          case 'selectText':
            // trololo;
            break;
          case 'options':
            // trololo;
            break;
          case 'goHome':
            let href = location.href;
            let position = href.indexOf('books');
            if ( position != -1 ) {
              location.href = href.slice(0, position) + href.slice(position+12);
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
    }(i));
  }

/* ↑↑↑ /навішування обробників на кнопки головного меню ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ FUNCTIONS DECLARATION ↓↓↓ */

  function showBookmarksBtns() {
    let book = document.getElementById('book');
    let bookmarkInFirstScreen = '\
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
    let bookmarkInText = '\
                          <div class="bookmark-in-text" onclick="removeBookmarksBtns()">\
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">\
                              <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>\
                            </svg>\
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">\
                              <path d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"></path>\
                            </svg>\
                          </div>\
                         ';
    let tag         = myBooks.books[bookId].bookmark[0];
    let number      = myBooks.books[bookId].bookmark[1];
    let arrOfTags   = document.querySelectorAll('#book ' + tag);
    let markeredTag = arrOfTags[number];
    let topCoord    = markeredTag.getBoundingClientRect().top;
    let bookHeight  = document.getElementById('book').offsetHeight;
    markeredTag.insertAdjacentHTML('beforeBegin', bookmarkInText);
  }

  function removeBookmarksBtns() {
    //видалити обитві кнопки та почистити локальне сховище
    document.querySelector('.bookmark-in-first-screen').remove();
    document.querySelector('.bookmark-in-text').remove();

    myBooks.books[bookId].bookmark = [];
    ls.setItem( 'myBooks', JSON.stringify(myBooks) );
  }

  function goToBookmark() {
    let tag         = myBooks.books[bookId].bookmark[0];
    let number      = myBooks.books[bookId].bookmark[1];
    let arrOfTags   = document.querySelectorAll('#book ' + tag);
    let markeredTag = arrOfTags[number];
    markeredTag.scrollIntoView({behavior:'smooth'});
  }

  /**
   * [scrollingWindow плавна прокрутка сторінки]
   * @param {[String]} how [напрям прокрутки]
   */
  function scrollingWindow(how) {
    let topPoint;
    let book = document.getElementById('book');

    if (how == 'scrollTop') {
      topPoint = 0;
    } else {
      let currentScroll = book.scrollTop;
      let scrollValue   = book.offsetHeight;

      if ( how == 'scrollUp' ) {
        topPoint = currentScroll - scrollValue + 20;
      } else if ( how == 'scrollDown' ) {
        topPoint = currentScroll + scrollValue - 20;
      }
    }

    book.scroll({top: topPoint, behavior: 'smooth'});
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
  //   document.querySelector('.bottom-book-panel__color-field').classList.toggle('bottom-book-panel__color-field_active');

  //   selectedText = window.getSelection();
  //   console.log("selectedText:", selectedText, selectedText.toString());
  //   selectedNode = selectedText.anchorNode.parentNode;
  // };

  // let colorBtns = document.getElementsByClassName('bottom-book-panel__color');
  // for ( let i = 0; i < colorBtns.length; i++ ) {
  //   (function(n){
  //     colorBtns[n].onclick = function(event) {
  //       // підсвічуємо текст
  //       let colorClass = 'selected_' + event.target.getAttribute('data-color');
  //       let newText    = '<span class="' + colorClass + '">' + selectedText + '</span>';
  //       selectedNode.innerHTML = selectedNode.innerHTML.replace(selectedText, newText);

  //       // ховаємо панель
  //       document.querySelector('.bottom-book-panel__color-field').classList.toggle('bottom-book-panel__color-field_active');

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