$(document).ready(function(){$(window).on("load",function(){$("#preloader").delay(450).fadeOut("slow"),$(".side").removeClass("position-null")}),$("#tradestrip").marquee({startVisible:!0,duration:7e4,duplicated:false});var t=!1,e=$("#f-menu");if($("#pull").click(function(i){t?($(this).removeClass("toggle-open"),t=!1,e.slideToggle()):($(this).addClass("toggle-open"),e.slideToggle(),t=!0)}),$(window).resize(function(){$(window).width()>768&&e.is(":hidden")&&e.css("display","flex")}),$(window).resize(),$(".btn-generic").on("click",function(t){t.preventDefault(),$("#window-generic").arcticmodal()}),$(".btn-competition").on("click",function(t){t.preventDefault(),$("#window-competition").arcticmodal()}),$(".btn-callback").on("click",function(t){t.preventDefault(),$("#window-callback").arcticmodal()}),$(".btn-livechat").on("click",function(t){t.preventDefault(),$("#scD84A").find("a").trigger("click")}),$("#log-in").on("click",function(t){"log-in"==t.target.id&&$(this).fadeOut(400)}),$(".oa").on("click",function(t){t.preventDefault(),$("#log-in").fadeIn(400),$("#login").css("top","0")}),$(".arcticmodal-close").on("click",function(){$("#log-in, #register-popup").fadeOut(400),$("#login").css("top","auto")}),$("#log-in .front-register").on("click",function(t){$("#log-in").fadeOut(300)}),$(".assets-right").simplemarquee({direction:"left",speed:25,cycles:500}),$(".js_question_but").length>0)new Search({onSearchDone:function(){var t=this;if(t.numberOfResults){$("."+t.settings.defaultClass).parents(".js_toggle_block").slideDown(400);var e=$("."+t.settings.defaultClass).eq(1).parents(".js_toggle_block").offset(),i=$(window).height()/2;$("html, body").stop().animate({scrollTop:e.top-i},500)}return!0},onNextStep:function(t,e){var i=$(e.selector).parents(".js_toggle_block").offset(),n=$(window).height()/2;return i&&$("html, body").stop().animate({scrollTop:i.top-n},500),!0},containersSelectors:".js_question_but,.js_toggle_block"});function i(t){this.init(t)}$(".section-faq .description a").on("click",function(t){$(this).toggleClass("active"),$(this).siblings(".text").slideToggle(),t.preventDefault()}),$(".question").on("click",function(t){$(this).toggleClass("active"),$(this).siblings(".toggle-content").slideToggle(),t.preventDefault()}),i.prototype={settings:{fixedOnTop:!0,mainContainer:".glossary-section",mainSubContainer:".glossary-section .section-inner",linksContainerSelector:".letter-list-block .letter-list",letterElementSelector:".letter-element",letterLinkSelector:".letter-link",fadeSpeed:300,activateLetterCallback:function(t){return!0}},links:[],activateLetterCallback:function(t){return!0},init:function(t){var e=this;e.settings=$.extend(e.settings,t||{}),e.activateLetterCallback=e.settings.activateLetterCallback,e.initLinks()},initLinks:function(){var t=this;$(t.settings.linksContainerSelector).find(t.settings.letterElementSelector).each(function(){var e=$(this).find(t.settings.letterLinkSelector).data("letter");e=e.toLowerCase(),$(this).on("click",function(i){i.preventDefault(),t.setActiveLetter(e)}),t.links[e]=$(this)}),t.settings.fixedOnTop&&($(document).on("resize",function(e){$(t.settings.linksContainerSelector+".fixed").animate({top:$("header").height()})}),$("header").on("webkitTransitionEnd transitionend",function(t){$(document).trigger("resize")}))},setActiveLetter:function(t,e){var i=this;if(!t)return!1;if(t=t.toLowerCase(),!i._letterExist(t))return!1;var n=this.links[t];n.hasClass("active")||($(i.settings.linksContainerSelector).find(".active").removeClass("active"),n.addClass("active")),i.activeLetter=t;var o=n.find(i.settings.letterLinkSelector);return e?i.activateLetterCallback($(o.prop("hash"))):setTimeout(function(){i._scrollToLetter($(o.prop("hash"))),i.activateLetterCallback($(o.prop("hash")))},i.settings.fadeSpeed),!0},_letterExist:function(t){return void 0!==this.links[t]},_scrollToLetter:function(t){if(t.length<1)return!1;var e=$("header").outerHeight(),i=$(this.settings.linksContainerSelector).height(),n=t.offset().top-i-e-50,o=t.offset().top-50;return window.innerWidth>1023?$("html, body").stop().animate({scrollTop:n},900):$("html, body").stop().animate({scrollTop:o},900),!0}},$(document).ready(function(){new i({activateLetterCallback:function(t){return $(".glossary-table").removeClass("active"),t.addClass("active"),!0}}).setActiveLetter($(".letter-link").first().data("letter"),!0),$(document).on("resize",function(t){$(".letter-list-block .letter-list.fixed").animate({top:$("header").height()})}),$("header").on("webkitTransitionEnd transitionend",function(t){$(document).trigger("resize")}),$("#verification-accordion, .accordion-item-wrap").find(".accordion-toggle").click(function(){$(this).next().slideToggle("fast").parents(".accordion-item").toggleClass("active"),$(".accordion-content").not($(this).next()).slideUp("fast").parents(".accordion-item").removeClass("active")}),$(".account-tabs-menu li > a").click(function(t){t.preventDefault(),$(this).parent().addClass("current"),$(this).parent().siblings().removeClass("current");var e=$(this).attr("href");$(".account-tab-content").not(e).css("display","none"),$(e).fadeIn()}),tooltip.init($("a[data-tooltip]"))}),$(".education-section .nav-tabs li > a").click(function(){setTimeout(function(){$(".education-tab-content.active .video-slider").each(function(){$(this).slick("unslick"),$(this).slick({dots:!1,slidesToShow:4,slidesToScroll:1,infinite:!1,responsive:[{breakpoint:768,settings:{slidesToShow:3}},{breakpoint:600,settings:{slidesToShow:2}},{breakpoint:380,settings:{slidesToShow:1}}]})})})}),$(".video-slider").each(function(){$(this).slick({dots:!1,slidesToShow:4,slidesToScroll:1,infinite:!1,responsive:[{breakpoint:768,settings:{slidesToShow:3}},{breakpoint:600,settings:{slidesToShow:2}},{breakpoint:380,settings:{slidesToShow:1}}]})}),(new WOW).init();var n=$("#sidebar"),o=$("#content");function s(){var t=$(this).scrollTop()+30;$(window).width()<769?n.css("position","static"):t<o.offset().top?n.css({position:"absolute",top:"0px"}):t+100>l?n.css({position:"absolute",bottom:"0px",top:"auto"}):n.css({position:"fixed",top:"30px",bottom:"auto"})}if(n.length>0&&$(window).width()>900){$(window).on("resize",function(){s()});var l=o.height()-n.height()+o.offset().top;$(window).on("scroll",function(){s()}),s()}});

