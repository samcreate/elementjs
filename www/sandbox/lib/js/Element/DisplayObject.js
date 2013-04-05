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
			this.dirty(true,"x");
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
			this.dirty(true,"y");
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
			this.dirty(true,"width");
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
	// now, let's 'get' the height value
	*console.log(_my_element.height()); //returns 222
    */
	_pt.height = function(p_val){
		if(p_val){
			this._height = p_val;
			this.dirty(true,"height");
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
	// now, let's 'get' the scale value
	*console.log(_my_element.scale()); //returns 2
    */
	_pt.scale = function(p_val){
		if(p_val != null){
			this._scale = p_val;
			this.dirty(true,"scale");
			return this;
		}else{
			return this._scale || 1;
		}
	};
	/**
	* @memberOf DisplayObject#
	* @name rotate
    * @function
	* @param {Number} [value] - Value of the element's rotate in.
    * @description 
    // rotate changes an object's rotation in radians.
	* @public 
	* @example 
	// In this example, we set the rotation of an object to 90 degrees.
	*
   	*var _my_element.rotate(3.14/2);
	*
	// now, let's 'get' the scale value
	*console.log(_my_element.rotate()); //returns 1.57 (i.e. 90º)
    */
	_pt.rotate = function(p_val){
		if(p_val  != null){
			this._rotate = p_val;
			this.dirty(true,"rotate");
			return this;
		}else{
			return this._rotate || 0;
		}
	};

	/** @memberOf DisplayObject#
	* @name trace
    * @function
	* @param {Boolean} [true/false] - true/false
    * @description 
    // Trace function tells the object wether or not all previous context drawing 
    // should be saved, never erasing the objects previous drawn state. If no value
    // is entered, the function acts like a 'getter' for the object's trace state.
	* @public 
	* @example 
	// this example will turn the trace state to 'on.'
	*
   	*var _img = new Element("Bitmap",{
	*		src:"path/to/image.jpg"
	*}).trace(true);
	*
	// this example will return the trace state.
	*
   	*var _img = new Element("Bitmap",{
	*		src:"path/to/image.jpg"
	*});
	*_img.trace(); // returns true.
    */
	_pt.trace = function(p_val){
		
		if(p_val === false) this._cleartrace();
		
		if(p_val != null){
			this._trace = p_val;
			this.dirty(true,"trace");
			return this;
		}else{
			return this._trace ||  false;
		}
		
	};

	/** @memberOf DisplayObject#
	* @name collides
    * @function
	* @param {Object} Element - anything that inherits DisplayObject
	* @param {function} Callback - the callback function trigger when the objects rectangle bonds overlap.
    * @description 
    // Collides is used to find out if two different objects collide. 
	* @public 
	* @example 
	// this example will send out an alert if the two object overlap
	*
   	*_my_element.collides(_other_element,function(){
	*		alert("_other_element touches _my_element!");
	*});
    */
	_pt.collides = function(p_target,p_callback){
		var a = this, b = p_target;
		var _collide = a.x() < b.x() + b.width() &&
		         a.x() + a.width() > b.x() &&
		         a.y() < b.y() + b.height() &&
		         a.y() + a.height() > b.y();
		if(_collide)p_callback.call(this);
	};
	
	/** @memberOf DisplayObject#
	* @name drag
    * @function
	* @param {function} Callback - the callback function triggers: e.onStart, e.onUpdate, e.onFinished
    * @description 
    // Allows for dragging an object. 
	* @public 
	* @example 
	// This example will how to setup a basic drag event.
	*
   	*_my_element.on("drag",_drag_handler);
   	*
   	*function drag_handler (p_evt) {
	*	console.log(p_evt.eventType);
	*}
    */
	_pt.drag = function(p_func){
		return this.on('drag',p_func);
	};


	/**
	* @memberOf DisplayObject#
	* @name alpha
    * @function
	* @param {Number} [percentage] - Value of the element's alpha between 0-1.
    * @description 
    // Changes the elements transparency from 0-1, where one is equal to 100%
	* @public 
	* @example 
	// In this example, we set the alpha to 50%.
	*
   	*var _my_element.alpha(0.5);
	*
	// now, let's 'get' the alpha value
	*console.log(_my_element.alpha()); //returns 0.5
    */
	_pt.alpha = function(p_val){
		if(p_val != null){
			this._alpha = p_val;
			this.dirty(true, "alpha");
			return this;
		}else{
			return this._alpha;
		}
	};
	
	/**
	* @memberOf DisplayObject#
	* @name shadow
    * @function
	* @param {Object/String} [shadowValues] - {color:hex, blur:Number,x:Number,y:Number,alpha:percent} or 'none'
    * @description 
    // adds shadow the current element. Pass in a object with filled values for this:
    // {color:hex, blur:Number,x:Number,y:Number,alpha:percent}
	* @public 
	* @example 
	// example of adding a black shadow:
	*
   	*var _my_element.shadow({color:'#000000', blur:30,x:10,y:10,alpha:0.5});
	*
	// now, let's 'get' the shadow values
	*console.log(_my_element.shadow()); //returns {color:'#000000', blur:30,x:10,y:10,alpha:0.5}
	*
	// now, let's 'remove' the shadow values
	*_my_element.shadow('none'); //returns _my_element
    */
	_pt.shadow = function(p_val){
		if(p_val){
			this._shadow = p_val;
			this.dirty(true, "shadow");
			return this;
		}else{
			return this._shadow || {};
		}
	};


	/**
	* @memberOf DisplayObject#
	* @name border
    * @function
	* @param {Object/String} [borderValues] - {color:hex,with:number} or 'none'
    * @description 
    // allows you to add a border to any display object
    // {color:hex, width:number}
	* @public 
	* @example 
	// example of adding a black border:
	*
   	*var _my_element.border({color:'#000000', width:20}); //returns _my_element
	*
	// now, let's 'get' the border values
	*console.log(_my_element.border()); //returns {color:'#000000', width:20}
	*
	// now, let's 'remove' the border values
	*_my_element.border('none'); //returns _my_element
    */
	_pt.border = function(p_val){
		//TODO: Fix border width to be double the value, 
		//since it shows up as half the value.
		if(p_val){
			this._border = p_val;
			this.dirty(true, "border");
			return this;
		}else{
			return this._border || {width:0,color:null};
		}
	};

	_pt.mask = function(p_val){
		if(p_val){
			p_val.alpha(0);
			p_val.unbind("draw",p_val.draw);
			this._mask = p_val;
			this.dirty(true, "mask");
			return this;
		}else{
			return this._mask;
		}
	};

	_pt.dirty = function(p_val, p_by){
		
		if(p_val != null){
			// debug.log(p_val);
			 // if(p_by != null && p_val === true) debug.log(this.id(),"dirty by: "+p_by);
			 // if(p_val === false) debug.log(this.id()+" SET CLEAN");
			this.fire('dirty');
			this._dirty = p_val;
			return this;
		}else{
			return this._dirty;
		}
	};

	_pt.top = function(){
		var _i = Util.getIndex(this);
		var _childtotop = $$_CHILDREN.splice(_i,1);
		$$_CHILDREN.push(_childtotop[0]);
		this.dirty(true, "top");
		return this;
	};
	
	_pt.bottom = function(){
		var _i = Util.getIndex(this);
		var _childtotop = $$_CHILDREN.splice(_i,1);
		$$_CHILDREN.unshift(_childtotop[0]);
		this.dirty(true, "bottom");
		return this;
	};

	_pt.scene = function(p_val){
		if(p_val != null){
			this._scene = p_val;
			return this;
		}else{
			return this._scene;
		}
	};

	
	

	// =====================
	// = private functions =
	// =====================
	_pt._cleartrace = function(){
		if(this._trace_canvas){
			this._trace_canvas.canvas.width = this._trace_canvas.canvas.width;
		}
	};

	_pt._transform_reset = function(){
		
		this.transform.save();
		this.transform.setMatrix([1, 0, 0, 1, 0, 0]);
	};

	_pt._applyStroke = function(p_context,p_cords){
		if(this.border().color != null){
			var _c = p_context, _b = this.border(), loc = p_cords;
			_c.beginPath();
			_c.rect(loc.x, loc.y, loc.w, loc.h);
			_c.strokeStyle = _b.color;
			_c.lineWidth = _b.width;
			_c.closePath();
			_c.stroke();
			
			
		}
	};
	
	_pt._applyShadow = function(p_context){
		if(this.shadow().color != null){
			var _c = p_context, _s = this.shadow(), _color = Util.hexToRGB(_s.color);
			
			_c.shadowColor   = 'rgba('+_color.r+', '+_color.b+', '+_color.g+', '+(_s.alpha || 1)+')';
			_c.shadowBlur    = _s.blur;
			_c.shadowOffsetX = _s.x;
			_c.shadowOffsetY = _s.y;
	
			
		}
	};
	

	window.DisplayObject = DisplayObject;
	
}(window));