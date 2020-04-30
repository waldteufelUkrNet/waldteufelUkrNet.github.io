$(document).ready(function(){

  // parallax.js
  $('.parallax-window').parallax({
    naturalWidth: 600,
    naturalHeight: 400,
    androidFix: false
  });

  // slick slider
  $('.comments__container').slick({
    infinite: true,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 10000,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

});