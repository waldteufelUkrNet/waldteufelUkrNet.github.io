////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ побудова списку країн ↓↓↓ */
var isCountriesListOpen = false;
var blockedCountriesArr = ['AU','IR','IL','CA', 'UA', 'US', 'JP', 'SY','KP'];

$('.contactform__flag-wrapper-cover-for-click').click(function(){
  if (!isCountriesListOpen) {
    // відкриття списку
    $('.contactform__countries-wrapper').css({'display':'block'}).css({'height':'190px'});
    isCountriesListOpen = true;

    // перевірка, чи список уже створювався (щоб не було дублікатів)
    if ( $('.contactform__country').children().length ) {
      return
    }
    // побудова списку
    outer:for(var i=0; i<countriesArr.length; i++) {

      for (var j=0; j<blockedCountriesArr.length; j++) {
        if (blockedCountriesArr[j] == countriesArr[i].ISOcode) {
          continue outer
        }
      }

      var country = '<div class="contactform__country" data-phoneCode="' + countriesArr[i].phoneCode + '" data-imgName="' + countriesArr[i].imgName + '" onclick="addCountryCode(this)">\
                       <div class="contactform__img-flag-wrapper">\
                         <img class="contactform__flag-img" src="assets/img/' + countriesArr[i].imgName + '", alt="country-flag">\
                       </div>\
                       <div class="contactform__country-name">' + countriesArr[i].nameEn + '</div>\
                     </div>';
      $('.contactform__countries-wrapper').append(country);
    }
  } else {
    //закриття списку
    $('.contactform__countries-wrapper').css({'height':'0px'}).css({'display':'none'});
    isCountriesListOpen = false;
  }
});
/* ↑↑↑ /побудова списку країн ↑↑↑ */

$(document).click(function(event) {
  if ( isCountriesListOpen && event.target.className != 'contactform__flag-wrapper-cover-for-click' ) {
    $('.contactform__countries-wrapper').css({'height':'0px'}).css({'display':'none'});
    isCountriesListOpen = false;
  }
});

/* ↓↓↓ вибір країни ↓↓↓ */
var selectedCountry;
function addCountryCode(arg) {
  var THIS = arg;

  // підставляємо отриманий код в input
  var tempCode = $(THIS).attr('data-phoneCode');
  $('#input-country-code').val(tempCode);

  // замінюємо прапорець
  var tempImgName = $(THIS).attr('data-imgName');
  var tempSrc = 'assets/img/' + tempImgName;
  $(THIS).parent().siblings('.contactform__flag-wrapper').find('.contactform__flag-img').attr('src',tempSrc);

  // після вибору країни - фокусування на input з тел. номером
  $('#input-phone').removeAttr('readonly').focus();

  // це для ajax
  selectedCountry = tempImgName.slice(0,-4);
}
/* ↑↑↑ /вибір країни ↑↑↑ */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ phone input - only for numbers ↓↓↓ */
$('#input-phone').keypress(function(e){
  e = e || event;
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  var chr = getChar(e);
  if (chr == null) return;
  if (chr < '0' || chr > '9') {
    return false;
  }
  function getChar(event) {
    if (event.which == null) {
      if (event.keyCode < 32) return null;
      return String.fromCharCode(event.keyCode) // IE
    }
    if (event.which != 0 && event.charCode != 0) {
      if (event.which < 32) return null;
      return String.fromCharCode(event.which) // остальные
    }
    return null; // специальная клавиша
  }
});
/* ↑↑↑ /phone input - only for numbers ↑↑↑ */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let dictionary = {
  emptyField : {
    ru : 'Данное поле не может быть пустым. Заполните поле!',
    en : 'This field cannot be empty. Fill in the field!'
  },
  correctEmail : {
    ru : 'Введите корректную эл. почту!',
    en : 'Enter a valid e-mail!'
  },
  correctPhone : {
    ru : 'Выберите код страны и введите корректный номер телефона!',
    en : 'Select a country code and enter a valid phone number!'
  }
};

