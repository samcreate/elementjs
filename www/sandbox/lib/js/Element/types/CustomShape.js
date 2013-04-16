(function(window) {
	
	/**
	* //CustomShape class helps draw a CustomShape
	* @class CustomShape
	* @extends DisplayObject
	* @constructor
	*/
	
	CustomShape = function() {
		
		EventTarget.call(this);

		this.extend(this, new Events());
		this.extend(this, new Animate());
		
		
	};

	var _pt = CustomShape.prototype = new Shape();
	
	_pt.constructor = CustomShape;
	

	_pt._make = function(ctx){
		
		this.draw_shape(ctx);
		ctx.clip();
		this.dirty(false);

	};


	_pt.draw_shape = function(ctx){

		if(typeof this.custom_callback === 'function'){
			this.custom_callback.call(this,ctx);
		}

		

	};

	_pt.render = function(p_draw){

		this.custom_callback = p_draw;

		return this;

	};


	// =====================
	// = private functions =
	// =====================

	
	_pt.name = "CustomShape Instance";
	
	window.CustomShape = CustomShape;
	
}(window));

