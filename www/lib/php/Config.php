<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
session_start();
// =======================
// = constants           =
// =======================
define("LOCAL", "local_host_environment");
define("DEV",   "dev_host_environment");
define("STAGE", "stage_host_environment");
define("PROD", "production_host_environment");

require_once 'php-activerecord/ActiveRecord.php';

class Config {
    

	private static $instance;


   // =====================
   // = production variables =
   // =====================

	var $environment;
	var $dbhost;
	var $dbuser;
	var $dbpass;
	var $dbname;
	var $dbport;
	var $cdn_path;
	var $base_url;
	var $use_min;
	var $debug;
	var $server_name;
	var $analytics_id = "UA-XXXXX-X";
	var $protocol;
	var $facebook_app_id;
	var $page;
	var $title = "ElementJS >>-e";
	 
	private function __construct($server_name = '') {
		
		$this->_setprotocol();
		
		$this->server_name = $server_name == ''?$_SERVER['SERVER_NAME']:$server_name;
		
		
		switch($this->server_name) {
			case "local.elementjs.com":
				
				$this->environment = LOCAL;
				$this->dbhost = 'localhost';
				$this->dbuser = "root";
				$this->dbpass = "root";
				$this->dbname = "test";
				$this->cdn_path = "/";
				$this->base_url = "/";
				$this->use_min = FALSE;
				$this->debug = FALSE;
				$this->facebook_app_id = "";
				
			break;
			
			case "elementjs.herokuapp.com":
			case "elementjs.com":
			case "www.elementjs.com":
				//turn off error reporting for production
				error_reporting(0);
				ini_set('display_errors', '0');
				$this->environment = STAGE;
				$this->dbhost = 'localhost';
				$this->dbuser = "root";
				$this->dbpass = "root";
				$this->dbname = "DATABASE_NAME";
				$this->cdn_path = "";
				$this->base_url = "/";
				$this->use_min = FALSE;
				$this->debug = FALSE;
				$this->facebook_app_id = "";
				
			break;

			default:
				trigger_error('No environment domain has been setup. (e.g. local, development, stage) ', E_USER_ERROR);
				// =================================================================================
				// = Please copy and paste a case in the switch statment for your local enviroment =
				// =================================================================================
			break;
		}
		
		$this->_setup_db();
	}


	
	
	public static function getInstance() {
	    if (!isset(self::$instance)) {
        	$c = __CLASS__;
            self::$instance = new $c;
        }

        return self::$instance;
	}

	public function app_vars_JSON(){
		$ar = array(
			"environment" => $this->environment,
			"cdn_path" => $this->cdn_path,
			"facebook_app_id" => $this->facebook_app_id,
			"debug" => $this->debug,
			"page" => $this->page,
			"title" => $this->title,
			"base_url" => $this->base_url,
		);
		return json_encode($ar);
	}

	public function setPage($p_page){
		
		$this->page = $p_page;
	}
	
	public function getPageTitle(){
		
		echo $this->title.'-> '.$this->page;
	}

	public function getBaseUrl() {

		return $this->base_url;

	}


	public function getConnectionSettings() {
		return array(
			'hostname' => $this->dbhost,
			'port' => $this->dbport, //'3306'
			'username' => $this->dbuser,
			'password' => $this->dbpass,
			'database' => $this->dbname,
			'debug' => $this->debug
		);
	}
	
	private function _setprotocol(){
	
		if($_SERVER['SERVER_PORT'] == 80){ 
			$this->protocol = "http";
		}else{ 
			$this->protocol = "https";
		}
	}
	
	private function _setup_db(){

		 $connections = array(
		    'development' => 'mysql://'.$this->dbuser.':'.$this->dbpass.'@'.$this->dbhost.'/'.$this->dbname
		  );
		 
		 # must issue a "use" statement in your closure if passing variables
		 ActiveRecord\Config::initialize(function($cfg) use ($connections)
		 {
		   $cfg->set_model_directory($_SERVER['DOCUMENT_ROOT'].'/lib/php/Models');
		   $cfg->set_connections($connections);
		   $cfg->set_default_connection('development');
		 });
	}
        

}


?>