(function(window) {
	

	Events = function(p_canvas) {
		this._event_queue = [];
	}


	var _pt = Events.prototype;
	
	_pt.constructor = Events;

	// ====================
	// = Getter / Setters =
	// ====================

	
	// ====================
	// = public functions =
	// ====================
	
	_pt.on = function(p_event,p_callback){

		if(typeof this.scene() != 'undefined'){

			this.scene().eventChildren.push({object:this,event:p_event,callback:p_callback});

		}else{

			this._event_queue.push({object:this,event:p_event,callback:p_callback});
		}
		// 
		return this;
	}
	
	// =====================
	// = private functions =
	// =====================
	_pt.check_eventQueue = function(){

		for (var i = 0; i < this._event_queue.length; i++) {;
			this.scene().eventChildren.push(this._event_queue[i]);
		}

	};

	
	window.Events = Events;
	
}(window));