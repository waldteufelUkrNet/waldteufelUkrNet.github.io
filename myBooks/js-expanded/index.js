"use strict";
// dbase.js
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ VARIABLES DECLARATION ↓↓↓ */
  let keyForCompare    = 'author',
      bookList         = document.querySelector('.books-list'),
      ls               = localStorage,
      isSerchFieldOpen = false,
      bookListType;
/* ↑↑↑ /VARIABLES DECLARATION ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ WORK WITH LOCALSTORAGE ↓↓↓ */
  let myBooks = JSON.parse( ls.getItem('myBooks') ) || {};

  if ( !('generalSettings' in myBooks) ) {
    myBooks.generalSettings = {bookListType: 'big'}
  } else {
    if ( !('bookListType' in myBooks.generalSettings ) ) {
      myBooks.generalSettings.bookListType = 'big'
    }
  }
  bookListType = myBooks.generalSettings.bookListType;
/* ↑↑↑ /WORK WITH LOCALSTORAGE ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ MAIN LOGIC ↓↓↓ */
  // побудова списку
  buildBooksList();

  // відображення кількості книжок в базі
  document.getElementById('booksAmount').innerHTML = books.sort(compare).length + ' кн.';
/* ↑↑↑ /MAIN LOGIC ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ ASSIGNMENT OF HANDLERS ↓↓↓ */
  // навішування обробників на кнопки вигляду списку
  document.getElementById('bigList').onclick = function() {
    bookListType = 'big';
    myBooks.generalSettings.bookListType = 'big';
    ls.setItem( 'myBooks', JSON.stringify(myBooks) );
    buildBooksList();
  };
  document.getElementById('smallList').onclick = function() {
    bookListType = 'small';
    myBooks.generalSettings.bookListType = 'small';
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
    // підсвітка активної кнопки
    if (bookListType == 'big') {
      document.getElementById('bigList').classList
                                        .add('books-panel__btn_active');
      document.getElementById('smallList').classList
                                          .remove('books-panel__btn_active');
    } else if (bookListType == 'small') {
      document.getElementById('smallList').classList
                                          .add('books-panel__btn_active');
      document.getElementById('bigList').classList
                                          .remove('books-panel__btn_active');
    }

    // побудова списку
    bookList.innerHTML = '';
    let sortedArr = books.sort(compare);
    if (bookListType == 'big') {
      sortedArr.forEach(function(item){
        let book = '\
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
        bookList.insertAdjacentHTML('beforeEnd', book);
      });
    } else if (bookListType == 'small') {
      sortedArr.forEach(function(item){
        let book = '\
                    <a  class="book-sm" style="display: block;\
                              text-align: left;\
                              color: #1c2e3d;\
                              text-decoration: none;\
                              padding-bottom: 5px;\
                              margin-bottom: 5px;\
                              border-bottom: 1px dotted lightgrey"\
                        href="books/' + item.id + '/index.html">\
                      <span style="font-weight: 900">' + item.author + ' - </span>\
                      <span>' + item.name + '</span>\
                    </a>\
                   ';
        bookList.insertAdjacentHTML('beforeEnd', book);
      });
    }
  }

  function searchBook() {
    //побудова списку потрібна, бо зміна в інпуті може бути від'ємна (напр: 'author' -> 'auth')
    buildBooksList();

    let value     = this.value.toLowerCase();
    let searchArr = document.querySelector('.books-list').children;

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

    keyForCompare    = sortType;
    console.log("keyForCompare", keyForCompare);
    buildBooksList();

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