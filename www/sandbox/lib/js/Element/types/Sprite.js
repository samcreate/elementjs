
(function(window) {




	Sprite = function(p_context) {

		EventTarget.call(this);
		this._context = p_context;
		this.extend(this, new Events());
		this.extend(this, new Animate());
		this.transform = new Transform(this._context);
		this.iterate = 0;
		this._sequences = {};
		this._curSequence = null;
		this._stopindex = null;
	};

	var _pt = Sprite.prototype = new Bitmap();

	_pt.constructor = Sprite;

	_pt.src = function(p_sprite, p_frames) {
		if (p_sprite && p_frames) {
			Util.getJSON(p_frames, function(p_response) {
				this._src = p_sprite;

				this.frames = p_response.frames;
				this._curSequence = {
					start: 0,
					end: this.frames.length
				};
				this._loadsrc(this._src);
			}, this);
			return this;
		} else {
			return this._src;
		}
	};


	_pt.draw = function(p_scope) {


		
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
		this.transform.restore();
		this._lastDrawState = _to_draw;
		this.fire("finishDraw");

		return this;
	};
	
	


	_pt._handle_sprite = function(p_src) {
		var _to_draw, _w, _h, _x, _y, _ctx, _cvs;
		this._sprite_canvas = this._sprite_canvas || Util.createContext("sprite_" + this.id());
		if (this.iterate < this._curSequence.end - 1) {
			if (this.gotoAndStop() !== null) {
				this.iterate = this.gotoAndStop();
			} else {
				this.iterate++;
				//debug.log("iterating")
			}

		} else {
			//debug.log("getting here",this.iterate,this._curSequence.end -1)
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

			return this;
		} else {
			return this._stopindex;
		}
		return this;
	};

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
		return this;
	};



	_pt.name = "Sprite Instance";

	window.Sprite = Sprite;

}(window));
