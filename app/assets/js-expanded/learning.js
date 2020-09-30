"use strict";

let headerBtns     = document.querySelectorAll('.learning__header'),
    learningBodies = document.querySelectorAll('.learning__body');

headerBtns.forEach(function(button){
  button.onclick = function (event){
    let dataAttrValue = event.currentTarget.getAttribute('data-learn-group');

    document.querySelector('.learning__header_active')
            .classList.remove('learning__header_active');

    document.querySelector('.learning__body_active')
            .classList.remove('learning__body_active');

    for (let body of learningBodies) {
      let currentDataAttrValue = body.getAttribute('data-learn-group');

      if (currentDataAttrValue == dataAttrValue) {
        document.querySelector('.learning__header[data-learn-group="' + dataAttrValue + '"]').classList.add('learning__header_active');
        body.classList.add('learning__body_active');
        return
      }
    }
  }
});