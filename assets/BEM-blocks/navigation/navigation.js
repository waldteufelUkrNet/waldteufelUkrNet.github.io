$(document).ready(function(){
  let isMenuOpen    = false,
      isSubMenuOpen = false;
  $('.navigation__btn').click( function(){
    if ( !isMenuOpen ) {
      isMenuOpen = true;
      $('.navigation__list').css('display','block');
    } else {
      isMenuOpen = false;
      $('.navigation__list').css('display','none');
    }
  });

  $('.navigation__sublist-btn').click( function(){
    if ( !isSubMenuOpen ) {
      isSubMenuOpen = true;
      $('.navigation__sublist').css('display','block');
    } else {
      isSubMenuOpen = false;
      $('.navigation__sublist').css('display','none');
    }
  });

});