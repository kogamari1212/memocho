/* Adressbar
-----------------------------------------------------------------*/
function hideURLbar() {
	if (window.location.hash.indexOf('#') == -1) {
		window.scrollTo(0, 1);
	}
}

if (navigator.userAgent.indexOf('iPhone') != -1 || navigator.userAgent.indexOf('Android') != -1) {
    addEventListener("load", function() {
            setTimeout(hideURLbar, 0);
    }, false);
}


/* Menu
-----------------------------------------------------------------*/
$(function(){
	$(".menu").click(function () {
		$(".panel").slideToggle();
	});
});


/* Accordion
-----------------------------------------------------------------*/
$(function(){

$(".accordion p").click(function(){
	$(this).next("ul").slideToggle();
	$(this).children("span").toggleClass("open");	
});

$(".accordion dt").click(function(){
	$(this).next("dd").slideToggle();
	$(this).next("dd").siblings("dd").slideUp();
	$(this).toggleClass("open");	
	$(this).siblings("dt").removeClass("open");
});

})

/* Trigger
-----------------------------------------------------------------*/
$(document).ready(function(){

	$(".trigger dd,.trigger2 dd").hide(); 

	$(".trigger dt,.trigger2 dt").click(function(){
		$(this).toggleClass("active").next().slideToggle("slow");
		return false; 
	});

});


/* tooltip
-----------------------------------------------------------------*/
$(function() {
	$("a.tool").hover(function() {
		var v1 = $(this).height()+20;
		var v2 = $(this).next(".tooltip").height();
		$(this).next(".tooltip").css("top",-(v1+v2));
		$(this).next(".tooltip").animate({opacity: "show"}, 150);} , function() {
		$(this).next(".tooltip").animate({opacity: "hide"}, 0);
	});
});

/* form
-----------------------------------------------------------------*/
$(function(){
	$('dd.must select').css({
		backgroundColor: '#fff',
		border: '#666666 1px solid'
	});
	$('dd.must input,dd.must textarea,dd.must select,dd.must option').each(function(){
		if(this.value == ""){
			$(this).css("background-color","#ffebeb");
		} else {
			$(this).css("background-color","#ffffff");
		}
	});
	$('dd.must input,dd.must textarea,dd.must select,dd.must option').blur(function(){
		if(this.value == ""){
			$(this).css("background-color","#ffebeb");
		} else {
			$(this).css("background-color","#ffffff");
		}
	});
	$('dd.must select,dd.must option').focus(function(){
		if(this.value == ""){
			$(this).css("background-color","#ffebeb");
		} else {
			$(this).css("background-color","#ffffff");
		}
	});
});