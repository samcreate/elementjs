(function(window) {
	
	/**
	* //CanvasInteract class helps draw a CanvasInteract
	* @class CanvasInteract
	* @extends DisplayObject
	* @constructor
	*/
	
	CanvasInteract = function() {
		
		this.eventChildren = [];
		this.eventDragChildren = [];
		
	};

	var _pt = CanvasInteract.prototype;

	_pt.constructor = CanvasInteract;


	_pt.mouseInit = function(){
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
			document.onkeydown = function(p_e){ _scope._keyDownHandler(p_e);};
			document.onkeypress = function(p_e){ _scope._keyDownHandler(p_e);};
			document.onkeyup = function(p_e){ _scope._keyDownHandler(p_e);};
			
		} else if (window.addEventListener) {
			window.addEventListener("mouseup", function(p_e) { _scope._MouseUpHandler(p_e); }, false);
			window.addEventListener("mousemove", function(p_e) { _scope._MouseMoveHandler(p_e); }, false);
			window.addEventListener("onkeydown", function(p_e) { _scope._keyDownHandler(p_e); }, false);
			window.onkeydown = function(p_e){ _scope._keyDownHandler(p_e);};
			window.onkeypress = function(p_e){ _scope._keyDownHandler(p_e);};
			window.onkeyup = function(p_e){ _scope._keyDownHandler(p_e);};
		}


		this.canvas().addEventListener("mousedown", function(p_e) { _scope._MouseDownHandler(p_e); }, false);
	}
	

	// =====================
	// = private functions =
	// =====================

	_pt._keyDownHandler = function(p_e){

		for (var i = this.eventChildren.length - 1; i >= 0; i--){
			if(this.eventChildren[i].event === p_e.type){
				this.eventChildren[i].callback.call(this.eventChildren[i].object,p_e);
			}
		}
	};
	
	_pt._MouseDownHandler = function(p_e,f){
		var _coords = this.canvas().relMouseCoords(p_e), _mx = _coords.x, _my = _coords.y, _scope = this;
		for (var i = this.eventChildren.length - 1; i >= 0; i--){
			if(this.eventChildren[i].event === "click"){
				
				if(Util.checkPIXEL(this.eventChildren[i].object,_mx, _my)){
					
					this.eventChildren[i].callback.call(this.eventChildren[i].object);
					
				}
			}
			// ========================
			// = drag and drop events =
			// ========================
			if(this.eventChildren[i].event === "drag" && !this.eventDragChildren[this.eventChildren[i].object.id()+"_obj"]){
				
				if(Util.checkPIXEL(this.eventChildren[i].object,_mx, _my)){
					var _temp = this.eventDragChildren[(this.eventChildren[i].object.id()+"_obj")] = this.eventChildren[i];
					_temp.clickX = _mx;
					_temp.clickY = _my;
					_temp.pastX = _temp.object.x();
					_temp.pastY = _temp.object.y();
					this.eventChildren[i].callback.call(this.eventChildren[i].object,{eventType:"onStart"});
					return;
				}

			}
		}
		
	};
	_pt._MouseUpHandler = function(p_e){
	
		for(obj in this.eventDragChildren){
			if(this.eventDragChildren[obj].event === "drag"){
				this.eventDragChildren[obj].callback.call(this.eventDragChildren[obj].object,{eventType:"onFinished"});
				delete this.eventDragChildren[obj];
			}
		}
	};
	_pt._MouseMoveHandler = function(p_e){
		
		var _coords = this.canvas().relMouseCoords(p_e), _mx = _coords.x, _my = _coords.y, _scope = this, _X, _Y;
		// =========
		// = hover =
		// =========
		for (var i = this.eventChildren.length - 1; i >= 0; i--){
			if(this.eventChildren[i].event === "hover"){
				
				if(Util.checkPIXEL(this.eventChildren[i].object,_mx, _my)){
					
					this.eventChildren[i].callback.call(this.eventChildren[i].object);
					
				}
			}
	
			
		}
		// ========
		// = drag =
		// ========
		for(obj in this.eventDragChildren){
			if(this.eventDragChildren[obj].event === "drag"){
				var _obj = this.eventDragChildren[obj];
				_X = _mx - Math.abs(_obj.pastX - _obj.clickX);
				_Y = _my - Math.abs(_obj.pastY - _obj.clickY);

				_obj.object.x(_X);
				_obj.object.y(_Y);
				
				this.eventDragChildren[obj].callback.call(_obj.object,{eventType:"onUpdate"});
				_obj.clickX = _mx;
				_obj.clickY = _my;
				_obj.pastX = _obj.object.x();
				_obj.pastY = _obj.object.y();
			}
		}
	};

	
	
	window.CanvasInteract = CanvasInteract;
	
}(window));

