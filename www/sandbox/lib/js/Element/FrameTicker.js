

(function(window){
	
	FrameTicker = function() {
		this.timerID = 0;
		this.timers = [];
		this.on = true;
		EventTarget.call(this);
	};
	
	var _pt = FrameTicker.prototype = new EventTarget();
	
	
	_pt.constructor = FrameTicker;
	

	_pt.start = function(p_framerate){
		if (this.timerID) return;
		var _this = this;
		(function() {
				_this.fire("tick");
				if(_this.on) _this.timerID = setTimeout(arguments.callee, p_framerate);

		})();
		return _this;
	};
	
	_pt.stop = function(){
		this.on = false;
	};
	

	window.FrameTicker = FrameTicker;
	
}(window));








