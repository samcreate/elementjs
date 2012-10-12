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
				
				_run();
				//--> eof private functions
			    		
				debug.groupEnd();

		}
		
	};
	
	return self;
	
	// ================================================
	// = Private functionse (function _private() {} ) =
	// ================================================


	function _run () {

		//
		SyntaxHighlighter.all();
		
		var fire = new Element("Sprite").canvas_id('element-root2').src("/media/animation/fire.png","/media/animation/fire.json",2).loop(true);

		

	}
	
}();
EJS.main.queue(EJS.homePage.init);


