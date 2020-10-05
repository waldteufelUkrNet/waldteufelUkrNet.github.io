"use strict";

////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ tabs switching ↓↓↓ */
  let headerBtns     = document.querySelectorAll('.learning__header'),
      learningBodies = document.querySelectorAll('.learning__body');

  headerBtns.forEach(function(button){
    button.onclick = function (event){
      let dataAttrValue = event.currentTarget.getAttribute('data-learn-group');

      document.querySelector('.learning__header_active')
              .classList.remove('learning__header_active');

      document.querySelector('.learning__body_active')
              .classList.remove('learning__body_active');

      for (let body of learningBodies) {
        let currentDataAttrValue = body.getAttribute('data-learn-group');

        if (currentDataAttrValue == dataAttrValue) {
          document.querySelector('.learning__header[data-learn-group="' + dataAttrValue + '"]').classList.add('learning__header_active');
          body.classList.add('learning__body_active');
          return
        }
      }
    }
  });
/* ↑↑↑ /tabs switching ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ books downloading ↓↓↓ */
  (async()=>{
    let bookList      = await requestTextData('assets/db/booklist.txt'),
        bookContainer = document.querySelector('.learning__body[data-learn-group="books"]');
    bookList = bookList.split('\r\n');
    console.log("bookList", bookList);

    let text = 'загрузить';
    if ( document.querySelector('html').getAttribute('lang') == 'en' ) {
      text = 'download';
    }

    let downlodableBook = '\
      <div class="learning__book">\
        <img class="learning__book-logo" src="assets/img/book.jpg" alt="logo">\
        <p class="learning__book-author">Тимофей Фадеев</p>\
        <p class="learning__book-name">Простыми словами о сложном</p>\
        <div class="learning__book-cover">\
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\
            <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72  152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0  48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72  72-72s72 32.3 72 72v72z" </path>\
          </svg>\
        </div>\
        <button type="button" class="learning__download" onclick="downloadBook()">' + text + '\
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">\
            <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm76.45 211.36l-96.42 95.7c-6.65 6.61-17.39 6.61-24.04 0l-96.42-95.7C73.42 337.29 80.54 320 94.82 320H160v-80c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v80h65.18c14.28 0 21.4 17.29 11.27 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"></path>\
          </svg>\
        </button>\
      </div>\
    ';
    bookContainer.insertAdjacentHTML('beforeEnd',downlodableBook);

    bookList.forEach( (item) => {
      console.log("item", item);
      let temp = item.split(' - '),
          author = temp[0],
          name = temp[1];

      let html = '\
        <div class="learning__book learning__book_blocked">\
          <img class="learning__book-logo" src="assets/img/book-logos/' + item + '.jpg" alt="logo">\
          <p class="learning__book-author">' + author + '</p>\
          <p class="learning__book-name">' + name + '</p>\
          <div class="learning__book-cover">\
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\
              <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72  152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0  48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72  72-72s72 32.3 72 72v72z"></path>\
            </svg>\
          </div>\
        </div>\
      ';
      bookContainer.insertAdjacentHTML('beforeEnd',html);
    });
  })();
/* ↑↑↑ /books downloading ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ videos downloading ↓↓↓ */
  (async () => {
    let videoList      = await requestTextData('assets/db/videolist.txt'),
        videoContainer = document.querySelector('.learning__body[data-learn-group="videos"]');
    videoList = videoList.split('\r\n');

    videoList.forEach( (item) => {
      let temp = item.split(' / '),
          name = temp[0],
          time = temp[1];

      let html = '\
        <div class="learning__video learning__video_blocked">\
          <img class="learning__video-logo" src="assets/img/video-logos/' + name + '.jpg" alt="logo">\
          <p class="learning__video-name">' + name[0].toUpperCase() + name.slice(1) + '</p>\
          <p class="learning__time">' + time + '</p>\
          <div class="learning__video-cover">\
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\
              <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72  152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0  48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72  72-72s72 32.3 72 72v72z"></path>\
            </svg>\
          </div>\
        </div>\
      ';
      videoContainer.insertAdjacentHTML('beforeEnd',html);
    });
  })();
/* ↑↑↑ /videos downloading ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ functions declaration ↓↓↓ */
  /**
   * [requestTextData робить GET-запит і завантажує файл зі списком даних]
   * @param  {[String]} url [адреса запиту]
   * @return {[String]}     [результат запиту]
   */
  async function requestTextData(url) {
      let response = await fetch(url);
      let data = await response.text();
      return data
  }

  function downloadBook() {

    let link = document.createElement('a');
    link.download = 'Тимофей Фадеев - Простыми словами о сложном.pdf';

    //http://localhost:3000/assets/book/book.pdf

    link.href = 'assets/book/book.pdf';
    link.click();
    link.remove();

  }
/* ↑↑↑ /functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////