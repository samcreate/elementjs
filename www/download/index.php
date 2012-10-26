<?php 

header("Content-disposition: attachment; filename=Element.js");
 echo file_get_contents("https://raw.github.com/samcreate/elementjs/master/release/Element.js");
 ?>