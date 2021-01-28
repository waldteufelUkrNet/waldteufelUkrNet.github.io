"use strict";
// peset password form module

////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ клік на кнопку ↓↓↓ */
  if ( document.getElementById('submitPasswordReset') ) {
    document.getElementById('submitPasswordReset').onclick = function(event) {
      event.preventDefault();

      // валідація пошти
      let address = document.getElementById('email-reset').value;
      if (!address) {
        showErrorMessage('#resetForm', 0);
      } else if ( !isEmailValid(address) ) {
        showErrorMessage('#resetForm', 1);
      }

      // валідація на поставлену пташку
      let check = document.querySelector('.form-reset-pass__form-group_with-check input[type="checkbox"]');
      if (!check.checked) {
        showErrorMessage('#resetForm', 2);
      }

      // якщо є помилки валідації
      if ( document.querySelector('.form-reset-pass__form-group_errors-list').dataset.error == 'true' ) {
        return;
      }
      // формування даних, відправка на сервер, перенаправлення на торгову платформу
      // тут місце для ajax
      var dat = {
        email: address
        };
        $.ajax({
            url: "https://client.rt-investing.com/api/PassReset",
            type: "GET",
            data: dat,
            success: function(data) {
              if (data == '1') {
                alert('A letter was sent to your mail with instructions for setting a password.');
              } else {
                alert('Password reset error.');
              }
            }
        });
    };
  }
/* ↑↑↑ /клік на кнопку ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ перевірка правильності на input'ах ↓↓↓ */

  // якщо пошта коректна - прибрати повідомлення
  if ( document.getElementById('email-reset') ) {
    document.getElementById('email-reset').onkeyup  = function(event) {
      let address = event.target.value;
      if (address) {
        hideErrorMessage('#resetForm', 0);
      }
      if ( isEmailValid(address) ) {
        hideErrorMessage('#resetForm', 1);
      }
    };
  }

  // якщо пташку поставлено - прибрати повідомлення
  if ( document.querySelector('.form-reset-pass__form-group_with-check input[type="checkbox"]') ) {
    document.querySelector('.form-reset-pass__form-group_with-check input[type="checkbox"]').onchange = function(event){
      if (event.currentTarget.checked) {
        hideErrorMessage('#resetForm', 2);
      }
    };
  }
/* ↑↑↑ /перевірка правильності на input'ах ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ підсвітка пташкою ↓↓↓ */
  if ( document.querySelector('.form-reset-pass__form-group_with-check') ) {
    let isAgreementWith24Checked = false;
    document.querySelector('.form-reset-pass__form-group_with-check').onclick = function(event) {
      if ( event.target.tagName.toLowerCase() == 'a' || event.target.tagName.toLowerCase() == 'input') return;
      if (isAgreementWith24Checked) {
        document.querySelector('.form-reset-pass__check-yes').style.display = 'none';
        document.querySelector('.form-reset-pass__check-no').style.display = 'block';
      } else {
        document.querySelector('.form-reset-pass__check-yes').style.display = 'block';
        document.querySelector('.form-reset-pass__check-no').style.display = 'none';
      }
      isAgreementWith24Checked = !isAgreementWith24Checked;
    }
  }
/* ↑↑↑ підсвітка пташкою ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////