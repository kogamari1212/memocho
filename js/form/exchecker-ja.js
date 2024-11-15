/**
 * exValidation
 *
 * @version   : 1.2.5
 * @author    : nori (norimania@gmail.com)
 * @copyright : 5509 (http://5509.me/)
 * @license   : The MIT License
 * @link      : http://5509.me/log/exvalidation
 * @modified  : 2011-08-14 01:52
 */
;(function($) {
	// Extend validation rules
	$.exValidationRules = $.extend($.exValidationRules, {
		chkrequired: [
			"入力してください",
			function(txt, t) {
				if ( $(t).hasClass("chkgroup") ) {
					var flag = 0;
					$("input,select",t).each(function() {
						if ( $(this).val().length > 0 ) flag++;
					});
					if ( txt && flag === $("input,select", t).length ) {
						if ( /^[ 　\r\n\t]+$/.test(txt) ) {
							return false;
						} else {
							return true;
						}
					}
				} else {
					if ( txt && txt.length>0 ) {
						if ( /^[ 　\r\n\t]+$/.test(txt) ) {
							return false;
						} else {
							return true;
						}
					}
				}
			}
		],
		chkselect: [
			"選択してください",
			function(txt, t) {
				if ( txt && txt.length>0 ) {
					if ( /^[ 　\r\n\t]+$/.test(txt) ) {
						return false;
					} else {
						return true;
					}
				}
			}
		],
		chkretype: [
			"入力内容が異なります",
			function(txt, t) {
				var elm = $("#" + $(t).attr("class").split("retype\-")[1].split(/\b/)[0]);
				if ( elm.hasClass("chkgroup") ) {
					var chktxt = $("input", elm), txt = $("input", t);
					for ( var i = 0, flag = false; i < chktxt.length; i++ ) {
						if ( chktxt[i].value === txt[i].value ) flag = true;
						else flag = false;
					}
					if ( flag ) return true;
				} else {
					return elm.val() == txt;
				}
			}
		],
		chkemail: [
			"正しいメールアドレスの形式を入力してください",
			/^(?:[^\@]+?@[A-Za-z0-9_\.\-]+\.+[A-Za-z\.\-\_]+)*$/
		],
		chkhankaku: [
			"全角文字は使用できません",
			/^(?:[a-zA-Z0-9@\;\:\[\]\{\}\|\^\=\/\!\*\`\"\#\$\+\%\&\'\(\)\,\.\-\_\?\\\s]*)*$/
		], //"
		chkzenkaku: [
			"全角文字で入力してください",
			/^(?:[^a-zA-Z0-9@\;\:\[\]\{\}\|\^\=\/\!\*\"\#\$\+\%\&\'\(\)\,\.\-\_\?\\\s]+)*$/
		], //"
		chkhiragana: [
			"ひらがなで入力してください",
			/^(?:[ぁ-ゞ]+)*$/
		],
		chkkatakana: [
			"カタカナで入力してください",
			/^(?:[ァ-ヾ]+)*$/
		],
		chkfurigana: [
			"ふりがなはひらがな、全角数字と〜、ー、（）が利用できます",
			/^(?:[ぁ-ゞ０-９ー～（）\(\)\d 　]+)*$/
		],
		chknochar: [
			"英数字で入力してください",
			/^(?:[a-zA-Z0-9]+)*$/
		],
		chknocaps: [
			"英数字(小文字のみ)で入力してください",
			/^(?:[a-z0-9]+)*$/
		],
		chknumonly: [
			"半角数字のみで入力してください",
			/^(?:[0-9]+)*$/
		],
		chkmin: [
			"文字以上で入力してください",
			function(txt, t) {
				if ( txt.length === 0 ) return true;
			 	var length = $(t).attr("class").match(/min(\d+)/) ? RegExp.$1 : null;
				return txt.length >= length;
			}
		],
		chkmax: [
			"文字以内で入力してください",
			function(txt, t) {
				var length = $(t).attr("class").match(/max(\d+)/) ? RegExp.$1 : null;
				return txt.length <= length;
			}
		],
		chkradio: [
			"選択してください",
			function(txt, t) {
				return $("input:checked",t).length>0;
			}
		],
		chkcheckbox: [
			"選択してください",
			function(txt, t) {
				return $("input:checked",t).length>0;
			}
		],
		chkurl: [
			"正しいURLの形式を入力してください",
			/^(?:http(s)?\:\/\/[^\/]*)*$/
		],
		chktel: [
			"正しい電話番号を入力してください",
			/^(?:\(?\d+\)?\-?\d+\-?\d+)*$/
		],
		chkfax: [
			"正しいファックス番号を入力してください",
			/^(?:\(?\d+\)?\-?\d+\-?\d+)*$/
		],
		chkfile: [
			"ファイルを選択してください",
			function(txt, t) {
				if ( txt && txt.length>0 ) {
					if ( /^[ 　\r\n\t]+$/.test(txt) ) {
						return false;
					} else {
						return true;
					}
				}
			}
		],
		chkdate: [	// 日付チェック追加
	      '正しい日付を選択してください',
	      function(txt, t) {
	        // チェック日付編集
	        var chk_date, sYear, sMonth, sDay;
	        if ( $(t).hasClass('chkgroup') ) { // グループの場合
	          var date_group = $(t).find('select,input');
	          sYear  = date_group.first().val() - 0;
	          // Javascriptは、0-11で表現
	          sMonth = date_group.eq(1).val() - 1;
	          sDay   = date_group.last().val() - 0;
	          if ( sYear == "" && sMonth == "" && sDay == "" )
	            return true;
	          chk_date = sYear+'/'+sMonth+'/'+sDay;
	        } else {	// グループでない場合
	          if ( txt == "" ) return true;
	          sYear  = txt.split("/")[0] - 0;
	          // Javascriptは、0-11で表現
	          sMonth = txt.split("/")[1] - 1;
	          sDay   = txt.split("/")[2] - 0;
	          chk_date = txt;
	        }
	        // YYYY/MM/DD形式チェック
	        // (年は数字4桁,月は01～12,日は01～31)
	        if(!chk_date.match(/^([0-9]{4})\/([0-9]|0[0-9]|1[012])\/([1-9]|0[1-9]|[12][0-9]|3[01])$/))
	          { return false; }
	        //日付の妥当性チェック
	        var oDate = new Date(sYear, sMonth, sDay);
	        if (oDate.getFullYear() == sYear &&
	          oDate.getMonth() == sMonth &&
	          oDate.getDate() == sDay)
	          { return true;  }
	        else
	          { return false; }
	      }
	]
});
})(jQuery);