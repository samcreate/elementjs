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
						<pre class="brush: js; gutter: false; ">

							<script src="element.js" type="text/javascript" charset="utf-8"></script>

							//Include Element.js to your document.
						</pre>
					</dd>
	
				<dt class="fire">Step 2:</dt>
					<dd>
						<pre class="brush: js; gutter: false; ">

							<canvas id="element-root" framerate="10"> No support for canvas was detected, human. </canvas>

							//First step is to add a canvas element to your page with an id of “element-root”.
							//For framerate, height and width of your project is all based on the “meta-data” 
							//that you add to the canvas element.
						</pre>
					</dd>
	
				<dt class="atom">Step 3:</dt>
					<dd>
						<pre class="brush: js; gutter: false; ">

							var fire = new Element("Sprite",{
								src  : "fire.png, fire.json",
								loop : true
							});

							//Create a new Elment by defining what the Element type is. In the above example
							//we have a new Sprite Element being created and automatically added to the canvas.
							//We define the Element further with “src, loop, x, y" by passing them as an object.
						</pre>
					</dd>
				<dt class="light">Step 3:</dt>
					<dd>
						<canvas id="element-root2" framerate="80" width="740" height="480"> No support for canvas was detected, human. </canvas>
					</dd>
	
			</dl>
		</div>
<?php require_once 'lib/php/includes/html_footer.php'; ?>	