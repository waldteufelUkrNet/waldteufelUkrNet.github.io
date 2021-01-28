"use strict";
// login form module

////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ клік на кнопку ↓↓↓ */
  if ( document.getElementById('submitLogin') ) {
    document.getElementById('submitLogin').onclick = function(event) {
      event.preventDefault();

      // валідація пошти
      let address = document.getElementById('login-email').value;
      if (!address) {
        showErrorMessage('#loginForm', 0);
      } else if ( !isEmailValid(address) ) {
        showErrorMessage('#loginForm', 1);
      }

      // валідація паролю
      let password = document.getElementById('login-password').value;

      if (!password) {
        showErrorMessage('#loginForm', 2);
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
            showErrorMessage('#loginForm', 3);
        }
      }

      // якщо є помилки валідації
      if ( document.querySelector('.form-login__form-group_errors-list').dataset.error == 'true' ) {
        return;
      }
      location.href = 'https://client.rt-investing.com/Home/LoginSite?email=' + address + '&pass=' + password;
    };
  }
/* ↑↑↑ /клік на кнопку ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ перевірка правильності на input'ах ↓↓↓ */

  // якщо пошта коректна - прибрати повідомлення
  if ( document.getElementById('login-email') ) {
    document.getElementById('login-email').onkeyup  = function(event) {
      let address = event.target.value;
      if (address) {
        hideErrorMessage('#loginForm', 0);
      }
      if ( isEmailValid(address) ) {
        hideErrorMessage('#loginForm', 1);
      }
    };
  }

  // якщо пароль коректний - прибрати повідомлення
  if ( document.getElementById('login-password') ) {
    document.getElementById('login-password').onkeyup = function(event) {
      let password = event.target.value;
      if (password) {
        hideErrorMessage('#loginForm', 2);
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
          hideErrorMessage('#loginForm', 3);
      }
    }
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