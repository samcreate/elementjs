(function(window) {
	

//
	
	Canvas = function(p_canvas) {
		
		EventTarget.call(this);
		
		this._canvas = document.getElementById(p_canvas);
		this._canvas.width = this.canvas().getAttribute("width") || window.innerWidth;
		this._canvas.height = this.canvas().getAttribute("height") || window.innerHeight;

		if (!this._canvas||!this._canvas.getContext)throw "No Canvas Support.";

		
		this.context( this._canvas.getContext("2d") );
		this.context().translate(0,0);
		this.framerate( this.canvas().getAttribute("framerate") || 0 );
		this._engine = new FrameTicker();
		this._engine.start(this.framerate()).bind("tick",this._childrenDraw,this);
		
		
		this.init();
	};

	var _pt = Canvas.prototype = new EventTarget();
	
	_pt.constructor = Canvas;
	
	_pt.init = function(){
		
		HTMLCanvasElement.prototype.relMouseCoords = function (event) {
			var totalOffsetX = 0; totalOffsetY = 0; canvasX = 0; canvasY = 0; currentElement = this;

		do {
			totalOffsetX += currentElement.offsetLeft;
			totalOffsetY += currentElement.offsetTop;
		}
		while (currentElement = currentElement.offsetParent)

		canvasX = event.pageX - totalOffsetX;
		canvasY = event.pageY - totalOffsetY;

		// Fix for variable canvas width
		canvasX = Math.round( canvasX * (this.width / this.offsetWidth) );
		canvasY = Math.round( canvasY * (this.height / this.offsetHeight) );

		return {x:canvasX, y:canvasY};
		};
		
		var _scope = this;
		if ( document.addEventListener) {
			
			document.addEventListener("mouseup", function(p_e) { _scope._MouseUpHandler(p_e); }, false);
			document.addEventListener("mousemove", function(p_e) { _scope._MouseMoveHandler(p_e); }, false);
			document.addEventListener("onkeydown", function(p_e) { _scope._keyDownHandler(p_e); }, false);
			document.onkeydown = _scope._keyDownHandler;
			document.onkeypress = _scope._keyDownHandler;
			document.onkeyup = _scope._keyDownHandler;
			
		} else if (window.addEventListener) {
			window.addEventListener("mouseup", function(p_e) { _scope._MouseUpHandler(p_e); }, false);
			window.addEventListener("mousemove", function(p_e) { _scope._MouseMoveHandler(p_e); }, false);
			window.addEventListener("onkeydown", function(p_e) { _scope._keyDownHandler(p_e); }, false);
			window.onkeydown = _scope._keyDownHandler;
			window.onkeypress = _scope._keyDownHandler;
			window.onkeyup = _scope._keyDownHandler;
		}
		this._canvas.addEventListener("mousedown", function(p_e) { _scope._MouseDownHandler(p_e); }, false);
		
		
		
		
	};
	
	_pt.width = function(p_val){
		if(p_val){
			this._width = p_val;
			return this;
		}else{
			return this._width;
		}
	};
	_pt.height = function(p_val){
		if(p_val){
			this._height = p_val;
			return this;
		}else{
			return this._height;
		}
	};
	_pt.framerate = function(p_val){
		if(p_val){
			this._framerate = p_val;
			return this;
		}else{
			return this._framerate || 6;
		}
	};
	
	_pt.context = function(p_val){
		if(p_val){
			this._context = p_val;
			return this;
		}else{
			return this._context || "";
		}
	};

	_pt.canvas = function(p_val){
		if(p_val){
			this._canvas = p_val;
			return this;
		}else{
			return this._canvas;
		}
	};
	
	

	// ====================
	// = private function =
	// ====================
	_pt._childrenDraw = function(){
		
		this.fire("draw");
		this.context().clearRect(0, 0, this._canvas.width, this._canvas.height);
	
		for (var i=0; i < $$_CHILDREN.length; i++) {
			if($$_CHILDREN[i].visible()) $$_CHILDREN[i].fire("draw");
			
		}
		
	};
	
	_pt._keyDownHandler = function(p_e){
		for (var i = $$_EVENTS_CHILDREN.length - 1; i >= 0; i--){
			if($$_EVENTS_CHILDREN[i].event === p_e.type){
				$$_EVENTS_CHILDREN[i].callback.call($$_EVENTS_CHILDREN[i].object,p_e);
			}
		}
	};
	
	_pt._MouseDownHandler = function(p_e,f){
		var _coords = this.canvas().relMouseCoords(p_e), _mx = _coords.x, _my = _coords.y, _scope = this;
		for (var i = $$_EVENTS_CHILDREN.length - 1; i >= 0; i--){
			if($$_EVENTS_CHILDREN[i].event === "click"){
				
				if(Util.checkPIXEL($$_EVENTS_CHILDREN[i].object,_mx, _my)){
					
					$$_EVENTS_CHILDREN[i].callback.call($$_EVENTS_CHILDREN[i].object);
					
				}
			}
			// ========================
			// = drag and drop events =
			// ========================
			if($$_EVENTS_CHILDREN[i].event === "drag" && !$$_EVENTS_DRAG_CHILDREN[$$_EVENTS_CHILDREN[i].object.id()+"_obj"]){
				
				if(Util.checkPIXEL($$_EVENTS_CHILDREN[i].object,_mx, _my)){
					var _temp = $$_EVENTS_DRAG_CHILDREN[($$_EVENTS_CHILDREN[i].object.id()+"_obj")] = $$_EVENTS_CHILDREN[i];
					_temp.clickX = _mx;
					_temp.clickY = _my;
					_temp.pastX = _temp.object.x();
					_temp.pastY = _temp.object.y();
					$$_EVENTS_CHILDREN[i].callback.call($$_EVENTS_CHILDREN[i].object,{eventType:"onStart"});
					return;
				}

			}
		}
		
	};
	_pt._MouseUpHandler = function(p_e){
	
		for(obj in $$_EVENTS_DRAG_CHILDREN){
			if($$_EVENTS_DRAG_CHILDREN[obj].event === "drag"){
				$$_EVENTS_DRAG_CHILDREN[obj].callback.call($$_EVENTS_DRAG_CHILDREN[obj].object,{eventType:"onFinished"});
				delete $$_EVENTS_DRAG_CHILDREN[obj];
			}
		}
	};
	_pt._MouseMoveHandler = function(p_e){
		
		var _coords = this.canvas().relMouseCoords(p_e), _mx = _coords.x, _my = _coords.y, _scope = this, _X, _Y;
		// =========
		// = hover =
		// =========
		for (var i = $$_EVENTS_CHILDREN.length - 1; i >= 0; i--){
			if($$_EVENTS_CHILDREN[i].event === "hover"){
				
				if(Util.checkPIXEL($$_EVENTS_CHILDREN[i].object,_mx, _my)){
					
					$$_EVENTS_CHILDREN[i].callback.call($$_EVENTS_CHILDREN[i].object);
					
				}
			}
	
			
		}
		// ========
		// = drag =
		// ========
		for(obj in $$_EVENTS_DRAG_CHILDREN){
			if($$_EVENTS_DRAG_CHILDREN[obj].event === "drag"){
				var _obj = $$_EVENTS_DRAG_CHILDREN[obj];
				_X = _mx - Math.abs(_obj.pastX - _obj.clickX);
				_Y = _my - Math.abs(_obj.pastY - _obj.clickY);

				_obj.object.x(_X);
				_obj.object.y(_Y);
				
				$$_EVENTS_DRAG_CHILDREN[obj].callback.call(_obj.object,{eventType:"onUpdate"});
				_obj.clickX = _mx;
				_obj.clickY = _my;
				_obj.pastX = _obj.object.x();
				_obj.pastY = _obj.object.y();
			}
		}
	};
	
	
	
	window.Canvas = Canvas;
	
}(window));
