<?php

	require 'lib.php';
  $mailer = new hbattat\VerifyEmail('cbagnato77@gmail.com' , 'mamclain@yahoo.com');
	
	$mail = $_REQUEST['mail'];
	if ($mail != null && $mail !== '' ){
		$mailer->set_email($mail);
		$valid = $mailer->verify();
    if (!$valid) echo 'no';
		//var_dump( $mailer->get_debug(false) );
	}
	else echo "somethign ...";