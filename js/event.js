
/* Menu
-----------------------------------------------------------------*/
jQuery(function($) {
  var head = $('.js-header');
  $(window).on('load scroll',function () {
        if ($(this).scrollTop() > 0) {
            head.addClass('active');
        } else {
            head.removeClass('active');
        }
    });
});
jQuery(function($) {
  var toggle = $('.js-accordion');
  toggle.on('click',function(){
    $(this).toggleClass('active');
    $(this).next().stop().slideToggle();
    return false;
  });
});
jQuery(function($) {
  var toggle = $('.js-nav-toggle'),
    menu = $('.js-nav-menu');
    wrapper = $('.l-wrapper'),

  toggle.on('click',function(){
    $(this).toggleClass('active');
    menu.toggleClass('active');
    wrapper.toggleClass('active');
  });
});
jQuery(function($) {
  var menu = $('.js-control');
  $(window).on('load scroll',function () {
        if ($(this).scrollTop() > 100) {
            menu.addClass('active');
        } else {
            menu.removeClass('active');
        }
    });
});








/* fadeInAnim
-------------------------------------------------*/
var spW = 768,    // SP max width, not contain
isSp,         // Is SP or not
winW,         // Window width
winH,         // Window height
winST,        // Window scrollTop
isChange;     // Is change to PC/SP

$(window).load(function () {
initCommon();
});

function initCommon() {
$(window).load(function(){
$('body').addClass('hideCover');
});

$(window).scroll(function(){
winST = $(window).scrollTop();
setFadeInAnim();
}).trigger('scroll');

$(window).resize(function(){
getWinSize();
setFadeInAnim();
}).trigger('resize');
}

function getWinSize() {
winW = $('html').css('overflow', 'hidden').width();
winH = $(window).height();
isChange = isSp !== undefined && isSp != (winW < spW);
isSp = winW < spW;
$('html').removeAttr('style');
}

function setFadeInAnim() {
var fadeObj = $('.fadeInAnim');
if (!fadeObj.length) return;
var delayH = 200;

fadeObj.each(function(){
var elm = $(this),
elmT = elm.offset().top,
elmH = elm.height();

if (winST > elmT - winH + delayH && winST < elmT + elmH) {
  elm.addClass('visible');
} else if (winST < elmT - winH + delayH && winST < elmT + delayH) {
  // elm.removeClass('visible');
  //↑何回もアニメーションしたいときはコメントアウト外す
}
});
}



jQuery(function($) {
  $(".bgAnim").each(function(i, elem){
    $(window).on("load scroll resize", function(){
      var position = $(elem).offset().top;
      var height = $(elem).height();
      var windowHeight = $(window).height();
      var scroll = $(window).scrollTop();
      if(scroll >= position + height - windowHeight + windowHeight/2) {
        $(elem).removeClass("show");
      } else if(scroll <= position - windowHeight + windowHeight/2){
        $(elem).removeClass("show");
      }else if (scroll >= position - windowHeight + windowHeight/2){
          $(".bgAnim").not(elem).removeClass("show");
          $(elem).addClass("show");
      } else{
        $(elem).removeClass("show");
      }
    });
  });
});


/* cookie
-----------------------------------------------------------------*/
jQuery(function($) {
  const format = date => date.toISOString().slice(0, 19);
  const key = 'atmr__cookie__expire';
  const expire = localStorage.getItem(key);
  const now = new Date();
  const $box = $('.cookie-box__in');
  if (expire && format(now) < expire) { $box.hide(); return; }
  $box.find('.cookie-box__btn').on('click', e => {
    $box.hide();
    now.setDate(now.getDate() + 30);
    localStorage.setItem(key, format(now));
  });
});
