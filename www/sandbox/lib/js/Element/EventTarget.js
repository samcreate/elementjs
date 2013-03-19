
// credit goes to Nicholas C. Zakas
// http://www.nczonline.net/blog/2010/03/09/custom-events-in-javascript/
(function(window) {
	
	/**
	* //EventTarget class is responsible for all objects event handeling and firing.
	* @class EventTarget
	* @extends Basic
	* @constructor
	* @example var EventTarget = new EventTarget();
	*/


	EventTarget = function() {
		
		this._listeners = {};
	};



	var _pt = EventTarget.prototype = new Basic();
	
	_pt.constructor = EventTarget;

	// ====================
	// = Getter / Setters =
	// ====================

	
	// ====================
	// = public functions =
	// ====================
	_pt.bind = function(type, listener, scope){
		if (typeof this._listeners[type] == "undefined"){
            this._listeners[type] = [];
        }

        this._listeners[type].push({fn:listener,scope:scope});

        return this;
	};
	/** @memberOf EventTarget#
    * @function
    * @description Removes the event from the event list. 
    * @name unbind
	* @public 
	* @param {string} type - unique name given to the custom event to be removed
	* @param {function} listener - the callback function that was originally bound to the event
	* @example _eventEngine.unbind('eventName', _eventHandler );
    */

    /**
	* @memberOf EventTarget#
	* @name unbind
    * @function
	* @param {string} type - unique name given to the custom event to be removed
	* @param {function} listener - the callback function that was originally bound to the event
	* @param {object} scope - the scope of callback's 'this' property
    * @description 
    // Removes the event from the event list. 
	* @public 
	* @example 
	// In this example, we remove the event "eventName" binding to our
	// function "_eventHandler".
   	*var _my_element.unbind('eventName', _eventHandler );
	*console.log(_my_element.x); //returns 33;
    */
	_pt.unbind = function(type, listener){
		if (this._listeners[type] instanceof Array){
            var listeners = this._listeners[type];
            for (var i=0, len=listeners.length; i < len; i++){
                if (listeners[i].fn === listener){
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
	};
	/** @memberOf EventTarget#
    * @function
    * @description triggers the custom event. 
    * @name fire
	* @public 
	* @param {string} type - unique name given to the custom event to be fired
	* @param {Object} [params] - passes parameters to the callback function 
	* @example _eventEngine.fire('eventName','pass me to the callback function');
    */
	_pt.fire = function(event,params){
		if (typeof event == "string"){
            event = { type: event };
        }
        if (!event.target){
            event.target = this;
        }

        if (!event.type){  //falsy
            throw new Error("Event object missing 'type' property.");
        }
		
		if(params){
			event.params = params;
		}
		
        if (this._listeners[event.type] instanceof Array){
            var listeners = this._listeners[event.type];
            for (var i=0, len=listeners.length; i < len; i++){
                listeners[i].fn.call( listeners[i].scope || this, event);
            }
        }
	};
	

	// =====================
	// = private functions =
	// =====================
	

	
	window.EventTarget = EventTarget;
	
}(window));