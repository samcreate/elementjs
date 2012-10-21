(function(window) {
	

	DisplayObject = function() {
		
	}


	var _pt = DisplayObject.prototype = new EventTarget();
	
	_pt.constructor = DisplayObject;

	// ====================
	// = Getter / Setters =
	// ====================

	
	// ====================
	// = public functions =
	// ====================
	_pt.x = function(p_val){
		if(p_val != null){
			this._x = p_val;
			return this;
		}else{
			return this._x || 1;
		}
	};
	_pt.y = function(p_val){
		if(p_val != null){
			this._y = p_val;
			return this;
		}else{
			return this._y || 1;
		}
	};
	_pt.width = function(p_val){
		if(p_val){
			this._width = p_val;
			return this;
		}else{
			return this._width;
		}
	};
	_pt.height = function(p_val){
		if(p_val){
			this._height = p_val;
			return this;
		}else{
			return this._height;
		}
	};
	
	_pt.scale = function(p_val){
		if(p_val != null){
			this._scale = p_val;
			return this;
		}else{
			return this._scale || 1;
		}
	};
	_pt.rotate = function(p_val){
		if(p_val  != null){
			this._rotate = p_val;
			return this;
		}else{
			return this._rotate || 0;
		}
	};
	_pt.filter = function(){
		
		if(arguments != undefined && arguments.length > 0){
			this.resetFilter();
			this._filters = this._filters || [];
			var _temp_filter = {};
			_temp_filter.args = [];
			_temp_filter.effect = arguments[0];
			
			for (var i=1; i < arguments.length; i++) {
				_temp_filter.args.push(arguments[i]);
			}
			this._filters[_temp_filter.effect] = _temp_filter;
			return this;
		}else{
			return this._filters;
		}
	};
	
	_pt.collides = function(p_target,p_callback){
		var a = this, b = p_target;
		var _collide = a.x() < b.x() + b.width() &&
		         a.x() + a.width() > b.x() &&
		         a.y() < b.y() + b.height() &&
		         a.y() + a.height() > b.y();
		if(_collide)p_callback.call(this);
	};
	
	_pt.resetFilter = function(){
		this.filter_cache = null;
	};
	
	_pt.drag = function(p_func){
		return this.on('drag',p_func);
	};

	// =====================
	// = private functions =
	// =====================
	_pt._cleartrace = function(){
		if(this._trace_canvas){
			this._trace_canvas.canvas.width = this._trace_canvas.canvas.width;
		}
	}

	_pt._transform_reset = function(){
		
		this.transform.save();
		this.transform.setMatrix([1, 0, 0, 1, 0, 0]);
	}
	

	window.DisplayObject = DisplayObject;
	
}(window));