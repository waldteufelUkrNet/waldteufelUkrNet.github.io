"use strict"; // dbase.js
////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ VARIABLES DECLARATION ↓↓↓ */
// let keyForCompare    = 'author',
//     bookList         = document.querySelector('.books-list'),
//     ls               = localStorage,
//     isSerchFieldOpen = false,
//     bookListType;

/* ↑↑↑ /VARIABLES DECLARATION ↑↑↑ */

/* ↓↓↓ MAIN LOGIC ↓↓↓ */

/* ↑↑↑ /MAIN LOGIC ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////

/* ↓↓↓ FUNCTIONS DECLARATION ↓↓↓ */

/**
 * здійснює лексикографічне сортування масиву об'єктів phoneBook за ключем,
 * записаним в змінній keyForCompare
 * @param  {object} a об'єкт, елемент масиву
 * @param  {object} b об'єкт, елемент масиву
 * @return {[number]} результат порівняння
 */
// function compare( a, b ) {
//   return a[keyForCompare].localeCompare(b[keyForCompare]);
// }

function cleanTextArea(id) {
  document.querySelector('#' + id).value = '';
}
/* ↑↑↑ /FUNCTIONS DECLARATION ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////