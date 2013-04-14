(function(window) {
	
	/**
	* //Circle class helps draw a Circle
	* @class Circle
	* @extends DisplayObject
	* @constructor
	*/
	
	Circle = function() {
		
		EventTarget.call(this);

		this.extend(this, new Events());
		this.extend(this, new Animate());
		
		
	};

	var _pt = Circle.prototype = new Shape();
	
	_pt.constructor = Circle;
	

	_pt.draw = function(){
		
	
		this._transform_reset();
		this.fire("beginDraw");
		this.transform.translate(this.x(),this.y());
		this.transform.rotate(this.rotate());
		this.transform.scale(1*this.scale(),1*this.scale());
		this._applyShadow(this.ctx);
		this.ctx.fillStyle   = this.color();
		this.ctx.globalAlpha = this.alpha();
		this.draw_shape(this.ctx);
		this.transform.restore();
		this.dirty(false);
		this.fire("finishDraw");

		return this;
	};


	_pt._make = function(ctx){
		
		this.draw_shape(ctx);
		ctx.clip();
		this.dirty(false);

	};


	_pt.draw_shape = function(ctx){


		var kappa = .5522848,
		  ox = (this.width() / 2) * kappa, // control point offset horizontal
		  oy = (this.height() / 2) * kappa, // control point offset vertical
		  xe = this.width(),           // x-end
		  ye = this.height(),           // y-end
		  xm = this.width() / 2,       // x-middle
		  ym = this.height() / 2;       // y-middle
    
		ctx.beginPath();
		ctx.moveTo(0, ym);
		ctx.bezierCurveTo(0, ym - oy, xm - ox, 0, xm, 0);
		ctx.bezierCurveTo(xm + ox, 0, xe, ym - oy, xe, ym);
		ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
		ctx.bezierCurveTo(xm - ox, ye, 0, ym + oy, 0, ym);
		ctx.closePath();
      	ctx.fill();


	};


	
	function drawEllipse(ctx, w, h) {
      
    }

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

	
	_pt.name = "Circle Instance";
	
	window.Circle = Circle;
	
}(window));

