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
      let address = document.getElementById('regEmail').value;
      if (!address) {
        showErrorMessage('#registerForm', 2);
      } else if ( !isEmailValid(address) ) {
        showErrorMessage('#registerForm', 3);
      }

      // валідація телефону
      let phone = document.getElementById('phone').value;
      if (phone.length < 3) {
        showErrorMessage('#registerForm', 4);
      }
      // else if ( phone.length < 7 ) {
      //   showErrorMessage('#registerForm', 5);
      // }

      // валідація паролю
      let password = document.getElementById('password').value;
      let passwordRepeat = document.getElementById('password-rep').value;

      if (!password) {
        showErrorMessage('#registerForm', 6);
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
            showErrorMessage('#registerForm', 7);
        }
      }

      if (password && password != passwordRepeat) {
        showErrorMessage('#registerForm', 8);
      }

      // валідація на поставлену пташку
      let check = document.querySelector('.form-registration__form-group_with-check input[type="checkbox"]');
      if (!check.checked) {
        showErrorMessage('#registerForm', 9);
      }

      // якщо є помилки валідації
      if ( document.querySelector('.form-registration__form-group_errors-list').dataset.error == 'true' ) {
        return;
      }
      // формування даних, відправка на сервер, перенаправлення на торгову платформу

      phone = phone.replace(/[\s\(\)-]/g,'');
      let dat = {
        CustomerFirstName : fname,
        CustomerLastName  : lname,
        CustomerEmail     : address,
        CustomerPassword  : password,
        CustomerPhone     : phone,
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
  if ( document.getElementById('regEmail') ) {
    document.getElementById('regEmail').onkeyup  = function(event) {
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
    document.getElementById('phone').onkeyup = function(event) {
      let phoneString = this.value;
      if ( !phoneString.startsWith('+') ) {
        phoneString = '+' + phoneString;
        this.value = phoneString;
      }

      if (phoneString.length >= 2) {
        hideErrorMessage('#registerForm', 4);
      }

      document.querySelector('#phoneNumber').value = phoneString;
      phoneNumberParser();
    };
  }

  // якщо пароль коректний - прибрати повідомлення
  if ( document.getElementById('password') ) {
    document.getElementById('password').onkeyup = function(event) {
      let password = event.target.value;
      if (password) {
        hideErrorMessage('#registerForm', 6);
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
          hideErrorMessage('#registerForm', 7);
      }

      let passwordRepeat = document.getElementById('password-rep').value;
      if (password && passwordRepeat && password == passwordRepeat) {
        hideErrorMessage('#registerForm', 8);
      }
    }
  }

  // якщо паролі однакові - прибрати повідомлення
  if ( document.getElementById('password-rep') ) {
    document.getElementById('password-rep').onkeyup = function(event) {
      let password       = document.getElementById('password').value;
      let passwordRepeat = document.getElementById('password-rep').value;
      if (password && passwordRepeat && password == passwordRepeat) {
        hideErrorMessage('#registerForm', 8);
      }
    }
  }

  // якщо пташку поставлено - прибрати повідомлення
  if ( document.querySelector('.form-registration__form-group_with-check input[type="checkbox"]') ) {
    document.querySelector('.form-registration__form-group_with-check input[type="checkbox"]').onchange = function(event){
      if (event.currentTarget.checked) {
        hideErrorMessage('#registerForm', 9);
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
/* ↓↓↓ красиве форматування номеру телефону ↓↓↓ */
  // https://github.com/google/libphonenumber - це класна бібліотека для
  // перевірки номера телефона та його красивого форматування. Але я - дурний
  // рак, який не зміг з нею розібратися: робив усе, як вказано в інструкції,
  // але в консоль постійно сипляться помилки. Тому я взяв скомпільоване демо.
  // Суть роботи наступного коду: під час завантаження сторінки я звертаюсь до
  // стороннього сервісу, який визначає мій IP та видає буквенний код країни.
  // Я вставляю цей код в одне з прихованих полів, по цьому коду визначаю
  // телефонний код країни і вставляю його в поле телефону. При зміні поля
  // телефона спрацьовує обробник, який викликає сторонню функцію, яка видає
  // результат аналізу в приховану textarea. Mutation observer не відловлює
  // зміну textarea. onchange так само. Доводиться використовувати декоратор.

  // визначення країни клієнта та підстановка телефонного коду країни
    $.get("http://ipinfo.io", function (response) {
      let userCountryName = response.country;

      if ( userCountryName == 'UA') {
        document.querySelector('#registerForm').remove();
        setTimeout(function(){
          alert ('Наша компания не работает с гражданами Вашей страны');
        },100);
        return
      }

      let userCountryCode;
      for (let i = 0; i < countriesArr.length; i++) {
        if ( countriesArr[i].ISOcode == userCountryName ) {
          userCountryCode = countriesArr[i].phoneCode
          break
        }
      }

      document.querySelector('#phone').value = userCountryCode;
      document.querySelector('#defaultCountry').value = userCountryName;
    }, "jsonp");

  // Функція-обгортка перехоплює бібліотечну функцію і викликає парсер textarea
    function decorator(func) {
      return function () {
        func();
        parseTextArea();
      }
    }
    phoneNumberParser = decorator( phoneNumberParser );

    function parseTextArea() {
      let textForParsing = document.querySelector('#output').value;

      if ( textForParsing.match(/isPossibleNumber\(\): true/ui)
           && textForParsing.match(/Phone Number region/ui)
           && !textForParsing.match(/Phone Number region: null/ui)
          ) {

        let formattedNumber = textForParsing.match(/^Original format: .+\nNational/ms)[0].slice(17,-9);

        document.getElementById('phone').value = formattedNumber;
        document.getElementById('phone').blur;

        hideErrorMessage('#registerForm', 5);
      } else {
        showErrorMessage('#registerForm', 5);
      }
    }
/* ↑↑↑ красиве форматування номеру телефону ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////