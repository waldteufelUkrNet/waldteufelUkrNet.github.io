"use strict"; ////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ functions declaration ↓↓↓ */

/**
 * [ajax створює асинхронний запит і отриманий результат перенаправляє
 * функції-обробнику]
 * @param  {[String]} url      [адреса запиту]
 * @param  {[String]} method   [метод запиту: get/post]
 * @param  {Function} callback [функція-обробник результату запиту]
 */

function ajax(url, method, callback) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callback(this.responseText);
    }
  };

  xhttp.open(method, url, true);
  xhttp.send();
}
/**
 * [ajaxPost відправляє дані на сервер post-запитом, у разі успіху запускає
 * функцію-коллбек]
 * @param  {[String]}        url         [адреса]
 * @param  {[String/Object]} data        [дані для відправки]
 * @param  {[Function]}      successFunc [функція-callback]
 * @param  {[DOM-Object]}    context     [контекст для функції]
 */


function ajaxPost(url, data, successFunc, context) {
  // console.log("url", url);
  // console.log("data", data);
  // console.log("successFunc", successFunc);
  // console.log("context", context);
  // successFunc(context);
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      successFunc(context);
    }
  };

  xhttp.open("POST", url, true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(data));
}
/**
 * [addOnEventToObject додає циклом on-обробники в масив або об'єкт елементів,
 * передає контекст у обробник]
 * @param {[String]}       event     [назва події]
 * @param {[Object/Array]} targetObj [сукупність DOM-елементів]
 * @param {[Function]}     handler   [функція-обробник]
 */


function addOnEventToObject(event, targetObj, handler) {
  var e = 'on' + event;

  for (var i = 0; i < targetObj.length; i++) {
    (function (n) {
      targetObj[n][e] = function () {
        handler(this);
      };
    })(i);
  }
}
/**
 * [checkPhoneKey відфільтровує усі клавіші крім цифрових, стрілок та видалень]
 * @param  {[Object]} event [об'єкт події]
 * @return {[Boolean]}      [результат фільтрації]
 */


function checkPhoneKey(event) {
  return event.key >= '0' && event.key <= '9' || event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Delete' || event.key == 'Backspace';
}
/**
 * [selectCountry обробник кліку на список країн]
 * @param  {[DOM-object]} elem [тег div.country-list-item]
 */


function selectCountry(elem) {
  var imgSrc = elem.querySelector('img').getAttribute('src');
  document.getElementById('cflag').setAttribute('src', imgSrc);
  document.getElementById('ccode').value = elem.dataset.ccode;
  var list = document.querySelector('.form-registration__country-list');
  list.style.display = 'none';
  list.innerHTML = '';
  isCountryListOpen = false;
  document.getElementById('phone').removeAttribute('disabled');
}
/**
 * [showErrorMessage показує повідомлення про конкретну помилку валідації]
 * @param  {[string]} formID [ідентифікатор форми]
 * @param  {[number]} num    [порядковий номер повідомлення]
 */


function showErrorMessage(formID, num) {
  document.querySelector(formID + ' .errors-list').setAttribute('data-error', true);
  document.querySelector(formID + ' .errors-list').style.display = 'block';
  var messages = document.querySelectorAll(formID + ' .form-error');
  messages[num].style.display = 'block';
}
/**
 * [hideErrorMessage приховує повідомлення про помилки валідації]
 * @param  {[number]} num [порядковий номер повідомлення]
 */


function hideErrorMessage(formID, num) {
  var messages = document.querySelectorAll(formID + ' .form-error');
  messages[num].style.display = 'none';

  for (var i = 0; i < messages.length; i++) {
    if (getComputedStyle(messages[i]).display == 'block') return;
  }

  document.querySelector(formID + ' .errors-list').setAttribute('data-error', false);
  document.querySelector(formID + ' .errors-list').style.display = 'none';
}
/**
 * [isEmailValid перевіряє валідність пошти]
 * @param  {[string]}  email [пошта, яку валідують]
 * @return {Boolean}         [результат перевірки на валідність]
 */


function isEmailValid(email) {
  // повинен бути 1 символ @
  var temp = calculateCharsInStr(email, '@');
  if (temp != 1) return false; // повинен бути мінімум 1 символ .

  temp = calculateCharsInStr(email, '.');
  if (temp < 1) return false; // символи @ та . не повинні бути крайніми

  if (email.charAt(0) == '@' || email.charAt(0) == '.' || email.charAt(email.length - 1) == '@' || email.charAt(email.length - 1) == '.') return false; // комбінація символів @. не допустима

  if (email.indexOf('@.') != -1) return false; // після символу @ обов'язково повинен бути символ .

  var tempArr = email.split('@');
  if (tempArr[1].indexOf('.') == -1) return false;
  return true;
}
/**
 * [calculateCharsInStr розраховує кількість символів одного типу в рядку]
 * @param  {[string]} str  [рядок, в якому проводиться пошук]
 * @param  {[string]} char [шуканий символ]
 * @return {[number]}      [кількість символів одного типу в рядку]
 */


function calculateCharsInStr(str, _char) {
  var pos = 0,
      count = 0;

  while (true) {
    var foundPos = str.indexOf(_char, pos);
    if (foundPos == -1) break;
    count++;
    pos = foundPos + 1;
  }

  return count;
}
/**
 * [isNumeric визначає, чи є передаваний параметр числом]
 * @param  {[string]}  n [значення, яке треба визначити як число/не число]
 * @return {Boolean}     [результат перевірки]
 */


function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
/**
 * [redirect перенаправляє на сторінку, вказану в параметрі]
 * @param  {[string]} url [адреса]
 */


function redirect(url) {
  window.location.href = url;
}
/* ↑↑↑ /functions declaration ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////