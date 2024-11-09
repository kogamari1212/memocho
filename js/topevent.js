
/* slick
-------------------------------------------------*/
jQuery(function ($) {
  $('.l-visual__slide').slick({
    infinite: true,
    autoplay:true,
    pauseOnHover:false,
    cssEase: 'linear',
    useCSS: true,
    fade: true,
    speed:2000,
    autoplaySpeed:4000,
    dots: false,
    arrows: false,
  });
  $('.l-member__list').slick({
    infinite: true,
    autoplay:true,
    pauseOnHover:false,
    cssEase: 'linear',
    useCSS: true,
    autoplaySpeed:0,
    speed: 5000,
    dots: false,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
       breakpoint: 761, //760px以下のサイズに適用
       settings: {
         slidesToShow:1,
         centerMode: true,
       }
      }
    ]
  });
  var width = $(window).width();
  if(width <= 760){
    $('.l-news-list').slick({
      dots: true,
      arrows: false,
      speed: 200,
      autoplaySpeed: 4000,
      autoplay: true,
      slidesToShow:1,
    });
  }
});


