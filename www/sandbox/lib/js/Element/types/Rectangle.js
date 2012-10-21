(function(window) {
	
	
	Rectangle = function(p_context) {
		
		EventTarget.call(this);
		this._context = p_context;
		this.extend(this, new Events());
		this.extend(this, new Animate());
		this.transform = new Transform(this._context);
		
	};

	var _pt = Rectangle.prototype = new DisplayObject();
	
	_pt.constructor = Rectangle;
	
	_pt.init = function(){
		this.x(0);
		this.y(0);
		this.ready(true);
		this.bind('draw',this.draw,this);
	};

	_pt.draw = function(p_val){
	
		this._transform_reset();
		this.fire("beginDraw");
		this.transform.translate(this.x(),this.y());
		this.transform.rotate(this.rotate());
		
		this.transform.scale(1*this.scale(),1*this.scale());
		this.transform.context.fillStyle   = this.color();
		this.transform.context.globalAlpha = this.alpha();
		this._applyShadow(this.transform.context);
		this.transform.context.fillRect(0,   0, this.width(), this.height());
		

		this.transform.restore();
		this.fire("finishDraw");

		return this;
	};

	_pt.mouseDraw =  function(){

		this._mouse_canvas = this._mouse_canvas || Util.createContext("mouse_"+this.id());
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
			return this;
		}else{
			return this._color;
		}
	};

	// =====================
	// = private functions =
	// =====================

	
	_pt.name = "Rectangle Instance";
	
	window.Rectangle = Rectangle;
	
}(window));

