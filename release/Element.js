(function(window) {
	
	
	Util = window.Util || function(){};
	
	Util.hexToRGB = function(p_hex){
		
		this.cache = this.cache || [];
		
		if(this.cache[p_hex]) return this.cache[p_hex];
		
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(p_hex);
		
		 var _r = result ? {
		        r: parseInt(result[1], 16),
		        g: parseInt(result[2], 16),
		        b: parseInt(result[3], 16)
		 } : null;
		this.cache[p_hex] = _r;
		return _r;
		
	};
	
	Util.RGBtoHSV = function (r, g, b){
		
	    r = r/255; g = g/255; b = b/255;
	    var max = Math.max(r, g, b);
	    var min = Math.min(r, g, b);
	    var h, s, v = max;
	    var d = max - min;
	    s = max === 0 ? 0 : d / max;
	    if(max === min){
	        h = 0;
	    }else{
	        switch(max){
	            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	            case g: h = (b - r) / d + 2; break;
	            case b: h = (r - g) / d + 4; break;
	            default: break;
	        }
	        h /= 6;
	    }
	    return [h, s, v];
	};
	
	Util.HSVtoRGB = function (h, s, v){
	
	
	    var r, g, b;
	    var i = Math.floor(h * 6);
	    var f = h * 6 - i;
	    var p = v * (1 - s);
	    var q = v * (1 - f * s);
	    var t = v * (1 - (1 - f) * s);
	    switch(i % 6){
	        case 0: r = v; g = t; b = p; break;
	        case 1: r = q; g = v; b = p; break;
	        case 2: r = p; g = v; b = t; break;
	        case 3: r = p; g = q; b = v; break;
	        case 4: r = t; g = p; b = v; break;
	        case 5: r = v; g = p; b = q; break;
	        default: break;
	    }
	    
	   return [r * 255, g * 255, b * 255];
	    
	   
	};
	
	Util.mixColors = function(t, rgb1, rgb2){
		var r = Util.linearInterpolate(t,rgb1[0],rgb2[0]);
		var g = Util.linearInterpolate(t,rgb1[1],rgb2[1]);
		var b = Util.linearInterpolate(t,rgb1[2],rgb2[2]);
		var a = Util.linearInterpolate(t,rgb1[3],rgb2[3]);
		return [r,g,b,a];
	};
	
	Util.linearInterpolate = function(t,a,b){
		return a + t * (b-a);
	};
	
	Util.createContext = function(p_id) {
	    var canvas = document.createElement('canvas');
		canvas.setAttribute("id", "element-canvas_"+p_id);
		$$_canvas.canvas().appendChild(canvas);
		//document.body.appendChild(canvas);
		canvas.style.display = "none";
	    canvas.width =  $$_canvas._canvas.width;
	    canvas.height =  $$_canvas._canvas.height;
	    return {canvas:canvas,context:canvas.getContext("2d") };
	};
	
	
	Util.removeElement = function(p_id){
		var _el = document.getElementById(p_id);
		 if(_el) _el.parentNode.removeChild(_el);
		return true;
		
	};
	
	Util.checkPIXEL = function(p_object,p_x,p_y){
		var _context = p_object.mouseDraw();
		var imageData = _context.getImageData(p_x, p_y, 1, 1);
		var index = (p_x + p_y * imageData.width) * 4;
		if (imageData.data[3] > 0) {
			return true;
		}
			return false;
	};
	
	Util.getPixel = function(pixels, x, y, width, height) {
	    var pix = (y * width + x) * 4;
	    if (x < 0 || x >= width || y < 0 || y >= height) {
	        return [pixels[((Util.clampPixel(y, 0, height - 1) * width) + Util.clampPixel(x, 0, width - 1)) * 4], pixels[((Util.clampPixel(y, 0, height - 1) * width) + Util.clampPixel(x, 0, width - 1)) * 4 + 1], pixels[((Util.clampPixel(y, 0, height - 1) * width) + Util.clampPixel(x, 0, width - 1)) * 4 + 2], pixels[((Util.clampPixel(y, 0, height - 1) * width) + Util.clampPixel(x, 0, width - 1)) * 4 + 3]];
	    }
	    return [pixels[pix], pixels[pix + 1], pixels[pix + 2], pixels[pix + 3]];
	};
	
	Util.clampPixel = function (x,a,b){
		return (x < a) ? a : (x > b) ? b : x;
	};
	
	Util.bilinearInterpolate = function (x,y,nw,ne,sw,se){
		var m0, m1;
		var r0 = nw[0]; var g0 = nw[1]; var b0 = nw[2]; var a0 = nw[3];
		var r1 = ne[0]; var g1 = ne[1]; var b1 = ne[2]; var a1 = ne[3];
		var r2 = sw[0]; var g2 = sw[1]; var b2 = sw[2]; var a2 = sw[3];
		var r3 = se[0]; var g3 = se[1]; var b3 = se[2]; var a3 = se[3];
		var cx = 1.0 - x; var cy = 1.0 - y;
		
		m0 = cx * a0 + x * a1;
		m1 = cx * a2 + x * a3;
		var a = cy * m0 + y * m1;
		
		m0 = cx * r0 + x * r1;
		m1 = cx * r2 + x * r3;
		var r = cy * m0 + y * m1;
		
		m0 = cx * g0 + x * g1;
		m1 = cx * g2 + x * g3;
		var g = cy * m0 + y * m1;
		
		m0 = cx * b0 + x * b1;
		m1 = cx * b2 + x * b3;
		var b =cy * m0 + y * m1;
		return [r,g,b,a];
	};
	
	Util.triangle = function(x){
	 	var r = Util.mod(x, 1);
	 	return 2*(r < 0.5 ? r : 1-r);
	};
	
	Util.mod = function(a,b){
	 	var n = parseInt(a/b,10);
	 	a -= n*b;
	 	if(a < 0){
	 		return a + b;
	 	}
	 	return a;
	};
	
	Util.getIndex = function(p_child){
		var _i;
		for (var i=0; i < $$_CHILDREN.length; i++) {
			if(p_child.id() == $$_CHILDREN[i].id()) _i = i;
		}
		
		return _i;
	}
	function loadXMLDoc() {

}

	Util.getJSON = function(p_path, p_callback, p_scope){
		var xmlhttp, scope;
		scope = p_scope || this;
		if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else { // code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				try{
					var json = JSON.parse(xmlhttp.responseText);
				}catch(e){
					var json = eval('(' + xmlhttp.responseText + ')');
				}				
				p_callback.call(p_scope,json);
			}
		}
		xmlhttp.open("GET", p_path, true);
		xmlhttp.send();
	}
	
	
	window.Util = Util;
	
}(window));
(function(window) {
/**
	* Basic is the base class for almost every object in Element.js.
	* @class BaseObject
	* @constructor
	* @example var _displayObject = new BaseObject();
	**/	

	Basic = function() {
		
	
	};

	var _pt = Basic.prototype;
	
	_pt.constructor = Basic;

	// ====================
	// = Getter / Setters =
	// ====================

	// ====================
	// = public functions =
	// ====================
	_pt.extend = function(p_el, p_opt){
		for(var name in p_opt) {
			p_el[name] = p_opt[name];
		}
		return p_el;
	};
	
	
	// =====================
	// = private functions =
	// =====================
	
	
	window.Basic = Basic;
	
}(window));
(function(window) {
	

	
	Animate = function(p_Animate) {
	
		this._tween = [];
	};

	var _pt = Animate.prototype;
	
	
	// ====================
	// = getter / setters =
	// ====================
	
	_pt.easing = function(p_val){
		if(p_val){
			this._easing = p_val;
			return this;
		}else{
			return this._easing;
		}
	};
	
	_pt.time = function(p_val){
		if(p_val){
			this._time = p_val;
			return this;
		}else{
			return this._time;
		}
	};
	
	_pt.easing = function(p_val){
		if(p_val){
			this._easing = p_val;
			return this;
		}else{
			return this._easing || "Linear.EaseNone";
		}
	};
	
	// ====================
	// = public functions =
	// ====================
	_pt.animate = function(p_time, p_props, p_easing){
		
		this._tween.push({props:p_props,time:p_time,easing: p_easing || this.easing()});
		
		return this;
	};

	
	_pt.start = function(p_callback){

		
		//queue to make object is ready
		
		if(this.ready() === false) {
			var _this = this, _callb = p_callback;
			setTimeout(function(){
				_this.start(_callb);
			},1000);
			return this;
		}
		
		this._callback = p_callback || "" ;
		
		this._tweenie.to(this,this._tween[0].props, (this._tween[0].time*1000) ,this._tween[0].easing ,null, this._nextTween);
		
		
		return this;

	};
	
	_pt.stop = function(){
		
		
		return this;

	};
	
	_pt.pause = function(){
		
		
		return this;

	};
	
	
	// =====================
	// = private functions =
	// =====================
	_pt._nextTween = function(){
		
		if(this._tween.length > 1){
		
			this._tween.shift();
			this._tweenie.to(this,this._tween[0].props, (this._tween[0].time*1000) ,this._tween[0].easing ,null, this._nextTween);

		
		}else{
			this._tween.shift();
			if(this._callback !== "" )  this._callback.call(this);

		}
	
	};
	
	

	
	window.Animate = Animate;
	
}(window));

