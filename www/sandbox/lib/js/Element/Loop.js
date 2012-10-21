(function(window) {
	

	Loop = function(p_function,p_scope) {
		
		$$_canvas.bind('draw',p_function,p_scope || window);
		EventTarget.call(this);
		
	}


	var _pt = Loop.prototype = new EventTarget();
	
	_pt.constructor = Loop;

	// ====================
	// = Getter / Setters =
	// ====================

	
	// ====================
	// = public functions =
	// ====================
	
	
	

	// =====================
	// = private functions =
	// =====================
	

	
	window.Loop = Loop;
	
}(window));