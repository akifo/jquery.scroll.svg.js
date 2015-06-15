/**!
 * jquery.scroll.svg.js v0.0.1
 * @copyright Copyright 2014 Akiho Nagao.
 * @author    Akiho Nagao.
 * @link      https:....
 * Released under the MIT License.
 */

(function( $ ){

  $.fn.ScrollSvg = function( options ) {

    // Setup options
    var elScrollable, // スクロール位置
    		windowHeight, // windowの高さ
        settings = $.extend({
          'startSlack': 100,
          'fill': 'none',
          'stroke': '#930',
          'strokeWidth': 3,
          'transitionProperty': 'all',
				  'transitionDuration': '5s',
				  'transitionTimingFunction': 'ease',
				  'transitionDelay': '0s',
        }, options);

  	// 各ブラウザに対応させる。
  	if (navigator.userAgent.indexOf('WebKit') < 0) elScrollable = document.documentElement;
		else elScrollable = document.body;

		var resizer = function () {
			// windowの高さを取得
			windowHeight = document.documentElement.clientHeight;
		};

		resizer();

	 	$(window).on('resize', resizer);

		$(window).on('scroll', function(event){
			// スクロール位置を取得
			scrollTop = elScrollable.scrollTop;
		});      		

    return this.each(function(){

    	$(this).css('width', '100%');

  	  var svg = document.getElementById($(this).attr('id')).contentDocument;
		  var $path = $(svg).find('path');

	  	$path.css({
	  		'fill': 'none',
			  'stroke': settings.stroke,
			  'stroke-width': settings.strokeWidth
	  	});

	    setPathLengthToStyle($path, function() {
	    	setTimeout(function(){
			  	$path.css({
	          'transition-property': settings.transitionProperty,
					  'transition-duration': settings.transitionDuration,
					  'transition-timing-function': settings.transitionTimingFunction,
					  'transition-delay': settings.transitionDelay,
			  	});
	    	},300);
	    });



      // Store the object
      var $this = $(this);

    	var	targetTop, // ターゲットの上部の位置を取得
	    		targetShowTop; // ターゲットが表示しはじめる上部の位置

  		var targetResizer = function() {
				// ターゲットの位置を取得
				targetTop = $this.offset().top;
				targetShowTop = targetTop - windowHeight + settings.startSlack;
  		};

  		targetResizer();

			$(window).on('resize', targetResizer);

			var targetScroller = function() {
		    // 表示
		    if (scrollTop > targetShowTop) {
			  	$path.css({
	  				'fill': settings.fill,
			  		'stroke-dashoffset': 0
			  	});
					$(window).off('scroll', targetScroller);
		  	}
			};

			$(window).on('scroll', targetScroller);

    });

		function setPathLengthToStyle($obj, callback) {
      var len;
      var arr = [];
      Array.prototype.slice.call($obj).forEach(function(path, i) {
          arr.push(path);
          len = arr[i].getTotalLength() + 30 + 1 | 0; // +30は、Firefox対策。+1 | 0 は小数点切り上げ
          arr[i].style.strokeDasharray  = len;
          arr[i].style.strokeDashoffset = len;
          if( $obj.length - 1 == i && !!callback ) callback();
      });
	  }


  };
})( jQuery );