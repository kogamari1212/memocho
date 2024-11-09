/* Japanese initialisation for the jQuery UI date picker plugin. */
/* Written by Kentaro SATO (kentaro@ranvis.com). */
( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [ "../widgets/datepicker" ], factory );
	} else {

		// Browser globals
		factory( jQuery.datepicker );
	}
}( function( datepicker ) {

datepicker.regional.ja = {
	closeText: "閉じる",
	prevText: "&#x3C;前",
	nextText: "次&#x3E;",
	currentText: "今日",
	monthNames: [ "1月","2月","3月","4月","5月","6月",
	"7月","8月","9月","10月","11月","12月" ],
	monthNamesShort: [ "1月","2月","3月","4月","5月","6月",
	"7月","8月","9月","10月","11月","12月" ],
	dayNames: [ "日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日" ],
	dayNamesShort: [ "日","月","火","水","木","金","土" ],
	dayNamesMin: [ "日","月","火","水","木","金","土" ],
	weekHeader: "週",
	dateFormat: "yy/mm/dd",
	firstDay: 0,
	isRTL: false,
	showMonthAfterYear: true,
	yearSuffix: "年" };
datepicker.setDefaults( datepicker.regional.ja );

return datepicker.regional.ja;

} ) );


/**
 * Date オブジェクトを受け取って「○週目の○曜日」という情報を返す
 *
 * デイトピッカーで特定の日付を disable するときに使う
 *
 * @param   {Date} date                      判定する日付
 * @returns {{calRow: int, dowName: string}} `calRow 週目の dowName 曜日` を表す
 */
function dayOfWeekInfo(date) {
  var d       = date.getDate();
  var dow     = date.getDay();
  var dowName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dow];
  var calRow  = ~~((d - 1) / 7) + 1;

  return {
    calRow: calRow,
    dowName: dowName,
  };
}
