(function(window) {
	
	/**
	* //DisplayObject class loads jpg/png/gif as a DisplayObject Object on the canvas 
	* @class DisplayObject
	* @extends EventTarget
	* @constructor
	* @example
	*/
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


	/**
	* @memberOf DisplayObject#
	* @name x
    * @function
	* @param {Number} [value] - Value of x position.
    * @description 
    // x moves an object's x axius on the canvas
	* @public 
	* @example 
	// In this example, we set the x to 22 of an image.
	*
   	*var _my_element.x(22);
	*
	//now, let's 'get' the x value
	*console.log(_my_element.x()); //returns 22
    */
	_pt.x = function(p_val){
		if(p_val != null){
			this._x = p_val;
			return this;
		}else{
			return this._x || 1;
		}
	};


	/**
	* @memberOf DisplayObject#
	* @name y
    * @function
	* @param {Number} [value] - Value of y position.
    * @description 
    // y moves an object's y axius on the canvas
	* @public 
	* @example 
	// In this example, we set the y to 22 of an image.
	*
   	*var _my_element.y(22);
	*
	//now, let's 'get' the y value
	*console.log(_my_element.y()); //returns 22
    */
	_pt.y = function(p_val){
		if(p_val != null){
			this._y = p_val;
			return this;
		}else{
			return this._y || 1;
		}
	};

	/**
	* @memberOf DisplayObject#
	* @name width
    * @function
	* @param {Number} [value] - Value of the element's width.
    * @description 
    // width changes an object's width in pixels
	* @public 
	* @example 
	// In this example, we set the width to 222px.
	*
   	*var _my_element.width(222);
	*
	//now, let's 'get' the width value
	*console.log(_my_element.width()); //returns 222
    */
	_pt.width = function(p_val){
		if(p_val){
			this._width = p_val;
			return this;
		}else{
			return this._width;
		}
	};

	/**
	* @memberOf DisplayObject#
	* @name height
    * @function
	* @param {Number} [value] - Value of the element's height.
    * @description 
    // height changes an object's height in pixels
	* @public 
	* @example 
	// In this example, we set the height to 222px.
	*
   	*var _my_element.height(222);
	*
	//now, let's 'get' the height value
	*console.log(_my_element.height()); //returns 222
    */
	_pt.height = function(p_val){
		if(p_val){
			this._height = p_val;
			return this;
		}else{
			return this._height;
		}
	};
	

	/**
	* @memberOf DisplayObject#
	* @name scale
    * @function
	* @param {Number} [value] - Value of the element's scale in.
    * @description 
    // scale changes an object's scale aspect ratio in descimal percentage.
	* @public 
	* @example 
	// In this example, we set the scale to 200%.
	*
   	*var _my_element.scale(2);
	*
	//now, let's 'get' the scale value
	*console.log(_my_element.scale()); //returns 2
    */
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