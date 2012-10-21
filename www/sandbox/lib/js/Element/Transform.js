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


