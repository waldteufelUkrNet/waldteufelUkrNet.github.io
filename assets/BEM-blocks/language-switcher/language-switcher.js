let isLanguageSwitcherOpen = false;
$('.language-switcher__btn').click(function(){

  if (isLanguageSwitcherOpen) {
    $('.language-switcher__toggle').css('display','none');
    isLanguageSwitcherOpen = false;
  } else {
    $('.language-switcher__toggle').css('display','block');
    isLanguageSwitcherOpen = true;
  }
});