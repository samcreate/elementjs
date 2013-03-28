(function(window) {
	
	/**
	* //Shape class helps draw a Shape
	* @class Shape
	* @extends DisplayObject
	* @constructor
	*/
	
	Shape = function() {
		
	
		
	};

	var _pt = Shape.prototype = new DisplayObject();
	
	_pt.constructor = Shape;
	
	_pt.init = function(p_context){

		this._context = p_context;
		this.transform = new Transform(this._context);
		this.ctx = this.transform.context;
		this.ready(true);
		this.bind('draw',this.draw,this);
	};

	_pt._make = function(){

	};
	// =====================
	// = private functions =
	// =====================

	
	_pt.name = "Shape Instance";
	
	window.Shape = Shape;
	
}(window));

