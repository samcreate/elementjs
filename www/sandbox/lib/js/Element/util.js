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