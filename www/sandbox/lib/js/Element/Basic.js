(function(window) {
/**
	* Basic is the base class for almost every object in Element.js.
	* @class Basic
	* @constructor
	* @example var _basicObj = new Basic();
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

	/**
	* @memberOf Basic#
	* @name extend
    * @function
	* @param {Object} value - Object getting extended.
	* @param {Object} value - Inherited Object.
    * @description 
    // extend allows you to take all the properties for one object and
    // apply them to another.
	* @public 
	* @example 
	// In this example, we inherit the x value of obj2.
	*var _obj2 = {x:33};
   	*var _my_element.extend(_my_element,_obj2);
	*console.log(_my_element.x); //returns 33;
    */
	_pt.extend = function(p_el, p_opt){
		for(var name in p_opt) {
			p_el[name] = p_opt[name];
		}
		return p_el;
	};
	
	_pt.destroy = function(){
		for (var i = 0; i < $$_CHILDREN.length; i++) {
			if($$_CHILDREN[i].id() === this.id()){
				// debug.log("Destroyed!: ", this.id());
				var _obj = $$_CHILDREN.splice(i,1);
				_obj = null;
			}
		}
		
	};

	_pt.dirty = function(p_val, p_by){
		
		if(p_val != null){
			// debug.log(p_val);
			 // if(p_by != null && p_val === true) debug.log(this.id(),"dirty by: "+p_by);
			 // if(p_val === false) debug.log(this.id()+" SET CLEAN");
			this._dirty = p_val;
			return this;
		}else{
			return this._dirty;
		}
	};
	_pt.top = function(){
		var _i = Util.getIndex(this);
		var _childtotop = $$_CHILDREN.splice(_i,1);
		$$_CHILDREN.push(_childtotop[0]);
		this.dirty(true, "top");
		return this;
	};
	
	_pt.bottom = function(){
		var _i = Util.getIndex(this);
		var _childtotop = $$_CHILDREN.splice(_i,1);
		$$_CHILDREN.unshift(_childtotop[0]);
		this.dirty(true, "bottom");
		return this;
	};

	_pt.visible = function(p_val){
		if(p_val != null){
			this._visible = p_val;
			this.dirty(true, "visible");
			return this;
		}else{
			return this._visible;
		}
	};
	
	
	_pt.id = function(p_val){
		if(p_val){
			this._id = p_val;
			return this;
		}else{
			return this._id ;
		}
	};

	_pt.index = function(p_val){
		if(p_val != null){
			this._index = p_val;
			return this;
		}else{
			return this._index;
		}
	};
	_pt.ready = function(p_val){
		if(p_val){
			this._ready = p_val;
			return this;
		}else{
			return this._ready || false;
		}
	};


	// =====================
	// = private functions =
	// =====================

	
	
	
	window.Basic = Basic;
	
}(window));