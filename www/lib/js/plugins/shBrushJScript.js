/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 * 
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
;(function()
{
	// CommonJS
	typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

	function Brush()
	{
		var keywords =	'break case catch continue ' +
						'default delete do else false  ' +
						'for function if in instanceof ' +
						'new null return super switch ' +
						'this throw true try typeof while with'
						;
		var blue = 'gotoAndStop run gotoAndPlay src x y width height scale animate filter on to start alpha border mask index pause ready mask easing id extend visible transform time toString top shadow loop';
		var offwhite = 'var';
		var orange = 'equals  = ';
		var yellowish = 'Element script canvas';
		var lightyellowish ='';
		var red = 'random ';

		var r = SyntaxHighlighter.regexLib;
		
		this.regexList = [
			{ regex: r.multiLineDoubleQuotedString,					css: 'string' },			// double quoted strings
			{ regex: r.multiLineSingleQuotedString,					css: 'string' },			// single quoted strings
			{ regex: r.singleLineCComments,							css: 'comments' },			// one line comments
			{ regex: r.multiLineCComments,							css: 'comments' },			// multiline comments
			//{ regex: /\s*#.*/gm,									css: 'preprocessor' },		// preprocessor tags like #region and #endregion
			{ regex: new RegExp(this.getKeywords(keywords), 'gm'),	css: 'keyword' },
			{ regex: new RegExp(this.getKeywords(blue), 'gm'),	css: 'blue' },
			{ regex: new RegExp(this.getKeywords(offwhite), 'gm'),	css: 'offwhite' },
			{ regex: /No support for canvas was detected, human./gi,	css: 'offwhite' },
			{ regex: new RegExp(this.getKeywords(orange), 'gm'),css: 'orange' },
			{ regex: new RegExp(this.getKeywords(yellowish), 'gm'),css: 'yellowish' },//
			{ regex: /\b([\d]+(\.[\d]+)?|0x[a-f0-9]+)\b/gi,css: 'blue' },//numbers
			{ regex: new RegExp(this.getKeywords(red), 'gm'),css: 'red' },//
			{ regex: /<|>|src=|type=|charset=|framerate=| id=/gi,css: 'lightyellowish' }
						// keywords
			];
	
		this.forHtmlScript(r.scriptScriptTags);
	};

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['js', 'jscript', 'javascript'];

	SyntaxHighlighter.brushes.JScript = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
