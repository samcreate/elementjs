(function(window) {
	
	/**
	* //Triangle class helps draw a Triangle
	* @class Triangle
	* @extends DisplayObject
	* @constructor
	*/
	
	Triangle = function() {
		
		EventTarget.call(this);

		this.extend(this, new Events());
		this.extend(this, new Animate());
		
		
	};

	var _pt = Triangle.prototype = new Shape();
	
	_pt.constructor = Triangle;
	



	_pt._make = function(ctx){
		
		this.draw_shape(ctx);
		ctx.clip();
		this.dirty(false);

	};


	_pt.draw_shape = function(ctx){


		ctx.beginPath();
		ctx.moveTo(this.x()+(this.width()/2),this.y());
		ctx.lineTo(this.x()+this.width(),this.y()+this.height());
		ctx.lineTo(this.x(),this.y()+this.height());
		ctx.fill();


	};



	// =====================
	// = private functions =
	// =====================

	
	_pt.name = "Triangle Instance";
	
	window.Triangle = Triangle;
	
}(window));

