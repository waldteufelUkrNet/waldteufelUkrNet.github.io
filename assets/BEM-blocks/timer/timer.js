setInterval(function(){
  let data = new Date();
  let hh = data.getUTCHours();
  if (hh<10) hh = '0' + hh;
  let mm = data.getUTCMinutes();
  if (mm<10) mm = '0' + mm;
  let ss = data.getUTCSeconds();
  if (ss<10) ss = '0' + ss;

  document.getElementsByClassName('timer__hours')[0].innerHTML = hh;
  document.getElementsByClassName('timer__minutes')[0].innerHTML = mm;
  document.getElementsByClassName('timer__seconds')[0].innerHTML = ss;
},1000);