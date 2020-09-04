"use strict";function wSwitchTab(e){if(e.target.classList.contains("wjs-tab__header")&&!e.target.classList.contains("wjs-tab__header_active")){for(var t=e.target.closest(".wjs-tab__header"),a=t.dataset.tab,r=t.closest(".wjs-tab"),s=r.querySelector(".wjs-tab__bodies-wrapper").children,n=0;n<s.length;n++)s[n].classList.remove("wjs-tab__body_active");r.children[0].querySelector(".wjs-tab__header_active").classList.remove("wjs-tab__header_active"),e.target.classList.add("wjs-tab__header_active"),r.querySelector('.wjs-tab__body[data-tab="'+a+'"]').classList.add("wjs-tab__body_active")}}document.addEventListener("click",wSwitchTab);for(var scrollTables=document.querySelectorAll(".wjs-scrollTable-wrapper"),i=0;i<scrollTables.length;i++)!function(e,t){scrollTables[e].onscroll=function(){scrollTableHandler(t)}}(i,scrollTables[i]);function addOnEventToObject(e,t,a){for(var r="on"+e,s=0;s<t.length;s++)t[s][r]=function(){a(this)}}function ajax(e,t,a){var r=new XMLHttpRequest;r.onreadystatechange=function(){4==this.readyState&&200==this.status&&a(this.responseText)},r.open(t,e,!0),r.send()}function scrollTableHandler(e){var t=e.scrollTop;e.querySelector("thead").style.transform="translateY("+(t-1)+"px)"}function ajaxPost(e,t,a,r){var s=new XMLHttpRequest;s.onreadystatechange=function(){4==s.readyState&&200==s.status&&a(r)},s.open("POST",e,!0),s.setRequestHeader("Content-Type","application/json"),s.send(JSON.stringify(t))}function checkPhoneKey(e){return"0"<=e.key&&e.key<="9"||"ArrowLeft"==e.key||"ArrowRight"==e.key||"Delete"==e.key||"Backspace"==e.key}function isEmailValid(e){var t=calculateCharsInStr(e,"@");return 1==t&&(!((t=calculateCharsInStr(e,"."))<1)&&("@"!=e.charAt(0)&&"."!=e.charAt(0)&&"@"!=e.charAt(e.length-1)&&"."!=e.charAt(e.length-1)&&(-1==e.indexOf("@.")&&-1!=e.split("@")[1].indexOf("."))))}function calculateCharsInStr(e,t){for(var a=0,r=0;;){var s=e.indexOf(t,a);if(-1==s)break;r++,a=s+1}return r}function isNumeric(e){return!isNaN(parseFloat(e))&&isFinite(e)}function redirect(e){window.location.href=e}