// credit goes to Nicholas C. Zakas
// http://www.nczonline.net/blog/2010/03/09/custom-events-in-javascript/
(function(window) {
	
	/** @memberOf EventTarget#
 `   * @function
    * @description holds a custom event until the event is fired. 
    * @name bind
	* @public 
	* @param {string} type - unique name given to the custom event
	* @param {function} listener - call back function
	* @param {Object} [scope] - if passed it envokes the callback function with the scope of the passed-in param. (scope injection)
	* @example _eventEngine.bind('eventName',function(){console.log('callback!')},window);
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
(function(window) {
	

	Filter = function() {
		
		EventTarget.call(this);
		
	};


	var _pt = Filter.prototype;
	
	_pt.constructor = Filter;

	// ====================
	// = Getter / Setters =
	// ====================
	Filter.get = function(p_src, p_filter, p_ref){
		
		var _img;
		_img = p_src.context.getImageData(0,0,p_src.canvas.width,p_src.canvas.height);
		_img = Filter.filterImage(p_filter.effect,_img,p_filter.args[0],p_ref);
		p_src.context.putImageData(_img,0,0);
		
		return p_src.canvas;
	};
	
	Filter.filterImage = function(p_filter, p_image, var_args, p_ref) {
	  var args = [p_image];
	  for (var i=2; i<arguments.length; i++) {
	    args.push(arguments[i]);
	  }
	  args.push[p_ref];
	  return eval("Filter."+p_filter+".apply(p_ref, args)");
	};

	
	// ====================
	// = public functions =
	// ====================
	Filter.grayscale = function(p_pixels) {
	  var d = p_pixels.data;
	  for (var i=0; i<d.length; i+=4) {
	    var r = d[i];
	    var g = d[i+1];
	    var b = d[i+2];
	    // CIE luminance for the RGB
	    // The human eye is bad at seeing red and blue, so we de-emphasize them.
	    var v = 0.2126*r + 0.7152*g + 0.0722*b;
	    d[i] = d[i+1] = d[i+2] = v
	  }
	  return p_pixels;
	};
	
	Filter.brightness = function(p_pixels, p_adjustment) {
		
	  	var width = p_pixels.width, height = p_pixels.height;
		var inputData = p_pixels.data;
		var amount = p_adjustment || -1.0;
		for (var y = 0; y < height; y++) {
			for (var x = 0; x < width; x++) {
			    var pixel = (y*width + x)*4;
			    var hsv = Util.RGBtoHSV(inputData[pixel],inputData[pixel+1],inputData[pixel+2]);
			    hsv[2] += amount;
				if(hsv[2] < 0){
					hsv[2] = 0;
				} else if (hsv[2] > 1){ 
					hsv[2] = 1;
				}
				var rgb = Util.HSVtoRGB(hsv[0],hsv[1],hsv[2]);
				for(var i = 0; i < 3; i++){
					inputData[pixel+i] = rgb[i];
				}
			} 
		}
		return p_pixels;
	};
	
	Filter.threshold = function(p_pixels, p_threshold) {
		var d = p_pixels.data;
		for (var i=0; i<d.length; i+=4) {
  			var r = d[i];
  			var g = d[i+1];
  			var b = d[i+2];
  			var v = (0.2126*r + 0.7152*g + 0.0722*b >= p_threshold) ? 255 : 0;
  			d[i] = d[i+1] = d[i+2] = v
 		}
			return p_pixels;
			
	};
	
	Filter.multiply = function(p_pixels,p_color){
		var d = p_pixels.data, _color = Util.hexToRGB(p_color);
		for (var i = 0, n = d.length; i < n; i += 4) {
		      d[i ] = Filter.multiplyPixels(_color.r, d[i ]); // red
		      d[i+1] = Filter.multiplyPixels(_color.g, d[i+1]); // green
		      d[i+2] = Filter.multiplyPixels(_color.b, d[i+2]); // blue
		      // pix[i+3] is alpha channel (ignored)

		 }
		
		
		return p_pixels;
	};
	
	Filter.sharpen = function(p_pixels){
		
		return Filter.convolute(p_pixels,[  0, -1,  0,-1,  5, -1, 0, -1,  0 ]);
	};
	

	Filter.emboss = function(p_pixels){
		
		return Filter.convolute(p_pixels,[-2, -1,  0,-1,  1.,  1, 0,  1,  2]);
	};
	
	Filter.woodblock = function(p_pixels){
		var _temp = Filter.sobel.call(this, p_pixels);
		_temp = Filter.multiply.call(this, _temp,"#FF0000");
		_temp = Filter.threshold.call(this, _temp,5);
		return _temp;
	};
	
	Filter.sobel = function(p_pixels){
		
		var px = p_pixels;
		var vertical = Filter.convoluteFloat32(px,[-1,-2,-1,0, 0, 0,1, 2, 1]);
		var horizontal = Filter.convoluteFloat32(px,[-1,0,1, -2,0,2,-1,0,1]);
		var id = Filter.createImageData(vertical.width, vertical.height);
		for (var i=0; i<id.data.length; i+=4) {
	        var v = Math.abs(vertical.data[i]);
	        id.data[i] = v;
	        var h = Math.abs(horizontal.data[i]);
	        id.data[i+1] = h
	        id.data[i+2] = (v+h)/4;
	        id.data[i+3] = 255;
	    }
		
		return id;
	};
	// stolen and implemented from https://github.com/JoelBesada/JSManipulate/blob/master/script/jsmanipulate.js
	Filter.blur = function(p_pixels,p_amount){
		var width = p_pixels.width;
		var width4 = width << 2;
		var height = p_pixels.height;
		var inputData = p_pixels.data;
		var q;
		var amount = p_amount;
		if (amount < 0.0) {
			amount = 0.0;
		}
		if (amount >= 2.5) {
			q = 0.98711 * amount - 0.96330; 
		} else if (amount >= 0.5) {
			q = 3.97156 - 4.14554 * Math.sqrt(1.0 - 0.26891 * amount);
		} else {
			q = 2 * amount * (3.97156 - 4.14554 * Math.sqrt(1.0 - 0.26891 * 0.5));
		}
		var qq = q * q;
		var qqq = qq * q;
		var b0 = 1.57825 + (2.44413 * q) + (1.4281 * qq ) + (0.422205 * qqq);
		var b1 = ((2.44413 * q) + (2.85619 * qq) + (1.26661 * qqq)) / b0;
		var b2 = (-((1.4281 * qq) + (1.26661 * qqq))) / b0;
		var b3 = (0.422205 * qqq) / b0; 
		var bigB = 1.0 - (b1 + b2 + b3); 
		var c = 0;
		var index;
		var indexLast;
		var pixel;
		var ppixel;
		var pppixel;
		var ppppixel;
		for (c = 0; c < 3; c++) {
			for (var y = 0; y < height; y++) {
				index = y * width4 + c;
				indexLast = y * width4 + ((width - 1) << 2) + c;
				pixel = inputData[index];
				ppixel = pixel;
				pppixel = ppixel;
				ppppixel = pppixel;
				for (; index <= indexLast; index += 4) {
					pixel = bigB * inputData[index] + b1 * ppixel + b2 * pppixel + b3 * ppppixel;
					inputData[index] = pixel; 
					ppppixel = pppixel;
					pppixel = ppixel;
					ppixel = pixel;
				}
				index = y * width4 + ((width - 1) << 2) + c;
				indexLast = y * width4 + c;
				pixel = inputData[index];
				ppixel = pixel;
				pppixel = ppixel;
				ppppixel = pppixel;
				for (; index >= indexLast; index -= 4) {
					pixel = bigB * inputData[index] + b1 * ppixel + b2 * pppixel + b3 * ppppixel;
					inputData[index] = pixel;
					ppppixel = pppixel;
					pppixel = ppixel;
					ppixel = pixel;
				}
			}
		}
		for (c = 0; c < 3; c++) {
			for (var x = 0; x < width; x++) {
				index = (x << 2) + c;
				indexLast = (height - 1) * width4 + (x << 2) + c;
				pixel = inputData[index];
				ppixel = pixel;
				pppixel = ppixel;
				ppppixel = pppixel;
				for (; index <= indexLast; index += width4) {
					pixel = bigB * inputData[index] + b1 * ppixel + b2 * pppixel + b3 * ppppixel;
					inputData[index] = pixel;
					ppppixel = pppixel;
					pppixel = ppixel;
					ppixel = pixel;
				} 
				index = (height - 1) * width4 + (x << 2) + c;
				indexLast = (x << 2) + c;
				pixel = inputData[index];
				ppixel = pixel;
				pppixel = ppixel;
				ppppixel = pppixel;
				for (; index >= indexLast; index -= width4) {
					pixel = bigB * inputData[index] + b1 * ppixel + b2 * pppixel + b3 * ppppixel;
					inputData[index] = pixel;
					ppppixel = pppixel;
					pppixel = ppixel;
					ppixel = pixel;
				}
			}
		} 
		return p_pixels;
	}; //eof blur
	
	Filter.median = function(p_pixels){
		
		var id = Filter.createImageData(p_pixels.width, p_pixels.height);

		// move over the image data
		for (var x = 0; x < p_pixels.width; x++) {
			for (var y = 0; y < p_pixels.height; y++) {
				// collection array for median filter
				var P = new Array();
				var count = 0;

				// move with a little window over the image
				for ( var u = 0; u < 3; u++) {
		  			for ( var v = 0; v < 3; v++) {
		  				// calculate the index of the sliding window
		  				var windowIndex = ((x+u) + (y+v) * p_pixels.width) * 4;
		  				// get the color values
			    		var r = p_pixels.data[windowIndex + 0]; // R
			    		var g = p_pixels.data[windowIndex + 1]; // G
			    		var b = p_pixels.data[windowIndex + 2]; // B
			    		var a = p_pixels.data[windowIndex + 3]; // A
			    		// calculate the grey value and save it to the prepaired array
			    		P[count]=parseInt( parseFloat("0.33") *( parseFloat(r) + parseFloat(g) + parseFloat(b)));
			    		count++;
	  				}
				}
				// sorting the array
				P.sort();
				// calculate the index of the image 
				var imageIndex = (x + y * p_pixels.width) * 4;
				// save the median to the single color positions
				id.data[imageIndex + 0] = parseInt(P[4]); // R
				id.data[imageIndex + 1] = parseInt(P[4]); // G
				id.data[imageIndex + 2] = parseInt(P[4]); // B
				// set the original alpha
				id.data[imageIndex + 3] = p_pixels.data[imageIndex + 3]; // A 
			}
		}
		// draw the inverted image data to the second canvas
		return id;
		
	}
	
	Filter.invert = function(p_pixels){
		var newImageData = Filter.createImageData(p_pixels.width, p_pixels.height);
		var i = 0;		
		while(i < p_pixels.data.length){
			// invert the colors
			newImageData.data[i] = 255- p_pixels.data[i++]; // R
			newImageData.data[i] = 255- p_pixels.data[i++]; // G
			newImageData.data[i] = 255- p_pixels.data[i++]; // B
			newImageData.data[i] = p_pixels.data[i++]; 	 // A
		}
		
		return newImageData;
	}
	
	
	

	
	Filter.circleSmear = function(p_pixels, p_values){
	    
	    var width = p_pixels.width,
	        height = p_pixels.height;
	    var inputData = p_pixels.data;
	    var outputData = [];
	    for (var j = 0; j < inputData.length; j++) {
	        outputData[j] = inputData[j];
	    }
	  	var vals = p_values || {size:5,density:0.5,mix:0.5};
	    var size = vals.size;
	    if (size < 1) {
	        size = 1;
	    }
	    size = parseInt(size, 10);
	    var density = vals.density;
	    var mix = vals.mix;
	    var radius = size + 1;
	    var radius2 = radius * radius;
	    var numShapes = parseInt(2 * density / 30 * width * height / 2, 10);
	    for (var i = 0; i < numShapes; i++) {
	        var sx = (Math.random() * Math.pow(2, 32) & 0x7fffffff) % width;
	        var sy = (Math.random() * Math.pow(2, 32) & 0x7fffffff) % height;
	        var rgb2 = [inputData[(sy * width + sx) * 4], inputData[(sy * width + sx) * 4 + 1], inputData[(sy * width + sx) * 4 + 2], inputData[(sy * width + sx) * 4 + 3]];
	        for (var x = sx - radius; x < sx + radius + 1; x++) {
	            for (var y = sy - radius; y < sy + radius + 1; y++) {
	                var f = (x - sx) * (x - sx) + (y - sy) * (y - sy);
	                if (x >= 0 && x < width && y >= 0 && y < height && f <= radius2) {
	                    var rgb1 = [outputData[(y * width + x) * 4], outputData[(y * width + x) * 4 + 1], outputData[(y * width + x) * 4 + 2], outputData[(y * width + x) * 4 + 3]];
	                    var mixedRGB = Util.mixColors(mix, rgb1, rgb2);
	                    for (var k = 0; k < 3; k++) {
	                        outputData[(y * width + x) * 4 + k] = mixedRGB[k];
	                    }
	                }
	            }
	        }
	    }
	    for (var l = 0; l < outputData.length; l++) {
	        inputData[l] = outputData[l];
	    }
	    
	    
	    return p_pixels;
	};
	
	Filter.diffuse = function (p_pixels, p_value){
	  	var width = p_pixels.width, height = p_pixels.height;
	 	var inputData = p_pixels.data;
	  	var scale = p_value; 
	  	var out = [];
	  	var outputData = [];
	  	var sinTable = [];
	  	var cosTable = [];
	  	for(var i = 0; i < 256; i++){
	  		var angle = Math.PI*2*i/256;
	  		sinTable[i] = scale*Math.sin(angle);
	  		cosTable[i] = scale*Math.cos(angle);
	  	}
	  	transInverse = function (x,y,out){
			var angle = parseInt(Math.random() * 255,10);
			var distance = Math.random();
			out[0] = x + distance * sinTable[angle];
			out[1] = y + distance * cosTable[angle];
	  	};
	  	Filter.transformFilter(inputData,transInverse,width,height);
	  	
	  	return p_pixels;
	};
	
	Filter.contrast = function(p_pixels,p_value){
		//amount : {min:0.0, max:2.0} ranges
		var width = p_pixels.width, height = p_pixels.height;
	  	var inputData = p_pixels.data;
	  	var amount = p_value || 2;
		if(amount < 0){
			amount = 0.0;
		}
		var table = [];
    
		for(var i = 0; i < 256; i++){
			table[i] = parseInt(255 * (((i/255)-0.5)*amount+0.5),10);
		}
	    Filter.tableFilter(inputData,table,width,height);
		return p_pixels;
	};
	
	Filter.sepia = function(p_pixels){
		//amount : {min:0.0, max:2.0} ranges
		var data = p_pixels.data;

		for(var i = 0; i < data.length; i+=4){
			var r = data[i],
				g = data[i+1],
				b = data[i+2];
			data[i] = (r * .393) + (g *.769) + (b * .189)
			data[i+1] = (r * .349) + (g *.686) + (b * .168)
			data[i+2] = (r * .272) + (g *.534) + (b * .131)
		}
		
		return p_pixels;
	};
	
	Filter.dither = function(p_pixels,p_value){
		var width = p_pixels.width, height = p_pixels.height;
	  	var inputData = p_pixels.data;
	  	var outputData = [];
	  	var i, j;

	  	for (j=0; j < inputData.length; j++) {
			outputData[j] = 0;
		}
	  	if(p_value === undefined){ p_value = {levels : 3,color : true} }
	  	var levels = p_value.levels;
	  	var color = p_value.color;
	  	if(levels <= 1){
	  		levels = 1;
	  	}
		var matrix = [0,0,0,
					  0,0,7,
					  3,5,1];
		var sum = 7+3+5+1;
		var index = 0;
		var map = [];
    
		for (i=0; i < levels; i++) {
			map[i] = parseInt(255* i / (levels-1),10);
		}
		var div = [];
		for (i=0; i < 256; i++) {
			div[i] = parseInt(levels*i / 256,10);
		}
	  	for (var y = 0; y < height; y++) {
	  		var reverse = ((y & 1) == 1);
	  		var direction;
	  		if(reverse){
	  			index = (y*width+width-1)*4;
	  			direction = -1;
	  		} else {
	  			index = y*width*4;
	  			direction = 1;
	  		}
	        for (var x = 0; x < width; x++) {
	            var r1 = inputData[index]; var g1 = inputData[index+1]; var b1 = inputData[index+2];
	            if(!color){
	            	r1 = g1 = b1 = parseInt((r1+g1+b1) / 3,10);
	            }
	            var r2 = map[div[r1]];var g2 = map[div[g1]];var b2 = map[div[b1]];
    
	            outputData[index] = r2; outputData[index + 1] = g2; outputData[index+2] = b2; outputData[index+3] = inputData[index+3];
    
	            var er = r1-r2; var eg = g1-g2; var eb = b1-b2;
    
	            for (i = -1; i <= 1; i++) {
					var iy = i+y;
					if (0 <= iy && iy < height) {
						for (j = -1; j <= 1; j++) {
							var jx = j+x;
							if (0 <= jx && jx < width) {
								var w;
								if (reverse){
									w = matrix[(i+1)*3-j+1];
								} else{
									w = matrix[(i+1)*3+j+1];
								}
								if (w !== 0) {
									var k = (reverse) ? index - j*4 : index + j*4;
									r1 = inputData[k]; g1 = inputData[k+1]; b1 = inputData[k+2];
									var factor = w/sum;
									r1 += er * factor; g1 += eg * factor; b1 += eb * factor;
									inputData[k] = r1; inputData[k+1] = g1 ;inputData[k+2] = b1;
								}
							}
						}
					}
				}
				index += direction*4;
			}
	    }
	    for(j = 0; j < outputData.length; j++){
	  		inputData[j] = outputData[j];
	  	}
		return p_pixels;
	};
	
	
	Filter.edge = function(p_pixels){
		var width = p_pixels.width, height = p_pixels.height;
	  	var inputData = p_pixels.data;
	  	var outputData = [];
		var matrixH = [-1,-2,-1,
				 			0, 0, 0,
				 			1, 2, 1];
			var matrixV = [-1, 0, 1,
				 		   -2, 0, 2,
				 		   -1, 0, 1];
	  	for (var y = 0; y < height; y++) {
	        for (var x = 0; x < width; x++) {
	            var pixel = (y*width + x)*4;
	            var rh = 0; gh = 0; bh = 0;
	            var rv = 0; gv = 0; bv = 0;
	            for(var row = -1; row <= 1; row++){
	            	var iy = y+row;
	            	var ioffset;
	            	if(iy >= 0 && iy < height){
	            		ioffset = iy*width*4;
	            	} else {
	            		ioffset = y*width*4;
	            	}
	            	var moffset = 3*(row+1)+1;
	            	for(var col = -1; col <= 1; col++){
	            		var ix = x+col;
	            		if(!(ix >= 0 && ix < width)){
	            			ix = x;
	            		}
	            		ix *= 4;
	            		var r = inputData[ioffset+ix];
	            		var g = inputData[ioffset+ix+1];
	            		var b = inputData[ioffset+ix+2];
	            		var h = matrixH[moffset+col];
	            		var v = matrixV[moffset+col];
	            		rh += parseInt(h*r,10);
	            		bh += parseInt(h*g,10);
	            		gh += parseInt(h*b,10);
	            		rv += parseInt(v*r,10);
	            		gv += parseInt(v*g,10);
	            		bv += parseInt(v*b,10);
	            	}
	            }
	            r = parseInt(Math.sqrt(rh*rh + rv*rv) / 1.8,10);
	            g = parseInt(Math.sqrt(gh*gh + gv*gv) / 1.8,10);
	            b = parseInt(Math.sqrt(bh*bh + bv*bv) / 1.8,10);
    
	            outputData[pixel] = r;
	            outputData[pixel+1] = g;
	            outputData[pixel+2] = b;
	            outputData[pixel+3] = inputData[pixel+3];
	        }   
	    }
	    for(var k = 0; k < outputData.length; k++){
			inputData[k] = outputData[k];
	  	}
		
		return p_pixels;
	};
	
	Filter.kaleidoscope = function (p_pixels,p_values){
	   	var width = p_pixels.width, height = p_pixels.height;
	  	var inputData = p_pixels.data;
		
		var defaultValues = {
				angle : 0,
				rotation : 0,
				sides : 3,
				centerX : 0.5,
				centerY : 0.5
			};
		var valueRanges = {
			angle : {min: 0, max: 360},
			rotation : {min: 0, max: 360},
			sides : {min: 1, max: 30},
			centerX : {min: 0.0, max:1.0},
			centerY : {min: 0.0, max:1.0}
		};
		
	  	if(p_values === undefined){ p_values = defaultValues; }
	   	var angle = (p_values.angle === undefined) ? defaultValues.angle : p_values.angle; 
	   	var rotation = (p_values.rotation === undefined) ? defaultValues.rotation : p_values.rotation; 
	   	var sides = (p_values.sides === undefined) ? defaultValues.sides : p_values.sides; 
	   	var centerX = (p_values.centerX === undefined) ? defaultValues.centerX : p_values.centerX; 
	   	var centerY = (p_values.centerY === undefined) ? defaultValues.centerY : p_values.centerY; 
	   	var iCenterX = width * centerX; var iCenterY = height * centerY;
	   	angle = angle/180 * Math.PI;
	   	rotation = rotation/180 * Math.PI;
	   	var transInverse = function(x,y,out){
	   		var dx = x - iCenterX;
	   		var dy = y - iCenterY;
	   		var r = Math.sqrt(dx*dx + dy*dy);
	   		var theta = Math.atan2(dy,dx) - angle - rotation;
	   		theta = Util.triangle(theta/Math.PI*sides*0.5);
	   		theta += angle;
	   		out[0] = iCenterX + r*Math.cos(theta);
	   		out[1] = iCenterY + r*Math.sin(theta);
	 	};
	 	Filter.transformFilter(inputData,transInverse,width,height);
		return p_pixels;
	};
	
	Filter.transformFilter = function(inputData, transformInverse, width, height){
	  	var out = [];
	  	var outputData = [];
	  	for(var j = 0; j < inputData.length; j++){
	  		outputData[j] = inputData[j];
	  	}
	  	for(var y = 0; y < height; y++){
	 		for (var x = 0; x < width; x++){
	 			var pixel = (y*width + x)*4;
				transformInverse.apply(this,[x,y,out]);
			  	var srcX = Math.floor(out[0]);
			  	var srcY = Math.floor(out[1]);
			  	var xWeight = out[0]-srcX;
			  	var yWeight = out[1]-srcY;
			  	var nw,ne,sw,se;
			  	if(srcX >= 0 && srcX < width-1 && srcY >= 0 && srcY < height-1){
			  		var i = (width*srcY + srcX)*4;
			  		nw = [inputData[i],inputData[i+1],inputData[i+2],inputData[i+3]];
			  		ne = [inputData[i+4],inputData[i+5],inputData[i+6],inputData[i+7]];
			  		sw = [inputData[i+width*4],inputData[i+width*4+1],inputData[i+width*4+2],inputData[i+width*4+3]];
			  		se = [inputData[i+(width + 1)*4],inputData[i+(width + 1)*4+1],inputData[i+(width + 1)*4+2],inputData[i+(width + 1)*4+3]];
			  	} else {
		  			nw = Util.getPixel( inputData, srcX, srcY, width, height );
					ne = Util.getPixel( inputData, srcX+1, srcY, width, height );
					sw = Util.getPixel( inputData, srcX, srcY+1, width, height );
					se = Util.getPixel( inputData, srcX+1, srcY+1, width, height );
			  	}
			  	var rgba = Util.bilinearInterpolate(xWeight,yWeight,nw,ne,sw,se);
				outputData[pixel] = rgba[0];
				outputData[pixel + 1] = rgba[1];
				outputData[pixel + 2] = rgba[2];
				outputData[pixel + 3] = rgba[3];
	 		}
	 	}
	 	for(var k = 0; k < outputData.length; k++){
	  		inputData[k] = outputData[k];
	  	}
	};
	
	
	Filter.convolute = function(p_pixels, p_weights, p_opaque) {
	
		var side = Math.round(Math.sqrt(p_weights.length));
		var halfSide = Math.floor(side/2);
		
		var src = p_pixels.data;
		var sw = p_pixels.width;
		var sh = p_pixels.height;
		
		var w = sw;
		var h = sh;
		var output = Filter.createImageData(w, h);
		var dst = output.data;
			
		var alphaFac = p_opaque ? 1 : 0;
		
		for (var y=0; y<h; y++) {
		  for (var x=0; x<w; x++) {
		    var sy = y;
		    var sx = x;
		    var dstOff = (y*w+x)*4;
		    var r=0, g=0, b=0, a=0;
		    for (var cy=0; cy<side; cy++) {
		      for (var cx=0; cx<side; cx++) {
		        var scy = Math.min(sh-1, Math.max(0, sy + cy - halfSide));
		        var scx = Math.min(sw-1, Math.max(0, sx + cx - halfSide));
		        var srcOff = (scy*sw+scx)*4;
		        var wt = p_weights[cy*side+cx];
		        r += src[srcOff] * wt;
		        g += src[srcOff+1] * wt;
		        b += src[srcOff+2] * wt;
		        a += src[srcOff+3] * wt;
		      }
		    }
		    dst[dstOff] = r;
		    dst[dstOff+1] = g;
		    dst[dstOff+2] = b;
		    dst[dstOff+3] = a + alphaFac*(255-a);
		  }
		}
		return output;
	};
	
	Filter.convoluteFloat32 = function(p_pixels, p_weights, p_opaque) {
		
		if (!window.Float32Array) Float32Array = Array;
		
		var side = Math.round(Math.sqrt(p_weights.length));
		var halfSide = Math.floor(side/2);
		
		var src = p_pixels.data;
		var sw = p_pixels.width;
		var sh = p_pixels.height;
		
		var w = sw;
		var h = sh;
		var output = {
		width: w, height: h, data: new Float32Array(w*h*4)
		};
		var dst = output.data;
		
		var alphaFac = p_opaque ? 1 : 0;
		
		for (var y=0; y<h; y++) {
			for (var x=0; x<w; x++) {
			  var sy = y;
			  var sx = x;
			  var dstOff = (y*w+x)*4;
			  var r=0, g=0, b=0, a=0;
			  for (var cy=0; cy<side; cy++) {
			    for (var cx=0; cx<side; cx++) {
			      var scy = Math.min(sh-1, Math.max(0, sy + cy - halfSide));
			      var scx = Math.min(sw-1, Math.max(0, sx + cx - halfSide));
			      var srcOff = (scy*sw+scx)*4;
			      var wt = p_weights[cy*side+cx];
			      r += src[srcOff] * wt;
			      g += src[srcOff+1] * wt;
			      b += src[srcOff+2] * wt;
			      a += src[srcOff+3] * wt;
			    }
			  }
			  dst[dstOff] = r;
			  dst[dstOff+1] = g;
			  dst[dstOff+2] = b;
			  dst[dstOff+3] = a + alphaFac*(255-a);
			}
		}
		return output;
	};
	// =====================
	// = private functions =
	// =====================
	

	
	Filter.multiplyPixels = function(p_topValue, p_bottomValue) {
	    // the multiply formula
	    return p_topValue * p_bottomValue / 255;
	 };
	Filter.createImageData = function(p_w,p_h) {
		var _tmpCanvas = document.createElement('canvas');
		var _tmpCtx = _tmpCanvas.getContext('2d');
		
	  return _tmpCtx.createImageData(p_w,p_h);
	};
	
	Filter.tableFilter = function (inputData, table, width, height){
		for (var y = 0; y < height; y++) {
			for (var x = 0; x < width; x++) {
			    var pixel = (y*width + x)*4;
			    for(var i = 0; i < 3; i++){
			    	inputData[pixel+i] = table[inputData[pixel+i]];
				}
			}   
		}
	  };
	
	window.Filter = Filter;
	
}(window));
(function(window) {
	
	/**
	* //DisplayObject class loads jpg/png/gif as a DisplayObject Object on the canvas 
	* @class DisplayObject
	* @extends EventTarget
	* @constructor
	* @example
	*/
	DisplayObject = function() {
		
	}


	var _pt = DisplayObject.prototype = new EventTarget();
	
	_pt.constructor = DisplayObject;

	// ====================
	// = Getter / Setters =
	// ====================

	
	// ====================
	// = public functions =
	// ====================


	/**
	* @memberOf DisplayObject#
	* @name x
    * @function
	* @param {Number} [value] - Value of x position.
    * @description 
    // x moves an object's x axius on the canvas
	* @public 
	* @example 
	// In this example, we set the x to 22 of an image.
	*
   	*var _my_element.x(22);
	*
	//now, let's 'get' the x value
	*console.log(_my_element.x()); //returns 22
    */
	_pt.x = function(p_val){
		if(p_val != null){
			this._x = p_val;
			return this;
		}else{
			return this._x || 1;
		}
	};


	/**
	* @memberOf DisplayObject#
	* @name y
    * @function
	* @param {Number} [value] - Value of y position.
    * @description 
    // y moves an object's y axius on the canvas
	* @public 
	* @example 
	// In this example, we set the y to 22 of an image.
	*
   	*var _my_element.y(22);
	*
	//now, let's 'get' the y value
	*console.log(_my_element.y()); //returns 22
    */
	_pt.y = function(p_val){
		if(p_val != null){
			this._y = p_val;
			return this;
		}else{
			return this._y || 1;
		}
	};

	/**
	* @memberOf DisplayObject#
	* @name width
    * @function
	* @param {Number} [value] - Value of the element's width.
    * @description 
    // width changes an object's width in pixels
	* @public 
	* @example 
	// In this example, we set the width to 222px.
	*
   	*var _my_element.width(222);
	*
	//now, let's 'get' the width value
	*console.log(_my_element.width()); //returns 222
    */
	_pt.width = function(p_val){
		if(p_val){
			this._width = p_val;
			return this;
		}else{
			return this._width;
		}
	};

	/**
	* @memberOf DisplayObject#
	* @name height
    * @function
	* @param {Number} [value] - Value of the element's height.
    * @description 
    // height changes an object's height in pixels
	* @public 
	* @example 
	// In this example, we set the height to 222px.
	*
   	*var _my_element.height(222);
	*
	//now, let's 'get' the height value
	*console.log(_my_element.height()); //returns 222
    */
	_pt.height = function(p_val){
		if(p_val){
			this._height = p_val;
			return this;
		}else{
			return this._height;
		}
	};
	

	/**
	* @memberOf DisplayObject#
	* @name scale
    * @function
	* @param {Number} [value] - Value of the element's scale in.
    * @description 
    // scale changes an object's scale aspect ratio in descimal percentage.
	* @public 
	* @example 
	// In this example, we set the scale to 200%.
	*
   	*var _my_element.scale(2);
	*
	//now, let's 'get' the scale value
	*console.log(_my_element.scale()); //returns 2
    */
	_pt.scale = function(p_val){
		if(p_val != null){
			this._scale = p_val;
			return this;
		}else{
			return this._scale || 1;
		}
	};
	_pt.rotate = function(p_val){
		if(p_val  != null){
			this._rotate = p_val;
			return this;
		}else{
			return this._rotate || 0;
		}
	};
	_pt.filter = function(){
		
		if(arguments != undefined && arguments.length > 0){
			this.resetFilter();
			this._filters = this._filters || [];
			var _temp_filter = {};
			_temp_filter.args = [];
			_temp_filter.effect = arguments[0];
			
			for (var i=1; i < arguments.length; i++) {
				_temp_filter.args.push(arguments[i]);
			}
			this._filters[_temp_filter.effect] = _temp_filter;
			return this;
		}else{
			return this._filters;
		}
	};
	
	_pt.collides = function(p_target,p_callback){
		var a = this, b = p_target;
		var _collide = a.x() < b.x() + b.width() &&
		         a.x() + a.width() > b.x() &&
		         a.y() < b.y() + b.height() &&
		         a.y() + a.height() > b.y();
		if(_collide)p_callback.call(this);
	};
	
	_pt.resetFilter = function(){
		this.filter_cache = null;
	};
	
	_pt.drag = function(p_func){
		return this.on('drag',p_func);
	};

	// =====================
	// = private functions =
	// =====================
	_pt._cleartrace = function(){
		if(this._trace_canvas){
			this._trace_canvas.canvas.width = this._trace_canvas.canvas.width;
		}
	};

	_pt._transform_reset = function(){
		
		this.transform.save();
		this.transform.setMatrix([1, 0, 0, 1, 0, 0]);
	};
	

	window.DisplayObject = DisplayObject;
	
}(window));
(function(window) {
	

	Loop = function(p_function,p_scope) {
		
		$$_canvas.bind('draw',p_function,p_scope || window);
		EventTarget.call(this);
		
	}


	var _pt = Loop.prototype = new EventTarget();
	
	_pt.constructor = Loop;

	// ====================
	// = Getter / Setters =
	// ====================

	
	// ====================
	// = public functions =
	// ====================
	
	
	

	// =====================
	// = private functions =
	// =====================
	

	
	window.Loop = Loop;
	
}(window));
/*
 * Transform tracker
 *
 * @author Kevin Moot <kevin.moot@gmail.com>
 * Based on a class created by Simon Sarris - www.simonsarris.com - sarris@acm.org
 */

