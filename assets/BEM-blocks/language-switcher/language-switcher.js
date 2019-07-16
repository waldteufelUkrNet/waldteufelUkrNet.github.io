'use strict'

$(document).ready(function(){

  // відкрити/закрити
  let isLanguageSwitcherOpen = false;
  $('.language-switcher__cover-for-click').click(function(){

    if (isLanguageSwitcherOpen) {
      $('.language-switcher__toggle').css('display','none');
      isLanguageSwitcherOpen = false;
    } else {
      $('.language-switcher__toggle').css('display','block');
      isLanguageSwitcherOpen = true;
    }
  });

  // вибор мови: якщо та сама мова - закрити переключалку і нічого не робити,
  //             якщо інша мова - зробити перенаправлення
  $('.language-switcher__lang').click(function() {
    let selectedLanguage = $(this).attr('data-lang');
    if ( selectedLanguage == $( '.language-switcher:eq(0)' ).attr('data-lang') ) {
      // закриваємо переключалку
      $('.language-switcher__toggle').css('display','none');
      isLanguageSwitcherOpen = false;
    } else {
      // робимо перенаправлення
      // поточне посилання
      let href = window.location.href;

      // захист від порожніх посилань - прибираємо з кінця #
      if ( href.indexOf('#') == href.length - 1 ) {
        href = href.slice(0, href.length - 1);
      }

      // пошук символу _
      let languageMarker = href.slice(-8,-7);

      let hrefBody,
          newHref;

      // визначення тіла посилання
      if ( languageMarker == '_' ) {
        hrefBody        = href.slice(0,-8);
      } else {
        hrefBody        = href.slice(0,-5);
      }

      // формування нового рядка
      if ( selectedLanguage == 'en' ) {
        // щоб працювало в офлайні при localhost:3000
        if ( window.location.href.indexOf('.html') == -1 ) {
          newHref = window.location.href + 'index_en.html'
        } else {
          newHref = hrefBody + '_en.html'
        }
      } else {
        // щоб працювало в офлайні при localhost:3000
        if ( window.location.href.indexOf('.html') == -1 ) {
          newHref = window.location.href + 'index.html'
        } else {
          newHref = hrefBody + '.html'
        }
      }

      window.location.href = newHref;

    }
  });

  // закриття при кліку мимо кнопки
  $(document).click(function(e){
    if ( !$(e.target).parent().attr('data-lang') &&
         $(e.target)[0].className != 'language-switcher__cover-for-click' ) {

      $('.language-switcher__toggle').css('display','none');
      isLanguageSwitcherOpen = false;

    }
  });

});