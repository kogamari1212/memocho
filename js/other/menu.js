/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright ﾂｩ 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright ﾂｩ 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
//---------------------------------------------------------
//	▼ UAManager ▼
//---------------------------------------------------------
var UAManager = {
	
	//---------------------------------------------------------
	//	constant
	//---------------------------------------------------------
	MOBILE : "mobile",
	PC : "pc",
	TABLET : "tablet",
	
	CHROME : "chrome",
	SAFARI : "safari",
	FIREFOX : "firefox",
	IE6 : "ie6",
	IE7 : "ie7",
	IE8 : "ie8",
	IE9 : "ie9",
	IE10 : "ie10",
	FIREFOX : "firefox",
	OPERA : "opera",
	DS3 : "DS3",
	WIIU : "Wiiu",
	IPHONE : "iphone",
	IPAD : "ipad",
	ANDROID : "android",
	
	//---------------------------------------------------------
	//	variable
	//---------------------------------------------------------
	isIE : false,
	isIos : false,
	type : null,
	career : null,
	
	//---------------------------------------------------------
	//	initialize
	//---------------------------------------------------------
	init : function() {
	
		var ua = window.navigator.userAgent.toLowerCase();
		
		
		UAManager.type = UAManager.PC;
		UAManager.career = UAManager.CHROME;
		
		
		if( ua.indexOf( '3ds' ) != -1 ) {
		
			UAManager.career = UAManager.DS3;
			UAManager.type = UAManager.MOBILE;
		
		}else if( ua.indexOf( 'wiiu' ) != -1 ) {
		
			UAManager.career = UAManager.WIIU;
		
		}else if( ua.indexOf( 'msie' ) != -1 ) {
		
			UAManager.isIE = true;
			if ( ua.indexOf( 'msie 6.' ) != -1 ) {
				UAManager.career = UAManager.IE6;
			}else if ( ua.indexOf( 'msie 7.' ) != -1 ) {
				UAManager.career = UAManager.IE7;
			}else if ( ua.indexOf( 'msie 8.' ) != -1 ) {
				UAManager.career = UAManager.IE8;
			}else if ( ua.indexOf( 'msie 9.' ) != -1 ) {
				UAManager.career = UAManager.IE9;
			}else if ( ua.indexOf( 'msie 10.' ) != -1 ) {
				UAManager.career = UAManager.IE10;
			}			
			
		}else if( ua.indexOf( 'ipad' ) != -1 ) {
		
			UAManager.career = UAManager.IPAD;
			UAManager.type = UAManager.TABLET;
			UAManager.isIos = true;
			
		}else if( ua.indexOf( 'iphone' ) != -1 || ua.indexOf( 'ipod' ) != -1 ) {
		
			UAManager.career = UAManager.IPHONE;
			UAManager.type = UAManager.MOBILE;
			UAManager.isIos = true;
			
		}else if( ua.indexOf( 'kindle' ) != -1 || ua.indexOf( 'silk' ) != -1 ) {
		
			UAManager.career = UAManager.ANDROID;
			UAManager.type = UAManager.TABLET;
			
		}else if( ua.indexOf( 'android' ) != -1 ) {
		
			UAManager.career = UAManager.ANDROID;
			
			if( ua.indexOf( 'mobile' ) != -1 ) {
				UAManager.type = UAManager.MOBILE;
			}else {
				UAManager.type = UAManager.TABLET;
			}
			
		}else if( ua.indexOf( 'chrome' ) != -1 ) {
		
			UAManager.career = UAManager.CHROME;
			
		}else if( ua.indexOf( 'safari' ) != -1 ) {
		
			UAManager.career = UAManager.SAFARI;
			
		}else if( ua.indexOf( 'gecko' ) != -1 ) {
		
			UAManager.career = UAManager.FIREFOX;
			
		}else if( ua.indexOf( 'opera' ) != -1 ) {
		
			UAManager.career = UAManager.OPERA;
		
		}
			
	}
	
}



//---------------------------------------------------------
//	▼ CSSManager ▼
//---------------------------------------------------------
var CSSManager = {

	vendor : null,
	transition : null,

	init : function() {
	
		//prefixを設定
		var dummyStyle = document.createElement('div').style;
		var vendors = ["webkitT", "MozT", "msT", "OT", "t"];
		var l = vendors.length;
		for ( var i = 0; i < l; i++ ) {
	
			var s = vendors[i];
			var t = s + 'ransform';
			
			if( t in dummyStyle ) {
			
				CSSManager.vendor = "-" + s.substr( 0, s.length - 1 );
				break;
				
			}
	
		}
		
		
		CSSManager.transition = CSSManager.vendor + "-transition";
		CSSManager.transform = CSSManager.vendor + "-transform";
		CSSManager.animation = CSSManager.vendor + "-animation";
	
	}

}
//---------------------------------------------------------
//	▲ CSSManager ▲
//---------------------------------------------------------
CSSManager.init();

