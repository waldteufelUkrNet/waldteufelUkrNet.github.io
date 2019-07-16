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

  // підсвітка активної вкладки меню
  let openedpage = $('.main').attr('data-name');

  if ( openedpage == 'terms'   ||
       openedpage == 'privacy' ||
       openedpage == 'risks'   ||
       openedpage == 'denial'  ||
       openedpage == 'refund'  ||
       openedpage == 'aml' ) {
  $('.navigation__list li[data-name=documentation]').addClass('active');
  }

  if ( openedpage == 'accs'         ||
       openedpage == 'registration' ||
       openedpage == 'recovery'     ||
       openedpage == 'contacts' ) {
    $('.navigation__list li[data-name=' + openedpage + ']').addClass('active');
  }

});