var videoru='<div style="position:relative;margin:0 auto;"><video poster="/wp-content/themes/bormancorp/img/video-about-poster.jpg" class="video-sm" src="/wp-content/uploads/2018/08/borman-ru.mp4" controlsList="nodownload " controls="controls"   class="video">\t </video></div>';
var videoeng = '<div style="position:relative;margin:0 auto;"><video poster="/wp-content/themes/bormancorp/img/video-about-poster.jpg" class="video-sm" src="/wp-content/uploads/2018/08/borman-en.mp4" controlsList="nodownload " controls="controls"   class="video">\t </video></div>'
if ($(window).width() < 768) {
	videoru='<div style="position:relative;margin:0 auto;"><video poster="/wp-content/themes/bormancorp/img/video-about-poster.jpg" class="video-sm" src="/wp-content/uploads/2018/08/borman-ru-mob.mp4" controlsList="nodownload " controls="controls"   class="video">\t </video></div>';
	videoeng = '<div style="position:relative;margin:0 auto;"><video poster="/wp-content/themes/bormancorp/img/video-about-poster.jpg" class="video-sm" src="/wp-content/uploads/2018/08/borman-en-mob.mp4" controlsList="nodownload " controls="controls"   class="video">\t </video></div>'
}
$(document).ready(function(){$(".page-id-349 .section-about-platform .picture").replaceWith(videoru)}),$(document).ready(function(){$(".simplemarquee-wrapper ul").append('<li><img src="/wp-content/uploads/2018/08/vload.png" alt="title"></li>')});
$(document).ready(function(){$(".page-id-10 .section-about-platform .picture").replaceWith(videoeng)});