//---------------------------------------------------------
//	▼ ResizeManager ▼
//---------------------------------------------------------
var ResizeManager = {
	
	$window : null,
	height : 0,
	width : 0,
	heightHalf : 0,
	widthHalf : 0,
	barHeight : 0,
	_minWidth : 0,
	_length : 0,
	_functions : [],
	_isInit : false,
	
	//---------------------------------------------------------
	//	initialize
	//---------------------------------------------------------
	init : function( i_minWidth ){
		
		ResizeManager._isInit = true;
		ResizeManager.$window = $( window );
		if( i_minWidth ) {
			ResizeManager._minWidth = i_minWidth;
		}
		
		if( UAManager.career == UAManager.IPHONE ) {
			ResizeManager.barHeight = 62;
			ResizeManager.$window.bind( "orientationchange", ResizeManager._onResize );
		}else if( UAManager.career == UAManager.ANDROID ) {
			var barHeight = ( window.outerHeight / window.devicePixelRatio ) - window.innerHeight;
			ResizeManager.barHeight = barHeight;
			//100以上はない？
			if( ResizeManager.barHeight > 100 ) {
				ResizeManager.barHeight = 100;
			}
		}
		
		
		ResizeManager.$window.resize( ResizeManager._onResize );
		ResizeManager.$window.resize();
		
	},
	
	//---------------------------------------------------------
	//	イベント追加
	//---------------------------------------------------------
	add : function( i_func ) {
		
		ResizeManager._functions.push( i_func );
		ResizeManager._length = ResizeManager._functions.length;
		
	},
	
	//---------------------------------------------------------
	//	イベント解除
	//---------------------------------------------------------
	remove : function( i_func ) {
		
		for( var i = 0; i < ResizeManager._length; i++ ) {
		
			var f = ResizeManager._functions[i];
			if( f == i_func ) {
				ResizeManager._functions.splice( i, 1 );
				break;
			}
		
		}
		ResizeManager._length = ResizeManager._functions.length;
		
	},
	
	//---------------------------------------------------------
	//	リサイズ時
	//---------------------------------------------------------
	_onResize : function(){
		
		//ResizeManager.height = ResizeManager.$window.height() + ResizeManager.barHeight;

		if (window.innerHeight) {
			ResizeManager.height = window.innerHeight + ResizeManager.barHeight;
		} else { 
			ResizeManager.height = ResizeManager.$window.height() + ResizeManager.barHeight;
		}
		
		ResizeManager.width = ResizeManager.$window.width();
		if( ResizeManager.width < ResizeManager._minWidth ) {
			ResizeManager.width = ResizeManager._minWidth;
		}
		
		ResizeManager.heightHalf = ResizeManager.height / 2;
		ResizeManager.widthHalf = ResizeManager.width / 2;
		
		for( var i = 0; i < ResizeManager._length; i++ ) {
		
			var f = ResizeManager._functions[i];
			f();
		
		}		
		
	}
	
	
}
//---------------------------------------------------------
//	▲ ResizeManager ▲
//---------------------------------------------------------
ResizeManager.init();

//---------------------------------------------------------
//	▼ EnterFrameManager ▼
//---------------------------------------------------------
var EnterFrameManager = {

	_length : 0,
	_functions : [],
	_isInit : false,
	scrollTop : 0,
	$window : null,
	
	//---------------------------------------------------------
	//	initialize
	//---------------------------------------------------------
	init : function(){
	
		EnterFrameManager._isInit = true;
		
		EnterFrameManager.$window = $( window );
	
		window.requestAnimationFrame = ( function() {
		
			return function( callback, element ) {
	
				window.setTimeout( callback, 1000 / 60 );
	
			};
	
		} )();
		
		window.requestAnimationFrame( EnterFrameManager._loop );
	
	},
	
	//---------------------------------------------------------
	//	EnterFrame
	//---------------------------------------------------------
	_loop : function() {
	
		EnterFrameManager.scrollTop = EnterFrameManager.$window.scrollTop();
	
		if( typeof( TWEEN ) != "undefined" ) {
			TWEEN.update();
		}
	
		for( var i = 0; i < EnterFrameManager._length; i++ ) {
		
			var f = EnterFrameManager._functions[i];
			f();
		
		}
		
		window.requestAnimationFrame( EnterFrameManager._loop );
	
	},

	//---------------------------------------------------------
	//	イベント追加
	//---------------------------------------------------------
	add : function( i_func ) {
	
		for( var i = 0; i < EnterFrameManager._length; i++ ) {
		
			var f = EnterFrameManager._functions[i];
			if( f == i_func ) {
				return;
			}
		
		}
	
		EnterFrameManager._functions.push( i_func );
		EnterFrameManager._length = EnterFrameManager._functions.length;
		
	},
	
	//---------------------------------------------------------
	//	イベント解除
	//---------------------------------------------------------
	remove : function( i_func ) {
			
		for( var i = 0; i < EnterFrameManager._length; i++ ) {
		
			var f = EnterFrameManager._functions[i];
			if( f == i_func ) {
				EnterFrameManager._functions.splice( i, 1 );
				break;
			}
		
		}
		EnterFrameManager._length = EnterFrameManager._functions.length;
		
	}

}
//---------------------------------------------------------
//	▲ EnterFrameManager ▲
//---------------------------------------------------------
EnterFrameManager.init();

