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
"use strict";
// footer module

////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ ??? ↓↓↓ */

/* ↑↑↑ ??? ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
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


      let lang = document.querySelector('.header__lang').innerHTML.toLowerCase();

      $.ajax({
          url: "https://backend.rt-investing.com/api/LidsSelfRegisr",
          type: "POST",
          data: dat,
          success: function(data) {
            if (data == 'Ok') {

              /**
               * [zaty4ka включає/виключає підтвердження реєстрації через пошту (платіжка вимагає підтвердження реєстрації)]
               * @type {Boolean}
               */
              let zaty4ka = true;

              if (!zaty4ka) {
                location.href = 'https://client.rt-investing.com/Home/LoginSite?email=' + address + '&pass=' + password;
              } else {
                if (lang == 'ru') {
                  alert('На Вашу почту было отправлено письмо с подтверждением регистрации.');
                } else {
                  alert('A confirmation email was sent to your mail.');
                }
              }
            } else {
              if (lang == 'ru') {
                alert('Ошибка регистрации. Попробуйте снова.');
              } else {
                alert('Registration error. Try again.');
              }
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
"use strict";
// navigation module

////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ ??? ↓↓↓ */

/* ↑↑↑ ??? ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
"use strict";
// contact form module

////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ увімкн/вимкнення форми ↓↓↓ */
  let isContactFormOpen = false;
  if ( document.querySelector('.form-contact__tassel') ) {
    document.querySelector('.form-contact__tassel').onclick = function(){
      if (isContactFormOpen) {
        document.getElementById('contactForm').style.left = '100%';
      } else {
        let formWidth = document.getElementById('contactForm').offsetWidth;
        document.getElementById('contactForm').style.left = 'calc(100% - ' + formWidth + 'px)';

        let messages = document.querySelectorAll('.form-contact__form-error');
        for (let i = 0; i < messages.length; i++) {
          messages[i].style.display = 'none';
        }
        document.querySelector('.form-contact__form-group_errors-list').setAttribute('data-error', false);
        document.querySelector('.form-contact__form-group_errors-list').style.display = 'none';
      }
      document.querySelector('.form-contact__tassel').classList.toggle('form-contact__tassel_open');
      isContactFormOpen = !isContactFormOpen;
    };
  }

/* ↑↑↑ увімкн/вимкнення форми ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ клік на кнопку ↓↓↓ */
  if ( document.getElementById('submitContact') ) {
    document.getElementById('submitContact').onclick = function(event) {
      event.preventDefault();

      // валідація імені
      let name = document.getElementById('name').value;
      if (name.length < 2) {
        showErrorMessage('#contactForm', 0);
      }

      // валідація пошти
      let address = document.getElementById('contact-email').value;
      if (!address) {
        showErrorMessage('#contactForm', 1);
      } else if ( !isEmailValid(address) ) {
        showErrorMessage('#contactForm', 2);
      }

      // валідація повідомленя
      let message = document.getElementById('textarea').value;
      if (message.length < 2) {
        showErrorMessage('#contactForm', 3);
      }

      // якщо є помилки валідації
      if ( document.querySelector('.form-contact__form-group_errors-list').dataset.error == 'true' ) {
        return;
      }
      // формування даних, відправка на сервер, перенаправлення на торгову платформу
      let data = {
        CustomerName    : name,
        CustomerEmail   : address,
        CustomerMessage : message
      }

      alert('Your message has been sent. Our manager will contact you soon.');
    };
  }

/* ↑↑↑ клік на кнопку ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ перевірка правильності на input'ах ↓↓↓ */
  // якщо ім'я коректне - прибрати повідомлення
  if ( document.getElementById('name') ) {
    document.getElementById('name').onkeyup  = function(event) {
      let name = event.target.value;
      if (name.length >= 2) {
        hideErrorMessage('#contactForm', 0);
      }
    };
  }

  // якщо пошта коректна - прибрати повідомлення
  if ( document.getElementById('contact-email') ) {
    document.getElementById('contact-email').onkeyup  = function(event) {
      let address = event.target.value;
      if (address) {
        hideErrorMessage('#contactForm', 1);
      }
      if ( isEmailValid(address) ) {
        hideErrorMessage('#contactForm', 2);
      }
    };
  }

  // якщо є повідомлення (текст) - прибрати повідомлення про помилку
  if ( document.getElementById('textarea') ) {
    document.getElementById('textarea').onkeyup  = function(event) {
      let textarea = event.target.value;
      if (textarea.length >= 2) {
        hideErrorMessage('#contactForm', 3);
      }
    };
  }
/* ↑↑↑ перевірка правильності на input'ах ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////