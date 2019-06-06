function login(user) {

  let dictionary = {
    greeting : {
      ru: 'Добро пожаловать, ',
      en: 'Welcome, '
    },
    btnText : {
      ru : 'выйти',
      en : 'logout'
    }
  }

  let language = $('.language-switcher').attr('data-lang');

  $('#login-form-login, #login-form-password').css('display','none');

  let greeting = dictionary.greeting[language] + user + '!';
  $('.greeting').text(greeting);
  $('#login-form-button').text(dictionary.btnText[language]);

  //приховати форму реєстрації
  $('.regform').css('display','none');
}



function logout() {
  let dictionary = {
    btnText : {
      ru : 'войти',
      en : 'login'
    }
  }

  let language = $('.language-switcher').attr('data-lang');
  $('.regform').css('display','block');
  $('.greeting').text('');
  $('#login-form-button').text(dictionary.btnText[language]);
  $('#login-form-login, #login-form-password').css('display','block');
}



$(document).ready(function(){
  setTimeout(function(){
    login('Вася')
  },3000);

  setTimeout(function(){
    logout()
  },6000);
});
