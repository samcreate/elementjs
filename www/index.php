<?php
	require_once 'lib/php/Config.php';
	$settings = Config::getInstance();
	$settings->setPage("HomePage");
	require_once 'lib/php/includes/html_header.php';
?>
		<div id="MainContent" role="main">
			<dl class="steps">
	
				<dt class="water">Step 1:</dt>
					<dd>
						<!-- <pre class="brush: js; gutter: false; ">

							<script src="element.js" type="text/javascript" charset="utf-8"></script>

							//Include Element.js to your document.
						</pre> -->
						<div><div id="highlighter_707907" class="syntaxhighlighter nogutter  js"><div class="toolbar"><span><a href="#" class="toolbar_item command_help help">?</a></span></div><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="code"><div class="container"><div class="line number1 index0 alt2"><code class="js lightyellowish">&lt;</code><code class="js yellowish">script</code> <code class="js lightyellowish">src=</code><code class="js string">"element.js"</code> <code class="js lightyellowish">type=</code><code class="js string">"text/javascript"</code> <code class="js lightyellowish">charset=</code><code class="js string">"utf-8"</code><code class="js lightyellowish">&gt;</code><code class="js lightyellowish">&lt;</code><code class="js plain">/</code><code class="js yellowish">script</code><code class="js lightyellowish">&gt;</code></div><div class="line number2 index1 alt1">&nbsp;</div><div class="line number3 index2 alt2"><code class="js comments">//Include Element.js to your document.</code></div></div></td></tr></tbody></table></div></div>
					</dd>
	
				<dt class="fire">Step 2:</dt>
					<dd>
						<!-- <pre class="brush: js; gutter: false; ">

							<canvas id="element-root" framerate="10"> No support for canvas was detected, human. </canvas>

							//First step is to add a canvas element to your page with an id of “element-root”.
							//For framerate, height and width of your project is all based on the “meta-data” 
							//that you add to the canvas element.
						</pre> -->
						<div><div id="highlighter_28919" class="syntaxhighlighter nogutter  js"><div class="toolbar"><span><a href="#" class="toolbar_item command_help help">?</a></span></div><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="code"><div class="container"><div class="line number1 index0 alt2"><code class="js lightyellowish">&lt;</code><code class="js yellowish">canvas</code> <code class="js lightyellowish">id=</code><code class="js string">"element-root"</code> <code class="js lightyellowish">framerate=</code><code class="js string">"10"</code> <code class="js blue">width</code><code class="js plain">=</code><code class="js string">"1279"</code> <code class="js blue">height</code><code class="js plain">=</code><code class="js string">"1385"</code><code class="js lightyellowish">&gt;</code> <code class="js offwhite">No support for canvas was detected, human.</code> <code class="js lightyellowish">&lt;</code><code class="js yellowish">canvas</code> <code class="js lightyellowish">id=</code><code class="js string">"element-canvas_sprite_0_id"</code> <code class="js plain">style=</code><code class="js string">"display: none;"</code> <code class="js blue">width</code><code class="js plain">=</code><code class="js string">"740"</code> <code class="js blue">height</code><code class="js plain">=</code><code class="js string">"460"</code><code class="js lightyellowish">&gt;</code><code class="js lightyellowish">&lt;</code><code class="js plain">/</code><code class="js yellowish">canvas</code><code class="js lightyellowish">&gt;</code><code class="js lightyellowish">&lt;</code><code class="js plain">/</code><code class="js yellowish">canvas</code><code class="js lightyellowish">&gt;</code></div><div class="line number2 index1 alt1">&nbsp;</div><div class="line number3 index2 alt2"><code class="js comments">//First step is to add a canvas element to your page with an id of “element-root”.</code></div><div class="line number4 index3 alt1"><code class="js comments">//For framerate, height and width of your project is all based on the “meta-data” </code></div><div class="line number5 index4 alt2"><code class="js comments">//that you add to the canvas element.</code></div></div></td></tr></tbody></table></div></div>
					</dd>
	
				<dt class="atom">Step 3:</dt>
					<dd>
						<!-- <pre class="brush: js; gutter: false; ">

							var fire = new Element("Sprite",{
								src  : "fire.png, fire.json",
								loop : true
							});

							//Create a new Elment by defining what the Element type is. In the above example
							//we have a new Sprite Element being created and automatically added to the canvas.
							//We define the Element further with “src, loop, x, y" by passing them as an object.
						</pre> -->
						<div><div id="highlighter_453298" class="syntaxhighlighter nogutter  js"><div class="toolbar"><span><a href="#" class="toolbar_item command_help help">?</a></span></div><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="code"><div class="container"><div class="line number1 index0 alt2"><code class="js offwhite">var</code> <code class="js plain">fire = </code><code class="js keyword">new</code> <code class="js yellowish">Element</code><code class="js plain">(</code><code class="js string">"Sprite"</code><code class="js plain">,{</code></div><div class="line number2 index1 alt1"><code class="js spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="js blue">src</code>&nbsp; <code class="js plain">: </code><code class="js string">"fire.png, fire.json"</code><code class="js plain">,</code></div><div class="line number3 index2 alt2"><code class="js spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="js blue">loop</code> <code class="js plain">: </code><code class="js keyword">true</code></div><div class="line number4 index3 alt1"><code class="js plain">});</code></div><div class="line number5 index4 alt2">&nbsp;</div><div class="line number6 index5 alt1"><code class="js comments">//Create a new Elment by defining what the Element type is. In the above example</code></div><div class="line number7 index6 alt2"><code class="js comments">//we have a new Sprite Element being created and automatically added to the canvas.</code></div><div class="line number8 index7 alt1"><code class="js comments">//We define the Element further with “src, loop, x, y" by passing them as an object.</code></div></div></td></tr></tbody></table></div></div>
					</dd>
				<dt class="light">Step 3:</dt>
					<dd>
						<canvas id="element-root" framerate="80" width="740" height="480"> No support for canvas was detected, human. </canvas>
					</dd>
	
			</dl>
		</div>
<?php require_once 'lib/php/includes/html_footer.php'; ?>	