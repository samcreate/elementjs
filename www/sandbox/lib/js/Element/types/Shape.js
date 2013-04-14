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

	_pt.draw = function(){
		
	
		this._transform_reset();
		this.fire("beginDraw");
		this.transform.translate(0,0);
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

	_pt.color = function(p_val){
		if(p_val != null){
			this._color = p_val;
			this.dirty(true, arguments.callee.name);
			return this;
		}else{
			return this._color;
		}
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

	// =====================
	// = private functions =
	// =====================



	
	_pt.name = "Shape Instance";
	
	window.Shape = Shape;
	
}(window));

