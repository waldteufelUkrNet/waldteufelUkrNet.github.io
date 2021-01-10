"use strict";
// bbp module
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ визначення ідентифікатору книги, робота з localStorage ↓↓↓ */
  let href     = location.href;
  let position = href.indexOf('books');
  let bookId   = href.slice(position+6, position+11);
  let ls       = localStorage;
  let myBooks  = JSON.parse( ls.getItem('myBooks') ) || {};

  let fontFamily, fontSize, fontColor;

  // налаштування стилів книги
  if ( !('generalSettings' in myBooks) ) {
    myBooks.generalSettings = {}
    ls.setItem( 'myBooks', JSON.stringify(myBooks) );
  }

  let bookTag = document.getElementById('book');
  if ( !('booksFontSettings' in myBooks.generalSettings) ) {
    myBooks.generalSettings.booksFontSettings = {};

    myBooks.generalSettings.booksFontSettings.fontFamily  = 'gost';
    myBooks.generalSettings.booksFontSettings.fontSize    = '16px';
    myBooks.generalSettings.booksFontSettings.fontColor   = '#000000';
    myBooks.generalSettings.booksFontSettings.bgColor     = '#ffffff';

    ls.setItem( 'myBooks', JSON.stringify(myBooks) );
  } else {
    bookTag.style.fontSize        = myBooks.generalSettings.booksFontSettings.fontSize;
    bookTag.style.color           = myBooks.generalSettings.booksFontSettings.fontColor;
    bookTag.style.backgroundColor = myBooks.generalSettings.booksFontSettings.bgColor;
  }

  // зміна значень в input'ах
  document.querySelector('.textColorInput').value = myBooks.generalSettings.booksFontSettings.fontColor;
  document.querySelector('.pageColorInput').value = myBooks.generalSettings.booksFontSettings.bgColor;

  // зміна значень в описах біля input'ів
  document.querySelector('.fontNameIndicator').innerHTML  = myBooks.generalSettings.booksFontSettings.fontFamily;
  document.querySelector('.fontSizeIndicator').innerHTML  = myBooks.generalSettings.booksFontSettings.fontSize;
  document.querySelector('.fontColorIndicator').innerHTML = myBooks.generalSettings.booksFontSettings.fontColor;
  document.querySelector('.pageColorIndicator').innerHTML = myBooks.generalSettings.booksFontSettings.bgColor;

  // зміна стилів демонстраційного вікна
  let exampleIndicator = document.querySelector('.bbp__oa-block_display');
  exampleIndicator.style.fontSize        = myBooks.generalSettings.booksFontSettings.size;
  exampleIndicator.style.color           = myBooks.generalSettings.booksFontSettings.color;
  exampleIndicator.style.backgroundColor = myBooks.generalSettings.booksFontSettings.bgColor;

  // тут ще шрифт
  setFont();

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
/* ↓↓↓ навішування обробників ↓↓↓ */
  // кнопки головного меню
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

            // прибрати стару закладку
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

            // згенерувати кнопки
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

  // панель налаштувань
  // розмір шрифту
  let fontSizeBtns = document.getElementsByClassName('fontSize');
  addEventListenerToObject('click', fontSizeBtns, resizeFont);

  // випадаючий список шрифтів
  document.querySelector('.bbp__oa-options-font-current-name').onclick = function() {
    document.querySelector('.bbp__oa-options-font-list').classList.toggle('bbp__oa-options-font-list_active');
  }
  document.addEventListener('click', function() {
    if ( event.target.closest('.bbp__oa-options-font-current-name') ) return;
    if ( document.querySelector('.bbp__oa-options-font-list_active') ) {
      document.querySelector('.bbp__oa-options-font-list_active').classList.remove('bbp__oa-options-font-list_active');
    }
  });

  // вибір шрифту
  let fontItem = document.getElementsByClassName('bbp__oa-options-font-item');
  addEventListenerToObject('click', fontItem, setFont);

  // кольори шрифту та тла
  document.querySelector('.textColorInput').oninput = setFontColor;
  document.querySelector('.pageColorInput').oninput = setPageColor;

  let selectedBtns = document.getElementsByClassName('selected');
  addEventListenerToObject('click', selectedBtns, prepareSelection);
