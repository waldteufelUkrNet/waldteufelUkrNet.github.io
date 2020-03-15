"use strict";
// bbp module
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ визначення ідентифікатору книги, робота з localStorage ↓↓↓ */
  let href     = location.href;
  let position = href.indexOf('books');
  let bookId   = href.slice(position+6, position+11);
  let ls       = localStorage;
  let myBooks  = JSON.parse( ls.getItem('myBooks') ) || {};

  let fontName, fontSize, fontColor;

  // налаштування стилів книги
  if ( !('generalSettings' in myBooks) ) {
    myBooks.generalSettings = {}
  }
  if ( !('booksFontSettings' in myBooks.generalSettings) ) {
    myBooks.generalSettings.booksFontSettings = {};

    let bookTag = document.getElementById('book');
    myBooks.generalSettings.booksFontSettings.fontName = getComputedStyle(bookTag).fontFamily;
    myBooks.generalSettings.booksFontSettings.size = getComputedStyle(bookTag).fontSize;
    myBooks.generalSettings.booksFontSettings.color = getComputedStyle(bookTag).color;
    myBooks.generalSettings.booksFontSettings.bgColor = '#ffffff';
    ls.setItem( 'myBooks', JSON.stringify(myBooks) );
  } else {
    let bookTag = document.getElementById('book');
    bookTag.style.fontSize  = myBooks.generalSettings.booksFontSettings.size;
    bookTag.style.color = myBooks.generalSettings.booksFontSettings.color;
    bookTag.style.backgroundColor = myBooks.generalSettings.booksFontSettings.bgColor;

    let font      = myBooks.generalSettings.booksFontSettings.fontName;
    document.querySelector('.bbp__oa-options-font-current-name').innerHTML = font;
    setFont(font);
  }

  document.querySelector('.textColorInput').value = myBooks.generalSettings.booksFontSettings.color;
  document.querySelector('.pageColorInput').value = myBooks.generalSettings.booksFontSettings.bgColor;

  document.querySelector('.fontNameIndicator').innerHTML = myBooks.generalSettings.booksFontSettings.fontName;
  document.querySelector('.fontSizeIndicator').innerHTML = myBooks.generalSettings.booksFontSettings.size;
  document.querySelector('.fontColorIndicator').innerHTML = myBooks.generalSettings.booksFontSettings.color;
  document.querySelector('.pageColorIndicator').innerHTML = myBooks.generalSettings.booksFontSettings.bgColor;

  let exampleIndicator = document.querySelector('.bbp__oa-block_display');
  exampleIndicator.style.fontSize = myBooks.generalSettings.booksFontSettings.size;
  exampleIndicator.style.color = myBooks.generalSettings.booksFontSettings.color;
  exampleIndicator.style.backgroundColor = myBooks.generalSettings.booksFontSettings.bgColor;

  // робота із закладкою (якщо вона є)
  if ( !('books' in myBooks) ) {
    myBooks.books = {[bookId]: {bookmark: []} }
  } else {
    if ( !(bookId in myBooks.books) ) {
      myBooks.books[bookId] = {bookmark: []}
    }
  }
  if (myBooks.books[bookId].bookmark.length == 2) {
    showBookmarksBtns();
  }