$(document).ready(function() {
	function checkAmountOfLots(url, moneyContainer, daysContainer) {
// 		$.ajax({
// 			url: url,
// 			success: function(data) {
// 				if (data) {
// 					var counters = JSON.parse(data).data;
// 					var days = Math.floor(counters.timeLeft/86400);
// 					if ($(moneyContainer)) $(moneyContainer).text('$'+counters.bonusAmountLeft);
// 					if ($(daysContainer)) $(daysContainer).text(days);
// 				}
// 			}
// 		});
// 		setTimeout(function() {
// 			checkAmountOfLots(url, moneyContainer, daysContainer)
// 		}, 5000);
	}

	if ($('body').hasClass('home')) {
		checkAmountOfLots('https://www.bormancorp.com/api.php?method=getPromotionStats', '#money-counter', '#days-counter');
	}
	if ($('body').hasClass('page-template-page-promotion')) {
		checkAmountOfLots('https://www.bormancorp.com/api.php?method=getPromotionScore', '#money-counter', '#days-counter');
	}

	function fadeIn(el, time) {
		el.style.display = 'block';
		el.style.opacity = 0;
		var last = +new Date();
		var tick = function() {
			el.style.opacity = +el.style.opacity + (new Date() - last) / time;
			last = +new Date();
			if (+el.style.opacity < 1) {
				(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
			}
		};
		tick();
	}
	function fadeOut(el, time) {
		el.style.opacity = 1;
		var last = +new Date();
		var tick = function() {
			el.style.opacity = +el.style.opacity - (new Date() - last) / time;
			last = +new Date();
			if (+el.style.opacity > 0) {
				(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
			} else {
				el.style.display = 'none';
			}
		};
		tick();
	}

	var videoPopup = document.querySelector('.video-popup');
	var videoPopupOverlay = document.querySelector('.video-popup__overlay');

	if (videoPopup) {
		setTimeout(function() {
			var storagePopupEn = localStorage.getItem('video-popup-en');
			var storagePopupRu = localStorage.getItem('video-popup-ru');
			var storagePopupAr = localStorage.getItem('video-popup-ar');
			var lang = document.querySelector('html').getAttribute('lang');

			if (!storagePopupEn && lang === 'en') {
				fadeIn(videoPopup, 200);
				localStorage.setItem('video-popup-en', true);
			}
			if (!storagePopupRu && lang === 'ru') {
				fadeIn(videoPopup, 200);
				localStorage.setItem('video-popup-ru', true);
			}
			if (!storagePopupAr && lang === 'ar') {
				return false;
				fadeIn(videoPopup, 200);
				localStorage.setItem('video-popup-ar', true);
			}
		}, 3000);
	}

	if (videoPopupOverlay) {
		videoPopupOverlay.addEventListener('click', function() {
			fadeOut(videoPopup, 200);
			document.getElementById('video-instruction').pause();
		})
	}

	var particlesContainer = document.getElementById('particles-js');
	if (particlesContainer) {
		particlesJS.load('particles-js', '/wp-content/themes/bormancorp/js/particlesjs-config-ny.json');
	}
	var particlesContainerBtc = document.getElementById('particles-js-btc');
	if (particlesContainerBtc) {
		particlesJS.load('particles-js-btc', '/wp-content/themes/bormancorp/js/particlesjs-config-ny.json');
	}

});
