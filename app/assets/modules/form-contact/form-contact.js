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