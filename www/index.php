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

							// Include Element.js to your document.
						</pre> -->
						<div class="syntaxhighlighter nogutter  js" id="highlighter_797568"><div class="toolbar"><span><a class="toolbar_item command_help help" href="#">?</a></span></div><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="code"><div class="container"><div class="line number1 index0 alt2"><code class="js lightyellowish">&lt;</code><code class="js yellowish">script</code> <code class="js lightyellowish">src=</code><code class="js string">"element.js"</code> <code class="js lightyellowish">type=</code><code class="js string">"text/javascript"</code> <code class="js lightyellowish">charset=</code><code class="js string">"utf-8"</code><code class="js lightyellowish">&gt;</code><code class="js lightyellowish">&lt;</code><code class="js plain">/</code><code class="js yellowish">script</code><code class="js lightyellowish">&gt;</code></div><div class="line number2 index1 alt1">&nbsp;</div><div class="line number3 index2 alt2"><code class="js comments">// Include Element.js to your document.</code></div></div></td></tr></tbody></table></div>
					</dd>
	
				<dt class="fire">Step 2:</dt>
					<dd>
						<!-- <pre class="brush: js; gutter: false; ">

							<canvas id="scene1"> No support for canvas was detected, human. </canvas>
							// Add a canvas element to the page with a unique ID.
						</pre> -->
						<div class="syntaxhighlighter nogutter  js" id="highlighter_370060"><div class="toolbar"><span><a class="toolbar_item command_help help" href="#">?</a></span></div><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="code"><div class="container"><div class="line number1 index0 alt2"><code class="js lightyellowish">&lt;</code><code class="js yellowish">canvas</code> <code class="js lightyellowish">id=</code><code class="js string">"scene1"</code><code class="js lightyellowish">&gt;</code> <code class="js offwhite">No support for canvas was detected, human.</code> <code class="js lightyellowish">&lt;</code><code class="js plain">/</code><code class="js yellowish">canvas</code><code class="js lightyellowish">&gt;</code></div><div class="line number2 index1 alt1"><code class="js comments">// Add a canvas element to the page with a unique ID.</code></div></div></td></tr></tbody></table></div>
					</dd>
	
				<dt class="atom">Step 3:</dt>
					<dd>
						<!-- <pre class="brush: js; gutter: false; ">

							// Create a new Scene and pass in a object with the canvas id, framerate, width and height.

							var Scene1 = new Element("Scene",{
								canvas:'scene1',
								framerate: 80,
								width: 740,
								height:480
							});

							
							// Next, create a Sprite element and pass in our png sprite and json file 
							// (created with texture packer)

							var fire = new Element("Sprite",{
								src  : "fire.png, fire.json",
								loop : true
							});

							Scene1.add(fire);
							
							// Next, read the documentation!	
						</pre> -->
						<div class="syntaxhighlighter nogutter  js" id="highlighter_726876"><div class="toolbar"><span><a class="toolbar_item command_help help" href="#">?</a></span></div><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="code"><div class="container"><div class="line number1 index0 alt2"><code class="js comments">// Create a new Scene and pass in a object with the canvas id, framerate, width and height.</code></div><div class="line number2 index1 alt1">&nbsp;</div><div class="line number3 index2 alt2"><code class="js offwhite">var</code> <code class="js plain">Scene1 = </code><code class="js keyword">new</code> <code class="js yellowish">Element</code><code class="js plain">(</code><code class="js string">"Scene"</code><code class="js plain">,{</code></div><div class="line number4 index3 alt1"><code class="js spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="js yellowish">canvas</code><code class="js plain">:</code><code class="js string">'scene1'</code><code class="js plain">,</code></div><div class="line number5 index4 alt2"><code class="js spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="js plain">framerate: </code><code class="js blue">80</code><code class="js plain">,</code></div><div class="line number6 index5 alt1"><code class="js spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="js blue">width</code><code class="js plain">: </code><code class="js blue">740</code><code class="js plain">,</code></div><div class="line number7 index6 alt2"><code class="js spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="js blue">height</code><code class="js plain">:</code><code class="js blue">480</code></div><div class="line number8 index7 alt1"><code class="js plain">});</code></div><div class="line number9 index8 alt2">&nbsp;</div><div class="line number10 index9 alt1">&nbsp;</div><div class="line number11 index10 alt2"><code class="js comments">// Next, create a Sprite element and pass in our png sprite and json file </code></div><div class="line number12 index11 alt1"><code class="js comments">// (created with texture packer)</code></div><div class="line number13 index12 alt2">&nbsp;</div><div class="line number14 index13 alt1"><code class="js offwhite">var</code> <code class="js plain">fire = </code><code class="js keyword">new</code> <code class="js yellowish">Element</code><code class="js plain">(</code><code class="js string">"Sprite"</code><code class="js plain">,{</code></div><div class="line number15 index14 alt2"><code class="js spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="js blue">src</code>&nbsp; <code class="js plain">: </code><code class="js string">"fire.png, fire.json"</code><code class="js plain">,</code></div><div class="line number16 index15 alt1"><code class="js spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code class="js blue">loop</code> <code class="js plain">: </code><code class="js keyword">true</code></div><div class="line number17 index16 alt2"><code class="js plain">});</code></div><div class="line number18 index17 alt1">&nbsp;</div><div class="line number19 index18 alt2"><code class="js plain">Scene1.add(fire);</code></div><div class="line number20 index19 alt1">&nbsp;</div><div class="line number21 index20 alt2"><code class="js comments">// Next, read the documentation!&nbsp;&nbsp;&nbsp; </code></div></div></td></tr></tbody></table></div>
					</dd>
				<dt class="light">Step 3:</dt>
					<dd>
						<canvas id="fire" framerate="80" width="740" height="480"> No support for canvas was detected, human. </canvas>
					</dd>
	
			</dl>
		</div>
<?php require_once 'lib/php/includes/html_footer.php'; ?>	