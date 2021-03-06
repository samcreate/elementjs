(function(window) {
	

	/**
	* //Path class helps draw a path
	* @class Path
	* @extends EventTarget
	* @constructor
	*/
	
	Path = function() {
		
		EventTarget.call(this);
		this._paths = this._paths || [];
		this.extend(this, new Events());
		
	}	

	var _pt = Path.prototype = new DisplayObject();
	
	_pt.constructor = Path;
	
	_pt.init = function(p_context){
		this._context = p_context;
		this.transform = new Transform(this._context);

		this.bind('draw',this.draw,this);

	}
	
	_pt.color = function(p_color){
		
		if(p_color != null){
			this._color = p_color;
			this.dirty(true, "color");
			return this;
		}else{
			return this._color || "#000000";
		}
	
	}
	
	_pt.beginPath = function(p_x,p_y){
		
		this.dirty(true, "beginPath");
		this._p_startX = p_x;
		this._p_startY = p_y;
		
		return this;
	}
	
	_pt.style = function(p_obj){
		
		this.dirty(true, "style");
		if(p_obj.width) this.width(p_obj.width);
		if(p_obj.color) this.color(p_obj.color);
		
		return this;
	}
	
	_pt.to = function(p_x,p_y){
		
		this.dirty(true, "to");
		this._paths.push({x:p_x,y:p_y});
		return this;
	}
	
	_pt.end = function(p_tf){
		
		this.dirty(true, "end");
		if(p_tf != null){
			this._end = p_tf;
			return this;
		}else{
			return this._end || false;
		}
		
	}
	
	_pt.draw = function(p_val){
		
		this.fire("beginDraw");
		this.transform.save();
		this.transform.setMatrix([1, 0, 0, 1, 0, 0]);
		
		
		this.transform.context.beginPath();
		this.transform.context.moveTo(this._p_startX,this._p_startY);
		for (var i=0; i < this._paths.length; i++) {
			if(this._paths[i] != null) this.transform.context.lineTo(this._paths[i].x,this._paths[i].y);
		};
		this.transform.context.strokeStyle   = this.color() || '#000';
		this.transform.context.lineWidth   = this.width() || 1;

		this.transform.context.globalAlpha = this.alpha();
		this._applyShadow(this.transform.context);
		if(this.end()) this.transform.context.closePath();
		this.transform.context.stroke();
		
		this.transform.restore();
	
		this.dirty(false);
		
		this.fire("finishDraw");
		
		
		return this;
	};
	

	// =====================
	// = private functions =
	// =====================
	

	
	
	_pt.name = "Path Instance";
	
	window.Path = Path;
	
}(window));