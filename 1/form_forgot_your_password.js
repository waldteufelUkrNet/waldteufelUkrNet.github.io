////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ клік на кнопку ↓↓↓ */

var flag = false;
$('#fogotPass').click(function() {

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

  // якщо пошта коректна
  } else {
    var dat = {
      email: tempEmail
    };
    $.ajax({
          url     : "https://platform.etokenstrade.com/api/PassReset",
          type    : "GET",
          data    : dat,
          success : function (data) {
                      if(data == 1) {

                        // повідомлення про успішну відпраку
                        flag = true;
                        showForgotYourPasswordInfo();

                      // повідомлення про відсутність пошти
                      } else {
                        showForgotYourPasswordInfo();
                      }
                    }
    });
  }
});

/* ↑↑↑ /клік на кнопку ↑↑↑ */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ перевірка правильності на input'і ↓↓↓ */

// якщо пошта коректна - прибрати повідомлення
$('#input-email').keyup(function(e){
  var tempEmail = $('#input-email').val();
  if ( isEmailValid(tempEmail) ) {
    $('.regform__info.regform__info_error:eq(0)').css({'transition':'height .5s, padding-top .5s, margin .5s','height': '0', 'padding':'0', 'margin':'0'});
  }
});

/* ↑↑↑ /перевірка правильності на input'і ↑↑↑ */

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

function showForgotYourPasswordInfo () {
  if (flag) {
    $('.regform__info.regform__info_success').css({'height':'auto','min-height':'30px','padding':'3px 0'});
    var tempHeight = $('.regform__info.regform__info_success').css('height');
    $('.regform__info.regform__info_success').css({'height': '0px','min-height':'0px','padding':'0px'});
    $('.regform__info.regform__info_success').css({'transition':'height .5s, padding-top .5s, margin .5s','height':tempHeight, 'padding':'3px', 'margin':'3px 0'});
  } else {
    $('.regform__info.regform__info_error:eq(1)').css({'height':'auto','min-height':'30px','padding':'3px 0'});
    var tempHeight = $('.regform__info.regform__info_error:eq(1)').css('height');
    $('.regform__info.regform__info_error:eq(1)').css({'height': '0px','min-height':'0px','padding':'0px'});
    $('.regform__info.regform__info_error:eq(1)').css({'transition':'height .5s, padding-top .5s, margin .5s','height':tempHeight, 'padding':'3px', 'margin':'3px 0'});
  }
};

/* ↑↑↑ /FUNCTIONS DECLARATIONS ↑↑↑ */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////