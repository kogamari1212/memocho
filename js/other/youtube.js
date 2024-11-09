/**
 * Version: 1.0.3
 * Author: Atsumaru Inc.
 */
;(function($) {
  if (!window.ON_YOUTUBE_IFRAME_API_READY_CALLBACKS) {
    // 起動スクリプトを登録するキュー
    // 1ページに複数の <iframe> を埋め込む場合を見込むと、キューが必要
    window.ON_YOUTUBE_IFRAME_API_READY_CALLBACKS = [];
  }

  /**
   * 与えられた値が 整数 または 整数に評価できる文字列 かどうかを判定する
   *
   * @param  {any}  val 評価対象の値、ほとんどの場合で string 型の値が与えられるだろう
   * @return {bool}     評価対処の値が 整数 または 整数に評価できる文字列 であれば true
   **/
  var isInt = function(val) {
    return (
      !isNaN(val)
      && parseInt(Number(val)) == val
      && !isNaN(parseInt(val, 10))
    );
  }

  /**
   * 与えられた値を真理値として評価する
   *
   * @param  {any}  str      評価対象の値、ほとんどの場合で string 型の値が与えられるだろう
   * @param  {any}  _default 評価対象の値が undefined, null などだった場合
   * @return {bool}          評価対処の値が 整数 または 整数に評価できる文字列 であれば true が返る
   **/
  var parseBool = function(str, _default) {
    if (isInt(str)) {
      // str が '0', '1' などの形をしている場合は、整数として評価してから真理値にキャストする
      return !!parseInt(str, 10);
    } else if (str && str.toLowerCase && str.toLowerCase() === 'true') {
      // それ以外の場合は、'True', 'true' のような形をしているか調べる
      return true;
    } else {
      // どれにも当てはまらなければデフォルト値を返す
      return _default || false;
    }
  };

  /**
   * ランダムな文字列を生成する
   *
   * @param  {int}    length 生成する文字列の長さ
   * @return {string}        長さが length 文字のランダムな文字列
   *
   * @example
   *     mkHash(12);  // => '0e7l6k884d23'
   *     mkHash(12);  // => 'c3lf63hk40bk'
   *     mkHash(12);  // => '781ji4aa56e6'
   **/
  var mkHash = function(length) {
    return Math.random().toString(24).replace(/[^a-zA-Z0-9]/, '').slice(-length);
  };


  // YouTube Iframe Player API を読み込み
  $('script').eq(0).before('<script src="//www.youtube.com/iframe_api"></script>');

  $.fn.youtube = function() {
    this.each(function() {
      var $this = $(this);


      var videoId  = $this.data('id');
      var autoplay = parseBool($this.data('autoplay'), true);   // 自動再生
      var loop     = parseBool($this.data('loop')    , true);   // ループ再生
      var mute     = parseBool($this.data('mute')    , true);   // 音量をミュート
      var controls = parseBool($this.data('controls'), false);  // コントロールを表示
      var fadein   = parseBool($this.data('fadein')  , true);   // 初期読み込み時にフェードインさせる

      var width  = $this.data('width')  || '640';  // <iframe> の高さ指定
      var height = $this.data('height') || '360';  // <iframe> の幅指定


      var containerClass       = 'container_' + mkHash(12);  // コンテナ <div> に振られる一意な Class 名
      var containerHiddenClass = 'hidden_' + mkHash(12);     // コンテナ <div> を { opacity: 0; } にするために振られる一意な Class 名

      var targetId    = 'player_' + mkHash(12);     // <iframe> に置き換えられる <div> に振られる一意な ID 名
      var targetClass = $this.data('class') || '';  // <iframe> に置き換えられる <div> に振られる Class 名

      var $target = $([
        '<div class="' + containerClass + ' ' + containerHiddenClass + '">',
        '  <div id="' + targetId + '" class="' + targetClass + '" />',
        '</div>',
      ].join('\n'));

      $this.append([
        '<style>',
        '.' + containerClass + ' {',
        '  position: relative;',
        '  display: inline-block;',
        '  font-size: 0;',
        '  transition: opacity 500ms linear 4000ms;',
        '}',
        '</style>',
      ].join('\n'));

      // コントロールを触らせたくない場合には前面に透明な疑似要素をかぶせる
      if (!controls && autoplay) {
        $this.append([
          '<style>',
          '.' + containerClass + '::after {',
          '  content: "";',
          '  display: block;',
          '  position: absolute;',
          '  top: 0;',
          '  left: 0;',
          '  z-index: 1000;',
          '  width: 100%;',
          '  height: 100%;',
          '  margin: 0;',
          '  padding: 0;',
          '}',
          '</style>',
        ].join('\n'));
      }

      // <iframe> をフェードインさせるときには { opacity: 0; } を設定しておく
      if (fadein) {
        $this.append([
          '<style>',
          '.' + containerHiddenClass + ' {',
          '  opacity: 0;',
          '}',
          '</style>',
        ].join('\n'));
      }

      $this.append($target);


      function onYouTubeIframeAPIReady() {
        var player = new YT.Player(
          targetId,
          {
            videoId: videoId,
            width: width,
            height: height,
            playerVars: {
              origin: location.protocol + '//' + location.hostname + '/',
              controls: controls,
              color: 'red',
              modestbranding: 1,
            },
            events: {
              onReady: function(e) {
                if (mute) {
                  e.target.mute();
                }

                if (autoplay) {
                  e.target.playVideo();
                }

                // { opacity: 0; } を指定するための Class を削除
                // これによりフェードインが始まる (CSS transition で制御)
                $('.' + containerClass).removeClass(containerHiddenClass);
              },
            }
          }
        );

        // 残り時間を定期的にチェックして終端間際で再生位置を 00:00 にシークする
        // onStateChange の YT.PlayerState.ENDED をフックにしないのは、
        // YT.PlayerState.ENDED になってからシークすると関連動画のリストが一瞬見えてしまうため
        setInterval(function() {
          if (!player.getDuration) { return; }

          var duration    = player.getDuration();
          var currentTime = player.getCurrentTime();

          if (duration - currentTime < 0.8) {
            if (loop) {
              player.seekTo(-currentTime);
            } else {
              player.pauseVideo();
              // 関連動画を表示させたくないという意味では
              // ここを player.stopVideo() にしたいが、それはできない
              // player.stopVideo() してしまうと、その後 二度とプレイヤーで再生できなくなる
            }
          }
        }, 400);
      }

      if (window.YT && YT.loaded) {
        onYouTubeIframeAPIReady();
      } else {
        // 起動スクリプトをキューに入れる
        window.ON_YOUTUBE_IFRAME_API_READY_CALLBACKS.push(onYouTubeIframeAPIReady);

        if (!window.onYouTubeIframeAPIReady) {
          window.onYouTubeIframeAPIReady = function() {
            window.ON_YOUTUBE_IFRAME_API_READY_CALLBACKS.map(function(callback) {
              callback();
            });
          };
        }
      }
    });
  };
})(jQuery);
