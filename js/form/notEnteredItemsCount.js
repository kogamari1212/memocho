jQuery(function($) {
  console.log('{{{ notEnteredItemsCount v2.3 }}}');

  if (typeof EXVALIDATION_CONFIG === 'undefined') {
    console.log('EXVALIDATION_CONFIG が未定義なため、以下処理を実行しません。')
    $('.cnt_remaining').remove();
    return;
  }

  /**
   * テキストフィールド/テキストエリアに入力済みかどうか判定する
   * プルダウンが選択済みかどうか判定する
   *
   * @param  jQuery $item 判定対象の要素
   * @return bool         入力済みなら true, 未入力なら false
   */
  function is_entered($item) {
    return !!$item.val();
  }

  /**
   * チェックボックス/ラジオボタン にチェックが入っているかどうかを判定する
   *
   * @param  jQuery $item 判定対象の要素を包むラッパー要素
   * @return bool         一つでもチェックが入って入れば true, 全て未チェックなら false
   */
  function is_checked($item) {
    return !!$item
      .find('input[type=checkbox]:checked, input[type=radio]:checked')
      .length;
  }

  /**
   * フォーム入力内容がバリデーションを通過するか判定する
   *
   * @param  jQuery $item 判定対象の要素を包むラッパー要素
   * @return bool         入力された値が正当なら true, 不正なら false
   */
  function valid($item) {
    // exValidation が付与する class="err" を用いて入力値が不正かどうかを判定する
    return !$item.hasClass('err')
  }


  var input_items = [];           // 必須項目のうち <input type="text">, <textarea>, <select> を集めた配列
  var checkbox_radio_items = [];  // 必須項目のうち <input type="checkbox">, <input type="radio"> を集めた配列

  // exValidation のルール設定を利用して必須項目のDOMを拾い上げる
  var rules = EXVALIDATION_CONFIG.rules;
  for (var id in rules) {
    if (!rules.hasOwnProperty(id)) { continue; }

    var $item = $('#' + id);

    var rule = rules[id];

    if (rule.indexOf('chkradio') >= 0 || rule.indexOf('chkcheckbox') >= 0) {
      checkbox_radio_items.push($item);
    } else if (rule.indexOf('chkrequired') >= 0 || rule.indexOf('chkselect') >= 0) {
      input_items.push($item);
    }
  }

  var all_items = [].concat(input_items, checkbox_radio_items);  // 全ての必須項目を集めた配列
  var onChange = function() {
    setTimeout(function() {
      var entered_items_count = input_items.filter(function($item) {
        // 何らかの入力がされていて かつ バリデーション通過するときだけ
        // 入力済みとしてカウントする
        return is_entered($item) && valid($item);
      }).length;

      var checked_items_count = checkbox_radio_items.filter(function($item) {
        // 少なくとも一つがチェックされていて かつ バリデーション通過するときだけ
        // 入力済みとしてカウントする
        return is_checked($item) && valid($item);
      }).length;

      var total_count = entered_items_count + checked_items_count;

      $('.cnt_remaining var').text(all_items.length - total_count);
    }, 0);
  };

  // 各要素にイベントリスナーを設定し、変更を監視する
  all_items.map(function($item) {
    $item.on('mouseup keyup change', onChange)
  })

  // ページ読み込み直後の残り必須項目数をカウントして表示
  onChange();
});