/*-------------------------------------------------------------------------------------------------
*
*	▼▼▼ ローディング系 ▼▼▼
*
-------------------------------------------------------------------------------------------------*/

//---------------------------------------------------------
//	▼ ImageLoader ▼
//---------------------------------------------------------
var ImageLoader = function( i_src ){

	this.src = i_src;
	this.img;
	this.timer;
	this.onLoadFunc;
	this.isLoaded = false;
	this.init.apply( this );
	
}
ImageLoader.loadedList = {};
ImageLoader.prototype = {

	//---------------------------------------------------------
	//	initialize
	//---------------------------------------------------------
	init : function() {
	
		if( ImageLoader.loadedList[this.src] ) {
			this.isLoaded = true;
		}
	
	},
	
	//---------------------------------------------------------
	//	ロード
	//---------------------------------------------------------
	load : function( i_func ) {
		
		this.onLoadFunc = i_func;
		
		this.img = new Image();
		this.img.src = "";
		this.img.src = this.src;
		
		if( this.isLoaded ) {
			this.loaded();
			return;
		}
		
		this.timer = setInterval( $.proxy( this.check, this ), 200 );
		
	},
	
	//---------------------------------------------------------
	//	ロード監視
	//---------------------------------------------------------
	check : function() {
	
		if( !this.img.complete ) {
			return;
		}
		clearInterval( this.timer );
		this.isLoaded = true;
		
		ImageLoader.loadedList[this.src] = {
			"width" : this.img.width,
			"height" : this.img.height,
			"src" : this.src
		};
		
		this.loaded();
	
	},
	
	//---------------------------------------------------------
	//	ロード完了
	//---------------------------------------------------------
	loaded : function() {
	
		//念のため関数かどうかチェック
		if( typeof( this.onLoadFunc ) == "function" ) {
			this.onLoadFunc( ImageLoader.loadedList[this.src] );
		}
		
		this.cancel();
	
	},
	
	//---------------------------------------------------------
	//	キャンセル
	//---------------------------------------------------------
	cancel : function() {
	
		this.onLoadFunc = null;
		this.img = null;
		clearInterval( this.timer );
		
	}
	
}
//---------------------------------------------------------
//	▲ ImageLoader ▲
//---------------------------------------------------------


//---------------------------------------------------------
//	▼ Slider ▼
//---------------------------------------------------------
var Slider = function( $i_target, $i_prevBtn, $i_nextBtn ) {

	this.$target = $i_target;
	this.$prevBtn = $i_prevBtn;
	this.$nextBtn = $i_nextBtn;
	
	this.$ul;
	this.$lis;
	
	this.index = 0;
	this._index = -1;
	
	this.onChangeFunc;
	
	this._init.apply( this );

}
Slider.prototype = {

	_init : function() {
	
		this.$ul = this.$target.find( "ul" );
		this.$lis = this.$ul.find( "li" );
		
		
		this.$prevBtn.bind( "click", $.proxy( this._onPrevBtnClick, this ) );
		this.$nextBtn.bind( "click", $.proxy( this._onNextBtnClick, this ) );
		
		ResizeManager.add( $.proxy( this._onResize, this ) );
		this._onResize();
		
		this.index = 0;
		this._set( true );
	
	},
	
	_onPrevBtnClick : function() {
		
		this.index--;
		this._set();
		return false;
	
	},
	
	_onNextBtnClick : function() {
		
		this.index++;
		this._set();
		return false;
	
	},
	
	_set : function( i_isNonAnim ) {
	
		if( this.index <= 0 ) {
			this.index = 0;
			this.$prevBtn.fadeOut( 250 );
		}else {
			this.$prevBtn.fadeIn( 250 );
		}
		
		if( this.index >= this.$lis.length - 1 ) {
			this.index = this.$lis.length - 1;
			this.$nextBtn.fadeOut( 250 );
		}else {
			this.$nextBtn.fadeIn( 250 );
		}
		
		if( this.index != this._index ) {
		
			this._index = this.index;
		
			if( typeof( this.onChangeFunc ) == "function" ) {
				this.onChangeFunc( this._index );
			}
			
		}
		
		var x = this._index * -ResizeManager.width;
		
		
		if( UAManager.isIos ) {
		
			if( i_isNonAnim ) {
				this.$ul.css( CSSManager.transition, CSSManager.transform + " 0s cubic-bezier(0.694, 0.0482, 0.335, 1)" );
			}else {
				this.$ul.css( CSSManager.transition, CSSManager.transform + " 0.33s cubic-bezier(0.694, 0.0482, 0.335, 1)" );
			}
			this.$ul.css( CSSManager.transform, "translate3d( " + x + "px, 0, 0 )" );
			
		}else {
			
			if( i_isNonAnim ) {
				this.$ul.css( "left", x );
			}else {
				this.$ul.animate( { "left" : x }, 330, "easeOutSine" );
			}
			
		}
		
	
	},
	
	_onResize : function() {
	
		this.$ul.width( ResizeManager.width * this.$lis.length );
		this.$lis.width( ResizeManager.width );
		this._set( true );
	
	}

}
//---------------------------------------------------------
//	▲ Slider ▲
//---------------------------------------------------------


