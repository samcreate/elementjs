(function (window) {

    /**
     * //Scene class helps draw a Scene
     * @class Scene
     * @constructor
     */

    Scene = function (p_def) {

        EventTarget.call(this);
        this._children = [];
        this._children_id = 0;
        this._tweens = {};
        this.def = p_def;
        this.canvas_support = true;
        this.engine = new FrameTicker();

        this.defaults = {
            canvas: 'element-root',
            framerate: 40,
            width: 1024,
            height: 768,
            engine_use: true
        };
        
        this.extend(this, new CanvasInteract());
        this.extend(this.defaults, p_def);
        this.engine_use = this.defaults.engine_use;
        this.canvas(p_def.canvas);
        this._domLoaded(this.init);


    };



    var _pt = Scene.prototype = new EventTarget();

    _pt.constructor = Scene;


    _pt.init = function (p) {

        if(this.canvas_support === true ){

        	if(this.useEngine() === true ) this.engine.start( this.framerate() ).bind("tick",this.childrenDraw,this);
        	var _scope = this;
        	
        	if(typeof this.def.onReady === "function") this.def.onReady.call(this);

        	this.mouseInit();
        
        }


  		

    };

    _pt.canvas = function (p_val) {

    	if(p_val != null){
    		this._canvas = document.getElementById(p_val);
			this._canvas.width = this._canvas.getAttribute("width") || this.defaults.width;
			this._canvas.height = this._canvas.getAttribute("height") || this.defaults.height;

			if (!this._canvas||!this._canvas.getContext) {
				this.canvas_support = false;
				if(typeof this.def.onError === "function") this.def.onError.call(this);
				return this;
			}

			this.context( this._canvas.getContext("2d") );
			this.context().translate(0,0);

			return this;
		}else{
			return this._canvas;
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

    _pt.framerate = function (p_val) {
    	if(p_val != null){
			this._framerate = this.canvas().getAttribute('framerate') || p_val;
			return this;
		}else{
			return this._framerate || this.defaults.framerate;
		}
    };

    _pt.useEngine = function (p_val) {
    	if(p_val != null){
			this.engine_use = p_val;
			return this;
		}else{
			return this.engine_use;
		}
    };


    _pt.width = function (p_val) {

    	if(p_val != null){
			this._width = p_val;
			return this;
		}else{
			return this._width || this.defaults.width;
		}
    };

    _pt.height = function (p_val) {

    	if(p_val != null){
			this._height = p_val;
			return this;
		}else{
			return this._height || this.defaults.height;
		}
    };

    _pt.add = function (p_element) {


    	if(typeof p_element != 'undefined'){

	    	p_element.id(this._children_id+"_id");
			p_element.index(this._children_id);
			p_element._tweenie = new Tweenie();
			p_element.scene(this);
			p_element.check_eventQueue();
			this.children().push(p_element);
			this._children_id++;

	    	if(typeof p_element.init === "function") p_element.init(this.context());

	    	p_element.dirty(true);
    	}
    	return this;


    };

    _pt.children = function () {
    	return this._children;
    };

    _pt.remove = function (p_val) {


    };

    _pt.onReady = function (p_val) {
    	if(p_val != null){
			this._onReady = this.def.onReady;
			return this;
		}else{
			return this.def.onReady;
		}
    };

    _pt.onError = function (p_val) {

    	return this;
    };




    // =====================
    // = private functions =
    // =====================

    _pt.childrenDraw = function(p_force){


		this.fire('tick');
		if(this.canvas().width !== this.width()){
			this.canvas().width = this.width();
			this.canvas().height = this.height();
		}

		// console.assert(this._isDirty() !== true && p_force != true);

		if(this._isDirty() !== true && p_force != true) {
			
			return;

		}
		

		this.fire("draw");

		this.context().clearRect(0, 0, this._canvas.width, this._canvas.height);
		

		for (var i=0; i < this.children().length; i++) {

			if(this.children()[i].visible()){

				this.children()[i].fire("draw");
				
				
			}else{
				this.children()[i].dirty(false);
			}
			
		}

		
	};

	_pt._isDirty = function(){

		var _dirty = false;
		for (var i=0; i < this.children().length; i++) {


			if(this.children()[i].dirty() === true){
				 
				_dirty = true;
			}
			
		}

		return _dirty;
	};


	_pt._domLoaded = function (callback) {

		var _scope = this;


		if (document.readyState == "complete" 
		     || document.readyState == "loaded" 
		     || document.readyState == "interactive") {
		    callback.call(_scope);
		}

	    if (window.addEventListener) {
			window.document.addEventListener('DOMContentLoaded', function () { 
			
				callback.call(_scope);
				

				 }, false);
		} else {
			// for IE
			// code taken from http://ajaxian.com/archives/iecontentloaded-yet-another-domcontentloaded
			(function(){
				// check IE's proprietary DOM members
				if (!window.document.uniqueID && window.document.expando)
					return;

				// you can create any tagName, even customTag like <document :ready />
				var tempNode = window.document.createElement('document:ready');

				try {
					// see if it throws errors until after ondocumentready
					tempNode.doScroll('left');

					// call ready
					callback.call(_scope);
				} catch (err) {
					setTimeout(arguments.callee, 0);
				}
			})();
		}

		return this;
	};





    _pt.name = "Scene Instance";

    window.Scene = Scene;

}(window));