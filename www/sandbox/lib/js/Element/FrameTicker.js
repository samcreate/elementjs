
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
				_this.fire("tick");
				// if(_this.on) _this.timerID = setTimeout(arguments.callee, p_framerate);
				if(_this.on) _this.timerID = window.requestAnimFrame(arguments.callee);


		})();
		return _this;
	};
	
	_pt.stop = function(){
		this.on = false;
	};
	

	window.FrameTicker = FrameTicker;
	
}(window));