$( function(){
	Common.init();
} );

var Common = {

	menu : null,

	init : function() {
		
		if( !location.hash ) {
			setTimeout( function(){
				scrollBy(0, 1);
			}, 100 );

		}
	
		Common.menu = new Common.Menu();
	
	}
}



//---------------------------------------------------------
//	▼ Menu ▼
//---------------------------------------------------------
Common.Menu = function() {
	
	this.$target;
	this.$openBtn;
	this.$closeBtn;
	this.$movie;

	this.scroller;

	this.width;
    this.height;
    this.movieHeight;

	this.isShow = false;
	
	this._init.apply( this );

}
Common.Menu.NO_FIXED_LIST = [
	"mozilla/5.0 (linux; u; android 4.0.4; ja-jp; scl21 build/imm76d) applewebkit/534.30 (khtml, like gecko) version/4.0 mobile safari/534.30"
];
Common.Menu.prototype = {


	//---------------------------------------------------------
	//	initialize
	//---------------------------------------------------------
	_init : function() {
	
		//$( "html,body" ).append( "<div>" + window.navigator.userAgent.toLowerCase() + "</div>" );
		
		this.$target = $( "#MenuNavi" );
		this.$openBtn = $( "#MenuNavi .openBtn a" );
		this.$closeBtn = $( "#MenuNavi .closeBtn a" );
        this.$movie = $("#Top .movie iframe");

        this.movieHeight = this.$movie.height();

		this.scroller = new Common.TScroller( this.$target.find( ".mask" ) );
		
		this.$openBtn.bind( "click", $.proxy( this._onOpenBtnClick, this ) );
		this.$closeBtn.bind( "click", $.proxy( this._onCloseBtnClick, this ) );
		
		this.$target.css( "left", 0 );

		var ua = window.navigator.userAgent.toLowerCase();
		var l = Common.Menu.NO_FIXED_LIST.length;
		for( var i = 0; i < l; i++ ) {
		
			if( Common.Menu.NO_FIXED_LIST[i] == ua ) {
				
				this.$target.css( "position", "absolute" );
				
				break;
			}
		
		}
		
		
		ResizeManager.add( $.proxy( this._onResize, this ) );
		this._onResize();
	
	},
	
	//---------------------------------------------------------
	//	
	//---------------------------------------------------------
	_onOpenBtnClick : function() {

		if( this.isShow ) {
			this.hide();
            if(UAManager.isIos) this.$movie.css( {height:this.movieHeight, border:"2px solid #fff"});

		}else {
			this.show();
            if(UAManager.isIos) this.$movie.css( {height:0, border:"none"});

		}
		
		return false;
		
	},
	
	//---------------------------------------------------------
	//	
	//---------------------------------------------------------
	_onCloseBtnClick : function() {
	
		this.hide();
        if(UAManager.isIos) this.$movie.css( {height:this.movieHeight, border:"2px solid #fff"});
		return false;
		
	},
	
	//---------------------------------------------------------
	//	
	//---------------------------------------------------------
	show : function( i_isNoAnimate ) {
		
		this.isShow = true;
		
		var x = 60;
		
		if( UAManager.isIos ) {
		
			if( i_isNoAnimate ) {
				this.$target.css( CSSManager.transition, CSSManager.transform + " none" );
			}else {
				this.$target.css( CSSManager.transition, CSSManager.transform + " 0.33s cubic-bezier(0.694, 0.0482, 0.335, 1)" );
			}
			this.$target.css( CSSManager.transform, "translate3d( " + x + "px, 0, 0 )" );
			
		}else {
			
			if( i_isNoAnimate ) {
				this.$target.css( "left", x );
			}else {
				this.$target.animate( { "left": x }, 330, "easeOutSine" );
			}
			
		}
		
		$( "#wrapInner" ).css( "pointer-events", "none" );
		
		/*
		var x = 50;
		if( !UAManager.isIos ) {
			x -= 50;
		}
		if( i_isNoAnimate ) {
			this.$target.css( CSSManager.transition, CSSManager.transform + " none" );
		}else {
			this.$target.css( CSSManager.transition, CSSManager.transform + " 0.33s cubic-bezier(0.694, 0.0482, 0.335, 1)" );
		}
		this.$target.css( CSSManager.transform, "translate3d( " + x + "px, 0, 0 )" );
		*/
		
	
	},
	
	//---------------------------------------------------------
	//	
	//---------------------------------------------------------
	hide : function( i_isNoAnimate ) {
	
		this.isShow = false;
		
		var x = this.width + 50;
		
		if( UAManager.isIos ) {
		
			if( i_isNoAnimate ) {
				this.$target.css( CSSManager.transition, CSSManager.transform + " 0s cubic-bezier(0.694, 0.0482, 0.335, 1)" );
			}else {
				this.$target.css( CSSManager.transition, CSSManager.transform + " 0.33s cubic-bezier(0.694, 0.0482, 0.335, 1)" );
			}
			this.$target.css( CSSManager.transform, "translate3d( " + x + "px, 0, 0 )" );
			
		}else {
			
			if( i_isNoAnimate ) {
				this.$target.css( "left", x );
			}else {
				this.$target.animate( { "left": x }, 330, "easeOutSine" );
			}
			
		}
		
		$( "#wrapInner" ).css( "pointer-events", "auto" );
		
		/*
		var x = this.width + 50;
		if( !UAManager.isIos ) {
			x -= 50;
		}
		if( i_isNoAnimate ) {
			this.$target.css( CSSManager.transition, CSSManager.transform + " none" );
		}else {
			this.$target.css( CSSManager.transition, CSSManager.transform + " 0.33s cubic-bezier(0.694, 0.0482, 0.335, 1)" );
		}
		
		this.$target.css( CSSManager.transform, "translate3d( " + x + "px, 0, 0 )" );
		*/
		
		
	},
	
	//---------------------------------------------------------
	//	
	//---------------------------------------------------------
	_onResize : function() {
	
		this.width = ResizeManager.width - 50;
		this.height = ResizeManager.height;
		
		this.$target.width( this.width );
		this.$target.height( this.height );
		
		this.scroller.resize( this.height );
		
		if( this.isShow ) {
			if( UAManager.isIos && !EnterFrameManager.scrollTop ) {
				//scrollTo(0, 1);
			}
			this.show( true );
		}else {
			this.hide( true );
		}
		
	}

}
//---------------------------------------------------------
//	▲ Menu ▲
//---------------------------------------------------------



