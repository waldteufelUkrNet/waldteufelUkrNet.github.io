"use strict";
// dbase.js
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ VARIABLES DECLARATION ↓↓↓ */
  let bookList         = document.querySelector('.books-list'),
      ls               = localStorage,
      isSerchFieldOpen = false,
      bookListType     = 'big',
      bookSortType     = 'author',
      keyForCompare    = 'author';
/* ↑↑↑ /VARIABLES DECLARATION ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ MAIN LOGIC ↓↓↓ */
  initLocalStorage();

  // відображення кількості книжок в базі
  document.getElementById('booksAmount').innerHTML = books.sort(compare).length + ' кн.';

  // побудова списку
  buildBooksList();
/* ↑↑↑ /MAIN LOGIC ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ ASSIGNMENT OF HANDLERS ↓↓↓ */
  // навішування обробників на кнопки вигляду списку
  document.getElementById('bigList').onclick = function() {
    let myBooks = JSON.parse( ls.getItem('myBooks') || {});
    bookListType = 'big';
    myBooks.gS.bLT = 'big';
    ls.setItem( 'myBooks', JSON.stringify(myBooks) );
    buildBooksList();
  };
  document.getElementById('smallList').onclick = function() {
    let myBooks = JSON.parse( ls.getItem('myBooks') || {});
    bookListType = 'small';
    myBooks.gS.bLT = 'small';
    ls.setItem( 'myBooks', JSON.stringify(myBooks) );
    buildBooksList();
  };

  // клік на кнопку пошуку
  document.querySelector('.books-panel__search-btn').onclick = toggleSearchField;

  // закриття поля пошуку, якщо клік повз кнопки пошуку або поля пошуку
  document.addEventListener('click', function () {
    if ( event.target.closest('.books-panel__search-field') ) return;
    if ( !event.target.closest('.books-panel__search-btn') && isSerchFieldOpen) {
      toggleSearchField()
    }
  });

  // пошук книги
  document.querySelector('.books-panel__search-field').oninput = searchBook;

  // перемикання списку сортування
  document.querySelector('.select__field-wrapper').onclick = toggleList;

  // закриття списку, якщо клік повз елемент списку і список відкритий
  document.addEventListener('click', function () {
    if ( event.target.closest('.select') ) return;
    if ( document.querySelector('.select__list').dataset.isopen == 'false' ) return;
    toggleList();
  });

  // кліки на псевдоопціях списку
  let listItems = document.querySelectorAll('.select__list-item');
  addEventListenerToObject('click', listItems, selectListItem);
