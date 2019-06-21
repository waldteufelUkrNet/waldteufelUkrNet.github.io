////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ побудова списку країн ↓↓↓ */
var isCountriesListOpen = false;
var blockedCountriesArr = ['AU','IR','IL','CA', 'UA', 'US', 'JP', 'SY','KP'];

$('.regform__flag-wrapper-cover-for-click').click(function(){
  if (!isCountriesListOpen) {
    // відкриття списку
    $('.regform__countries-wrapper').css({'display':'block'}).css({'height':'190px'});
    isCountriesListOpen = true;

    // перевірка, чи список уже створювався (щоб не було дублікатів)
    if ( $('.regform__country').children().length ) {
      return
    }
    // побудова списку
    outer:for(var i=0; i<countriesArr.length; i++) {

      for (var j=0; j<blockedCountriesArr.length; j++) {
        if (blockedCountriesArr[j] == countriesArr[i].ISOcode) {
          continue outer
        }
      }

      var country = '<div class="regform__country" data-phoneCode="' + countriesArr[i].phoneCode + '" data-imgName="' + countriesArr[i].imgName + '" onclick="addCountryCode(this)">\
                       <div class="regform__img-flag-wrapper">\
                         <img class="regform__flag-img" src="1/' + countriesArr[i].imgName + '", alt="country-flag">\
                       </div>\
                       <div class="regform__country-name">' + countriesArr[i].nameEn + '</div>\
                     </div>';
      $('.regform__countries-wrapper').append(country);
    }
  } else {
    //закриття списку
    $('.regform__countries-wrapper').css({'height':'0px'}).css({'display':'none'});
    isCountriesListOpen = false;
  }
});
/* ↑↑↑ /побудова списку країн ↑↑↑ */