(function(window) {
	


	
	Transform = function(context) {
	
		this.context = context;
	    this.matrix = [1,0,0,1,0,0]; //initialize with the identity matrix
	    this.stack = [];
	}

	var _pt = Transform.prototype;

	//==========================================
    // Constructor, getter/setter
    //==========================================    
    
    _pt.setContext = function(context) {
        this.context = context;
    };

    _pt.getMatrix = function() {
        return this.matrix;
    };
    
    _pt.setMatrix = function(m) {
        this.matrix = [m[0],m[1],m[2],m[3],m[4],m[5]];
        this.setTransform();
    };
    
    _pt.cloneMatrix = function(m) {
        return [m[0],m[1],m[2],m[3],m[4],m[5]];
    };
    
    //==========================================
    // Stack
    //==========================================
    
    _pt.save = function() {
        var matrix = this.cloneMatrix(this.getMatrix());
        this.stack.push(matrix);
        
        if (this.context) this.context.save();
    };

    _pt.restore = function() {
        if (this.stack.length > 0) {
            var matrix = this.stack.pop();
            this.setMatrix(matrix);
        }
        
        if (this.context) this.context.restore();
    };

    //==========================================
    // Matrix
    //==========================================

    _pt.setTransform = function() {
        if (this.context) {
            this.context.setTransform(
                this.matrix[0],
                this.matrix[1],
                this.matrix[2],
                this.matrix[3],
                this.matrix[4],
                this.matrix[5]
            );
        }
    };
    
    _pt.translate = function(x, y) {
        this.matrix[4] += this.matrix[0] * x + this.matrix[2] * y;
        this.matrix[5] += this.matrix[1] * x + this.matrix[3] * y;
        
        this.setTransform();
    };
    
    _pt.rotate = function(rad) {
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        var m11 = this.matrix[0] * c + this.matrix[2] * s;
        var m12 = this.matrix[1] * c + this.matrix[3] * s;
        var m21 = this.matrix[0] * -s + this.matrix[2] * c;
        var m22 = this.matrix[1] * -s + this.matrix[3] * c;
        this.matrix[0] = m11;
        this.matrix[1] = m12;
        this.matrix[2] = m21;
        this.matrix[3] = m22;
        
        this.setTransform();
    };

    _pt.scale = function(sx, sy) {
        this.matrix[0] *= sx;
        this.matrix[1] *= sx;
        this.matrix[2] *= sy;
        this.matrix[3] *= sy;
        
        this.setTransform();
    };
    
    //==========================================
    // Matrix extensions
    //==========================================

    _pt.rotateDegrees = function(deg) {
        var rad = deg * Math.PI / 180;
        this.rotate(rad);
    };

    _pt.rotateAbout = function(rad, x, y) {
        this.translate(x, y);
        this.rotate(rad);
        this.translate(-x, -y);
        this.setTransform();
    }

    _pt.rotateDegreesAbout = function(deg, x, y) {
        this.translate(x, y);
        this.rotateDegrees(deg);
        this.translate(-x, -y);
        this.setTransform();
    }
    
    _pt.identity = function() {
        this.matrix = [1,0,0,1,0,0];
        this.setTransform();
    };

    _pt.multiply = function(matrix) {
        var m11 = this.matrix[0] * matrix.m[0] + this.matrix[2] * matrix.m[1];
        var m12 = this.matrix[1] * matrix.m[0] + this.matrix[3] * matrix.m[1];

        var m21 = this.matrix[0] * matrix.m[2] + this.matrix[2] * matrix.m[3];
        var m22 = this.matrix[1] * matrix.m[2] + this.matrix[3] * matrix.m[3];

        var dx = this.matrix[0] * matrix.m[4] + this.matrix[2] * matrix.m[5] + this.matrix[4];
        var dy = this.matrix[1] * matrix.m[4] + this.matrix[3] * matrix.m[5] + this.matrix[5];

        this.matrix[0] = m11;
        this.matrix[1] = m12;
        this.matrix[2] = m21;
        this.matrix[3] = m22;
        this.matrix[4] = dx;
        this.matrix[5] = dy;
        this.setTransform();
    };

    _pt.invert = function() {
        var d = 1 / (this.matrix[0] * this.matrix[3] - this.matrix[1] * this.matrix[2]);
        var m0 = this.matrix[3] * d;
        var m1 = -this.matrix[1] * d;
        var m2 = -this.matrix[2] * d;
        var m3 = this.matrix[0] * d;
        var m4 = d * (this.matrix[2] * this.matrix[5] - this.matrix[3] * this.matrix[4]);
        var m5 = d * (this.matrix[1] * this.matrix[4] - this.matrix[0] * this.matrix[5]);
        this.matrix[0] = m0;
        this.matrix[1] = m1;
        this.matrix[2] = m2;
        this.matrix[3] = m3;
        this.matrix[4] = m4;
        this.matrix[5] = m5;
        this.setTransform();
    };
    
    
     //==========================================
    // Helpers
    //==========================================

    _pt.transformPoint = function(x, y) {
        return {
            x: x * this.matrix[0] + y * this.matrix[2] + this.matrix[4], 
            y: x * this.matrix[1] + y * this.matrix[3] + this.matrix[5]
        };
    };

	
	window.Transform = Transform;
	
}(window));



