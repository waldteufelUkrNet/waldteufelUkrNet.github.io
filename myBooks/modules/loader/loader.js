"use strict";
// loader module
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ LOADER ↓↓↓ */
  let loader = document.querySelector('.loader');
  let bookInner = document.querySelector('#book');

  bookInner.style.overflow = 'hidden';

  window.onload = () => {
    setTimeout(function(){
      loader.classList.remove('loader_active');
      bookInner.style.overflow = '';
    },1000);
  };
/* ↑↑↑ /LOADER ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ FUNCTIONS DECLARATION ↓↓↓ */
/* ↑↑↑ /FUNCTIONS DECLARATION ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////