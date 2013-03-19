(function(window) {
	
	/**
	* //Graphics class loads jpg/png/gif as a Graphics Object on the canvas 
	* @class Graphics
	* @extends DisplayObject
	* @constructor
	* @example
	*/

    
	Graphics = function() {
		
		
	};

	var _pt = Graphics.prototype = new DisplayObject();
	
	_pt.constructor = Graphics;

	/**
	* @memberOf Graphics#
	* @name filter
    * @function
	* @param {String} [value] - sets a new filter on the object.
    * @description 
    // filter allows manipulation of an objects pixel data. Filters can be chained
    // infinitly and are cached for performance. The performance of caching the 
    // filtered data isn't applied if you animate the filter's values, since you 
    // have to redraw for each newly applied filters.
    *
    *
	* @public 
	* @example 
	// In this example, we set a filter for the object to have a multiply filter
	// using the red color value in the hex form.
	*
   	*var _my_element.filter("multiply","#ff0000");
	*
	//now, let's 'get' the filter value(s)
	*console.log(_my_element.filter()); //returns all the applied filters for the 
	//current objects pre-built-in filter effects:
	*
	//multiply:
	* my_element.filter("multiply","#ff0000");
	*
	//grayscale:
	* my_element.filter("grayscale");
	*
	//brightness: -1 to 1
	* my_element.filter("brightness",0.2); // 20% brighter 
	*
	//threshold: 0 to 255
	* my_element.filter("threshold", 22);
	*
	//sharpen:
	* my_element.filter("sharpen");
	*
	//emboss:
	* my_element.filter("emboss");
	*
	//woodblock:
	* my_element.filter("woodblock");
	*
	//sobel:
	* my_element.filter("sobel");
	*
	//blur: 0 to 10
	* my_element.filter("blur",5);
	*
	//median: 
	* my_element.filter("median"); //process intensive
	*
	//invert: 
	* my_element.filter("invert"); 
	*
	//circleSmear:  size : {min:1, max:10} density : {min:0.0, max:1.0}, mix : {min:0.0, max:1.0}
	* my_element.filter("circleSmear",{size:5,density:0.5,mix:0.5});
	*
	//diffuse: 0 to 100
	* my_element.filter("diffuse",50); 
	*
	//contrast:  0 to 255
	* my_element.filter("contrast",22); 
	*
	//contrast:  0 to 255
	* my_element.filter("contrast",22); 
	*
	//sepia:
	* my_element.filter("sepia"); 
	*
	//dither: levels : {min:2, max:30}, color : {min:false, max:true}
	* my_element.filter("dither",{levels:10,color:false}); 
	*
	//edge:
	* my_element.filter("edge"); 
	*
	//kaleidoscope: angle : {min: 0, max: 360},rotation : {min: 0, max: 360}, sides : {min: 1, max: 30}, centerX : {min: 0.0, max:1.0}, centerY : {min: 0.0, max:1.0}
	* my_element.filter("kaleidoscope",{angle : 0,rotation : 0,sides : 3,centerX : 0.5,centerY : 0.5}); 
	*
    */
	_pt.filter = function(){
		
		if(arguments != undefined && arguments.length > 0){
			this.resetFilter();
			this._filters = this._filters || [];
			var _temp_filter = {};
			_temp_filter.args = [];
			_temp_filter.effect = arguments[0];
			
			for (var i=1; i < arguments.length; i++) {
				_temp_filter.args.push(arguments[i]);
			}
			this._filters[_temp_filter.effect] = _temp_filter;
			this.dirty(true,"filter");
			return this;
		}else{
			return this._filters;
		}
	};

	/**
	* @memberOf Graphics#
	* @name filterRemove
    * @function
	* @param {String} value - name of the filter, or 'all' to remove all applied filters.
    * @description 
    // removes applied filters by name, or if 'all' is passed in, it removes all 
    // applied filters from the object.
    *
    *
	* @public 
	* @example 
	// In this example, we remove the multiply filter previously applied.
	*
   	*_my_element.filterRemove("multiply"); 
	*
	//In this example, we remove all the applied filters
	*_my_element.filterRemove("all");
	
    */

	_pt.filterRemove = function(p_filter){
		for(var key in  this.filter()){
			if(p_filter === key || p_filter === "all" ){
				
				function _finishDraw(){
					this.resetFilter();
					this.unbind("finishDraw",_finishDraw);
					this.resetFilter();
					delete this.filter()[key];
					if( Util.getSize(this.filter()) === 0 ) this._filters = null;
					this.dirty(true,"filterRemove");
					
				}

				if(p_filter === "all") {
					this._filters = null;
					this.resetFilter();
					this.dirty(true,"filterRemove");
					
				}else{
					this.bind("finishDraw",_finishDraw);
					return this;
				}
				
			}
		}

		return this;
	};
	
	
	_pt.resetFilter = function(){
		this.filter_cache = null;
	};
	

	// =====================
	// = private functions =
	// =====================
	
	
	_pt.name = "Graphics Instance";
	
	window.Graphics = Graphics;
	
}(window));