$(document).click(function(event) {
  if ( isCountriesListOpen && event.target.className != 'regform__flag-wrapper-cover-for-click' ) {
    $('.regform__countries-wrapper').css({'height':'0px'}).css({'display':'none'});
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
  var tempSrc = '1/' + tempImgName;
  $(THIS).parent().siblings('.regform__flag-wrapper').find('.regform__flag-img').attr('src',tempSrc);

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

/* ↓↓↓ клік на кнопку ↓↓↓ */

$('#btnsubmit').click(function() {

  // валідація імені
  if ( $('#input-id').val().length < 2 ) {

    // якщо повідомлення уже є - вийти
    var message = $('.regform__info.regform__info_error:eq(0)');
    if ( $(message).css('height') != '0px' ) return;

    // підсвітка input'а та фокус
    $('#input-id').css({'box-shadow':'0 0 5px red','border-color':'red'}).focus();

    // показати повідомлення, вийти
    $(message).css({'height':'auto','min-height':'30px','padding':'3px 0'});
    var tempHeight = $(message).css('height');
    $(message).css({'height': '0px','min-height':'0px','padding':'0px'});
    $(message).css({'transition':'height .5s, padding-top .5s, margin .5s','height':tempHeight, 'padding':'3px', 'margin':'3px 0'});

    return
  }

  // валідація телефону
  if ( $('#input-phone').val().length < 7 ) {

    // якщо повідомлення уже є - вийти
    var message = $('.regform__info.regform__info_error:eq(1)');
    if ( $(message).css('height') != '0px' ) return;

    // підсвітка input'а та фокус
    $('#input-phone').css({'box-shadow':'0 0 5px red','border-color':'red'}).focus();

    // показати повідомлення, вийти
    $(message).css({'height':'auto','min-height':'30px','padding':'3px 0'});
    var tempHeight = $(message).css('height');
    $(message).css({'height': '0px','min-height':'0px','padding':'0px'});
    $(message).css({'transition':'height .5s, padding-top .5s, margin .5s','height':tempHeight, 'padding':'3px', 'margin':'3px 0'});

    return
  }

  // валідація пошти
  var tempEmail = $('#input-email').val();
  if ( !isEmailValid(tempEmail) ) {

    // якщо повідомлення уже є - вийти
    var message = $('.regform__info.regform__info_error:eq(2)');
    if ( $(message).css('height') != '0px' ) return;

    // підсвітка input'а та фокус
    $('#input-email').css({'box-shadow':'0 0 5px red','border-color':'red'}).focus();

    // показати повідомлення, вийти
    $(message).css({'height':'auto','min-height':'30px','padding':'3px 0'});
    var tempHeight = $(message).css('height');
    $(message).css({'height': '0px','min-height':'0px','padding':'0px'});
    $(message).css({'transition':'height .5s, padding-top .5s, margin .5s','height':tempHeight, 'padding':'3px', 'margin':'3px 0'});

    return
  }

  // валідація повідомлення
  var tempMessage = $('#message').val();
  if ( tempMessage.length < 10 ) {

    // якщо повідомлення уже є - вийти
    var message = $('.regform__info.regform__info_error:eq(3)');
    if ( $(message).css('height') != '0px' ) return;

    // підсвітка input'а та фокус
    $('#message').css({'box-shadow':'0 0 5px red','border-color':'red'}).focus();

    // показати повідомлення, вийти
    $(message).css({'height':'auto','min-height':'30px','padding':'3px 0'});
    var tempHeight = $(message).css('height');
    $(message).css({'height': '0px','min-height':'0px','padding':'0px'});
    $(message).css({'transition':'height .5s, padding-top .5s, margin .5s','height':tempHeight, 'padding':'3px', 'margin':'3px 0'});

    return
  }

  // // anti-bot-filter
  // if( confirmAntiBotFilterQuestion () == false ) {
  //   return
  // }

  var temp = $('#input-country-code').val() + $('#input-phone').val();
  var dat = {
        email : $('#input-email').val(),
        name  : $('#input-id').val(),
        phone : temp,
        body  : $('#message').val(),
      };

  $.ajax({
      type        : "GET",
      data        : dat,
      url         : "https://platform.etokenstrade.com/api/SendMailToSupport",
      crossDomain : true,
      success     : function (data) {
                      if (data=="1") {
                        $('#input-id').val('');
                        $('#input-phone').val('');
                        $('#input-email').val('');
                        $('#message').val('');
                        $('#input-country-code').val('+000');
                        $('.regform__flag-img').attr('src','assets/img/european_union.png');
                        alert('your message has been sent');
                      }
                      else{
                        $('#input-id').val('');
                        $('#input-phone').val('');
                        $('#input-email').val('');
                        $('#message').val('');
                        $('#input-country-code').val('+000');
                        $('.regform__flag-img').attr('src','assets/img/european_union.png');
                        alert('You entered incorrect data. Please send us a letter.');
                      }
      }
  });
});

/* ↑↑↑ /клік на кнопку ↑↑↑ */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ перевірка правильності на input'ах ↓↓↓ */

// якщо ім'я є - прибрати повідомлення
$('#input-id').keyup(function(e){
  if ( $('#input-id').val().length > 1 ) {
    $('.regform__info.regform__info_error:eq(0)').css({'transition':'height .5s, padding-top .5s, margin .5s','height': '0', 'padding':'0', 'margin':'0'});
    // підсвітка input'а
    $('#input-id').css({'box-shadow':'none','border-color':'lightgrey'});
  }
});

// якщо телефон коректний - прибрати повідомлення
$('#input-phone').keyup(function(e){
  if ( $('#input-phone').val().length > 6 ) {
    $('.regform__info.regform__info_error:eq(1)').css({'transition':'height .5s, padding-top .5s, margin .5s','height': '0', 'padding':'0', 'margin':'0'});
    // підсвітка input'а
    $('#input-phone').css({'box-shadow':'none','border-color':'lightgrey'});
  }
});

// якщо пошта коректна - прибрати повідомлення
$('#input-email').keyup(function(){
  var tempEmail = $('#input-email').val();
  if ( isEmailValid(tempEmail) ) {
    $('.regform__info.regform__info_error:eq(2)').css({'transition':'height .5s, padding-top .5s, margin .5s','height': '0', 'padding':'0', 'margin':'0'});
    // підсвітка input'а
    $('#input-email').css({'box-shadow':'none','border-color':'lightgrey'});
  }
});

// якщо повідомлення не пусте - прибрати повідомлення
$('#message').keyup(function(){
  var tempMessage = $('#message').val();
  if ( tempMessage.length > 9 ) {
    $('.regform__info.regform__info_error:eq(3)').css({'transition':'height .5s, padding-top .5s, margin .5s','height': '0', 'padding':'0', 'margin':'0'});
    // підсвітка input'а
    $('#message').css({'box-shadow':'none','border-color':'lightgrey'});
  }
});

/* ↑↑↑ /перевірка правильності на input'ах ↑↑↑ */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ FUNCTIONS DECLARATIONS ↓↓↓ */

function isEmailValid (email) {

  // повинен бути 1 символ @
  var temp = calculateCharsInStr(email, '@');
  if ( temp != 1 ) return false;

  // повинен бути мінімум 1 символ .
  var temp = calculateCharsInStr(email, '.');
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
  var pos = count = 0;
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