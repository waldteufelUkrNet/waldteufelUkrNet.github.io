let dictionary = {
  error : {
    ru : 'Введите корректный адрес!',
    en : 'Enter the correct address!'
  },
  success : {
    ru : 'На вашу электрнную почту выслана ссылка для изменения пароля.',
    en : 'A link to change your password has been sent to your email.'
  },
  attention : {
    ru : 'Указанная электрнная почта отсутствует в нашей базе данных. Вы уверенны, что являетесь нашим клиентом?',
    en : 'The specified email is not in our database. Are you sure you are our customer?'
  }
};

let isMessageVisible = false;
/* ↓↓↓ клік на кнопку ↓↓↓ */
$('.recoveryform__btn').click(function() {

  // валідація пошти
  var tempEmail = $('#input-email').val();

  if ( !isEmailValid(tempEmail) ) {

    // якщо повідомлення уже є - вийти
    if ( isMessageVisible ) return;

    // підсвітка input'а та фокус
    $('#input-email').css({'box-shadow':'0 0 5px red','border-color':'red'}).focus();

    // показати повідомлення, вийти
    showErrorMessage('#input-email', dictionary.error, 40, 200);
    isMessageVisible = true;

    return
  // якщо пошта коректна
  } else {
    var dat = {
      email: tempEmail
    };
    $.ajax({
          url     : "https://platform.xxx.com/api/PassReset",
          type    : "GET",
          data    : dat,
          success : function (data) {
                      if(data == 1) {

                        // повідомлення про успішну відправку
                        flag = true;
                        showErrorMessage('#input-email', dictionary.success, 40, 200);

                      // повідомлення про відсутність пошти
                      } else {
                        showErrorMessage('#input-email', dictionary.attention, 40, 200);
                      }
                    }
    });
  }

});

/* ↑↑↑ /клік на кнопку ↑↑↑ */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ перевірка правильності на input'ах ↓↓↓ */

// якщо пошта коректна - прибрати повідомлення
$('#input-email').keyup(function(){
  var tempEmail = $('#input-email').val();
  if ( isEmailValid(tempEmail) ) {
    $('.regform__error').remove();
    isMessageVisible = false;
    // підсвітка input'а
    $('#input-email').css({'box-shadow':'none','border-color':'white'});
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
  let message      = $('<div class="recoveryform__error"></div>').text(text[currentLang])
                                                           .append('<div class="error-triangle"></div>');
  let triangleLeft;
  if (left) {
    triangleLeft = left + 'px';
  } else {
    triangleLeft = fieldLeft + (fieldWidth/2) - 20 + 'px';
  }

  $(message).css('top', fieldBottom + 10);

  $( $('.recoveryform')[0] ).append(message);

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