////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ кнопки "показати/приховати пароль" ↓↓↓ */
$('.regform__show-hide-pass').click(function() {

  if ( $(this).children().hasClass('fa-eye-slash') ) {
    $(this).siblings('.regform__input_pass').attr('type','text').focus();
    $('.regform__input_pass').attr('type','text');

    $(this).children('.fa-eye-slash').removeClass('fa-eye-slash').addClass('fa-eye');
  } else {
    $(this).siblings('.regform__input_pass').attr('type','password').focus();
    $(this).children('.fa-eye').removeClass('fa-eye').addClass('fa-eye-slash');
  }

});
/* ↑↑↑ /кнопки "показати/приховати пароль" ↑↑↑ */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ клік на кнопку ↓↓↓ */

$('#logIn').click(function() {

  var tempEmail = $('#input-email').val();

  // якщо пошта некоректна
  if ( !isEmailValid(tempEmail) ) {

    // якщо повідомлення уже є - вийти
    if ( $('.regform__info.regform__info_error:eq(0)').css('height') != '0px' ) return;

    // показати повідомлення, вийти
    $('.regform__info.regform__info_error:eq(0)').css({'height':'auto','min-height':'30px','padding':'3px 0'});
    var tempHeight = $('.regform__info.regform__info_error:eq(0)').css('height');
    $('.regform__info.regform__info_error:eq(0)').css({'height': '0px','min-height':'0px','padding':'0px'});
    $('.regform__info.regform__info_error:eq(0)').css({'transition':'height .5s, padding-top .5s, margin .5s','height':tempHeight, 'padding':'3px', 'margin':'3px 0'});

    return
  }

  // якщо пароля нема
  if ( $('#input-password').val().length < 1 ) {

    // якщо повідомлення уже є - вийти
    if ( $('.regform__info.regform__info_error:eq(1)').css('height') != '0px' ) return;

    // показати повідомлення, вийти
    $('.regform__info.regform__info_error:eq(1)').css({'height':'auto','min-height':'30px','padding':'3px 0'});
    var tempHeight = $('.regform__info.regform__info_error:eq(1)').css('height');
    $('.regform__info.regform__info_error:eq(1)').css({'height': '0px','min-height':'0px','padding':'0px'});
    $('.regform__info.regform__info_error:eq(1)').css({'transition':'height .5s, padding-top .5s, margin .5s','height':tempHeight, 'padding':'3px', 'margin':'3px 0'});

    return
  }

  var dat = {
    email: $('#input-email').val(),
    pass : $('#input-password').val()
    };

    $.ajax({
      type        : "GET",
      data        : dat,
      url         : "https://platform.etokenstrade.com/api/CheckLogin",
      crossDomain : true,
      success     : function (data) {
                      if (data=="Ok"){
                        location.href = 'https://platform.etokenstrade.com/Home/LoginSite?email='+dat.email+'&pass='+dat.pass
                      } else {
                        showAuthorisationInfoWarning();
                      }
                    },
      error       : function() {
                      showAuthorisationInfoWarning();
                    }
      });
});

/* ↑↑↑ /клік на кнопку ↑↑↑ */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ перевірка правильності на input'ах ↓↓↓ */

// якщо пошта коректна - прибрати повідомлення
$('#input-email').keyup(function(e){
  var tempEmail = $('#input-email').val();
  if ( isEmailValid(tempEmail) ) {
    $('.regform__info.regform__info_error:eq(0)').css({'transition':'height .5s, padding-top .5s, margin .5s','height': '0', 'padding':'0', 'margin':'0'});
  }
});

// якщо пароль є - прибрати повідомлення
$('#input-password').keyup(function(e){
  if ( $('#input-password').val().length > 0 ) {
    $('.regform__info.regform__info_error:eq(1)').css({'transition':'height .5s, padding-top .5s, margin .5s','height': '0', 'padding':'0', 'margin':'0'});
  }
});

/* ↑↑↑ /перевірка правильності на inputах ↑↑↑ */

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

function showAuthorisationInfoWarning () {

    $('.regform__info.regform__info_error:eq(2)').css({'height':'auto','min-height':'30px','padding':'3px 0'});
    var tempHeight = $('.regform__info.regform__info_error:eq(2)').css('height');
    $('.regform__info.regform__info_error:eq(2)').css({'height': '0px','min-height':'0px','padding':'0px'});
    $('.regform__info.regform__info_error:eq(2)').css({'transition':'height .5s, padding-top .5s, margin .5s','height':tempHeight, 'padding':'3px', 'margin':'3px 0'});

};

/* ↑↑↑ /FUNCTIONS DECLARATIONS ↑↑↑ */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////