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