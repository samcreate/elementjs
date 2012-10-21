

(function(window){
	
	function Tweenie () {
		
		
		var _scope = this;
		
	};
	
	
	function Tween_runner (p_tween, p_home) {
		EventTarget.call(this);
		this.on = true;
		this.tween = p_tween;
		this.id = p_tween.what.id;
		this._home = p_home;
		var _this = this;
		(function() {
			
			
			var obj,elapsed,ease_val,c_time,calculation,obj_delta;
			c_time = Date.now();
			
				obj = p_tween;
				obj.what._animating = true;
				for ( var property in obj.props ) {


					elapsed = (( c_time - obj.start_time ) / obj.duration);
					elapsed = elapsed > 1 ? 1 : elapsed;
					
					ease_val = eval("Easing."+obj.easing+"("+elapsed+")");
					calculation = obj.distance['start_'+property] + obj.distance['delta_'+property] * ease_val;

					if(elapsed != 1) obj.what[property](calculation);

					if(obj.callback && elapsed === 1){
						if(	_this.on == true) {
							obj.callback.call(obj.what);
							_this.fire('finished');
						}
						obj.what._animating = false;
						_this.on = false;
						

					}else if(obj.update){
						//run upd
						var o = {};
						for ( var p in obj.props ) {
							o[p] = obj.what[p];
							
						};
						obj.update.call(obj.what,o);
						
					}else if(elapsed === 1){
						_this.fire('finished');
						_this.on = false;
						obj.what._animating = false;
					}
					
				
				};
		
			//only reignite the timer if object is "on"
			if(_this.on){
				_this.timerID = setTimeout(arguments.callee,  $$_canvas.framerate());
			}else{
				_this.fire('finished');
				obj.what._animating = false;
			}

		})();
	}
	
	var _pt = Tween_runner.prototype = new EventTarget();
	
	var _pt = Tweenie.prototype;
	
	
	_pt._tweens = [];


	
	_pt.to = function(p_what,p_props,p_time,p_easing,p_update,p_callback,p_delay){
	
		//stop if obj already exists.
		var _temp_id = ("id_"+p_what.id());
		if(this._tweens.hasOwnProperty("id_"+p_what.id())){
			this._tweens[_temp_id].on = false;
		}
		
		//setup
		var delta_start = {};
		
		for ( var property in p_props ) {
			delta_start['start_'+property] = p_what[property]();
			delta_start['delta_'+property] = p_props[property] - p_what[property]();
		};
		
		
		var _start_time = Date.now() + (p_delay ? p_delay : 0);
		var temp_tween = new Tween_runner({what:p_what,start_time:_start_time,duration:p_time,easing:p_easing,props:p_props,distance:delta_start,update:p_update,callback:p_callback},this);
		this._tweens[_temp_id] = temp_tween;
		temp_tween.bind('finished',this._cleanup,temp_tween);
		
		
		
			
		
	};
	
	_pt.stop = function(p_what){
		
		if(p_what.id >= 0){
			for (var i=0; i < this._tweens.length; i++) {
				if(this._tweens[i].id == p_what.id){
					this._tweens[i].on = false;
					
				}
			};
		}
		
	};
	
	_pt._cleanup = function(p_obj){
		
		var _tweens =  this._home._tweens;
		for (key in _tweens) {
	        if (_tweens.hasOwnProperty(key)){ 
				if(_tweens[key].id == this.id){
					delete _tweens[key];

				}
			}
	    };
	
	
	};
	
	

	
	Easing = { Linear: {}, Quadratic: {}, Cubic: {}, Quartic: {}, Quintic: {}, Sinusoidal: {}, Exponential: {}, Circular: {}, Elastic: {}, Back: {}, Bounce: {} };
	
	
	Easing.Linear.EaseNone = function ( p_e ) {

		return p_e;

	};
	
	Easing.none = function ( p_e ) {

		return p_e;

	};
	
	//

	Easing.Quadratic.EaseIn = function ( p_e ) {

		return p_e * p_e;

	};

	Easing.Quadratic.EaseOut = function ( p_e ) {

		return - p_e * ( p_e - 2 );

	};

	Easing.Quadratic.EaseInOut = function ( p_e ) {

		if ( ( p_e *= 2 ) < 1 ) return 0.5 * p_e * p_e;
		return - 0.5 * ( --p_e * ( p_e - 2 ) - 1 );

	};


	
	
	Easing.Cubic.EaseIn = function ( p_e ) {

		return p_e * p_e * p_e;

	};

	Easing.Cubic.EaseOut = function ( p_e ) {

		return --p_e * p_e * p_e + 1;

	};

	Easing.Cubic.EaseInOut = function ( p_e ) {

		if ( ( p_e *= 2 ) < 1 ) return 0.5 * p_e * p_e * p_e;
		return 0.5 * ( ( p_e -= 2 ) * p_e * p_e + 2 );

	};

	//

	Easing.Quartic.EaseIn = function ( p_e ) {

		return p_e * p_e * p_e * p_e;

	};

	Easing.Quartic.EaseOut = function ( p_e ) {

		 return - ( --p_e * p_e * p_e * p_e - 1 );

	}

	Easing.Quartic.EaseInOut = function ( p_e ) {

		if ( ( p_e *= 2 ) < 1) return 0.5 * p_e * p_e * p_e * p_e;
		return - 0.5 * ( ( p_e -= 2 ) * p_e * p_e * p_e - 2 );

	};

	//
	
	
	
	Easing.Quintic.EaseIn = function ( p_e ) {

		return p_e * p_e * p_e * p_e * p_e;

	};

	Easing.Quintic.EaseOut = function ( p_e ) {

		return ( p_e = p_e - 1 ) * p_e * p_e * p_e * p_e + 1;

	};

	Easing.Quintic.EaseInOut = function ( p_e ) {

		if ( ( p_e *= 2 ) < 1 ) return 0.5 * p_e * p_e * p_e * p_e * p_e;
		return 0.5 * ( ( p_e -= 2 ) * p_e * p_e * p_e * p_e + 2 );

	};

	// 
	
	Easing.Sinusoidal.EaseIn = function ( p_e ) {

		return - Math.cos( p_e * Math.PI / 2 ) + 1;

	};

	Easing.Sinusoidal.EaseOut = function ( p_e ) {

		return Math.sin( p_e * Math.PI / 2 );

	};

	Easing.Sinusoidal.EaseInOut = function ( p_e ) {

		return - 0.5 * ( Math.cos( Math.PI * p_e ) - 1 );

	};

	//
	

	Easing.Exponential.EaseIn = function ( p_e ) {

		return p_e == 0 ? 0 : Math.pow( 2, 10 * ( p_e - 1 ) );

	};

	Easing.Exponential.EaseOut = function ( p_e ) {

		return p_e == 1 ? 1 : - Math.pow( 2, - 10 * p_e ) + 1;

	};

	Easing.Exponential.EaseInOut = function ( p_e ) {

		if ( p_e == 0 ) return 0;
	        if ( p_e == 1 ) return 1;
	        if ( ( p_e *= 2 ) < 1 ) return 0.5 * Math.pow( 2, 10 * ( p_e - 1 ) );
	        return 0.5 * ( - Math.pow( 2, - 10 * ( p_e - 1 ) ) + 2 );

	};

	// 
	
	Easing.Circular.EaseIn = function ( p_e ) {

		return - ( Math.sqrt( 1 - p_e * p_e ) - 1);

	};

	Easing.Circular.EaseOut = function ( p_e ) {

		return Math.sqrt( 1 - --p_e * p_e );

	};

	Easing.Circular.EaseInOut = function ( p_e ) {

		if ( ( p_e /= 0.5 ) < 1) return - 0.5 * ( Math.sqrt( 1 - p_e * p_e) - 1);
		return 0.5 * ( Math.sqrt( 1 - ( p_e -= 2) * p_e) + 1);

	};

	//
	Easing.Elastic.EaseIn = function( p_e ) {

		var s, a = 0.1, p = 0.4;
		if ( p_e == 0 ) return 0; if ( p_e == 1 ) return 1; if ( !p ) p = 0.3;
		if ( !a || a < 1 ) { a = 1; s = p / 4; }
		else s = p / ( 2 * Math.PI ) * Math.asin( 1 / a );
		return - ( a * Math.pow( 2, 10 * ( p_e -= 1 ) ) * Math.sin( ( p_e - s ) * ( 2 * Math.PI ) / p ) );

	};

	Easing.Elastic.EaseOut = function( p_e ) {

		var s, a = 0.1, p = 0.4;
		if ( p_e == 0 ) return 0; if ( p_e == 1 ) return 1; if ( !p ) p = 0.3;
		if ( !a || a < 1 ) { a = 1; s = p / 4; }
		else s = p / ( 2 * Math.PI ) * Math.asin( 1 / a );
		return ( a * Math.pow( 2, - 10 * p_e) * Math.sin( ( p_e - s ) * ( 2 * Math.PI ) / p ) + 1 );

	};

	Easing.Elastic.EaseInOut = function( p_e ) {

		var s, a = 0.1, p = 0.4;
		if ( p_e == 0 ) return 0; if ( p_e == 1 ) return 1; if ( !p ) p = 0.3;
	        if ( !a || a < 1 ) { a = 1; s = p / 4; }
	        else s = p / ( 2 * Math.PI ) * Math.asin( 1 / a );
	        if ( ( p_e *= 2 ) < 1 ) return - 0.5 * ( a * Math.pow( 2, 10 * ( p_e -= 1 ) ) * Math.sin( ( p_e - s ) * ( 2 * Math.PI ) / p ) );
	        return a * Math.pow( 2, -10 * ( p_e -= 1 ) ) * Math.sin( ( p_e - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;

	};

	//
	
	Easing.Back.EaseIn = function( p_e ) {

		var s = 1.70158;
		return p_e * p_e * ( ( s + 1 ) * p_e - s );

	};

	Easing.Back.EaseOut = function( p_e ) {

		var s = 1.70158;
		return ( p_e = p_e - 1 ) * p_e * ( ( s + 1 ) * p_e + s ) + 1;

	};

	Easing.Back.EaseInOut = function( p_e ) {

		var s = 1.70158 * 1.525;
		if ( ( p_e *= 2 ) < 1 ) return 0.5 * ( p_e * p_e * ( ( s + 1 ) * p_e - s ) );
		return 0.5 * ( ( p_e -= 2 ) * p_e * ( ( s + 1 ) * p_e + s ) + 2 );

	};

	// 


	Easing.Bounce.EaseIn = function( p_e ) {

		return 1 - Easing.Bounce.EaseOut( 1 - p_e );

	};

	Easing.Bounce.EaseOut = function( p_e ) {

		if ( ( p_e /= 1 ) < ( 1 / 2.75 ) ) {

			return 7.5625 * p_e * p_e;

		} else if ( p_e < ( 2 / 2.75 ) ) {

			return 7.5625 * ( p_e -= ( 1.5 / 2.75 ) ) * p_e + 0.75;

		} else if ( p_e < ( 2.5 / 2.75 ) ) {

			return 7.5625 * ( p_e -= ( 2.25 / 2.75 ) ) * p_e + 0.9375;

		} else {

			return 7.5625 * ( p_e -= ( 2.625 / 2.75 ) ) * p_e + 0.984375;

		}

	};

	Easing.Bounce.EaseInOut = function( p_e ) {

		if ( p_e < 0.5 ) return Easing.Bounce.EaseIn( p_e * 2 ) * 0.5;
		return Easing.Bounce.EaseOut( p_e * 2 - 1 ) * 0.5 + 0.5;

	};
	
	
	window.Easing = Easing;
	window.Tweenie = Tweenie;
	
}(window));