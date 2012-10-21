

(function(window) {
	


	
	Path = function(p_context) {
		
		EventTarget.call(this);
		this._paths = this._paths || [];
		this._context = p_context;
		this.transform = new Transform(this._context);
		
	}	

	var _pt = Path.prototype = new EventTarget();
	
	_pt.constructor = Path;
	
	_pt.init = function(){
		this.bind('draw',this.draw,this);
	}
	_pt.width = function(p_val){
		if(p_val){
			this._width = p_val;
			return this;
		}else{
			return this._width;
		}
	}
	_pt.color = function(p_color){
		
		if(p_color != null){
			this._color = p_color;
			return this;
		}else{
			return this._color || "#000";
		}
	
	}
	
	_pt.beginPath = function(p_x,p_y){
		
		this._p_startX = p_x;
		this._p_startY = p_y;
		
		return this;
	}
	
	_pt.style = function(p_obj){
		
		
		if(p_obj.width) this.width(p_obj.width);
		if(p_obj.color) this.color(p_obj.color);
		
		return this;
	}
	
	_pt.to = function(p_x,p_y){
		
		
		this._paths.push({x:p_x,y:p_y});
		return this;
	}
	
	_pt.end = function(p_tf){
		
		
		if(p_tf != null){
			this._end = p_tf;
			return this;
		}else{
			return this._end || false;
		}
		
	}
	
	_pt.draw = function(p_val){
		
		
	
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
	
		
		
		
		return this;
	};
	

	// =====================
	// = private functions =
	// =====================
	

	
	
	_pt.name = "Path Instance";
	
	window.Path = Path;
	
}(window));