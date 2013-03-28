(function(window) {
	
	/**
	* //Rectangle class helps draw a Rectangle
	* @class Rectangle
	* @extends DisplayObject
	* @constructor
	*/
	
	Rectangle = function(p_context) {
		
		EventTarget.call(this);
		this._context = p_context;
		this.extend(this, new Events());
		this.extend(this, new Animate());
		this.transform = new Transform(this._context);
		this.ctx = this.transform.context;
		
	};

	var _pt = Rectangle.prototype = new Shape();
	
	_pt.constructor = Rectangle;
	

	_pt.draw = function(p_val){
		
	
		// debug.log(this.id());
		this._transform_reset();
		this.fire("beginDraw");
		this.transform.translate(0,0);
		this.transform.rotate(this.rotate());
		
		this.transform.scale(1*this.scale(),1*this.scale());
	
		this._applyShadow(this.ctx);
		this.ctx.fillStyle   = this.color();
		this.ctx.globalAlpha = this.alpha();
		this.ctx.beginPath();
		this.ctx.moveTo(this.x() + this.radius(), this.y());
		this.ctx.lineTo(this.x() + this.width() - this.radius(), this.y());
		this.ctx.quadraticCurveTo(this.x() + this.width(), this.y(), this.x() + this.width(), this.y() + this.radius());
		this.ctx.lineTo(this.x() + this.width(), this.y() + this.height() - this.radius());
		this.ctx.quadraticCurveTo(this.x() + this.width(), this.y() + this.height(), this.x() + this.width() - this.radius(), this.y() + this.height());
		this.ctx.lineTo(this.x() + this.radius(), this.y() + this.height());
		this.ctx.quadraticCurveTo(this.x(), this.y() + this.height(), this.x(), this.y() + this.height() - this.radius());
		this.ctx.lineTo(this.x(), this.y() + this.radius());
		this.ctx.quadraticCurveTo(this.x(), this.y(), this.x() + this.radius(), this.y());
		this.ctx.closePath();
		this.ctx.fill();

		this.transform.restore();
		this.dirty(false);
		this.fire("finishDraw");

		return this;
	};


	_pt._make = function(p_ctx,p_scope){
		
		var _ctx = p_ctx;

		
		_ctx.moveTo(0 + this.radius(), 0);
		_ctx.lineTo(0 + this.width() - this.radius(), 0);
		_ctx.quadraticCurveTo(0 + this.width(), 0, 0 + this.width(), 0 + this.radius());
		_ctx.lineTo(0 + this.width(), 0 + this.height() - this.radius());
		_ctx.quadraticCurveTo(0 + this.width(), 0 + this.height(), 0 + this.width() - this.radius(), 0 + this.height());
		_ctx.lineTo(0 + this.radius(), 0 + this.height());
		_ctx.quadraticCurveTo(0, 0 + this.height(), 0, 0 + this.height() - this.radius());
		_ctx.lineTo(0, 0 + this.radius());
		_ctx.quadraticCurveTo(0, 0, 0 + this.radius(), 0);
		_ctx.closePath();
		_ctx.fill();


		_ctx.clip();
		this.dirty(false);

	};


	_pt.mouseDraw =  function(){

		this._mouse_canvas = this._mouse_canvas || Util.createContext("mouse_"+this.id(),this.scene().canvas());
		this._mouse_transform = this._mouse_transform || new Transform(this._mouse_canvas.context);
		this._mouse_transform.save();
		this._mouse_transform.setMatrix([1, 0, 0, 1, 0, 0]);
		this._mouse_canvas.context.clearRect(0, 0, this._mouse_canvas.canvas.width, this._mouse_canvas.canvas.height );
		this._mouse_transform.translate(this.x(),this.y());
		var _w = (this.width()/this.orig_width),
		_h = (this.height()/this.orig_height),
		_m2 = this._mouse_transform.getMatrix();
		this._mouse_transform.rotate(this.rotate());
		this._mouse_transform.scale((this.width()/this.orig_width)*this.scale(),(this.height()/this.orig_height)*this.scale());
		this._mouse_transform.context.globalAlpha = this.alpha();
		this._applyShadow(this._mouse_transform.context);
		this._mouse_canvas.context.fillStyle   = this.color();
		this._mouse_canvas.context.globalAlpha = this.alpha();
		this._mouse_canvas.context.fillRect(0,   0, this.width(), this.height());
		return this._mouse_canvas.context;
	};


	

	_pt.color = function(p_val){
		if(p_val != null){
			this._color = p_val;
			this.dirty(true, arguments.callee.name);
			return this;
		}else{
			return this._color;
		}
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



	// =====================
	// = private functions =
	// =====================

	
	_pt.name = "Rectangle Instance";
	
	window.Rectangle = Rectangle;
	
}(window));

