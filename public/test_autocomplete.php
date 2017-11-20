<?php

$query = $_GET['query'];

if(strcmp($query, "aa") == 0){
  echo json_encode(array('name' => 'aaaaaa'));
}
if(strcmp($query, "bb") == 0){
  echo json_encode(array('name' => 'bbbbbb'));
}


?>