//-----------------------------------------
//	TScroll
//-----------------------------------------
Common.TScroller = function( $i_target ) {
	
	this.$target = $i_target;
	this.$scroller;
	
	this.bar;
	
	this.isMouseDown = false;
	this.mouseDownY;
	this.mouseY;
	this.lastTime;
	
	this.speed = 0;
	this.friction = Common.TScroller.FRICTION;
	this.backFriction = Common.TScroller.BACK_FRICTION;
	
	this.y = 0;
	this.maxY;
	this.minY;
	this.ratioY;
	
	this._init.apply( this );

}
Common.TScroller.FRICTION = 0.90;
Common.TScroller.BOUND_FRICTION = 0.5;
Common.TScroller.BACK_FRICTION = 0.08;
Common.TScroller.prototype = {
	
	
	//-----------------------------------------
	//	initialize
	//-----------------------------------------
	_init : function() {
	
		//alert( window.addEventListener );
	
		this.$scroller = this.$target.find( ".scroller" );
		
		//スクロールバー
		this.bar = new Common.TScrollBar( this.$target.find( ".scrollBar" ) );
		
		//イベント登録
		if( typeof( document.ontouchstart ) != "undefined" ) {
			this.$target.bind( "touchstart", $.proxy( this._onMouseDown, this ) );
			this.$target.bind( "touchend", $.proxy( this._onMouseUp, this ) );
			this.$target.bind( "touchmove", $.proxy( this._onMouseMove, this ) );
		}else {
			this.$target.bind( "mousedown", $.proxy( this._onMouseDown, this ) );
			this.$target.bind( "mouseup", $.proxy( this._onMouseUp, this ) );
			this.$target.bind( "mousemove", $.proxy( this._onMouseMove, this ) );
		}
		
		//enter frame
		EnterFrameManager.add( $.proxy( this._onEnterFrame, this ) );
		
	},
	
	
	//-----------------------------------------
	//	on mouse down
	//-----------------------------------------
	_onMouseDown : function( i_event ) {

		if( this.isMouseDown ) {
			return;
		}
		this.isMouseDown = true;
		
		this.mouseDownY = this.mouseY = this._getPageYFromEvent( i_event );
		this.lastTime = +new Date();
		
		this.bar.show();
		
	},
	
	//-----------------------------------------
	//	on mouse up
	//-----------------------------------------
	_onMouseUp : function( i_event ) {
	
		if( !this.isMouseDown ) {
			return;
		}
		
		this.friction = Common.TScroller.FRICTION;
		this.backFriction = Common.TScroller.BACK_FRICTION;
		this.isMouseDown = false;
		
		this.bar.hide();
		
	},
	
	//-----------------------------------------
	//	on mouse move
	//-----------------------------------------
	_onMouseMove : function( i_event ) {
		
		if( !this.isMouseDown ) {
			return;
		}
		
		i_event.preventDefault();
		this.mouseY = this._getPageYFromEvent( i_event );
		
	},
	
	//-----------------------------------------
	//	on enter frame
	//-----------------------------------------
	_onEnterFrame : function() {

		//mouse down
		if( this.isMouseDown ) {
		
			var pageY = this.mouseY;
			var time = +new Date();
			
			var diffY = pageY - this.mouseDownY;
			var diffTime = time - this.lastTime;
			
			var friction = 20;
			if( this.y > this.maxY ) {
				friction = 4;
			}else if( this.y < this.minY ) {
				friction = 4;
			}
			
			this.speed = ( diffY / diffTime ) * friction;
			
			//
			if( !isFinite( this.speed ) ) {
				this.speed = 0;
			}
			
			this.mouseDownY = pageY;
			this.lastTime = time;
		
		//mouse up
		}else {
			
			if( this.y > this.maxY ) {
				
				//スピードがある時
				if( this.speed > 0.5 ) {
				
					//スピードを緩める
					this.speed *= Common.TScroller.BOUND_FRICTION;
					
				//スピードが緩まった時
				}else {
				
					//行き過ぎている時
					this.speed = ( this.maxY - this.y ) * this.backFriction;
					this.backFriction += ( 1 - this.backFriction ) * 0.001;
					
					if( this.speed > -0.06 ) {
						this.y = this.maxY;
						this.speed = 0;
					}
				
				}
				
			}else if( this.y < this.minY ) {
			
				//スピードがある時
				if( this.speed < -0.5 ) {
				
					//スピードを緩める
					this.speed *= Common.TScroller.BOUND_FRICTION;
					
				//スピードが緩まった時
				}else {
					
					this.speed = ( this.minY - this.y ) * this.backFriction;
					this.backFriction += ( 1 - this.backFriction ) * 0.001;
					
					if( this.speed < 0.08 ) {
						this.y = this.minY;
						this.speed = 0;
					}
				
				}
			
			}else {
			
				this.speed *= this.friction;
			
			}
		
		}
		
		if( this._abs( this.speed ) < 0.1 ) {
			this.speed = 0;
		}
		
		var y = this._round( this.y + this.speed, 10 );
		this._setY( y );
		
	},
	
	//-----------------------------------------
	//	on resize
	//-----------------------------------------
	resize : function( i_height ) {
	
		var height = i_height;
		var innerHeight = this.$scroller.height();
		
		//最大値、最小値
		this.maxY = 0;
		this.minY = -( innerHeight - height );
		
		this.$target.height( height );
		
		//this._setY( 0 );
		
		this.bar.resize( height, innerHeight );
	
	},
	
	//-----------------------------------------
	//	get y from event
	//-----------------------------------------
	_getPageYFromEvent : function( i_event ) {
		
		if( i_event.originalEvent.touches ) {
			var touchEvent = i_event.originalEvent.touches[0];
			return touchEvent.pageY;
		}else {
			return i_event.pageY;
		}
	
	},
	
	//-----------------------------------------
	//	set y
	//-----------------------------------------
	_setY : function( i_py ) {
	
		if( this.y == i_py ) {
			return;
		}
		
		this.y = i_py;
		
		this.$scroller.css( CSSManager.transform, "translate3d( 0, " + this.y + "px, 0 )" );
		
		//スクロール率
		this.ratioY = this.y / this.minY;
		//スクロールバーを更新
		this.bar.update( this.ratioY );
	
	},
	
	//-----------------------------------------
	//	floot round
	//-----------------------------------------
	_round : function( i_number, i_figure ) {
	
		return Math.floor( i_number * i_figure ) / i_figure;
	
	},
	
	//-----------------------------------------
	//	abs
	//-----------------------------------------
	_abs : function( i_number ) {
	
		return ( i_number > 0 ) ? i_number : -i_number;
		
	}
	
}
//-----------------------------------------
//	/ TScroll
//-----------------------------------------



