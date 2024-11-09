;
(function ($) {
  $.fn.scrollTrigger = function (callback) {
    var $window = $(window);
    var _this = this;

    var hash = Math.random().toString(36).slice(-8);
    var openClassName = 'open_' + hash;

    $window.on('scroll.' + hash, function (e) {
      var windowHeight = $window.height();
      var scrollTop = $window.scrollTop();

      _this.each(function () {
        var $this = $(this);
        var offsetTop = $this.offset().top;

        if (offsetTop < scrollTop + 0.8 * windowHeight && !$this.hasClass(openClassName)) {
          $this.addClass(openClassName);
          callback.call(this);
        }
      });
    });

    $window.trigger('scroll.' + hash);

    return this;
  };
})(jQuery);
