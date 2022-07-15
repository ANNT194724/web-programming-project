<?php

/**
 * 
 */
class Database
{
	
	private $con;
	public function connect(){
		$this->con = new Mysqli("localhost", "root", "123456", "ecommerceapp");
		return $this->con;
	}
}

?>