//-----------------------------------------
//	TScrollBar
//-----------------------------------------
Common.TScrollBar = function( $i_html ) {
	
	this.isShow = false;
	this.$html = $i_html;
	this.height = 0;
	this.minY;
	this.maxY;
	this.timer;
	this.onTimerFunc;

	this._init.apply( this );

}
Common.TScrollBar.prototype = {
	
	//-----------------------------------------
	//	initialize
	//-----------------------------------------
	_init : function() {
		
		this.onTimerFunc = $.proxy( this._onTimer, this );
	
	},
	
	//-----------------------------------------
	//	resize
	//-----------------------------------------
	resize : function( i_wrapperHeight, i_contentHeight ) {
	
		this.height = ( i_wrapperHeight / i_contentHeight ) * i_wrapperHeight;
		
		this.minY = 4;
		this.maxY = i_wrapperHeight - this.height - 8 - 60;
		this.$html.height( this.height );
	
	},
	
	//-----------------------------------------
	//	update
	//-----------------------------------------
	update : function( i_ratio ) {
		
		var y = ( ( this.maxY - this.minY ) * i_ratio ) + this.minY;
		
		y = Math.round( y );
		
		var extra = 0;
		if( y <= this.minY ) {
			
			extra = this.minY + y;
			y = this.minY;
		
		}else if( y >= this.maxY ) {
		
			extra = this.maxY - y;
			y = this.maxY - extra;
		
		}
		
		this.$html.height( this.height + extra );
		this.$html.css( CSSManager.transform, "translate3d( 0, " + y + "px, 0 )" );
		
	},
	
	//-----------------------------------------
	//	show
	//-----------------------------------------
	show : function() {
	
		clearTimeout( this.timer );
		this.$html.stop().animate( { "opacity" : 1 }, 250, "easeOutSine" );	
	
	},
	
	//-----------------------------------------
	//	hide
	//-----------------------------------------
	hide : function() {
	
		this.timer = setTimeout( this.onTimerFunc, 1000 );
	
	},
	
	//-----------------------------------------
	//	on timer
	//-----------------------------------------
	_onTimer : function() {
	
		this.$html.stop().animate( { "opacity" : 0 }, 250, "easeOutSine" );
	
	},
	//-----------------------------------------
	//	floot round
	//-----------------------------------------
	_round : function( i_number, i_figure ) {
	
		return Math.floor( i_number * i_figure ) / i_figure;
	
	}


}
//-----------------------------------------
//	/ TScrollBar
//-----------------------------------------




















































