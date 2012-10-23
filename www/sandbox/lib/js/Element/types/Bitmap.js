(function(window) {
	
	/**
	* //Bitmap class loads jpg/png/gif as a Bitmap Object on the canvas 
	* @class Bitmap
	* @extends DisplayObject
	* @constructor
	* @example
	*/



    
	Bitmap = function(p_context) {
		
		EventTarget.call(this);
		this._context = p_context;
		this.extend(this, new Events());
		this.extend(this, new Animate());
		this.transform = new Transform(this._context);
		this._lastDrawState = "";
		
	};

	var _pt = Bitmap.prototype = new DisplayObject();
	
	_pt.constructor = Bitmap;
	
	_pt.init = function(){
		this.x(0);
		this.y(0);
	};


	/** @memberOf Bitmap#
	* @name src
    * @function
	* @param {String} path - Path to image (png,gif,jpg).
    * @description 
    // src allows for one string parameter that points to
	// the path of an image returns a Bitmap object.
	* @public 
	* @example 
   	*var _img1 = new Element("Bitmap",{
	*		src:"path/to/image.jpg"
	*});
    */
	_pt.src = function(p_val){
		if(p_val){
			this._src = p_val;
			this._loadsrc(this._src);
			return this;
		}else{
			return this._src;
		}
	};
	
	_pt.draw = function(){
		
		var _to_draw, _w = (this.width()/this.orig_width), _h = (this.height()/this.orig_height);
		
		this._transform_reset();

		this.fire("beginDraw");

		if(this.trace()){
			_to_draw = this._handle_trace(_w,_h, this._src, "initial");
		}else{
			_to_draw = this._handle_basic(_w,_h);
		}
	
		_to_draw = this._handle_filters(_to_draw);

		this.transform.context.drawImage(_to_draw,0,0);
		
		this._lastDrawState = _to_draw;
	
		
		this.transform.restore();
		
		this.fire("finishDraw");
		
		return this;
	};

	/** @memberOf Bitmap#
	* @name toDataURL
    * @function
	* @param {String} [area] - 'all'= all elements
    * @description 
    // toDataURL pulls the image data in a dataURL format. This function allows for 
    // one optional string parameter. If you pass in "all", all of the image data
    // is returned for the entire canvas, if left blank, just that objects data is 
    // returned.
	* @public 
	* @example 
	// this example will return dataURL for just that single object
	*
   	*var _img_data = new Element("Bitmap",{
	*		src:"path/to/image.jpg"
	*}).toDataURL();
	*
	//this example will return all image data on the "main" canvas element
	*
   	*var _img_data = new Element("Bitmap",{
	*		src:"path/to/image.jpg"
	*}).toDataURL("all");
    */
	_pt.toDataURL = function(p_area){

		this._dataurl_canvas = this._dataurl_canvas || Util.createContext("dataurl_"+this.id());
		this._dataurl_transform = this._dataurl_transform || new Transform(this._dataurl_canvas.context);
		if(!p_area){
			this._dataurl_canvas.canvas.width = this.width();
			this._dataurl_canvas.canvas.height = this.height();
		}
		this._dataurl_transform.save();
		this._dataurl_transform.setMatrix([1, 0, 0, 1, 0, 0]);
		this._dataurl_canvas.context.clearRect(0, 0, this._dataurl_canvas.canvas.width, this._dataurl_canvas.canvas.height );
		this._dataurl_transform.translate(this.x(),this.y());
		var _w = (this.width()/this.orig_width),
		_h = (this.height()/this.orig_height),
		_m2 = this._dataurl_transform.getMatrix();
		
		if(p_area != null){
			this._dataurl_canvas.context.drawImage(window.$$_canvas.canvas(),0,0);
		}else{
			this._dataurl_transform.rotate(this.rotate());
			this._dataurl_transform.scale((this.width()/this.orig_width)*this.scale(),(this.height()/this.orig_height)*this.scale());
			this._dataurl_transform.context.globalAlpha = this.alpha();
			this._applyShadow(this._dataurl_transform.context);
			this._dataurl_canvas.context.drawImage(this._lastDrawState,0,0);
		}
		
		return this._dataurl_canvas.canvas.toDataURL();
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
		this._mouse_canvas.context.drawImage(this._src,0,0);
		return this._mouse_canvas.context;
	};

	_pt.trace = function(p_val){
		
		if(p_val === false) this._cleartrace();
		
		if(p_val != null){
			this._trace = p_val;
			return this;
		}else{
			return this._trace ||  false;
		}
		
	};

	// =====================
	// = private functions =
	// =====================
	
	_pt._loadsrc = function(p_path){
		
		(function(_this,_path){
			var _img = new Image();
			_img.src = _path;
			
			_img.onload = function() {
				
				_this.orig_width = _img.width;
				_this.orig_height = _img.height;
				_this.width( _this.width() ||  _img.width);
				_this.height( _this.height() || _img.height );
				_this._src = _img;
				_this.bind('draw',_this.draw,_this);
				_this.ready(true);
				_this.draw();
				_this.fire("loaded");
				
			};
			
		})(this,p_path);
	};
	
	_pt._handle_filters = function(p_disp_data){
		var _to_draw;
		if(this.filter() && !this.filter_cache){
			// if filter is present and there's no cached filter, let's create one.
			if(this._filter_canvas) Util.removeElement(this._filter_canvas.canvas.id);
			this._filter_canvas = this._filter_canvas || Util.createContext("filter_"+this.id());
			this._filter_canvas.canvas.width = this.orig_width;
			this._filter_canvas.canvas.height = this.orig_height;
			if(this.trace()){
				this._filter_canvas.context.drawImage(p_disp_data,-this.x(),-this.y());
			}else{
				this._filter_canvas.context.drawImage(p_disp_data,0,0);
			}
			
			for(var key in  this.filter()){
				
				_to_draw = Filter.get(this._filter_canvas,this.filter()[key],this);
				this.filter_cache = _to_draw;
			}
			//
		}else if(this.filter_cache){
			//if filter cahce is present let's use it
			_to_draw = this.filter_cache;
			
		}else{
			//if filter isn't on, let's set the variable to parameter passed in
			_to_draw =  p_disp_data;
		}
		
		//if trace is on, let's create a trace canvas for the filter.
		if(this.trace() && this.filter()){
			_to_draw = this._handle_trace(1,1, _to_draw, "filter");
		}
		
		return _to_draw;
	};
	
	_pt._handle_trace = function(p_w, p_h, p_src, p_key){
		//traceing the animation
		var _trace_canvas = this["trace_"+this.id()+"_"+p_key] || Util.createContext("trace_"+this.id()+"_"+p_key);
		this["trace_"+this.id()+"_"+p_key] = _trace_canvas;
		var _trace_transform = this["trace_transfrom_"+this.id()+"_"+p_key] || new Transform(_trace_canvas.context);
		this["trace_transfrom_"+this.id()+"_"+p_key] = _trace_transform;
		_trace_transform.save();
		_trace_transform.setMatrix([1, 0, 0, 1, 0, 0]);
		_trace_transform.translate(this.x(),this.y());
		_trace_transform.rotate(this.rotate());
		_trace_transform.scale(p_w*this.scale(),p_h*this.scale());
		_trace_transform.context.globalAlpha = this.alpha();
		this._applyStroke(_trace_canvas.context,{x:0,y:0,w:this.orig_width,h:this.orig_height});
		this._applyShadow(_trace_transform.context);
		_trace_canvas.context.drawImage(p_src,0,0);
		return _trace_canvas.canvas;
	};
	
	_pt._handle_basic = function(p_w, p_h){
		
		//non tracing animation
		this.transform.context.globalAlpha = this.alpha();
		this._applyStroke(this.transform.context,{x:this.x(),y:this.y(),w:this.width(),h:this.height()});
		this.transform.translate(this.x(),this.y());
		this.transform.rotate(this.rotate());
		this.transform.scale(p_w*this.scale(),p_h*this.scale());
		
		this._applyShadow(this.transform.context);
		return this._src;
	};
	
	
	_pt.name = "Bitmap Instance";
	
	window.Bitmap = Bitmap;



	 /**
	* @memberOf Bitmap#
	* @name on
    * @function
	* @param {String} event_name - Name of the event.
	* @param {Function} call_back - Callback function that will be triggered for the event.
    * @description 
    // on allows you to bind to an event (e.g drag, click, etc...) and specify a 
    // callback function.
	* @public 
	* @example 
   	*var _img1 = new Element("Bitmap",{
	*
	*		src:"path/to/image.jpg",
	*
	*}).on('click',_click_handler);
	*
	*
	*function _click_handler (p_e) {
    *	console.log('event is being triggered', p_e);
    *}
    */
	
}(window));