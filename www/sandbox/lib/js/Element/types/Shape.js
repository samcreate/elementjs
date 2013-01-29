(function(window) {
	
	/**
	* //Shape class helps draw a Shape
	* @class Shape
	* @extends DisplayObject
	* @constructor
	*/
	
	Shape = function(p_context) {
		
	
		
	};

	var _pt = Shape.prototype = new DisplayObject();
	
	_pt.constructor = Shape;
	
	_pt.init = function(){
		this.x(0);
		this.y(0);
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