/* ///////////////////////////////////////////////////////////////////////////
 *
 * Blogデータを読み込んで色々整形
 *
 ////////////////////////////////////////////////////////////////////////////*/
;(function(w,d,$){

    var plugname = 'Jtpj_BlogData';

    var elem, self;

    var count;

    var jsonUrl;
    var jsonData;

    var isCreate = false;

    // constructor
    var Jtpj_BlogData = function(e, params){
        self = this;
        elem = e;
        elem.data(plugname, this);
        this.params = params;
        self.init();
    };

    // methods
    Jtpj_BlogData.prototype = {
        init: function(){

            //params
            jsonUrl = self.params.jsonUrl;
            count = self.params.count;

            //json load
            self.load();

            return this;
        },
        /**
         * JSONデータをロード
         */
        load:function(){
            $.getJSON(jsonUrl, function(json){

                jsonData = json;
                isCreate = true;
                $(w).trigger("blogDataLoadComplete");

            }).error(_jsonError);
        },
        /**
         * 最新データを取得
         * @param c 取得数
         * @param t データイプ
         */
        getNewestData:function(c,t){
            if(!isCreate) return false;
            if(c == null) c = 6;
            if(t == null) t = "newwest";

            var data = [], len = jsonData.length, i;

            if(t == "newwest"){
                for(i=0;i<c;i++){
                    data.push(jsonData[i]);
                }
            }
            else{
                for(i=0;i<len;i++){
                    if(data.length == c) break;
                    if(jsonData[i].type == t) data.push(jsonData[i]);
                }
            }
            return data;

        },
        /**
         * IDを元にデータを取得
         */
        getIdData:function(id,c){
            if(!isCreate) return false;
            if(id == null) return false;
            if(c == null) c = 1;
            var data = [];
            for(var i= 0, len=jsonData.length;i<len;i++){
                if(data.length == c) break;
                if(jsonData[i].id == id) data.push(jsonData[i]);
            }

            return (data.length > 0) ? data : false;

        },
        /**
         * スペシャルメンバーの最新１件を取得
         * @param id
         */
        getMemberNewestData:function(id){
            if(id == null) return false;
            var len = jsonData.length, i;
            for(i=0;i<len;i++){
                if(jsonData[i].id == id) return jsonData[i];
            }
            return false;
        }
    };

    /**
     * jsonエラー
     * @param xhr
     * @param stat
     * @param thr
     */
    function _jsonError(xhr, stat, thr){
        isCreate = false;
    }

    // default params
    var default_params = {
        jsonUrl:"/data/blog/blog.json?d=1"
    };

    $.fn[plugname] = function(option){return new Jtpj_BlogData(this, $.extend(default_params, option, {}));}

})(window, document, jQuery);

