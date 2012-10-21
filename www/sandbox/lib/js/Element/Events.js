(function(window) {
	

	Events = function(p_canvas) {
		window.$$_EVENTS_CHILDREN = window.$$_EVENTS_CHILDREN || [];
		window.$$_EVENTS_DRAG_CHILDREN = window.$$_EVENTS_DRAG_CHILDREN || [];
	}


	var _pt = Events.prototype;
	
	_pt.constructor = Events;

	// ====================
	// = Getter / Setters =
	// ====================

	
	// ====================
	// = public functions =
	// ====================
	_pt.on = function(p_event,p_callback){
		
		$$_EVENTS_CHILDREN.push({object:this,event:p_event,callback:p_callback});
		return this;
	}
	
	

	// =====================
	// = private functions =
	// =====================
	

	
	window.Events = Events;
	
}(window));