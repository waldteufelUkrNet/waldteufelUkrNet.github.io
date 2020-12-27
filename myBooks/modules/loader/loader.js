"use strict";
// loader module
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ LOADER ↓↓↓ */
  let loader = document.querySelector('.loader');
  let bookInner = document.querySelector('#book');

  bookInner.style.overflow = 'hidden';

  window.addEventListener('load', function(){
    setTimeout(function(){
      loader.classList.remove('loader_active');
      bookInner.style.overflow = '';
    },1000);
  });
/* ↑↑↑ /LOADER ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ FUNCTIONS DECLARATION ↓↓↓ */
/* ↑↑↑ /FUNCTIONS DECLARATION ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////