/* ///////////////////////////////////////////////////////////////////////////
 *
 * イベントトラッカー
 *
 ////////////////////////////////////////////////////////////////////////////*/
(function(w,d,$){

    var plugname = 'Jtpj_ListEventTracker';

    var elem, self;
    var $select;
    var category,action,label,value,noninteraction;
    var trackData = ["'_trackEvent'"];

    // constructor
    var Jtpj_ListEventTracker = function(e, params){
        self = this;
        elem = e;
        elem.data(plugname, this);
        this.params = params;

        self.init();

    };

    // methods
    Jtpj_ListEventTracker.prototype = {
        init: function(){

            $select = elem.find("form select");
            //$select.each(function(){this.selectedIndex = 0;});
            $select.on("change", _onSelectChange);
            //console.log($select);

            //params
            category = self.params.category;
            action = self.params.action;
            label = self.params.label;
            value = self.params.value;
            noninteraction = self.params.noninteraction;

            return this;
        }
    };

    /**
     * セレクトボックスの変更時
     * @param e
     * @private
     */
    function _onSelectChange(e){

        if(!category || !action) return false;

        trackData = ['_trackEvent'];

        //category(必須入力)
        trackData.push(category);

        //action(必須入力)
        trackData.push(action);

        //label(任意)
        var $selected = $(this).find("option:selected");
        trackData.push( $selected.data("val")+"/"+ $selected.text());

        //value(任意)
        if(value) trackData.push(value);

        //noninteraction(任意)
        if(noninteraction) trackData.push(noninteraction);

        _gaq.push(trackData);
        var val = $selected.val();
        if(val) location.href = $(this).val();
        this.selectedIndex = 0;

        return false;

    }

    // default params
    var default_params = {
        category:null,
        action:null,
        label:null,
        value:null,
        noninteraction:null
    };

    $.fn[plugname] = function(option){return new Jtpj_ListEventTracker(this, $.extend(default_params, option, {}));}

})(window, document, jQuery);

/**
 * timezoneから時間配列の取得
 * @param tz タイムゾーン(Number)
 * @returns {Array}[0]year,[1]month,[2]day,[3]hour,[4]min,[5]sec,[6]week,[7]month(Eng)
 */
function timeZone2Date(tz){
    var gmt     = (new Date()).getTime() + (new Date()).getTimezoneOffset() * 60 * 1000;
    var date    = new Date(gmt + tz * 60 * 60 * 1000);
    return  getDateArray(date);
}

/**
 * timeStampから時間配列の取得
 * @param ts タイムスタンプ(Number)
 * @returns {Array}[0]year,[1]month,[2]day,[3]hour,[4]min,[5]sec,[6]week,[7]month(Eng)
 */
function timeStamp2Date(ts){
    var date    = new Date(parseInt(ts) * 1000);
    return  getDateArray(date);
}

/**
 * 時間配列取得
 * @param date
 * @returns {Array}
 */
function getDateArray(date){

    var monthStr = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
    var weekStr = ["sun","mon","the","wed","thu","fri","sat"];
    var year    = date.getFullYear();
    var month   = date.getMonth() + 1;
    var day     = date.getDate();
    var hour    = date.getHours();
    var min     = date.getMinutes();
    var sec     = date.getSeconds();
    var week    = weekStr[date.getDay()];
    var monthE  = monthStr[month-1];

    return [year,month,day,hour,min,sec,week,monthE];
}

/**
 * 画像を比率に合わせてリサイズしてセンタリング
 * @param target
 * @param imageWidth
 * @param imageHeight
 */
function imageResize(target, imageWidth, imageHeight){
    var img = new Image();
    img.src = target.attr("src");

    img.onload = function(){
        var iW = this.width, iH = this.height, per = 0, margin = {};
        target.css({
            position:"absolute",
            top:"50%",
            left:"50%"
        });
        if(iW > iH){
            per = Math.floor(iW * (imageHeight / iH));
            margin = {top:Math.floor(-imageHeight / 2), left:Math.floor(-per / 2)};
            target.css({width:per, height:imageHeight, marginTop:margin.top, marginLeft:margin.left});
        }
        else{
            per = Math.floor(iH * (imageWidth / iW));
            margin = {top:Math.floor(-per / 2), left:Math.floor(-imageWidth / 2)};
            target.css({width:imageWidth, height:per, marginTop:margin.top, marginLeft:margin.left});
        }
    };
    target.show();
}
