$(document).ready(function(){
  // робота акордеону
  $('.toggle').click(function(e) {
    e.preventDefault();

    var $this = $(this);

    if ($this.next().hasClass('show')) {
      $this.next().removeClass('show');
      $this.next().slideUp(350);
    } else {
      $this.parent().parent().find('li .inner').removeClass('show');
      $this.parent().parent().find('li .inner').slideUp(350);
      $this.next().toggleClass('show');
      $this.next().slideToggle(350);
    }
  });

  // під час завантаження сторінки визначаємо, яка це сторінка, і відкриваємо потрібний пункт меню
  let name = $('.main').attr('data-name');
  let arr  = $('.accordion__item');
  for ( let i=0; i< arr.length; i++) {
    if ( $(arr[i]).attr('data-name') == name ) {
      $(arr[i]).addClass('accordion__item_active');
      $(arr[i]).parent().addClass('show').slideToggle(350);
      return
    }
  }
});
