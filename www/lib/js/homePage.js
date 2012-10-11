/*! homePage class
 * Put javascript plugin depedencies below (see main.js for an exmaple)
 * 
 */
var EJS = EJS || {};
EJS.homePage = function(){
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
				SyntaxHighlighter.all();
				//--> eof private functions
			    		
				debug.groupEnd();

		}
		
	};
	
	return self;
	
	// ================================================
	// = Private functionse (function _private() {} ) =
	// ================================================
	
}();
EJS.main.queue(EJS.homePage.init);