(function(window) {
	

	Events = function(p_canvas) {
		window.$$_EVENTS_CHILDREN = window.$$_EVENTS_CHILDREN || [];
		window.$$_EVENTS_DRAG_CHILDREN = window.$$_EVENTS_DRAG_CHILDREN || [];
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
		
		$$_EVENTS_CHILDREN.push({object:this,event:p_event,callback:p_callback});
		return this;
	}
	
	

	// =====================
	// = private functions =
	// =====================
	

	
	window.Events = Events;
	
}(window));
(function(window) {
	
	/**
	* //Bitmap class loads jpg/png/gif as a Bitmap Object on the canvas 
	* @class Bitmap
	* @extends DisplayObject
	* @constructor
	* @example
	*/



    
	Bitmap = function(p_context) {
		
		EventTarget.call(this);
		this._context = p_context;
		this.extend(this, new Events());
		this.extend(this, new Animate());
		this.transform = new Transform(this._context);
		this._lastDrawState = "";
		
	};

	var _pt = Bitmap.prototype = new DisplayObject();
	
	_pt.constructor = Bitmap;
	
	_pt.init = function(){
		this.x(0);
		this.y(0);
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

		this.transform.context.drawImage(_to_draw,0,0);
		
		this._lastDrawState = _to_draw;
	
		
		this.transform.restore();
		
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

		this._dataurl_canvas = this._dataurl_canvas || Util.createContext("dataurl_"+this.id());
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
	
	
	_pt.mouseDraw =  function(){

		this._mouse_canvas = this._mouse_canvas || Util.createContext("mouse_"+this.id());
		this._mouse_transform = this._mouse_transform || new Transform(this._mouse_canvas.context);
		this._mouse_transform.save();
		this._mouse_transform.setMatrix([1, 0, 0, 1, 0, 0]);
		this._mouse_canvas.context.clearRect(0, 0, this._mouse_canvas.canvas.width, this._mouse_canvas.canvas.height );
		this._mouse_transform.translate(this.x(),this.y());
		var _w = (this.width()/this.orig_width),
		_h = (this.height()/this.orig_height),
		_m2 = this._mouse_transform.getMatrix();
		this._mouse_transform.rotate(this.rotate());
		this._mouse_transform.scale((this.width()/this.orig_width)*this.scale(),(this.height()/this.orig_height)*this.scale());
		this._mouse_transform.context.globalAlpha = this.alpha();
		this._applyShadow(this._mouse_transform.context);
		this._mouse_canvas.context.drawImage(this._src,0,0);
		return this._mouse_canvas.context;
	};

	_pt.trace = function(p_val){
		
		if(p_val === false) this._cleartrace();
		
		if(p_val != null){
			this._trace = p_val;
			return this;
		}else{
			return this._trace ||  false;
		}
		
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
				_this.bind('draw',_this.draw,_this);
				_this.ready(true);
				_this.draw();
				_this.fire("loaded");
				
			};
			
		})(this,p_path);
	};
	
	_pt._handle_filters = function(p_disp_data){
		var _to_draw;
		if(this.filter() && !this.filter_cache){
			// if filter is present and there's no cached filter, let's create one.
			if(this._filter_canvas) Util.removeElement(this._filter_canvas.canvas.id);
			this._filter_canvas = this._filter_canvas || Util.createContext("filter_"+this.id());
			this._filter_canvas.canvas.width = this.orig_width;
			this._filter_canvas.canvas.height = this.orig_height;
			if(this.trace()){
				this._filter_canvas.context.drawImage(p_disp_data,-this.x(),-this.y());
			}else{
				this._filter_canvas.context.drawImage(p_disp_data,0,0);
			}
			
			for(var key in  this.filter()){
				
				_to_draw = Filter.get(this._filter_canvas,this.filter()[key],this);
				this.filter_cache = _to_draw;
			}
			//
		}else if(this.filter_cache){
			//if filter cahce is present let's use it
			_to_draw = this.filter_cache;
			
		}else{
			//if filter isn't on, let's set the variable to parameter passed in
			_to_draw =  p_disp_data;
		}
		
		//if trace is on, let's create a trace canvas for the filter.
		if(this.trace() && this.filter()){
			_to_draw = this._handle_trace(1,1, _to_draw, "filter");
		}
		
		return _to_draw;
	};
	
	_pt._handle_trace = function(p_w, p_h, p_src, p_key){
		//traceing the animation
		var _trace_canvas = this["trace_"+this.id()+"_"+p_key] || Util.createContext("trace_"+this.id()+"_"+p_key);
		this["trace_"+this.id()+"_"+p_key] = _trace_canvas;
		var _trace_transform = this["trace_transfrom_"+this.id()+"_"+p_key] || new Transform(_trace_canvas.context);
		this["trace_transfrom_"+this.id()+"_"+p_key] = _trace_transform;
		_trace_transform.save();
		_trace_transform.setMatrix([1, 0, 0, 1, 0, 0]);
		_trace_transform.translate(this.x(),this.y());
		_trace_transform.rotate(this.rotate());
		_trace_transform.scale(p_w*this.scale(),p_h*this.scale());
		_trace_transform.context.globalAlpha = this.alpha();
		this._applyStroke(_trace_canvas.context,{x:0,y:0,w:this.orig_width,h:this.orig_height});
		this._applyShadow(_trace_transform.context);
		_trace_canvas.context.drawImage(p_src,0,0);
		return _trace_canvas.canvas;
	};
	
	_pt._handle_basic = function(p_w, p_h){
		
		//non tracing animation
		this.transform.context.globalAlpha = this.alpha();
		this._applyStroke(this.transform.context,{x:this.x(),y:this.y(),w:this.width(),h:this.height()});
		this.transform.translate(this.x(),this.y());
		this.transform.rotate(this.rotate());
		this.transform.scale(p_w*this.scale(),p_h*this.scale());
		
		this._applyShadow(this.transform.context);
		return this._src;
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
(function(window) {
	

	/**
	* //Path class helps draw a path
	* @class Path
	* @extends EventTarget
	* @constructor
	*/
	
	Path = function(p_context) {
		
		EventTarget.call(this);
		this._paths = this._paths || [];
		this._context = p_context;
		this.transform = new Transform(this._context);
		
	}	

	var _pt = Path.prototype = new EventTarget();
	
	_pt.constructor = Path;
	
	_pt.init = function(){
		this.bind('draw',this.draw,this);
	}
	_pt.width = function(p_val){
		if(p_val){
			this._width = p_val;
			return this;
		}else{
			return this._width;
		}
	}
	_pt.color = function(p_color){
		
		if(p_color != null){
			this._color = p_color;
			return this;
		}else{
			return this._color || "#000";
		}
	
	}
	
	_pt.beginPath = function(p_x,p_y){
		
		this._p_startX = p_x;
		this._p_startY = p_y;
		
		return this;
	}
	
	_pt.style = function(p_obj){
		
		
		if(p_obj.width) this.width(p_obj.width);
		if(p_obj.color) this.color(p_obj.color);
		
		return this;
	}
	
	_pt.to = function(p_x,p_y){
		
		
		this._paths.push({x:p_x,y:p_y});
		return this;
	}
	
	_pt.end = function(p_tf){
		
		
		if(p_tf != null){
			this._end = p_tf;
			return this;
		}else{
			return this._end || false;
		}
		
	}
	
	_pt.draw = function(p_val){
		
		
	
		this.transform.save();
		this.transform.setMatrix([1, 0, 0, 1, 0, 0]);
		
		
		this.transform.context.beginPath();
		this.transform.context.moveTo(this._p_startX,this._p_startY);
		for (var i=0; i < this._paths.length; i++) {
			if(this._paths[i] != null) this.transform.context.lineTo(this._paths[i].x,this._paths[i].y);
		};
		this.transform.context.strokeStyle   = this.color() || '#000';
		this.transform.context.lineWidth   = this.width() || 1;

		this.transform.context.globalAlpha = this.alpha();
		this._applyShadow(this.transform.context);
		if(this.end()) this.transform.context.closePath();
		this.transform.context.stroke();
		
		this.transform.restore();
	
		
		
		
		return this;
	};
	

	// =====================
	// = private functions =
	// =====================
	

	
	
	_pt.name = "Path Instance";
	
	window.Path = Path;
	
}(window));

(function(window) {


	/**
	* //Sprite class helps draw a Sprite
	* @class Sprite
	* @extends Bitmap
	* @constructor
	*/

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
		this._lastDrawState = "";
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
		this._sprite_canvas = this._sprite_canvas || Util.createContext("sprite_" + this.id());
		if (this.iterate < this._curSequence.end - 1) {
			if (this.gotoAndStop() !== null) {
				this.iterate = this.gotoAndStop();
			} else {
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
			this.draw();
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
			this.draw();
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
		this.draw();
		return this;
	};



	_pt.name = "Sprite Instance";

	window.Sprite = Sprite;

}(window));

(function(window) {
	
	/**
	* //Rectangle class helps draw a Rectangle
	* @class Rectangle
	* @extends DisplayObject
	* @constructor
	*/
	
	Rectangle = function(p_context) {
		
		EventTarget.call(this);
		this._context = p_context;
		this.extend(this, new Events());
		this.extend(this, new Animate());
		this.transform = new Transform(this._context);
		this.ctx = this.transform.context;
		
	};

	var _pt = Rectangle.prototype = new DisplayObject();
	
	_pt.constructor = Rectangle;
	
	_pt.init = function(){
		this.x(0);
		this.y(0);
		this.ready(true);
		this.bind('draw',this.draw,this);
	};

	_pt.draw = function(p_val){
	
		this._transform_reset();
		this.fire("beginDraw");
		this.transform.translate(this.x(),this.y());
		this.transform.rotate(this.rotate());
		
		this.transform.scale(1*this.scale(),1*this.scale());
	
		this._applyShadow(this.ctx);
		this.ctx.fillStyle   = this.color();
		this.ctx.globalAlpha = this.alpha();
		this.ctx.beginPath();
		this.ctx.moveTo(this.x() + this.radius(), this.y());
		this.ctx.lineTo(this.x() + this.width() - this.radius(), this.y());
		this.ctx.quadraticCurveTo(this.x() + this.width(), this.y(), this.x() + this.width(), this.y() + this.radius());
		this.ctx.lineTo(this.x() + this.width(), this.y() + this.height() - this.radius());
		this.ctx.quadraticCurveTo(this.x() + this.width(), this.y() + this.height(), this.x() + this.width() - this.radius(), this.y() + this.height());
		this.ctx.lineTo(this.x() + this.radius(), this.y() + this.height());
		this.ctx.quadraticCurveTo(this.x(), this.y() + this.height(), this.x(), this.y() + this.height() - this.radius());
		this.ctx.lineTo(this.x(), this.y() + this.radius());
		this.ctx.quadraticCurveTo(this.x(), this.y(), this.x() + this.radius(), this.y());
		this.ctx.closePath();
		this.ctx.fill();

		this.transform.restore();
		this.fire("finishDraw");

		return this;
	};

	_pt.mouseDraw =  function(){

		this._mouse_canvas = this._mouse_canvas || Util.createContext("mouse_"+this.id());
		this._mouse_transform = this._mouse_transform || new Transform(this._mouse_canvas.context);
		this._mouse_transform.save();
		this._mouse_transform.setMatrix([1, 0, 0, 1, 0, 0]);
		this._mouse_canvas.context.clearRect(0, 0, this._mouse_canvas.canvas.width, this._mouse_canvas.canvas.height );
		this._mouse_transform.translate(this.x(),this.y());
		var _w = (this.width()/this.orig_width),
		_h = (this.height()/this.orig_height),
		_m2 = this._mouse_transform.getMatrix();
		this._mouse_transform.rotate(this.rotate());
		this._mouse_transform.scale((this.width()/this.orig_width)*this.scale(),(this.height()/this.orig_height)*this.scale());
		this._mouse_transform.context.globalAlpha = this.alpha();
		this._applyShadow(this._mouse_transform.context);
		this._mouse_canvas.context.fillStyle   = this.color();
		this._mouse_canvas.context.globalAlpha = this.alpha();
		this._mouse_canvas.context.fillRect(0,   0, this.width(), this.height());
		return this._mouse_canvas.context;
	};

	

	_pt.color = function(p_val){
		if(p_val != null){
			this._color = p_val;
			return this;
		}else{
			return this._color;
		}
	};

	_pt.radius = function(p_val){
		if(p_val != null){
			this._radius = p_val;
			return this;
		}else{
			return this._radius || 0;
		}
	};

	// =====================
	// = private functions =
	// =====================

	
	_pt.name = "Rectangle Instance";
	
	window.Rectangle = Rectangle;
	
}(window));



(function(window){
	
	FrameTicker = function() {
		this.init();
		this.timerID = 0;
		this.timers = [];
		this.on = true;
		EventTarget.call(this);
	};
	
	var _pt = FrameTicker.prototype = new EventTarget();
	
	
	_pt.constructor = FrameTicker;

	_pt.init = function(){
		window.requestAnimFrame = (function(){
	      return  window.requestAnimationFrame       || 
	              window.webkitRequestAnimationFrame || 
	              window.mozRequestAnimationFrame    || 
	              window.oRequestAnimationFrame      || 
	              window.msRequestAnimationFrame     || 
	              function(/* function */ callback, /* DOMElement */ element){
	                window.setTimeout(callback, 1000 / 60);
	              };
	    })();
	};
	

	_pt.start = function(p_framerate){
		if (this.timerID) return;
		var _this = this;
		(function() {
				
				var _scrope = arguments.callee;
				if(_this.on){
					_this._requestTimeout(function(){
						_this.fire("tick");
						_this.timerID = window.requestAnimFrame(_scrope);
					}, p_framerate);
					
				} 


		})();
		return _this;
	};

	
	_pt.stop = function(){
		this.on = false;
	};

	_pt._requestTimeout = function(fn, delay){

		if( !window.requestAnimationFrame      	&& 
		!window.webkitRequestAnimationFrame && 
		!(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
		!window.oRequestAnimationFrame      && 
		!window.msRequestAnimationFrame)
			return window.setTimeout(fn, delay);

		var start = new Date().getTime(),
			handle = new Object();

		function loop(){
			var current = new Date().getTime(),
				delta = current - start;

			delta >= delay ? fn.call() : handle.value = requestAnimFrame(loop);
		};

		handle.value = requestAnimFrame(loop);
		return handle;

	};
	

	window.FrameTicker = FrameTicker;
	
}(window));











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
(function(window) {
	

	
	
	Canvas = function(p_canvas) {
		
		EventTarget.call(this);
		
		this._canvas = document.getElementById(p_canvas);
		this._canvas.width = this.canvas().getAttribute("width") || window.innerWidth;
		this._canvas.height = this.canvas().getAttribute("height") || window.innerHeight;

		if (!this._canvas||!this._canvas.getContext)throw "No Canvas Support.";

		
		this.context( this._canvas.getContext("2d") );
		this.context().translate(0,0);
		this.framerate( this.canvas().getAttribute("framerate") || 0 );
		this._engine = new FrameTicker();
		this._engine.start(this.framerate()).bind("tick",this._childrenDraw,this);
		
		
		this.init();
	};

	var _pt = Canvas.prototype = new EventTarget();
	
	_pt.constructor = Canvas;
	
	_pt.init = function(){
		
		HTMLCanvasElement.prototype.relMouseCoords = function (event) {
			var totalOffsetX = 0; totalOffsetY = 0; canvasX = 0; canvasY = 0; currentElement = this;

		do {
			totalOffsetX += currentElement.offsetLeft;
			totalOffsetY += currentElement.offsetTop;
		}
		while (currentElement = currentElement.offsetParent)

		canvasX = event.pageX - totalOffsetX;
		canvasY = event.pageY - totalOffsetY;

		// Fix for variable canvas width
		canvasX = Math.round( canvasX * (this.width / this.offsetWidth) );
		canvasY = Math.round( canvasY * (this.height / this.offsetHeight) );

		return {x:canvasX, y:canvasY};
		};
		
		var _scope = this;
		if ( document.addEventListener) {
			
			document.addEventListener("mouseup", function(p_e) { _scope._MouseUpHandler(p_e); }, false);
			document.addEventListener("mousemove", function(p_e) { _scope._MouseMoveHandler(p_e); }, false);
			document.addEventListener("onkeydown", function(p_e) { _scope._keyDownHandler(p_e); }, false);
			document.onkeydown = _scope._keyDownHandler;
			document.onkeypress = _scope._keyDownHandler;
			document.onkeyup = _scope._keyDownHandler;
			
		} else if (window.addEventListener) {
			window.addEventListener("mouseup", function(p_e) { _scope._MouseUpHandler(p_e); }, false);
			window.addEventListener("mousemove", function(p_e) { _scope._MouseMoveHandler(p_e); }, false);
			window.addEventListener("onkeydown", function(p_e) { _scope._keyDownHandler(p_e); }, false);
			window.onkeydown = _scope._keyDownHandler;
			window.onkeypress = _scope._keyDownHandler;
			window.onkeyup = _scope._keyDownHandler;
		}
		this._canvas.addEventListener("mousedown", function(p_e) { _scope._MouseDownHandler(p_e); }, false);
		
		
		
		
	};
	
	_pt.width = function(p_val){
		if(p_val){
			this._width = p_val;
			return this;
		}else{
			return this._width;
		}
	};
	_pt.height = function(p_val){
		if(p_val){
			this._height = p_val;
			return this;
		}else{
			return this._height;
		}
	};
	_pt.framerate = function(p_val){
		if(p_val){
			this._framerate = p_val;
			return this;
		}else{
			return this._framerate || 6;
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

	_pt.canvas = function(p_val){
		if(p_val){
			this._canvas = p_val;
			return this;
		}else{
			return this._canvas;
		}
	};
	
	

	// ====================
	// = private function =
	// ====================
	_pt._childrenDraw = function(){
		
		this.fire("draw");
		this.context().clearRect(0, 0, this._canvas.width, this._canvas.height);
	
		for (var i=0; i < $$_CHILDREN.length; i++) {
			if($$_CHILDREN[i].visible()) $$_CHILDREN[i].fire("draw");
			
		}
		
	};
	
	_pt._keyDownHandler = function(p_e){
		for (var i = $$_EVENTS_CHILDREN.length - 1; i >= 0; i--){
			if($$_EVENTS_CHILDREN[i].event === p_e.type){
				$$_EVENTS_CHILDREN[i].callback.call($$_EVENTS_CHILDREN[i].object,p_e);
			}
		}
	};
	
	_pt._MouseDownHandler = function(p_e,f){
		var _coords = this.canvas().relMouseCoords(p_e), _mx = _coords.x, _my = _coords.y, _scope = this;
		for (var i = $$_EVENTS_CHILDREN.length - 1; i >= 0; i--){
			if($$_EVENTS_CHILDREN[i].event === "click"){
				
				if(Util.checkPIXEL($$_EVENTS_CHILDREN[i].object,_mx, _my)){
					
					$$_EVENTS_CHILDREN[i].callback.call($$_EVENTS_CHILDREN[i].object);
					
				}
			}
			// ========================
			// = drag and drop events =
			// ========================
			if($$_EVENTS_CHILDREN[i].event === "drag" && !$$_EVENTS_DRAG_CHILDREN[$$_EVENTS_CHILDREN[i].object.id()+"_obj"]){
				
				if(Util.checkPIXEL($$_EVENTS_CHILDREN[i].object,_mx, _my)){
					var _temp = $$_EVENTS_DRAG_CHILDREN[($$_EVENTS_CHILDREN[i].object.id()+"_obj")] = $$_EVENTS_CHILDREN[i];
					_temp.clickX = _mx;
					_temp.clickY = _my;
					_temp.pastX = _temp.object.x();
					_temp.pastY = _temp.object.y();
					$$_EVENTS_CHILDREN[i].callback.call($$_EVENTS_CHILDREN[i].object,{eventType:"onStart"});
					return;
				}

			}
		}
		
	};
	_pt._MouseUpHandler = function(p_e){
	
		for(obj in $$_EVENTS_DRAG_CHILDREN){
			if($$_EVENTS_DRAG_CHILDREN[obj].event === "drag"){
				$$_EVENTS_DRAG_CHILDREN[obj].callback.call($$_EVENTS_DRAG_CHILDREN[obj].object,{eventType:"onFinished"});
				delete $$_EVENTS_DRAG_CHILDREN[obj];
			}
		}
	};
	_pt._MouseMoveHandler = function(p_e){
		
		var _coords = this.canvas().relMouseCoords(p_e), _mx = _coords.x, _my = _coords.y, _scope = this, _X, _Y;
		// =========
		// = hover =
		// =========
		for (var i = $$_EVENTS_CHILDREN.length - 1; i >= 0; i--){
			if($$_EVENTS_CHILDREN[i].event === "hover"){
				
				if(Util.checkPIXEL($$_EVENTS_CHILDREN[i].object,_mx, _my)){
					
					$$_EVENTS_CHILDREN[i].callback.call($$_EVENTS_CHILDREN[i].object);
					
				}
			}
	
			
		}
		// ========
		// = drag =
		// ========
		for(obj in $$_EVENTS_DRAG_CHILDREN){
			if($$_EVENTS_DRAG_CHILDREN[obj].event === "drag"){
				var _obj = $$_EVENTS_DRAG_CHILDREN[obj];
				_X = _mx - Math.abs(_obj.pastX - _obj.clickX);
				_Y = _my - Math.abs(_obj.pastY - _obj.clickY);

				_obj.object.x(_X);
				_obj.object.y(_Y);
				
				$$_EVENTS_DRAG_CHILDREN[obj].callback.call(_obj.object,{eventType:"onUpdate"});
				_obj.clickX = _mx;
				_obj.clickY = _my;
				_obj.pastX = _obj.object.x();
				_obj.pastY = _obj.object.y();
			}
		}
	};
	
	
	
	window.Canvas = Canvas;
	
}(window));

(function(window) {
	

	Element = function(p_class, p_def) {
		
		
		if(p_class){
			
			window.$$_CHILDREN = window.$$_CHILDREN || [];
			window.$$_TWEENS = window.$$_TWEENS || {};
			window.$$_canvas = window.$$_canvas || new Canvas( this.canvas_id() || "element-root" );
			
			var _temp = eval("new "+p_class+"(window.$$_canvas.context())");
			
				_temp = this.extend(_temp, new Element());
				_temp.id((window.$$_CHILDREN.length)+"_id");
				_temp.index((window.$$_CHILDREN.length));
				_temp.visible(true);
				_temp.alpha(1);
				_temp._tweenie = new Tweenie();
				if(typeof _temp.init === "function") _temp.init();
				window.$$_CHILDREN.push(_temp);
				_temp._handelDefinition(p_def, _temp);

			return _temp;
		}
		
		
	};

	var _pt = Element.prototype = new Basic();
	
	

	// ====================
	// = Getter / Setters =
	// ====================
	
	_pt.alpha = function(p_val){
		if(p_val != null){
			this._alpha = p_val;
			return this;
		}else{
			return this._alpha;
		}
	}
	
	_pt.visible = function(p_val){
		if(p_val != null){
			this._visible = p_val;
			return this;
		}else{
			return this._visible;
		}
	}
	_pt.mask = function(p_val){
		if(p_val){
			this._mask = p_val;
			return this;
		}else{
			return this._mask;
		}
	}
	
	_pt.id = function(p_val){
		if(p_val){
			this._id = p_val;
			return this;
		}else{
			return this._id ;
		}
	}
	_pt.canvas_id = function(p_val){
		if(p_val){
			this._id = p_val;
			return this;
		}else{
			return this._id ;
		}
	}
	_pt.index = function(p_val){
		if(p_val != null){
			this._index = p_val;
			return this;
		}else{
			return this._index;
		}
	}
	_pt.ready = function(p_val){
		if(p_val){
			this._ready = p_val;
			return this;
		}else{
			return this._ready || false;
		}
	}
	_pt.shadow = function(p_val){
		if(p_val){
			this._shadow = p_val;
			return this;
		}else{
			return this._shadow || {};
		}
	}
	_pt.border = function(p_val){
		if(p_val){
			this._border = p_val;
			return this;
		}else{
			return this._border || {width:0,color:null};
		}
	}
	
	_pt.top = function(){
		var _i = Util.getIndex(this);
		var _childtotop = $$_CHILDREN.splice(_i,1);
		$$_CHILDREN.push(_childtotop[0]);
		return this;
	}
	
	_pt.bottom = function(){
		var _i = Util.getIndex(this);
		var _childtotop = $$_CHILDREN.splice(_i,1);
		$$_CHILDREN.unshift(_childtotop[0]);
		return this;
	}
	
	
	// ====================
	// = public functions =
	// ====================
	
	
	
	_pt.toString = function(){
		return "["+this.name+" Instance]"
	};
	
	
	
	// =====================
	// = private functions =
	// =====================
	
	_pt._applyStroke = function(p_context,p_cords){
		if(this.border().color != null){
			var _c = p_context, _b = this.border(), loc = p_cords;
			_c.beginPath();
			_c.rect(loc.x, loc.y, loc.w, loc.h);
			_c.strokeStyle = _b.color;
			_c.lineWidth = _b.width;
			_c.closePath();
			_c.stroke();
			
			
		}
	}
	
	_pt._applyShadow = function(p_context){
		if(this.shadow().color != null){
			var _c = p_context, _s = this.shadow(), _color = Util.hexToRGB(_s.color);
			
			_c.shadowColor   = 'rgba('+_color.r+', '+_color.b+', '+_color.g+', '+(_s.alpha || 1)+')';
			_c.shadowBlur    = _s.blur;
			_c.shadowOffsetX = _s.x;
			_c.shadowOffsetY = _s.y;
	
			
		}
	};

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
/*! Element.js >>--E-->
 * documentation: www.elementjs.com
 * 
 */

/* Put all major classes here for build. Main.js is required at the top of the stack.
* @depends ../www/sandbox/lib/js/Element/util.js
* @depends ../www/sandbox/lib/js/Element/Basic.js
* @depends ../www/sandbox/lib/js/Element/Animate.js
* @depends ../www/sandbox/lib/js/Element/EventTarget.js
* @depends ../www/sandbox/lib/js/Element/Filter.js
* @depends ../www/sandbox/lib/js/Element/DisplayObject.js
* @depends ../www/sandbox/lib/js/Element/Loop.js
* @depends ../www/sandbox/lib/js/Element/Transform.js
* @depends ../www/sandbox/lib/js/Element/Events.js
* @depends ../www/sandbox/lib/js/Element/types/Bitmap.js
* @depends ../www/sandbox/lib/js/Element/types/Path.js
* @depends ../www/sandbox/lib/js/Element/types/Sprite.js
* @depends ../www/sandbox/lib/js/Element/types/Rectangle.js
* @depends ../www/sandbox/lib/js/Element/FrameTicker.js
* @depends ../www/sandbox/lib/js/Element/Tweenie.js
* @depends ../www/sandbox/lib/js/Element/canvas.js
* @depends ../www/sandbox/lib/js/Element/element.js
 */


