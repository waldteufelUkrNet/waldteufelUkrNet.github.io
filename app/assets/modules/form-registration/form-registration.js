"use strict";
// registration form module

////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ клік на кнопку ↓↓↓ */
  if ( document.getElementById('submitRegistration') ) {
    document.getElementById('submitRegistration').onclick = function(event) {
      event.preventDefault();

      // валідація імені
      let fname = document.getElementById('fname').value;
      if (fname.length < 2) {
        showErrorMessage('#registerForm', 0);
      }

      // валідація прізвища
      let lname = document.getElementById('lname').value;
      if (lname.length < 2) {
        showErrorMessage('#registerForm', 1);
      }

      // валідація пошти
      let address = document.getElementById('email').value;
      if (!address) {
        showErrorMessage('#registerForm', 2);
      } else if ( !isEmailValid(address) ) {
        showErrorMessage('#registerForm', 3);
      }

      // валідація телефону
      let phone = document.getElementById('phone').value;
      if (!phone) {
        showErrorMessage('#registerForm', 5);
      } else if ( phone.length < 7 ) {
        showErrorMessage('#registerForm', 6);
      }

      // валідація паролю
      let password = document.getElementById('password').value;
      let passwordRepeat = document.getElementById('password-rep').value;

      if (!password) {
        showErrorMessage('#registerForm', 7);
      } else {
        let passwordArr = Array.from(password);
        let tempCount = 0;

        for (let i = 0; i < passwordArr.length; i++) {
          if ( isNumeric(passwordArr[i]) ) {
            tempCount++;
          }
        }
        if (passwordArr.length < 8 ||
            passwordArr.length == tempCount ||
            tempCount == 0) {
            showErrorMessage('#registerForm', 8);
        }
      }

      if (password && password != passwordRepeat) {
        showErrorMessage('#registerForm', 9);
      }

      // валідація на поставлену пташку
      let check = document.querySelector('.form-registration__form-group_with-check input[type="checkbox"]');
      if (!check.checked) {
        showErrorMessage('#registerForm', 10);
      }

      // якщо є помилки валідації
      if ( document.querySelector('.form-registration__form-group_errors-list').dataset.error == 'true' ) {
        return;
      }
      let ccode = document.getElementById('ccode').value.toString().slice(1);
      // формування даних, відправка на сервер, перенаправлення на торгову платформу
      let dat = {
        CustomerFirstName : fname,
        CustomerLastName  : lname,
        CustomerEmail     : address,
        CustomerPassword  : password,
        CustomerPhone     : ccode + '' + phone,
        CustomerCountry   : "unknown",
        CustomerCity      : "unknown",
        CustomerIp        : "0",
        CustomerLanguage  : "unknown",
        CompanyId         : 1,
        Hash              : 'self'
      }

      // тут місце для ajax
      $.ajax({
          url: "https://backend.rt-investing.com/api/LidsSelfRegisr",
          type: "POST",
          data: dat,
          success: function(data) {
            if (data == 'Ok') {
              location.href = 'https://client.rt-investing.com/Home/LoginSite?email=' + address + '&pass=' + password;
            } else {
               alert('Registration error. Try again');
            }
          }
      });
    };
  }
/* ↑↑↑ /клік на кнопку ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ перевірка правильності на input'ах ↓↓↓ */
  // якщо ім'я коректне - прибрати повідомлення
  if ( document.getElementById('fname') ) {
    document.getElementById('fname').onkeyup  = function(event) {
      let fname = event.target.value;
      if (fname.length >= 2) {
        hideErrorMessage('#registerForm', 0);
      }
    };
  }

  // якщо прізвище коректне - прибрати повідомлення
  if ( document.getElementById('lname') ) {
    document.getElementById('lname').onkeyup  = function(event) {
      let lname = event.target.value;
      if (lname.length >= 2) {
        hideErrorMessage('#registerForm', 1);
      }
    };
  }

  // якщо пошта коректна - прибрати повідомлення
  if ( document.getElementById('email') ) {
    document.getElementById('email').onkeyup  = function(event) {
      let address = event.target.value;
      if (address) {
        hideErrorMessage('#registerForm', 2);
      }
      if ( isEmailValid(address) ) {
        hideErrorMessage('#registerForm', 3);
      }
    };
  }

  // якщо телефон коректний - прибрати повідомлення
  if ( document.getElementById('phone') ) {
    document.getElementById('phone').onkeyup  = function(event) {
      let phone = event.target.value;
      if (phone) {
        hideErrorMessage('#registerForm', 5);
      }
      if (phone.length >= 7) {
        hideErrorMessage('#registerForm', 6);
      }
    };
  }

  // якщо пароль коректний - прибрати повідомлення
  if ( document.getElementById('password') ) {
    document.getElementById('password').onkeyup = function(event) {
      let password = event.target.value;
      if (password) {
        hideErrorMessage('#registerForm', 7);
      }

      let passwordArr = Array.from(password);
      let tempCount = 0;

      for (let i = 0; i < passwordArr.length; i++) {
        if ( isNumeric(passwordArr[i]) ) {
          tempCount++;
        }
      }
      if (passwordArr.length >= 8 &&
          passwordArr.length != tempCount &&
          tempCount != 0) {
          hideErrorMessage('#registerForm', 8);
      }

      let passwordRepeat = document.getElementById('password-rep').value;
      if (password && passwordRepeat && password == passwordRepeat) {
        hideErrorMessage('#registerForm', 9);
      }
    }
  }

  // якщо паролі однакові - прибрати повідомлення
  if ( document.getElementById('password-rep') ) {
    document.getElementById('password-rep').onkeyup = function(event) {
      let password       = document.getElementById('password').value;
      let passwordRepeat = document.getElementById('password-rep').value;
      if (password && passwordRepeat && password == passwordRepeat) {
        hideErrorMessage('#registerForm', 9);
      }
    }
  }

  // якщо пташку поставлено - прибрати повідомлення
  if ( document.querySelector('.form-registration__form-group_with-check input[type="checkbox"]') ) {
    document.querySelector('.form-registration__form-group_with-check input[type="checkbox"]').onchange = function(event){
      if (event.currentTarget.checked) {
        hideErrorMessage('#registerForm', 10);
      }
    };
  }
