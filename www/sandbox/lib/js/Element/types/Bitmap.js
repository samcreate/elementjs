(function(window) {
	
	/**
	* //Bitmap class loads jpg/png/gif as a Bitmap Object on the canvas 
	* @class Bitmap
	* @extends Graphics
	* @constructor
	* @example
	*/



    
	Bitmap = function() {
		
		EventTarget.call(this);
		
		this.extend(this, new Events());
		this.extend(this, new Animate());
		this.transform;
		this._lastDrawState = "";
		
	};

	var _pt = Bitmap.prototype = new Graphics();
	
	_pt.constructor = Bitmap;
	
	_pt.init = function(p_context){
		this._context = p_context;
		this.transform = new Transform(this._context);
		this.dirty(false);
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

		 if(this.mask()){
			this.mask()._make(this.transform.context);
		
		}
		this.transform.context.drawImage(_to_draw,0,0);

		this._lastDrawState = _to_draw;
	
		this.transform.restore();

		this.dirty(false);
		
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

		this._dataurl_canvas = this._dataurl_canvas || Util.createContext("dataurl_"+this.id(),this.scene().canvas());
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

				if(_this.visible() == false){
					_this.dirty(false);
				}else{
					_this.dirty(true,"_loadsrc");
				}
				_this.bind('draw',_this.draw,_this);
				_this.ready(true);
				_this.fire("loaded");
				
				
			};
			
		})(this,p_path);
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