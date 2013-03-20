(function(window) {
	
	/**
	* //Text class helps draw a Text
	*
	* //Example: 
	* var _text = new Element('Text'{
	* 	src:'This is a test'
	* }).font('Impact, Charcoal, sans-serif');
	* @class Text
	* @extends DisplayObject
	* @constructor
	*/
	
	Text = function(p_context) {
		
		EventTarget.call(this);
		this._context = p_context;
		this.extend(this, new Events());
		this.extend(this, new Animate());
		this.transform = new Transform(this._context);
		this.ctx = this.transform.context;

		this.defaults = {
			font: 'Calibri',
			color: "#000000",
			size: "20px",
			fontWeight: 'normal',
			textAlign: 'left',
			textBaseline: 'top'
		};
		
	};

	var _pt = Text.prototype = new DisplayObject();
	
	_pt.constructor = Text;
	
	_pt.init = function(){
		this.x(0);
		this.y(0);
		this.ready(true);

		this.bind('draw',this.draw,this);
	};

	_pt.draw = function(p_val){
		
	
		// debug.log(this.id());
		this._transform_reset();
		this.fire("beginDraw");
		this.transform.translate(this.x(),this.y());
		this.transform.rotate(this.rotate());
		this.transform.scale(1*this.scale(),1*this.scale());
		this._applyShadow(this.ctx);
		this.ctx.font   =  this.fontWeight()+' '+this.size()+' '+this.font();
		this.ctx.fillStyle   = this.color();
		this.ctx.globalAlpha = this.alpha();
		this.ctx.textBaseline = this.textBaseline();
		this.ctx.textAlign = this.textAlign();
		this.ctx.fillText(this.src(), 0,0);
		

		this.transform.restore();
		this.dirty(false);
		this.fire("finishDraw");

		return this;
	};

	/** @memberOf Text#
	* @name src
    * @function
	* @param {String} txt - String to display
    * @description 
    // src allows for one string parameter that is used for the display
	* @public 
	* @example 
   	*var _img1 = new Element("Text").src('Poop');
    */
	_pt.src = function(p_val){
		// TODO: fix measure text
		if(p_val != null){
			this._txt = p_val;
			// this._measureText(this._txt);
			this.dirty(true, arguments.callee.name);
			return this;
		}else{
			return this._txt;
		}
	};
	_pt.style = function(p_val){
		if(p_val != null){
			this._style = p_val;

			var _args = [], _f;
			for (var prop in this._style) {
				var _val = this._style[prop];
					
				if(_val) this[prop](_val);
				
			}

			return this;
		}else{
			return {textBaseline : this.textBaseline(), font : this.font(), color : this.color(), size : this.size(), fontWeight : this.fontWeight(), textAlign : this.textAlign(), textBaseline : this.textBaseline() };
		}
	};
	
	_pt.font = function(p_val){
		if(p_val != null){
			this._font = p_val;
			this.dirty(true, arguments.callee.name);
			return this;
		}else{
			return this._font || this.defaults.font;
		}
	};
	_pt.color = function(p_val){
		if(p_val != null){
			this._color = p_val;
			this.dirty(true, arguments.callee.name);
			return this;
		}else{
			return this._color || this.defaults.color;
		}
	};
	_pt.size = function(p_val){
		if(p_val != null){
			this._size = p_val;
			this.dirty(true, arguments.callee.name);
			return this;
		}else{
			return this._size || this.defaults.size;
		}
	};
	_pt.fontWeight = function(p_val){
		if(p_val != null){
			this._fontWeight = p_val;
			this.dirty(true, arguments.callee.name);
			return this;
		}else{
			return this._fontWeight || this.defaults.fontWeight;
		}
	};
	_pt.textAlign = function(p_val){
		if(p_val != null){
			this._textAlign = p_val;
			this.dirty(true, arguments.callee.name);
			return this;
		}else{
			return this._textAlign || this.defaults.textAlign;
		}
	};
	_pt.textBaseline = function(p_val){
		if(p_val != null){
			this._textBaseline = p_val;
			this.dirty(true, arguments.callee.name);
			return this;
		}else{
			return this._textBaseline || this.defaults.textBaseline;
		}
	};

	// var _text = new Element("Text").src("This is Aaron's text;").style({
	// 	font: 'Calibri',
	// 	color: "#ff0000",
	// 	size: "30px",
	// 	fontWeight: 'bold',
	// 	textAlign: 'center',
	// 	textBaseline: 'middle'
	// });
	// =====================
	// = private functions =
	// =====================
	_pt.measureText = function(p_text){
		var _scope = this;
		(function(){
			if(!_scope._stage){
				
				setTimeout(arguments.callee, 0);
				return;
			}
			
			var ctx = _scope._stage.context;
			ctx.save();
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.translate(_scope.x, _scope.y);
			ctx.setTransform(_scope._matrix.a,  _scope._matrix.b, _scope._matrix.c, _scope._matrix.d, _scope._matrix.tx, _scope._matrix.ty);	
			ctx.fillStyle  = _scope.color;
			ctx.font = _scope.style +' '+_scope.fontSize+'px '+_scope.font;
			ctx.textBaseline = _scope.textBaseline;
			ctx.fillText(_scope.text, 0, 0);
			_scope.original_W = _scope._stage.context.measureText(p_text).width;
			_scope.original_H = _scope._stage.context.measureText('M').width;
			_scope.width = _scope._stage.context.measureText(p_text).width;
			_scope.height = _scope._stage.context.measureText('M').width;
			ctx.restore();
			_scope.ready = true;
			
		}());


		this._textmeasure_canvas = this._textmeasure_canvas || Util.createContext("_textmeasure"+this.id());
		this._textmeasure_transform = this._textmeasure_transform || new Transform(this._textmeasure_canvas.context);
		this._textmeasure_transform.save();
		this._textmeasure_transform.setMatrix([1, 0, 0, 1, 0, 0]);
		this._textmeasure_transform.translate(this.x(),this.y());
		var _w = (this.width()/this.orig_width),
		_h = (this.height()/this.orig_height),
		_m2 = this._textmeasure_transform.getMatrix();
		this._textmeasure_transform.rotate(this.rotate());
		this._textmeasure_transform.scale((this.width()/this.orig_width)*this.scale(),(this.height()/this.orig_height)*this.scale());

		this._textmeasure_canvas.context.fillStyle  = this.color;
		this._textmeasure_canvas.context.font = this.style() +' '+this.fontSize()+'px '+this.font();
		this._textmeasure_canvas.context.textBaseline = this.textBaseline;
		this._textmeasure_canvas.context.fillText(this.text(), 0, 0);
		return this._textmeasure_canvas.context;
				
	};
	
	_pt.name = "Text Instance";
	
	window.Text = Text;
	
}(window));

