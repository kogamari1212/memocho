// --------------------------------------------------------------------
// Author  : mashimonator
// Create  : 2009/10/14
// Update  : 2009/10/14
//         : 2012/05/08 IE8～でスクリプトエラーが出るバグを修正
//         : 2012/05/08 IE6でチェックボックスのデフォルトチェックが効かないバグを修正
//         : 2012/09/29 使い易いように作り直し
// Description : フォームのフリガナ入力支援
// --------------------------------------------------------------------


var kntxtext = {
	config : {
		labelStr : {
			hira : 'ふりがなを自動挿入する', // チェックボックスに表示する文字列（ひらがな）
			kana : 'フリガナを自動挿入する' // チェックボックスに表示する文字列（カタカナ）
		},
		btnStr : {
			hira : '名前からふりがなを挿入する', // ボタンに表示する文字列（ひらがな）
			kana : '名前からフリガナを挿入する' // ボタンに表示する文字列（カタカナ）
		},
		// ライブラリによって生成される要素に付加するクラス名
		cls : {
			checkbox : '',
			button : '',
			label : '',
			div : ''
		},
		// ライブラリによって生成される要素に付加するスタイル
		styles : {
			checkbox : 'border:none; background:transparent; cursor:pointer; margin-left:5px;',
			button : 'margin:0 0 0 5px;',
			label : 'cursor:pointer;',
			div : 'margin:0; padding:0; background:transparent; display:inline;'
		}
	},
	// 定数
	constant : {
		// 自動で入力されるふりがなの文字種（0:ひらがな,1:カタカナ）
		letterType : { hira:0, kana:1 },
		// ふりがな入力の種類（0:自動入力,1:チェックボックス,2:チェックボックス[デフォルトチェック],3:ボタン）
		insertType : { auto:0, check:1, checked:2, button:3 }
	},
	// ターゲット情報格納用連想配列
	target : [],
	sys : {
		config : {
			idBaseStr : 'kntxtext_',
			kanaExtractionPattern : new RegExp('[^ 　ぁあ-んー]', 'g'),
			kanaCompactingPattern : new RegExp('[ぁぃぅぇぉっゃゅょ]', 'g')
		},
		flags : {
			convert : false,
			active : true
		},
		elements : {
			name : null,
			kana : null
		},
		storage : {
			timer : null,
			baseKana : '',
			ignoreString : '',
			values : [],
			input : ''
		}
	},
	initialize : function() {
		for ( var i=0, len=kntxtext.target.length; i < len; i++ ) {
			var nameStr = kntxtext.target[i][0];
			var kanaStr = kntxtext.target[i][1];
			var name = document.getElementsByName(nameStr);
			var kana = document.getElementsByName(kanaStr);
			name[0].correspondingInput = kntxtext.target[i][1];
			name[0].letterType = kntxtext.target[i][2];
			name[0].insertType = kntxtext.target[i][3];
			switch ( kntxtext.target[i][3] ) {
				case kntxtext.constant.insertType.check:
					kntxtext.createCheckBox(name[0], false);
					break;
				case kntxtext.constant.insertType.checked:
					kntxtext.createCheckBox(name[0], true);
					break;
				case kntxtext.constant.insertType.button:
					kntxtext.createButton(name[0]);
					break;
				default:
					break;
			}
			kntxtext.addEvent( name[0], 'focus', kntxtext.focus );
			kntxtext.addEvent( name[0], 'keydown', kntxtext.keydown );
			kntxtext.addEvent( name[0], 'blur', kntxtext.blur );
		}
	},
	// --------------------
	// events
	// --------------------
	focus : function() {
		kntxtext.sys.elements.name = this;
		kntxtext.sys.elements.kana = (document.getElementsByName(this.correspondingInput)) ? document.getElementsByName(this.correspondingInput)[0] : null;
		kntxtext.observe.prepare();
		kntxtext.observe.start();
	},
	keydown : function() {
		if ( kntxtext.sys.flags.convert ) {
			kntxtext.observe.prepare();
		}
	},
	blur : function() {
		kntxtext.observe.stop();
	},
	// --------------------
	// functions
	// --------------------
	observe : {
		start : function() {
			kntxtext.sys.storage.timer = window.setInterval( kntxtext.check.value, 30 );
		},
		stop : function() {
			window.clearInterval(kntxtext.sys.storage.timer);
		},
		prepare : function() {
			var itype = kntxtext.sys.elements.name.insertType;
			if ( itype != kntxtext.constant.insertType.button ) {
				kntxtext.sys.storage.baseKana = kntxtext.sys.elements.kana.value;
			}
			kntxtext.sys.flags.convert = false;
			kntxtext.sys.storage.ignoreString = kntxtext.sys.elements.name.value;
			switch ( itype ) {
				case kntxtext.constant.insertType.check:
				case kntxtext.constant.insertType.checked:
					var checkbox = document.getElementById(new String(kntxtext.sys.config.idBaseStr + kntxtext.sys.elements.name.name));
					if ( checkbox && checkbox.checked ) {
						kntxtext.sys.flags.active = true;
					} else {
						kntxtext.sys.flags.active = false;
					}
					break;
				case kntxtext.constant.insertType.button:
					kntxtext.sys.flags.active = false;
					break;
				default:
					kntxtext.sys.flags.active = true;
					break;
			}
		},
		set : function() {
			kntxtext.sys.storage.baseKana = new String(kntxtext.sys.storage.baseKana + kntxtext.sys.storage.values.join(''));
			kntxtext.sys.flags.convert = true;
			kntxtext.sys.storage.values = new Array();
		},
		clear : function() {
			kntxtext.sys.storage.baseKana = '';
			kntxtext.sys.flags.convert = false;
			kntxtext.sys.storage.ignoreString = '';
			kntxtext.sys.storage.input = '';
			kntxtext.sys.storage.values = [];
		}
	},
	check : {
		value : function() {
			var input = kntxtext.sys.elements.name.value;
			switch ( input ) {
				case '':
					kntxtext.observe.clear();
					kntxtext.setKanaStr();
					break;
				default:
					input = kntxtext.clean(input);
					switch ( input ) {
						case kntxtext.sys.storage.input:
							return;
							break;
						default:
							kntxtext.sys.storage.input = input;
							if ( !kntxtext.sys.flags.convert ) {
								var values = input.replace(kntxtext.sys.config.kanaExtractionPattern,'').split('');
								kntxtext.check.convert(values);
								kntxtext.setKanaStr(values);
							}
							break;
					}
					break;
			}
		},
		convert : function( values ) {
			if ( !kntxtext.sys.flags.convert ) {
				var x = kntxtext.sys.storage.values.length - values.length;
				var i = Math.abs(x);
				switch ( true ) {
					case i > 1:
						var tmpValues = values.join('').replace(kntxtext.sys.config.kanaCompactingPattern,'').split('');
						var y = kntxtext.sys.storage.values.length - tmpValues.length;
						var z = Math.abs(y);
						if ( z > 1 ) {
							kntxtext.observe.set();
						}
						break;
					default:
						if ( kntxtext.sys.storage.values.length == kntxtext.sys.storage.input.length
							 && kntxtext.sys.storage.values.join('') != kntxtext.sys.storage.input ) {
							kntxtext.observe.set();
						}
						break;
				}
			}
		}
	},
	setKanaStr : function( values ) {
		if ( !kntxtext.sys.flags.convert ) {
			if ( values ) {
				kntxtext.sys.storage.values = values;
			}
			var val = kntxtext.convert2kana( new String(kntxtext.sys.storage.baseKana + kntxtext.sys.storage.values.join('')) );
			if ( kntxtext.sys.elements.kana.value != val ) {
				kntxtext.sys.elements.kana.value = val;
			}
		}
	},
	convert2kana : function( value ) {
		var gtype = kntxtext.sys.elements.name.letterType;
		switch ( gtype ) {
			case kntxtext.constant.letterType.kana:
				var str = new String('');
				for( var i=0, len=value.length; i<len; i++ ) {
					var c = value.charCodeAt(i);
					switch ( kntxtext.isHiragana(c) ) {
						case true:
							str += String.fromCharCode(c+96);
							break;
						default:
							str += value.charAt(i);
							break;
					}
				}
				return str;
				break;
			default:
				return value;
				break;
		}
	},
	isHiragana : function( char ) {
		return ((char >= 12353 && char <= 12435) || char == 12445 || char == 12446);
	},
	clean : function( value ) {
		if ( value.indexOf(kntxtext.sys.storage.ignoreString) > -1 ) {
			return value.replace(kntxtext.sys.storage.ignoreString,'');
		} else {
			var ignoreArray = kntxtext.sys.storage.ignoreString.split('');
			var inputArray = value.split('');
			for( var i=0, len=ignoreArray.length; i<len; i++ ) {
				switch (ignoreArray[i]) {
					case inputArray[i]:
						inputArray[i] = '';
						break;
				}
			}
			return inputArray.join('');
		}
	},
	createCheckBox: function( element, flag ) {
		var parent = element.parentNode;
		var div = kntxtext.createBlock();
		var checkbox = kntxtext.createInputCheckbox(element, flag);
		var label = kntxtext.createLabel(element);
		parent.replaceChild(div, element);
		div.appendChild(element);
		div.appendChild(checkbox);
		checkbox.checked = flag;
		div.appendChild(label);
	},
	createBlock : function() {
		var div = document.createElement('div');
		if ( kntxtext.config.cls.div ) {
			div.className = kntxtext.config.cls.div;
		}
		if ( kntxtext.config.styles.div ) {
			div.style.cssText = kntxtext.config.styles.div;
		}
		return div;
	},
	createInputCheckbox: function( element, flag ) {
		var input = document.createElement('input');
		input.type = 'checkbox';
		input.id = new String(kntxtext.sys.config.idBaseStr + element.name);
		if ( kntxtext.config.cls.checkbox ) {
			input.className = kntxtext.config.cls.checkbox;
		}
		if ( kntxtext.config.styles.checkbox ) {
			input.style.cssText = kntxtext.config.styles.checkbox;
		}
		return input;
	},
	createLabel: function( element ) {
		var label = document.createElement('label');
		label.htmlFor = new String(kntxtext.sys.config.idBaseStr + element.name);
		if ( kntxtext.config.cls.label ) {
			label.className = kntxtext.config.cls.label;
		}
		if ( kntxtext.config.styles.label ) {
			label.style.cssText = kntxtext.config.styles.label;
		}
		if ( !element.letterType ) {
			label.innerHTML = kntxtext.config.labelStr.hira;
		} else {
			label.innerHTML = kntxtext.config.labelStr.kana;
		}
		return label;
	},
	createButton: function( element ) {
		var parent = element.parentNode;
		var div = kntxtext.createBlock();
		var button = kntxtext.createInputButton(element);
		parent.replaceChild(div, element);
		div.appendChild(element);
		div.appendChild(button);
	},
	createInputButton: function( element ) {
		var input = document.createElement('input');
		input.type = 'button';
		input.id = new String(kntxtext.sys.config.idBaseStr + element.name);
		if ( kntxtext.config.cls.button ) {
			input.className = kntxtext.config.cls.button;
		}
		if ( kntxtext.config.styles.button ) {
			input.style.cssText = kntxtext.config.styles.button;
		}
		if ( !element.letterType ) {
			input.value = kntxtext.config.btnStr.hira;
		} else {
			input.value = kntxtext.config.btnStr.kana;
		}
		input.onclick = function() {
			if ( kntxtext.sys.elements.name ) {
				if ( this.id == (kntxtext.sys.config.idBaseStr + kntxtext.sys.elements.name.name) ) {
					kntxtext.sys.elements.kana.value = kntxtext.convert2kana( new String(kntxtext.sys.storage.baseKana + kntxtext.sys.storage.values.join('')) );
				}
			}
		};
		return input;
	},
	addEvent : function( target, event, func ) {
		try {
			target.addEventListener(event, func, false);
		} catch (e) {
			target.attachEvent(new String('on' + event), (function(el){return function(){func.call(el);};})(target));
		}
	}
}
kntxtext.addEvent( window, 'load', kntxtext.initialize );