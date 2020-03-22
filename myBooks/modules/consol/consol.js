"use strict";
// consol module
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ ??? ↓↓↓ */
  let isConsolOpen = false;
  document.getElementById('consol-button').onclick = function() {
    if (isConsolOpen) {
      document.getElementById('consol').style.height = '0px';
    } else {
      document.getElementById('consol').style.height = '50vh';
    }
     isConsolOpen = !isConsolOpen;
  };

  function conlog (value) {
    let p = '<p>' + value + '</p>';
    document.getElementById('consol').insertAdjacentHTML('beforeEnd',p);
  };
/* ↑↑↑ /??? ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////