"use strict";
// header module

////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ language switcher ↓↓↓ */
  document.querySelector('.header__lang').onclick = function(e) {
    // поточне посилання
    let href           = window.location.href;

    // захист від порожніх посилань
    if ( href.indexOf('#') == href.length - 1 ) {
      href = href.slice(0, href.length - 1);
    }

    // пошук символа _
    let languageMarker = href.slice(-8,-7);

    let hrefBody;
    let newHref;
    if ( languageMarker == '_' ) {
      hrefBody        = href.slice(0,-8);
    } else {
      hrefBody        = href.slice(0,-5);
    }

    let selectedLanguage = event.target.innerHTML.toLowerCase();

    if ( selectedLanguage == 'en' ) {
      if ( hrefBody.endsWith('index') ) {
        newHref = 'index.html';
      } else {
        newHref = hrefBody + '_ru.html'
      }
    } else {
      if ( window.location.href.indexOf('.html') == -1 ) {
        newHref = window.location.href + 'index_en.html'
      } else {
        newHref = hrefBody + '_en.html'
      }
    }

    window.location.href = newHref;
  }
/* ↑↑↑ language switcher ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////