/* ↑↑↑ /навішування обробників ↑↑↑ */
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
    let buttonBehavior   = event.currentTarget.dataset.behavior;
    let fontSize         = +myBooks.generalSettings.booksFontSettings.fontSize.slice(0,2);
    let newFontSize;
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
    ls.setItem( 'myBooks', JSON.stringify(myBooks) );

    pagination();
  }

  function setFontColor() {
    let fontColor        = event.currentTarget.value;
    let exampleIndicator = document.querySelector('.bbp__oa-block_display');
    let indicator        = document.querySelector('.fontColorIndicator');
    let book             = document.getElementById('book');

    exampleIndicator.style.color = fontColor;
    book.style.color             = fontColor;
    indicator.innerHTML          = fontColor;

    myBooks.generalSettings.booksFontSettings.fontColor = fontColor;
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

  function setFont() {
    let font;

    if (!this) {
      font = myBooks.generalSettings.booksFontSettings.fontFamily;
    } else {
      font = this.innerHTML;
    }

    myBooks.generalSettings.booksFontSettings.fontFamily = font;
    ls.setItem( 'myBooks', JSON.stringify(myBooks) );

    // зміна значень в активному ел-ті списку та його описі
    document.querySelector('.bbp__oa-options-font-current-name').innerHTML = font;
    document.querySelector('.fontNameIndicator').innerHTML = font;

    // зміна стилю демонстраційного вікна та самої книги
    let boldFont, regFont, italFont;
    switch(font) {
      case 'arial':
        boldFont = 'ab';
        regFont = 'ar';
        italFont = 'ai';
        break
      case 'consola':
        boldFont = 'cb';
        regFont = 'cr';
        italFont = 'ci';
        break
      case 'gost':
        boldFont = 'bold';
        regFont = 'gost';
        italFont = 'condensed_italic';
        break
      case 'roboto':
        boldFont = 'rb';
        regFont = 'rr';
        italFont = 'ri';
        break
      case 'segoe':
        boldFont = 'segb';
        regFont = 'segr';
        italFont = 'segi';
        break
      case 'times new roman':
        boldFont = 'tnrb';
        regFont = 'tnrr';
        italFont = 'tnri';
        break
      case 'bulgaria':
        boldFont = 'bmp';
        regFont = 'bmp';
        italFont = 'bmp';
        break
    }

    let lightningConductor = document.getElementById('lightning-conductor'),
        book               = document.getElementById('book')                              || lightningConductor,
        content            = document.querySelector('.content-section__name')             || lightningConductor,
        boldLinks          = document.getElementsByClassName('content__main-link')        || lightningConductor,
        subLinks           = document.getElementsByClassName('content__sub-link')         || lightningConductor,
        sub2Links          = document.getElementsByClassName('content__sub2-link')        || lightningConductor,
        sub3Links          = document.getElementsByClassName('content__sub3-link')        || lightningConductor,
        h1                 = document.getElementsByTagName('h1')                          || lightningConductor,
        h2                 = document.getElementsByTagName('h2')                          || lightningConductor,
        h3                 = document.getElementsByTagName('h3')                          || lightningConductor,
        h4                 = document.getElementsByTagName('h4')                          || lightningConductor,
        h5                 = document.getElementsByTagName('h5')                          || lightningConductor,
        h6                 = document.getElementsByTagName('h6')                          || lightningConductor,
        b                  = document.getElementsByTagName('b')                           || lightningConductor,
        i                  = document.getElementsByTagName('i')                           || lightningConductor,
        i2                 = document.getElementsByClassName('f-coni')                    || lightningConductor,
        btext              = document.getElementsByClassName('btext')                     || lightningConductor,
        display            = document.querySelector('.bbp__oa-block_display')             || lightningConductor,
        curName            = document.querySelector('.bbp__oa-options-font-current-name') || lightningConductor,
        bookName           = document.getElementsByClassName('name-section__book')[0]     || lightningConductor,
        authorName         = document.getElementsByClassName('name-section__author')[0]   || lightningConductor;

    book.style.fontFamily = regFont;
    content.style.fontFamily = boldFont;
    for (let link of boldLinks) link.style.fontFamily = boldFont;
    for (let link of subLinks) link.style.fontFamily = regFont;
    for (let link of sub2Links) link.style.fontFamily = regFont;
    for (let link of sub3Links) link.style.fontFamily = regFont;
    for (let h of h1) h.style.fontFamily = boldFont;
    for (let h of h2) h.style.fontFamily = boldFont;
    for (let h of h3) h.style.fontFamily = boldFont;
    for (let h of h4) h.style.fontFamily = boldFont;
    for (let h of h5) h.style.fontFamily = boldFont;
    for (let h of h6) h.style.fontFamily = boldFont;
    for (let i of b) i.style.fontFamily = boldFont;
    for (let a of i) a.style.fontFamily = italFont;
    for (let a of i2) a.style.fontFamily = italFont;
    for (let a of btext) a.style.fontFamily = regFont;
    display.style.fontFamily = regFont;
    curName.style.fontFamily = regFont;
    bookName.style.fontFamily = regFont;
    authorName.style.fontFamily = regFont;

    pagination();
  }

  /**
   * [prepareSelection визначення меж виділення, запис цих меж у ls, виклик функції підсвітки]
   */
  function prepareSelection() {
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

    // формуємо мітку предка: [tag, counting number]
    let parentMark = [parentNode.tagName.toLowerCase()];
    if ( parentNode.getAttribute('id') == 'book' ) {
      // div#book - найвищий елемент, братів не має
      parentMark.push('book');
    } else {
      let bookElementsList = document.querySelectorAll('#book ' + parentMark[0]);
      for (let i = 0; i < bookElementsList.length; i++ ) {
        if ( bookElementsList[i] == parentNode ) {
          parentMark.push(i);
          break
        }
      }
    }

    // формуємо інфо по виділенню
    let mark = {
      parent      : parentMark,
      markedClass : markedClass,
      start       : calculateMarkPosition(anchorNode, anchorOffset, parentNode),
      end         : calculateMarkPosition(focusNode, focusOffset, parentNode)
    };

    // зберігаємо дані в ls
    myBooks  = JSON.parse( ls.getItem('myBooks') ) || {};
    if ( !('books' in myBooks) ) {
      myBooks.books = {[bookId]: {selections: []} }
    } else {
      if ( !(bookId in myBooks.books) ) {
        myBooks.books[bookId] = {selections: []}
      } else {
        if ( !('selections' in myBooks.books[bookId] ) ) {
          myBooks.books[bookId].selections = []
        }
      }
    }

    let selectionsArr = myBooks.books[bookId].selections;
    selectionsArr.push(mark);
    ls.setItem( 'myBooks', JSON.stringify(myBooks) );

    // викликаємо функцію підсвітки
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
    let mark;
    let nodeType = node.nodeType; // 1 - element; 3 - text

    if (nodeType == 1) {
      console.log("nodeType", nodeType);
      // tag - визначаємо його положення відносно parentNode,
      // мітка виду ['tag', tagName, tagCountingNumber]
      let parentElement = node.parentElement;
      console.log("parentElement", parentElement);
      if ( parentElement.getAttribute('id') == 'book' ) {
        let nodeTagName = node.tagName.toLowerCase();
        console.log("nodeTagName", nodeTagName);
        let arrOfAncestorsChildren = parentElement.querySelectorAll(nodeTagName);
        for (let i = 0; i < arrOfAncestorsChildren.length; i++) {
          if (arrOfAncestorsChildren[i] == node) {
            return ['tag', nodeTagName, i];
          }
        }
      } else {
        let parentElementTagName = parentElement.tagName.toLowerCase();
        let arrOfAncestorsChildren = parentNode.querySelectorAll(parentElementTagName);
        for (let i = 0; i < arrOfAncestorsChildren.length; i++) {
          if (arrOfAncestorsChildren[i] == parentElement) {
            return ['text', parentElementTagName, i];
          }
        }
      }
    } else if (nodeType == 3) {
      // text
      // якщо це текст, то батьком його обов'язково буде елемент.
      let parentElement = node.parentElement;
      if ( parentElement == parentNode) {
        // якщо батько текстового вузла є предком виділення
        // мітка виду ['text', textNodeCountingNumber, offset]
        let childrenNodes = parentElement.childNodes;
        for (let i = 0; i < childrenNodes.length; i++) {
          if (childrenNodes[i].data == node.data) {
            return ['text', i, offset];
          }
        }
      } else {
        // якщо батько текстового вузла є дочірнім елементом предка виділення
        // мітка виду ['text', parentTagName, parentTagCountingNumber, textNodeCountingNumber, offset]

        // визначаємо положення батьківського елемента відносно предка виділення
        let parentElementTagName = parentElement.tagName.toLowerCase();
        let arrOfAncestorsChildren = parentNode.querySelectorAll(parentElementTagName);
        for (let i = 0; i < arrOfAncestorsChildren.length; i++) {
          if (arrOfAncestorsChildren[i] == parentElement) {
            mark = ['text', parentElementTagName, i];
            break
          }
        }

        // визначаємо положення текстового вузла відносно батька
        let childrenNodes = parentElement.childNodes;
        for (let i = 0; i < childrenNodes.length; i++) {
          if (childrenNodes[i].data == node.data) {
            mark.push(i, offset);
            return mark
          }
        }
      }
    }
  }

  function markText(mark) {
    console.log("mark", mark);
    // перехресні виділення?
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
// loader module
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ LOADER ↓↓↓ */
  let loader = document.querySelector('.loader');
  let bookInner = document.querySelector('#book');

  bookInner.style.overflow = 'hidden';

  window.addEventListener('load', function(){
    setTimeout(function(){
      loader.classList.remove('loader_active');
      bookInner.style.overflow = '';
    },1000);
  });
/* ↑↑↑ /LOADER ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ FUNCTIONS DECLARATION ↓↓↓ */
/* ↑↑↑ /FUNCTIONS DECLARATION ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
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
{/* ↓↓↓ SET NAMES AND META-TAGS ↓↓↓ */
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
}/* ↑↑↑ /SET NAMES AND META-TAGS ↑↑↑ */
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
