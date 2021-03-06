
(function(window) {


	/**
	* //Sprite class helps draw a Sprite
	* @class Sprite
	* @extends Bitmap
	* @constructor
	*/

	Sprite = function() {

		EventTarget.call(this);
		
		this.extend(this, new Events());
		this.extend(this, new Animate());
		
		
		this.iterate = 0;
		this._sequences = {};
		this._curSequence = null;
		this._stopindex = null;
		this._lastDrawState = "";

		this.defaults = {
			frameDef : {x:0,y:0,w:0,h:0}
		}
	};

	var _pt = Sprite.prototype = new Bitmap();

	_pt.constructor = Sprite;

	/** @memberOf Sprite#
	* @name src
    * @function
	* @param {String} pathToSprite - Path to image Sprite (texturepacker.com).
	* @param {String} pathToJSON - Path to JSON Array (texturepacker.com).
    * @description 
    // src allows for two parameters that points to first the sprite
    // and the second, to the json array created by texturepacker.com
	* @public 
	* @example 
   	*var sprite = new Element("Sprite", {
	*	src : "zelda.png, zelda.json"
	*});
    */
	_pt.src = function(p_sprite, p_frames) {
		if (p_sprite && p_frames) {
			Util.getJSON(p_frames, function(p_response) {
				this._src = p_sprite;

				this.frames = p_response.frames;
				this._curSequence = {
					start: 0,
					end: this.frames.length
				};
				//set the frames definition accessible
				this.getFrameInfo(this.frames[this.iterate].frame);
				this._loadsrc(this._src);

			}, this);
			return this;
		} else {
			return this._src;
		}
	};


	_pt.draw = function(p_scope) {

		if(!this.ready()) return;
		
		var _to_draw, _w = (this.width() / this.orig_width), _h = (this.height() / this.orig_height);

		this._transform_reset();
		
		this.fire("beginDraw");

		_to_draw = this._handle_sprite(this._src);


		if (this.trace()) {
			_to_draw = this._handle_trace(_w,_h,  _to_draw, "initial");
		} else {
			this._handle_basic(_w, _h);
		}
		this.resetFilter();
		_to_draw = this._handle_filters(_to_draw);

		this.transform.context.drawImage(_to_draw, 0, 0);
	
		this._lastDrawState = _to_draw;

		this.transform.restore();
		this.fire("finishDraw");

		return this;
	};
	
	


	_pt._handle_sprite = function(p_src) {
		var _to_draw, _w, _h, _x, _y, _ctx, _cvs;
		this._sprite_canvas = this._sprite_canvas || Util.createContext("sprite_" + this.id(),this.scene().canvas());
		if (this.iterate <= this._curSequence.end - 1) {
			if (this.gotoAndStop() !== null) {
				this.iterate = this.gotoAndStop();

			} else if(this.iterate != this._curSequence.end -1) {
				this.iterate++;
			}

		}


		
		_w = this.frames[this.iterate].frame.w + this.padding();
		_h = this.frames[this.iterate].frame.h + this.padding();
		_x = this.frames[this.iterate].frame.x;
		_y = this.frames[this.iterate].frame.y;



		_ctx = this._sprite_canvas.context;
		_cvs = this._sprite_canvas.canvas;
		_cvs.width = _w;
		_cvs.height = _h;

		if (!this._src_sprite) {
			this._src_sprite = this._src;
			this._src = _cvs;
		}

		_ctx.clearRect(0, 0, _cvs.width, _cvs.height);

		_to_draw = _ctx.drawImage(this._src_sprite, -_x, -_y);

		if (this.iterate === this._curSequence.end - 1 && this.loop()) {
			this.iterate = this._curSequence.start;

		}

		if (this.iterate === this._curSequence.end -1){
			this.fire("spriteFinished");
		}

		return _cvs;
	};

	_pt.loop = function(p_val) {
		if (p_val != null) {
			this._loop = p_val;
			return this;
		} else {
			return this._loop || false;
		}
	};

	_pt.padding = function(p_val) {
		if (p_val != null) {
			this._padding = p_val;
			return this;
		} else {
			return this._padding || 0;
		}
	};

	_pt.gotoAndStop = function(p_val) {

		if (p_val != null) {
			if (typeof p_val === "string") {
				this._stopindex = this._sequences[p_val].end;

			} else {
				this._curSequenceName = "";
				this._stopindex = p_val;
				
			}

			try{ this.scene().childrenDraw(true); }catch(e){ }

			

			return this;
		} else {
			return this._stopindex;
		}

	};

	_pt.gotoAndPlay = function(p_val) {
		if (p_val != null) {
			if (typeof p_val === "string") {
				this.run(p_val);
			} else {
				this.iterate = p_val;
			}
			this._stopindex = null;
			try{ this.scene().childrenDraw(true); }catch(e){ }

			return this;
		} else {
			return this._stopindex;
		}
		return this;
	};

	_pt.nextFrame = function(){
		if(this.iterate != this.frames.length -1){
			// debug.log("nextFrame called", this.iterate, this.frames.length-1);
			this.gotoAndStop(this.iterate + 1);
			
		}
		return this;
	}
	_pt.prevFrame = function(){
		if(this.iterate >= 1){
			var _frame = this.iterate - 1;
			// debug.log("prevFrame called",_frame);
			this._stopindex = null;
			this.gotoAndStop(_frame);

			
		}
		return this;
	}

	_pt.sequence = function(p_name, p_start, p_end) {
		this._sequences[p_name] = {
			start: p_start,
			end: p_end
		};
		return this;
	};

	_pt.run = function(p_name, p_loop) {

		if (this._curSequenceName != p_name) {

			var _seq = this._sequences[p_name];
			
			_seq.start = parseFloat(_seq.start);
			_seq.end = parseFloat(_seq.end);
			this._curSequence = _seq;
			this._stopindex = null;
			if (this._curSequence.start != this._sequences[p_name].start || this._curSequence.start === 0) {

				this.iterate = _seq.start;
				this._curSequenceName = p_name;

			}

			
			if (p_loop === true) this.loop(true);
		}
		try{ this.scene().childrenDraw(true); }catch(e){ }
		return this;
	};

	_pt.getFrameInfo = function(p_val){
		if(p_val){
			this._frameDef = p_val;
			this.dirty(true,"getFrameInfo");
			return this;
		}else{
			return this._frameDef || this.defaults.frameDef;
		}
	};



	_pt.name = "Sprite Instance";

	window.Sprite = Sprite;

}(window));
