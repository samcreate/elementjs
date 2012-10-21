/*! main class
 * @depends jquery/jquery-1.6.1.min.js
 */
var CHANGE_ME  = CHANGE_ME || {};
CHANGE_ME.main = function(){
	// =================================================
	// = Private variables (example: var _foo = bar; ) =
	// =================================================
	var _queue = [];
	
	
	// =================================================
	// = public functions                              =
	// =================================================
	var self = {
		
		init : function(){
			
				debug.time( 'Initialization time');
			
 				debug.group("# [main.js]");
				
				debug.log('- initialized');
				
				$('html').removeClass('no-js'); 
			    		
				debug.groupEnd();
				
				_run();
		},
		queue : function(f){
			
			if (arguments.length > 0) {
				for (var i = 0; i < arguments.length; i++) {
					_queue.push(arguments[i]);
				}
			}
			
		}
	
	};
	
	return self;
	
	// ================================================
	// = Private functionse (function _private() {} ) =
	// ================================================
	
	function _run(){
		//everything is init'ed here 
		
		for (var i = 0; i < _queue.length; i++) {
			try{
			   _queue[i](); 
			}catch(e){
			  debug.error(e);  
			}
        	
        }
		debug.timeEnd( 'Initialization time');
	}
	
}();

/*
 * JavaScript Debug - v0.4 - 6/22/2010
 * http://benalman.com/projects/javascript-debug-console-log/
 * With lots of help from Paul Irish!
 * http://paulirish.com/
 */

window.debug=(function(){var i=this,b=Array.prototype.slice,d=i.console,h={},f,g,m=9,c=["error","warn","info","debug","log"],l="assert clear count dir dirxml exception group groupCollapsed groupEnd profile profileEnd table time timeEnd trace".split(" "),j=l.length,a=[];while(--j>=0){(function(n){h[n]=function(){m!==0&&d&&d[n]&&d[n].apply(d,arguments)}})(l[j])}j=c.length;while(--j>=0){(function(n,o){h[o]=function(){var q=b.call(arguments),p=[o].concat(q);a.push(p);e(p);if(!d||!k(n)){return}d.firebug?d[o].apply(i,q):d[o]?d[o](q):d.log(q)}})(j,c[j])}function e(n){if(f&&(g||!d||!d.log)){f.apply(i,n)}}h.setLevel=function(n){m=typeof n==="number"?n:9};function k(n){return m>0?m>n:c.length+m<=n}h.setCallback=function(){var o=b.call(arguments),n=a.length,p=n;f=o.shift()||null;g=typeof o[0]==="boolean"?o.shift():false;p-=typeof o[0]==="number"?o.shift():n;while(p<n){e(a[p++])}};return h})();

$(document).ready(function() {
	
 CHANGE_ME.main.init();

});

