
(function(window){
	
	FrameTicker = function() {
		this.init();
		this.timerID = 0;
		this.timers = [];
		this.on = true;
		EventTarget.call(this);
	};
	
	var _pt = FrameTicker.prototype = new EventTarget();
	
	
	_pt.constructor = FrameTicker;

	_pt.init = function(){
		window.requestAnimFrame = (function(){
	      return  window.requestAnimationFrame       || 
	              window.webkitRequestAnimationFrame || 
	              window.mozRequestAnimationFrame    || 
	              window.oRequestAnimationFrame      || 
	              window.msRequestAnimationFrame     || 
	              function(/* function */ callback, /* DOMElement */ element){
	                window.setTimeout(callback, 1000 / 60);
	              };
	    })();
	};
	

	_pt.start = function(p_framerate){
		if (this.timerID) return;
		var _this = this;
		(function() {
				
				var _scrope = arguments.callee;
				if(_this.on){
					_this._requestTimeout(function(){
						_this.fire("tick");
						_this.timerID = window.requestAnimFrame(_scrope);
					}, p_framerate);
					
				} 


		})();
		return _this;
	};

	
	_pt.stop = function(){
		this.on = false;
	};

	_pt._requestTimeout = function(fn, delay){

		if( !window.requestAnimationFrame      	&& 
		!window.webkitRequestAnimationFrame && 
		!(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
		!window.oRequestAnimationFrame      && 
		!window.msRequestAnimationFrame)
			return window.setTimeout(fn, delay);

		var start = new Date().getTime(),
			handle = new Object();

		function loop(){
			var current = new Date().getTime(),
				delta = current - start;

			delta >= delay ? fn.call() : handle.value = requestAnimFrame(loop);
		};

		handle.value = requestAnimFrame(loop);
		return handle;

	};
	

	window.FrameTicker = FrameTicker;
	
}(window));








