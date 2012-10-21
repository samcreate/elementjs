(function(window) {
/**
	* Basic is the base class for almost every object in Element.js.
	* @class BaseObject
	* @constructor
	* @example var _displayObject = new BaseObject();
	**/	

	Basic = function() {
		
	
	};

	var _pt = Basic.prototype;
	
	_pt.constructor = Basic;

	// ====================
	// = Getter / Setters =
	// ====================

	// ====================
	// = public functions =
	// ====================
	_pt.extend = function(p_el, p_opt){
		for(var name in p_opt) {
			p_el[name] = p_opt[name];
		}
		return p_el;
	};
	
	
	// =====================
	// = private functions =
	// =====================
	
	
	window.Basic = Basic;
	
}(window));