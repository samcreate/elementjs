/*! homePage class
 * Put javascript plugin depedencies below (see main.js for an exmaple)
 * 
 */
var CHANGE_ME = CHANGE_ME || {};
CHANGE_ME.homePage = function(){
	// =================================================
	// = Private variables (example: var _foo = bar; ) =
	// =================================================

	
	
	// =================================================
	// = public functions                              =
	// =================================================
	var self = {
		
		init : function(){
	
				debug.group("# [homePage.js]");
				
				debug.log('- initialized'); 
				
				//--> sof private functions
				
				//--> eof private functions
			    		
				debug.groupEnd();

		}
		
	};
	
	return self;
	
	// ================================================
	// = Private functionse (function _private() {} ) =
	// ================================================
	
}();
CHANGE_ME.main.queue(CHANGE_ME.homePage.init);


