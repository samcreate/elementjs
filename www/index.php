<?php
	require_once 'lib/php/Config.php';
	$settings = Config::getInstance();
	$settings->setPage("HomePage");

?>
<!doctype html>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
<head>
	<?php
	require_once 'lib/php/includes/html_header.php';
	?>	
</head>
<body>
	<div id="PageWrapper">
		<header>
			<div id="MenuHolder">
				<ul id="menu">
					<li><a href="" class="active">Home</a></li>
					<li><a href="" class="">Examples</a></li>
					<li><a href="" class="">Documentation</a></li>
					<li><a href="" class="">Support</a></li>
					<li><a href="" class="">Read</a></li>
				</ul>
			</div>
			
			<a href="" class="logo"><h1>Element.js</h1></a>
			<a href="" class="download">Download</a>
			<hr>
			<p><em>Element.js:</em> Canvas 2D Library, Open source, chains everything, has a really simple api, overly huge download button.</p>
		</header>

		<div id="MainContent" role="main">
			<ol class="steps">
				<li>
					<dl>
						<dt>Step 1:</dt>
						<dd>
							<pre class="brush: js; gutter: false; ">

								<script src="element.js" type="text/javascript" charset="utf-8"></script>

								//Include Element.js to your document.
							</pre>
						</dd>
					</dl>
				</li>
				<li>
					<dl>
						<dt>Step 2:</dt>
						<dd>
							<pre class="brush: js; gutter: false; ">

								<canvas id="element-root" framerate="10"> No support for canvas was detected, human. </canvas>

								//First step is to add a canvas element to your page with an id of “element-root”.
								//For framerate, height and width of your project is all based on the “meta-data” 
								//that you add to the canvas element.
							</pre>
						</dd>
					</dl>
				</li>
				<li>
					<dl>
						<dt>Step 3:</dt>
						<dd>
							<pre class="brush: js; gutter: false; ">

								var fire = new Element("Sprite").src("fire.png","fire.json",2).loop(true);

								//Create a new Elment by defining what the Element type is. In the above example
								//we have a new Sprite Element being created and automatically added to the canvas.
								//We define the Element further with “src, loop, x, y.”
							</pre>
						</dd>
					</dl>
				</li>
			</ol>
		</div>

		<footer>

		</footer>
	</div>
	<!--[if lt IE 7 ]>
	<script src="lib/js/plugins/dd_belatedpng.js"></script>
	<script> DD_belatedPNG.fix('img, .png_bg');</script>
	<![endif]-->
	<script type="text/javascript"> window._app_vars = <?php echo $settings->app_vars_JSON(); ?>; </script>
	
	<?

	if($settings->environment == PROD){

	?>
	<!-- BEGIN PROD: javascript -->
	<script type="text/javascript">
	(function() {
	    var s = document.createElement('script');
	    s.type = 'text/javascript';
	    s.async = true;
	    s.src = 'lib/js/evbmaster-min.js';
	    var x = document.getElementsByTagName('script')[0];
	    x.parentNode.insertBefore(s, x);
	})();
	
	</script>
	<!-- END: javascript -->
	<?	

	}else{

	?>
	<!-- BEGIN <?php echo $settings->environment ?>: javascript -->
	<script src="lib/js/jquery/jquery-1.8.0.min.js" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" src="lib/js/plugins/shCore.js"></script>
	<script src="lib/js/plugins/shBrushJScript.js" type="text/javascript" charset="utf-8"></script>
	<script src="lib/js/master.js" type="text/javascript" charset="utf-8"></script>	
	<script src="lib/js/main.js" type="text/javascript" charset="utf-8"></script>
	<script src="lib/js/homePage.js" type="text/javascript" charset="utf-8"></script>
	<!-- END: javascript -->
	<?	
	} 
	?>
	
	<script type="text/javascript">

  		var _gaq = _gaq || [];
  		_gaq.push(['_setAccount', '<?php echo $settings->analytics_id; ?>']);
  		_gaq.push(['_trackPageview']);
		
  		(function() {
  		  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  		  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  		  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  		})();

</script>
</body>
</html>