/* ↑↑↑ /визначення ідентифікатору книги, робота з localStorage ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ навішування обробників на кнопки головного меню ↓↓↓ */
  let bottomBookPanelBtns = document.getElementsByClassName('bbp__btn');
  for ( let i = 0; i < bottomBookPanelBtns.length; i++ ) {
    (function(n){
      bottomBookPanelBtns[n].onclick = function(event) {

        // підсвітка натисненої кнопки
        event.currentTarget.classList.add('bbp__btn_active');
        (function(i){
          setTimeout( function(){
          i.classList.remove('bbp__btn_active');
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
            toggleOptionsPanel('selectText');
            break;
          case 'options':
            toggleOptionsPanel('options');
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

  let fontSizeBtns = document.getElementsByClassName('fontSize');
  addEventListenerToObject('click', fontSizeBtns, resizeFont);

  document.querySelector('.bbp__oa-options-font-current-name').onclick = function() {
    document.querySelector('.bbp__oa-options-font-list').classList.toggle('bbp__oa-options-font-list_active');
  }
  document.addEventListener('click', function() {
    if ( event.target.closest('.bbp__oa-options-font-current-name') ) return;
    if ( document.querySelector('.bbp__oa-options-font-list_active') ) {
      document.querySelector('.bbp__oa-options-font-list_active').classList.remove('bbp__oa-options-font-list_active');
    }
  });

  document.querySelector('.textColorInput').oninput = setFontColor;
  document.querySelector('.pageColorInput').oninput = setPageColor;

  let selectedBtns = document.getElementsByClassName('selected');
  addEventListenerToObject('click', selectedBtns, markText);

  // вибір шрифта
  let fontItem = document.getElementsByClassName('bbp__oa-options-font-item');
  addEventListenerToObject('click', fontItem, handleFont);
/* ↑↑↑ /навішування обробників на кнопки головного меню ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ FUNCTIONS DECLARATION ↓↓↓ */

  /**
   * [showBookmarksBtns створення кнопок закладки]
   */
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

  /**
   * [removeBookmarksBtns прибирання закладки]
   */
  function removeBookmarksBtns() {
    //видалити обитві кнопки та почистити локальне сховище
    document.querySelector('.bookmark-in-first-screen').remove();
    document.querySelector('.bookmark-in-text').remove();

    myBooks.books[bookId].bookmark = [];
    ls.setItem( 'myBooks', JSON.stringify(myBooks) );
  }

  /**
   * [goToBookmark відкриття книги в місці закладки]
   */
  function goToBookmark() {
    let tag         = myBooks.books[bookId].bookmark[0];
    let number      = myBooks.books[bookId].bookmark[1];
    let arrOfTags   = document.querySelectorAll('#book ' + tag);
    let markeredTag = arrOfTags[number];
    markeredTag.scrollIntoView({behavior:'smooth'});
  }

  /**
   * [toggleOptionsPanel закриття/відкриття панелей налаштувань]
   * @param {[String]} panel [id панелі]
   */
  function toggleOptionsPanel(panel) {
    if (panel == 'options') {
      if ( document.querySelector('.bbp__oa_options').classList.contains('bbp__oa_active') ) {
        document.querySelector('.bbp__oa_active').classList.remove('bbp__oa_active');
      } else {
        if ( document.querySelector('.bbp__oa_active') ) {
          document.querySelector('.bbp__oa_active').classList.remove('bbp__oa_active');
        }
        document.querySelector('.bbp__oa_options').classList.add('bbp__oa_active');
      }
    } else if (panel == 'selectText') {
      if ( document.querySelector('.bbp__oa_colors').classList.contains('bbp__oa_active') ) {
        document.querySelector('.bbp__oa_active').classList.remove('bbp__oa_active');
      } else {
        if ( document.querySelector('.bbp__oa_active') ) {
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

  /**
   * [resizeFont змінює розмір шрифту книги]
   */
  function resizeFont() {
    let exampleIndicator = document.querySelector('.bbp__oa-block_display');
    let buttonBehavior   = event.currentTarget.dataset.behavior;
    let indicator        = document.querySelector('.fontSizeIndicator');
    let book             = document.getElementById('book');
    let fontSize         = +getComputedStyle(book).fontSize.slice(0,2);
    let newFontSize;
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
    ls.setItem( 'myBooks', JSON.stringify(myBooks) );
  }

  function setFontColor() {
    let textColor        = event.currentTarget.value;
    let exampleIndicator = document.querySelector('.bbp__oa-block_display');
    let indicator        = document.querySelector('.fontColorIndicator');
    let book             = document.getElementById('book');

    exampleIndicator.style.color = textColor;
    book.style.color = textColor;
    indicator.innerHTML = textColor;

    myBooks.generalSettings.booksFontSettings.color = textColor;
    ls.setItem( 'myBooks', JSON.stringify(myBooks) );
  }

  function setPageColor() {
    let pageColor        = event.currentTarget.value;
    let exampleIndicator = document.querySelector('.bbp__oa-block_display');
    let indicator        = document.querySelector('.pageColorIndicator');
    let book             = document.getElementById('book');

    exampleIndicator.style.backgroundColor = pageColor;
    book.style.backgroundColor = pageColor;
    indicator.innerHTML = pageColor;

    myBooks.generalSettings.booksFontSettings.bgColor = pageColor;
    ls.setItem( 'myBooks', JSON.stringify(myBooks) );
  }

  function markText() {
    let selectedText = window.getSelection();
    if (!selectedText.anchorNode) return;

    let markedClass  = 'selected_' + this.dataset.select;

    let {anchorNode, anchorOffset, focusNode, focusOffset} = selectedText;

    // знаходимо спільного предка для усіх тегів виділення
    // через Range не підходить, бо focus може бути перед anchor
    let parentNode = anchorNode.parentNode;
    while ( !parentNode.contains(focusNode) ) {
      parentNode = parentNode.parentNode;
    }

    // усі вузли виділення огортаємо в окремий не стандартний тег
    let nodes = selectedText.getRangeAt(0).cloneContents();
    // console.log(nodes);
    for (let node of nodes.childNodes) {
      let html;
      if (node.innerHTML) {
        html = node.innerHTML;
        node.innerHTML = '<mspan class="' + markedClass + '">' + html + '</mspan>';
      } else {
        console.log('data');
        html = node.data
      }
    }
    // console.log(nodes);

    // замінюємо у предку старе виділення на перероблене
    parentNode.innerHTML = parentNode.innerHTML.replace(selectedText, nodes.toString());

    // 4 зробити запис в ls: anchorNode, anchorOffset, focusNode, focusOffset + клас

    // перехресні виділення?









    // console.log( selectedText.toString() );
    // console.log( selectedText.getRangeAt(0).cloneContents() );
  }

  function handleFont() {
    let font = this.innerHTML;
    document.querySelector('.fontNameIndicator').innerHTML = font;
    document.querySelector('.bbp__oa-options-font-current-name').innerHTML = font;

    myBooks.generalSettings.booksFontSettings.fontName = font;
    ls.setItem( 'myBooks', JSON.stringify(myBooks) );

    setFont(font);
  }

  function setFont(font) {
    let lightningConductor = document.getElementById('lightning-conductor');
    let book               = document.getElementById('book') || lightningConductor;
    let content            = document.querySelector('.content-section__name') || lightningConductor;
    let boldLinks          = document.getElementsByClassName('content__main-link') || lightningConductor;
    let subLinks           = document.getElementsByClassName('content__sub-link') || lightningConductor;
    let sub2Links          = document.getElementsByClassName('content__sub2-link') || lightningConductor;
    let sub3Links          = document.getElementsByClassName('content__sub3-link') || lightningConductor;
    let h1                 = document.getElementsByTagName('h1') || lightningConductor;
    let h2                 = document.getElementsByTagName('h2') || lightningConductor;
    let h3                 = document.getElementsByTagName('h3') || lightningConductor;
    let h4                 = document.getElementsByTagName('h4') || lightningConductor;
    let h5                 = document.getElementsByTagName('h5') || lightningConductor;
    let h6                 = document.getElementsByTagName('h6') || lightningConductor;
    let b                  = document.getElementsByTagName('b') || lightningConductor;
    let i                  = document.getElementsByTagName('i') || lightningConductor;
    let i2                 = document.getElementsByClassName('f-coni') || lightningConductor;
    let btext              = document.getElementsByClassName('btext') || lightningConductor;
    let display            = document.querySelector('.bbp__oa-block_display') || lightningConductor;
    let curName            = document.querySelector('.bbp__oa-options-font-current-name') || lightningConductor;

    switch(font) {
      case 'arial':
        book.style.fontFamily = 'ar';
        content.style.fontFamily = 'ab';
        for (let link of boldLinks) link.style.fontFamily = 'ab';
        for (let link of subLinks) link.style.fontFamily = 'ar';
        for (let link of sub2Links) link.style.fontFamily = 'ar';
        for (let link of sub3Links) link.style.fontFamily = 'ar';
        for (let h of h1) h.style.fontFamily = 'ab';
        for (let h of h2) h.style.fontFamily = 'ab';
        for (let h of h3) h.style.fontFamily = 'ab';
        for (let h of h4) h.style.fontFamily = 'ab';
        for (let h of h5) h.style.fontFamily = 'ab';
        for (let h of h6) h.style.fontFamily = 'ab';
        for (let i of b) i.style.fontFamily = 'ab';
        for (let a of i) a.style.fontFamily = 'ai';
        for (let a of i2) a.style.fontFamily = 'ai';
        for (let a of btext) a.style.fontFamily = 'ar';
        display.style.fontFamily = 'ar';
        curName.style.fontFamily = 'ar';
        break
      case 'consola':
        book.style.fontFamily = 'cr';
        content.style.fontFamily = 'cb';
        for (let link of boldLinks) link.style.fontFamily = 'cb';
        for (let link of subLinks) link.style.fontFamily = 'cr';
        for (let link of sub2Links) link.style.fontFamily = 'cr';
        for (let link of sub3Links) link.style.fontFamily = 'cr';
        for (let h of h1) h.style.fontFamily = 'cb';
        for (let h of h2) h.style.fontFamily = 'cb';
        for (let h of h3) h.style.fontFamily = 'cb';
        for (let h of h4) h.style.fontFamily = 'cb';
        for (let h of h5) h.style.fontFamily = 'cb';
        for (let h of h6) h.style.fontFamily = 'cb';
        for (let i of b) i.style.fontFamily = 'cb';
        for (let a of i) a.style.fontFamily = 'ci';
        for (let a of i2) a.style.fontFamily = 'ci';
        for (let a of btext) a.style.fontFamily = 'cr';
        display.style.fontFamily = 'cr';
        curName.style.fontFamily = 'cr';
        break
      case 'gost':
        book.style.fontFamily = 'gost';
        content.style.fontFamily = 'bold';
        for (let link of boldLinks) link.style.fontFamily = 'bold';
        for (let link of subLinks) link.style.fontFamily = 'gost';
        for (let link of sub2Links) link.style.fontFamily = 'gost';
        for (let link of sub3Links) link.style.fontFamily = 'gost';
        for (let h of h1) h.style.fontFamily = 'bold';
        for (let h of h2) h.style.fontFamily = 'bold';
        for (let h of h3) h.style.fontFamily = 'bold';
        for (let h of h4) h.style.fontFamily = 'bold';
        for (let h of h5) h.style.fontFamily = 'bold';
        for (let h of h6) h.style.fontFamily = 'bold';
        for (let i of b) i.style.fontFamily = 'bold';
        for (let a of i) a.style.fontFamily = 'condensed_italic';
        for (let a of i2) a.style.fontFamily = 'condensed_italic';
        for (let a of btext) a.style.fontFamily = 'gost';
        display.style.fontFamily = 'gost';
        curName.style.fontFamily = 'gost';
        break
      case 'roboto':
        book.style.fontFamily = 'rr';
        content.style.fontFamily = 'rb';
        for (let link of boldLinks) link.style.fontFamily = 'rb';
        for (let link of subLinks) link.style.fontFamily = 'rr';
        for (let link of sub2Links) link.style.fontFamily = 'rr';
        for (let link of sub3Links) link.style.fontFamily = 'rr';
        for (let h of h1) h.style.fontFamily = 'rb';
        for (let h of h2) h.style.fontFamily = 'rb';
        for (let h of h3) h.style.fontFamily = 'rb';
        for (let h of h4) h.style.fontFamily = 'rb';
        for (let h of h5) h.style.fontFamily = 'rb';
        for (let h of h6) h.style.fontFamily = 'rb';
        for (let i of b) i.style.fontFamily = 'rb';
        for (let a of i) a.style.fontFamily = 'ri';
        for (let a of i2) a.style.fontFamily = 'ri';
        for (let a of btext) a.style.fontFamily = 'rr';
        display.style.fontFamily = 'rr';
        curName.style.fontFamily = 'rr';
        break
      case 'segoe':
        book.style.fontFamily = 'segr';
        content.style.fontFamily = 'segb';
        for (let link of boldLinks) link.style.fontFamily = 'segb';
        for (let link of subLinks) link.style.fontFamily = 'segr';
        for (let link of sub2Links) link.style.fontFamily = 'segr';
        for (let link of sub3Links) link.style.fontFamily = 'segr';
        for (let h of h1) h.style.fontFamily = 'segb';
        for (let h of h2) h.style.fontFamily = 'segb';
        for (let h of h3) h.style.fontFamily = 'segb';
        for (let h of h4) h.style.fontFamily = 'segb';
        for (let h of h5) h.style.fontFamily = 'segb';
        for (let h of h6) h.style.fontFamily = 'segb';
        for (let i of b) i.style.fontFamily = 'segb';
        for (let a of i) a.style.fontFamily = 'segi';
        for (let a of i2) a.style.fontFamily = 'segi';
        for (let a of btext) a.style.fontFamily = 'serg';
        display.style.fontFamily = 'segr';
        curName.style.fontFamily = 'segr';
        break
      case 'times new roman':
        book.style.fontFamily = 'tnrr';
        content.style.fontFamily = 'tnrb';
        for (let link of boldLinks) link.style.fontFamily = 'tnrb';
        for (let link of subLinks) link.style.fontFamily = 'tnrr';
        for (let link of sub2Links) link.style.fontFamily = 'tnrr';
        for (let link of sub3Links) link.style.fontFamily = 'tnrr';
        for (let h of h1) h.style.fontFamily = 'tnrb';
        for (let h of h2) h.style.fontFamily = 'tnrb';
        for (let h of h3) h.style.fontFamily = 'tnrb';
        for (let h of h4) h.style.fontFamily = 'tnrb';
        for (let h of h5) h.style.fontFamily = 'tnrb';
        for (let h of h6) h.style.fontFamily = 'tnrb';
        for (let i of b) i.style.fontFamily = 'tnrb';
        for (let a of i) a.style.fontFamily = 'tnri';
        for (let a of i2) a.style.fontFamily = 'tnri';
        for (let a of btext) a.style.fontFamily = 'tnrr';
        display.style.fontFamily = 'tnrr';
        curName.style.fontFamily = 'tnrr';
        break
    }
  }
/* ↑↑↑ /FUNCTIONS DECLARATION ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////