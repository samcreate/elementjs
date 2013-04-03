(function(window) {
	

	Element = function(p_class, p_def) {
		
		
		if(p_class){
			
			var _temp;

			if(p_class === 'Scene'){

				_temp = new Scene(p_def);
				_temp.width(p_def.width);
				_temp.height(p_def.height);
				_temp.useEngine(p_def.useEngine);
				_temp.framerate(p_def.framerate);

			}else{

			 	_temp = eval("new "+p_class+"()");
				this._handelDefinition(p_def, _temp);
			}
			
			return _temp;
		}
		
		
	};

	var _pt = Element.prototype = new Basic();
	
	

	// ====================
	// = Getter / Setters =
	// ====================
	
	
	
	_pt.canvas_id = function(p_val){
		if(p_val){
			this._id = p_val;
			return this;
		}else{
			return this._id ;
		}
	};
	
	// ====================
	// = public functions =
	// ====================
	
	
	
	
	
	// =====================
	// = private functions =
	// =====================
	
	

	_pt._handelDefinition = function(p_def, p_ele){
		if(p_def != null){
			var _multi_func, _args = [], _f;
			for (var prop in p_def) {
				if(prop === "filter" || prop === "sequence" ){
					_multi_func = p_def[prop].split(",");

					for (var i = 0; i < _multi_func.length; i++) {
						_args = _multi_func[i].split(":");
						if(_args.length > 1){
							p_ele[prop].apply(p_ele,_args);
						}else{
							p_ele[prop](_multi_func[i]);
						}
						
					}
				}else{
					//debug.log(p_def[prop], typeof p_def[prop]);
					
					_args = typeof p_def[prop] == "string" ? p_def[prop].split(",") : p_def[prop];
					
					if(_args.length >1){
						p_ele[prop].apply(p_ele,_args);
					}else{
						p_ele[prop](p_def[prop]);
					}
					
				}
				
			}
		}
	};


	


	
	window.Element = Element;
	
}(window));