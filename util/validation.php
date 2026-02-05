<?php

class validation{

    public static function validationName($name){
		$exp = '/^[^.!@#$%¨&*]{2,40}$/';
	
        if(preg_match($exp,$name)){
			return true;
		}else{
			return false;
		}
	}

	public static function validationPassword($password){
        $exp = '/^[^.!@#$%¨&*]{2,40}$/';

        if(preg_match($exp,$password)){
			return true;
		}else{
			return false;
		}
	}

}

?>