/* ↑↑↑ /перевірка правильності на input'ах ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ показати/приховати пароль ↓↓↓ */
  if ( document.querySelectorAll('.eye') ) {
    let eyes = document.querySelectorAll('.eye');
    for (let i = 0; i < eyes.length; i++) {
      (function(n) {
        eyes[n].onclick = function(event) {
          let svg = event.target.closest('svg');
          svg.style.display = 'none';

          if ( svg.classList.contains('eye-hide') ) {
            svg.parentElement.querySelector('.eye-show').style.display = 'block';
            svg.parentElement.querySelector('input').setAttribute('type', 'text');
          } else if ( svg.classList.contains('eye-show') ) {
            svg.parentElement.querySelector('.eye-hide').style.display = 'block';
            svg.parentElement.querySelector('input').setAttribute('type', 'password');
          }

        };
      }(i));
    }
  }
/* ↑↑↑ показати/приховати пароль ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ поле "телефон" - тільки для цифр ↓↓↓ */
  if ( document.getElementById('phone') ) {
    document.getElementById('phone').onkeydown = checkPhoneKey;
  }
/* ↑↑↑ поле "телефон" - тільки для цифр ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ підсвітка пташкою ↓↓↓ */
  let isOver18Checked = false;
  if ( document.querySelector('.form-registration__form-group_with-check') ) {
    document.querySelector('.form-registration__form-group_with-check').onclick = function(event) {
      if ( event.target.tagName.toLowerCase() == 'a' || event.target.tagName.toLowerCase() == 'input') return;
      if (isOver18Checked) {
        document.querySelector('.form-registration__check-yes').style.display = 'none';
        document.querySelector('.form-registration__check-no').style.display = 'block';
      } else {
        document.querySelector('.form-registration__check-yes').style.display = 'block';
        document.querySelector('.form-registration__check-no').style.display = 'none';
      }
      isOver18Checked = !isOver18Checked;
    }
  }
/* ↑↑↑ підсвітка пташкою ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ побудова списку країн ↓↓↓ */
  if ( document.querySelector('.form-registration__current-country-wrapper') ) {
    let isCountryListOpen = false;
    document.querySelector('.form-registration__current-country-wrapper').onclick = function(event) {
      let list = document.querySelector('.form-registration__country-list');

      if ( !isCountryListOpen ) {
        // open
        for (let i = 0; i < countriesArr.length; i++) {
          let item = '<div class="form-registration__country-item" data-ccode="' + countriesArr[i].phoneCode + '" onclick="selectCountry(this)">\
                        <div class="form-registration__country-wrapper">\
                          <img class="form-registration__country-flag" src="assets/img/countries/' + countriesArr[i].imgName + '">\
                        </div>\
                        <div class="form-registration__country-code">' + countriesArr[i].phoneCode + '</div>\
                        <div class="form-registration__country-name">' + countriesArr[i].nameEn + '</div>\
                      </div>';
          list.insertAdjacentHTML('beforeEnd', item);
        }
        list.style.display = 'block';
      } else {
        // close
        list.style.display = 'none';
        list.innerHTML = '';
      }
      isCountryListOpen = !isCountryListOpen;
    }
  }
/* ↑↑↑ побудова списку країн ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////