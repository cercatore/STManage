<!DOCTYPE html>
<html>
  <head><link href="css/my_form_styles.css" rel="stylesheet"/>
  </head>
<body>

<form id="form" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" enctype="multipart/form-data">
<label for="file">INPUT CANDIDATE CV:</label> <input type="file" name="Filedata" id="Filedata" /> 
<input type="hidden" name="MAX_FILE_SIZE" value="2000000">
<input type="submit" name="submit" value="Submit" />
</form>

<?php
  require 'lib.php';
	ERROR_REPORTING ( E_ERROR | E_PARSE);
	$uploadfile = time();
	$dogood = 0;
	$done = 0;
	$result = 0;
	$mailer = new hbattat\VerifyEmail('cbagnato77@gmail.com' , 'jaquelinruben@yahoo.com');
	if ( $mailer->verify() ){
		echo 'ok';
	}
	$uploadfile = 'aiuto.txt';
    echo "<br/>File was successfully uploaded.\n";
	$uploaded = 1;
	//echo '<pre>';
	foreach ( file($uploadfile) as $line ){
		echo $line;
	}
	//var_dump($mailer->get_debug(false) );
	$suc = $dogood / $done;
	echo 'Done. ' . $done . ', bah: ' . $dogood . ', ### ' . number_format((float)$suc, 2, '.', '');
	
}
	
		
	

	