/* ↑↑↑ /ASSIGNMENT OF HANDLERS ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ FUNCTIONS DECLARATION ↓↓↓ */
  function toggleSearchField () {
    if (isSerchFieldOpen) {
      closeSearchField();
    } else {
      openSearchField();
    }
  }

  function openSearchField() {
    let button      = document.querySelector('.books-panel__search-btn'),
        searchField = document.querySelector('.books-panel__search-field');

    // знімаємо обробник з кнопки для нормальної анімації поля
    document.querySelector('.books-panel__search-btn').onclick = '';

    searchField.style.width = '100%';
    let tempWidth = searchField.offsetWidth + 'px';
    searchField.style.width = '0px';

    button.classList.add('books-panel__btn_active');

    setTimeout(function(){
      searchField.style.transition = 'width .3s, border-color .3s';
      searchField.style.padding = '6px';
      searchField.style.borderColor = 'grey';
      searchField.style.width = tempWidth;
      searchField.focus();
    },100);

    // після анімації поновлюємо обробник
    setTimeout(function(){
      document.querySelector('.books-panel__search-btn').onclick = toggleSearchField;
      isSerchFieldOpen = true;
    },301);
  }

  function closeSearchField() {

    // прибрати загальну кількість співпадінь
    document.querySelector('.books-panel__found-quantity').innerHTML = '';

    let button      = document.querySelector('.books-panel__search-btn'),
        searchField = document.querySelector('.books-panel__search-field');
    buildBooksList();
    // знімаємо обробник з кнопки для нормальної анімації поля
    button.onclick = '';

    searchField.style.width = '0px';
    searchField.style.transition = 'width .3s, border-color .3s';
    searchField.style.padding = '0px';
    searchField.style.borderColor = 'transparent';
    searchField.value = '';

    button.classList.remove('books-panel__btn_active');

    // після анімації поновлюємо обробник
    setTimeout(function(){
      searchField.style.transition = '';
      document.querySelector('.books-panel__search-btn').onclick = toggleSearchField;
        isSerchFieldOpen = false;
    },301);
  }

  function buildBooksList() {
    let myBooks = JSON.parse( ls.getItem('myBooks') || {});
    bookListType = myBooks.gS.bLT;
    bookSortType = keyForCompare = myBooks.gS.bST;

    // підсвітка активної кнопки
    if (bookListType == 'big') {
      document.getElementById('bigList').classList
                                        .add('books-panel__btn_active');
      document.getElementById('smallList').classList
                                          .remove('books-panel__btn_active');
      document.querySelector('.books-list').style.display = 'flex';
    } else if (bookListType == 'small') {
      document.getElementById('smallList').classList
                                          .add('books-panel__btn_active');
      document.getElementById('bigList').classList
                                          .remove('books-panel__btn_active');

      document.querySelector('.books-list').style.display = 'block';
    }

    // позначення типу сортування
    document.querySelector('.select__field').innerHTML = document.querySelector('.select__list-item[data-value="' + bookSortType + '"]').innerHTML;

    // побудова списку
    bookList.innerHTML = '';

    let sortedArr = books.sort(compare);
    let key;
    sortedArr.forEach( function(item) {
      let book;
      if (bookSortType == 'author') {
        if ( key != item.author.slice(0,1).toUpperCase() ) {
          key = item.author.slice(0,1).toUpperCase();
          let booksDivider = '<p class="booksDivider">' + key + '</p>';
          bookList.insertAdjacentHTML('beforeEnd', booksDivider);
        }
      } else if (bookSortType == 'name') {
        if ( key != item.name.slice(0,1).toUpperCase() ) {
          key = item.name.slice(0,1).toUpperCase();
          let booksDivider = '<p class="booksDivider">' + key + '</p>';
          bookList.insertAdjacentHTML('beforeEnd', booksDivider);
        }
      } else if (bookSortType == 'genre') {
        if ( key != item.genre.toUpperCase() ) {
          key = item.genre.toUpperCase();
          let amount = 0;
          for (let i = 0; i < sortedArr.length; i++) {
            if (sortedArr[i].genre.toUpperCase() == key) amount++;
          }
          let booksDivider = '<p class="booksDivider">' + key + ' <span class="booksDivider__additional-info">(' + amount + ' кн.)</span></p>';
          bookList.insertAdjacentHTML('beforeEnd', booksDivider);
        }
      }

      if (bookListType == 'big') {
        book = '\
                <a class="book" href="books/' + item.id + '/index.html">\
                  <div class="book__img-wrapper">\
                    <img class="book__img" src="books/' + item.id + '/img/title.jpg" alt="book title">\
                  </div>\
                  <div class="book__name-wrapper">\
                    <div class="book__author">' + item.author + '</div>\
                    <div class="book__name">' + item.name + '</div>\
                    <div class="book__genre">' + item.genre + '</div>\
                    <div class="book__id">' + item.id + '</div>\
                  </div>\
                </a>\
               ';
      } else if (bookListType == 'small') {
        book = '\
                <a  class="book-sm" href="books/' + item.id + '/index.html">\
                  <span style="font-weight: 900">' + item.author + ' - </span>\
                  <span>' + item.name + '</span>\
                </a>\
               ';
      };
      bookList.insertAdjacentHTML('beforeEnd', book);
    });
  }

  function searchBook() {
    //побудова списку потрібна, бо зміна в інпуті може бути від'ємна (напр: 'author' -> 'auth')
    buildBooksList();

    let value     = this.value.toLowerCase();
    // let searchArr = document.querySelector('.books-list').children;
    let searchArr = document.querySelectorAll('.books-list a[class^="book"]');

    if ( searchArr[0].classList.contains('book') ) {
      Array.from(searchArr).forEach(function(item){
        let bookName = item.querySelector('.book__name').innerHTML.toLowerCase();
        let author   = item.querySelector('.book__author').innerHTML.toLowerCase();

        if ( !bookName.includes(value) && !author.includes(value) ) item.remove();
      });
    } else if ( searchArr[0].classList.contains('book-sm') ) {
      Array.from(searchArr).forEach(function(item){
        let bookName = item.querySelectorAll('span')[1].innerHTML.toLowerCase();
        let author   = item.querySelectorAll('span')[0].innerHTML.toLowerCase();

        if ( !bookName.includes(value) && !author.includes(value) ) item.remove();
      });
    }

    // видалення пустих заголовків
    if ( document.querySelector('.booksDivider') ) {
      let dividers = document.querySelectorAll('.booksDivider');
      for ( let divider of dividers) {
        if ( !divider.nextElementSibling || divider.nextElementSibling.classList.contains('booksDivider') ) {
          divider.remove();
        } else {
          // тут розрахунок кількості книг зі співпадіннями та вписування кількості в заголовки
          if ( bookSortType == 'genre' ) {
            let amount = 0;
            let currentElement = divider;

            while ( currentElement.nextElementSibling && ( currentElement.nextElementSibling.classList.contains('book') ||
                        currentElement.nextElementSibling.classList.contains('book-sm') ) ) {
              currentElement = currentElement.nextElementSibling;
              amount++
            }

            divider.querySelector('.booksDivider__additional-info').innerHTML = '(' + amount + ' кн.)';
            amount = 0;
          }
        }
      }
    }

    // загальна кількість співпадінь
    document.querySelector('.books-panel__found-quantity').innerHTML = document.querySelectorAll('.books-list a[class^="book"]').length;
  }

  function toggleList() {
    let list       = document.querySelector('.select__list'),
        listStatus = list.dataset.isopen,
        listHeight;

    if (listStatus == 'false') {
      list.style.height = 'auto';
      listHeight = list.clientHeight + 'px';
      list.style.height = '0px';
      list.style.borderTop = '1px solid lightgrey';

      setTimeout( () => {
        list.style.height = listHeight;
      },10 );

      list.setAttribute('data-isopen', true);
    } else {
      list.style.height = '0px';
      list.style.borderTop = '0px solid lightgrey';
      list.setAttribute('data-isopen', false);
    }
  }

  function selectListItem(event) {
    let sortName = event.target.innerHTML,
        sortType = event.target.dataset.value;

    document.querySelector('.select__field').innerHTML = sortName;
    toggleList();

    let myBooks = JSON.parse( ls.getItem('myBooks') ) || {};
    myBooks.gS.bST = sortType;
    ls.setItem( 'myBooks', JSON.stringify(myBooks) );

    keyForCompare = sortType;
    buildBooksList();

  }

  function initLocalStorage() {
    let myBooks = JSON.parse( ls.getItem('myBooks') ) || {};

    if ( !('gS' in myBooks) ) myBooks.gS = {};
    if ( !('b' in myBooks) ) myBooks.b = {};

    if ( !('bLT' in myBooks.gS) ) myBooks.gS.bLT = 'big';
    if ( !('bST' in myBooks.gS) ) myBooks.gS.bST = 'author';
    if ( !('bFS' in myBooks.gS) ) myBooks.gS.bFS = {};

    if ( !('n' in myBooks.gS.bFS) ) myBooks.gS.bFS.n = '';
    if ( !('s' in myBooks.gS.bFS) ) myBooks.gS.bFS.s = '';
    if ( !('c' in myBooks.gS.bFS) ) myBooks.gS.bFS.c = '';
    if ( !('bgC' in myBooks.gS.bFS) ) myBooks.gS.bFS.bgC = '';

    ls.setItem( 'myBooks', JSON.stringify(myBooks) );
  }

  /**
   * здійснює лексикографічне сортування масиву об'єктів phoneBook за ключем,
   * записаним в змінній keyForCompare
   * @param  {object} a об'єкт, елемент масиву
   * @param  {object} b об'єкт, елемент масиву
   * @return {[number]} результат порівняння
   */
  function compare( a, b ) {
    return a[keyForCompare].localeCompare(b[keyForCompare]);
  }
/* ↑↑↑ /FUNCTIONS DECLARATION ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////