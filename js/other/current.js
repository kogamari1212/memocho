jQuery(function($){
	/*$('.sidebox ul').hide();
	$('.sidebox li > div').css({cursor: 'pointer'}).on('click', function() {
		var $this = $(this);
		$this.parent().toggleClass('open');
		$this.next('ul').slideToggle(300);
	});*/

	var pathname = location.pathname;
	var search   = location.search;
	$('.sidebox ul li a').each(function() {
		var $this = $(this);
		var href  = $this.attr('href')
		if (href == pathname || href == pathname + search) {
			$this.parents('.sidebox ul li').addClass('current');
		}
	});
});
