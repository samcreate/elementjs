(function(window) {
	

	
	Animate = function(p_Animate) {
	
		this._tween = [];
	};

	var _pt = Animate.prototype;
	
	
	// ====================
	// = getter / setters =
	// ====================
	
	_pt.easing = function(p_val){
		if(p_val){
			this._easing = p_val;
			return this;
		}else{
			return this._easing;
		}
	};
	
	_pt.time = function(p_val){
		if(p_val){
			this._time = p_val;
			return this;
		}else{
			return this._time;
		}
	};
	
	_pt.easing = function(p_val){
		if(p_val){
			this._easing = p_val;
			return this;
		}else{
			return this._easing || "Linear.EaseNone";
		}
	};
	
	// ====================
	// = public functions =
	// ====================
	_pt.animate = function(p_time, p_props, p_easing){
		
		this._tween.push({props:p_props,time:p_time,easing: p_easing || this.easing()});
		
		return this;
	};

	
	_pt.start = function(p_callback){

		
		//queue to make object is ready
		
		if(this.ready() === false) {
			var _this = this, _callb = p_callback;
			setTimeout(function(){
				_this.start(_callb);
			},1000);
			return this;
		}
		
		this._callback = p_callback || "" ;
		
		this._tweenie.to(this,this._tween[0].props, (this._tween[0].time*1000) ,this._tween[0].easing ,null, this._nextTween);
		
		
		return this;

	};
	
	_pt.stop = function(){
		
		
		return this;

	};
	
	_pt.pause = function(){
		
		
		return this;

	};
	
	
	// =====================
	// = private functions =
	// =====================
	_pt._nextTween = function(){
		
		if(this._tween.length > 1){
		
			this._tween.shift();
			this._tweenie.to(this,this._tween[0].props, (this._tween[0].time*1000) ,this._tween[0].easing ,null, this._nextTween);

		
		}else{
			this._tween.shift();
			if(this._callback !== "" )  this._callback.call(this);

		}
	
	};
	
	

	
	window.Animate = Animate;
	
}(window));