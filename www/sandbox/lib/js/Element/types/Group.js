(function(window) {
	
	/**
	* //Group class helps draw a Group
	* @class Group
	* @extends DisplayObject
	* @constructor
	*/
	
	Group = function() {

		EventTarget.call(this);

		this.group_scene;
		this._add_queue = [];
		
		this.extend(this, new Events());
		this.extend(this, new Animate());
		
		
	};

	var _pt = Group.prototype = new Graphics();
	
	_pt.constructor = Group;
	
	_pt.init = function(p_context){

		this._htmlcanvas = Util.createContext("Group_"+this.id(),this.scene().canvas());
		
		this.group_scene = new Element('Scene', {
		    canvas: this._htmlcanvas.canvas.getAttribute("id"),
		    framerate: this.scene().framerate(),
		    width:  this.scene().width(),
		    height:  this.scene().height()
		});
		this.width(this.scene().width()).height(this.scene().height());

		this.orig_width = this.width();
		this.orig_height = this.height();

		this._context = p_context;
		this.transform = new Transform(this._context);
		this.ready(true);
		this.bind('draw',this.draw,this);
		this._check_addQueue();
		
	};

	_pt.add = function(p_element){

		if(typeof this.group_scene != 'undefined'){

			this._add_to_group(p_element);

		}else{

			this._add_queue.push(p_element);
		}

		return this;
	};


	_pt.draw = function(){

		
		var _to_draw, _w = (this.width()/this.orig_width), _h = (this.height()/this.orig_height);
		
		this._transform_reset();

		this.fire("beginDraw");

		var _img = new Image();

		_img.src = this.group_scene.canvas().toDataURL();

		this._src = _img;

		if(this.trace()){
			_to_draw = this._handle_trace(_w,_h, _img, "initial");
		}else{
			_to_draw = this._handle_basic(_w,_h);
			
		}

		
		
		 _to_draw = this._handle_filters(_to_draw);

		 if(this.mask()){
			this.transform.restore();
			 _to_draw = this._handle_mask(_to_draw);
		
		}
		this.transform.context.drawImage(_to_draw,0,0);
		this._lastDrawState = _to_draw;
	
		this.transform.restore();

		this.dirty(false);
		
		this.fire("finishDraw");


		
		return this;
	};
	// =====================
	// = private functions =
	// =====================

	_pt._check_addQueue = function(){

		for (var i = 0; i < this._add_queue.length; i++) {
			this._add_to_group(this._add_queue[i]);

		}

	};

	_pt._add_to_group = function(p_element){

		p_element.bind('finishDraw', this._children_dirty,this);

		this.group_scene.add(p_element);
	};

	_pt._children_dirty = function(){

		this.scene().childrenDraw(true);
	}

	
	_pt.name = "Group Instance";
	
	window.Group = Group;
	
}(window));