let isMessageVisible = false;
/* ↓↓↓ клік на кнопку ↓↓↓ */
$('#btnsubmit').click(function() {


  // валідація імені
  if ( $('#input-firstName').val().length < 2 ) {

    // якщо повідомлення уже є - вийти
    if ( isMessageVisible ) return;

    // підсвітка input'а та фокус
    $('#input-firstName').css({'box-shadow':'0 0 5px red','border-color':'red'}).focus();

    //показати повідомлення та вийти
    showErrorMessage('#input-firstName', dictionary.emptyField);
    isMessageVisible = true;

    return
  }

  // валідація пошти
  var tempEmail = $('#input-email').val();

  if ( !isEmailValid(tempEmail) ) {

    // якщо повідомлення уже є - вийти
    if ( isMessageVisible ) return;

    // підсвітка input'а та фокус
    $('#input-email').css({'box-shadow':'0 0 5px red','border-color':'red'}).focus();

    // показати повідомлення, вийти
    showErrorMessage('#input-email', dictionary.correctEmail);
    isMessageVisible = true;

    return
  }

  // валідація телефону
  if ( $('#input-phone').val().length < 7 ) {

    // якщо повідомлення уже є - вийти
    if ( isMessageVisible ) return;

    // підсвітка input'а та фокус
    $('.contactform__phone-wrapper:eq(0)').css({'box-shadow':'0 0 5px red','border-color':'red'}).focus();

    // показати повідомлення, вийти
    showErrorMessage('.contactform__phone-wrapper:eq(0)', dictionary.correctPhone);
    isMessageVisible = true;

    return
  }

  // валідація текстового поля
  if ( $('#textarea').val().length < 5 ) {

    // якщо повідомлення уже є - вийти
    if ( isMessageVisible ) return;

    // підсвітка input'а та фокус
    $('#textarea').css({'box-shadow':'0 0 5px red','border-color':'red'}).focus();

    // показати повідомлення, вийти
    showErrorMessage('#textarea', dictionary.emptyField);
    isMessageVisible = true;

    return
  }

  // anti-bot-filter
  // if( confirmAntiBotFilterQuestion () == false ) {
  //   return
  // }

  $('#input-firstName').val('');
  $('#input-email').val('');
  $('#textarea').val('');
  $('#input-country-code').val('+000');
  $('.contactform__flag-img').attr('src','assets/img/european_union.png');
  alert('your message has been sent');

});

/* ↑↑↑ /клік на кнопку ↑↑↑ */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ перевірка правильності на input'ах ↓↓↓ */

// якщо ім'я є - прибрати повідомлення
$('#input-firstName').keyup(function(e){
  if ( $('#input-firstName').val().length > 1 ) {
    $('.contactform__error').remove();
    isMessageVisible = false;
    // підсвітка input'а
    $('#input-firstName').css({'box-shadow':'none','border-color':'white'});
  }
});

// якщо пошта коректна - прибрати повідомлення
$('#input-email').keyup(function(){
  var tempEmail = $('#input-email').val();
  if ( isEmailValid(tempEmail) ) {
    $('.contactform__error').remove();
    isMessageVisible = false;
    // підсвітка input'а
    $('#input-email').css({'box-shadow':'none','border-color':'white'});
  }
});

// якщо телефон коректний - прибрати повідомлення
$('#input-phone').keyup(function(e){
  if ( $('#input-phone').val().length > 6 ) {
    $('.contactform__error').remove();
    isMessageVisible = false;
    // підсвітка input'а
    $('.contactform__phone-wrapper:eq(0)').css({'box-shadow':'none','border-color':'white'});
  }
});

// якщо є повідомлення - прибрати повідомлення
$('#textarea').keyup(function(e){
  if ( $('#textarea').val().length > 4 ) {
    $('.contactform__error').remove();
    isMessageVisible = false;
    // підсвітка input'а
    $('#textarea').css({'box-shadow':'none','border-color':'white'});
  }
});

/* ↑↑↑ /перевірка правильності на input'ах ↑↑↑ */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ FUNCTIONS DECLARATIONS ↓↓↓ */
function showErrorMessage(query, text, top, left) {

  let field        = $(query)[0];
  let fieldWidth   = $(field).outerWidth();
  let fieldLeft    = $(field).position().left;
  let fieldBottom  = top || $(field).position().top + $(field).outerHeight();
  let currentLang  = $('.language-switcher').attr('data-lang');
  let message      = $('<div class="contactform__error"></div>').text(text[currentLang])
                                                           .append('<div class="error-triangle"></div>');
  let triangleLeft;
  if (left) {
    triangleLeft = left + 'px';
  } else {
    triangleLeft = fieldLeft + 20 + 'px';
  }

  $(message).css('top', fieldBottom + 10);

  $( $('.contactform')[0] ).append(message);

  $ ($('.error-triangle')[0] ).css('left', triangleLeft);
}

function isEmailValid(email) {

  // повинен бути 1 символ @
  var temp = calculateCharsInStr(email, '@');
  if ( temp != 1 ) return false;

  // повинен бути мінімум 1 символ .
  temp = calculateCharsInStr(email, '.');
  if ( temp < 1 ) return false;

  // символи @ та . не повинні бути крайніми
  if ( email.charAt(0)  == '@' ||
       email.charAt(0)  == '.' ||
       email.charAt( email.length-1 ) == '@' ||
       email.charAt( email.length-1 ) == '.' ) return false;

  // комбінація символів @. не допустима
  if ( email.indexOf('@.') != -1 ) return false;

  // після символу @ обов'язково повинен бути символ .
  var tempArr = email.split('@');
  if ( tempArr[1].indexOf('.') == -1 ) return false

  return true
}

function calculateCharsInStr(str, char) {
  var pos   = 0,
      count = 0;
  while (true) {
    var foundPos = str.indexOf(char, pos);
    if (foundPos == -1) break;
    count++;
    pos = foundPos + 1;
  }
  return count;
}

function isNumeric(n) {
  return !isNaN( parseFloat(n) ) && isFinite(n);
}
/* ↑↑↑ /FUNCTIONS DECLARATIONS ↑↑↑ */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////