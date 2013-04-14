(function(window) {
	
	/**
	* //Rectangle class helps draw a Rectangle
	* @class Rectangle
	* @extends DisplayObject
	* @constructor
	*/
	
	Rectangle = function() {
		
		EventTarget.call(this);

		this.extend(this, new Events());
		this.extend(this, new Animate());
		
		
	};

	var _pt = Rectangle.prototype = new Shape();
	
	_pt.constructor = Rectangle;


	_pt.draw_shape = function(ctx){


		ctx.beginPath();
		ctx.moveTo(this.x() + this.radius(), this.y());
		ctx.lineTo(this.x() + this.width() - this.radius(), this.y());
		ctx.quadraticCurveTo(this.x() + this.width(), this.y(), this.x() + this.width(), this.y() + this.radius());
		ctx.lineTo(this.x() + this.width(), this.y() + this.height() - this.radius());
		ctx.quadraticCurveTo(this.x() + this.width(), this.y() + this.height(), this.x() + this.width() - this.radius(), this.y() + this.height());
		ctx.lineTo(this.x() + this.radius(), this.y() + this.height());
		ctx.quadraticCurveTo(this.x(), this.y() + this.height(), this.x(), this.y() + this.height() - this.radius());
		ctx.lineTo(this.x(), this.y() + this.radius());
		ctx.quadraticCurveTo(this.x(), this.y(), this.x() + this.radius(), this.y());
		ctx.closePath();
		ctx.fill();


	};


	_pt._make = function(ctx){

		this.draw_shape(ctx);
		ctx.clip();
		this.dirty(false);

	};

	
	_pt.radius = function(p_val){
		if(p_val != null){
			this._radius = p_val;
			this.dirty(true);
			return this;
		}else{
			return this._radius || 0;
		}
	};

	// TODO: Maybe add override for every object???
	// _pt.override = function(p_draw){

	// 	this.unbind('draw',this.draw,this);

	// 	this.bind('draw',function(){

	// 		this._transform_reset();
	// 		this.fire("beginDraw");
	// 		this.transform.translate(0,0);
	// 		this.transform.rotate(this.rotate());
	// 		this.transform.scale(1*this.scale(),1*this.scale());
	// 		this._applyShadow(this.ctx);
	// 		this.ctx.fillStyle   = this.color();
	// 		this.ctx.globalAlpha = this.alpha();
			
	// 		p_draw.call(this,this.ctx);

	// 		this.transform.restore();
	// 		this.dirty(false);
	// 		this.fire("finishDraw");


	// 	},this);

	// }



	// =====================
	// = private functions =
	// =====================

	
	_pt.name = "Rectangle Instance";
	
	window.Rectangle = Rectangle;
	
}(window));

