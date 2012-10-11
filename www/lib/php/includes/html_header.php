<title><?php $settings->getPageTitle(); ?></title>

<!-- BEGIN: meta tags -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="description" content=""/> 
<meta name="keywords" content=""/>
<link rel="shortcut icon" href="favicon.ico"/> 
<meta name="description" content="">
<meta name="author" content="">
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- END: meta tags -->
<!-- BEGIN: OG FBook meta tags -->
<meta property="fb:admins" content=""/> 
<meta property="og:type" content="website"/> 
<meta property="og:url" content=""/> 
<meta property="og:title" content="" /> 
<meta property="og:site_name" content=""/> 
<meta property="og:description" content=""/> 
<meta property="og:image" content="<?php echo $settings->protocol ?>://<?php echo $settings->server_name ?>/media/images/facebook_share.jpg" />
<!-- END: OG FBook meta tags -->
<?

if($settings->environment == PROD){

?>
<!-- BEGIN PROD: styles -->
<link rel="stylesheet" href="styles/evbmaster-min.css" type="text/css" />
<script type="text/javascript">
	document.write('<link rel="stylesheet" href="styles/javascript.css" />'); 
</script>
<!-- END: styles -->
<?	
	
}else{

?>
<!-- BEGIN <?php echo $settings->environment ?>: styles -->
<link rel="stylesheet" type="text/css" href="styles/master.css" />
<script type="text/javascript">
	document.write('<link rel="stylesheet" href="styles/javascript.css" />'); 
</script>
<!-- END: styles -->
<?	
} 
?>