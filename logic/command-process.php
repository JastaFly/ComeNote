<?php 
include_once 'db-function.php';

if (!empty($_GET)) {
   $key = array_keys($_GET);
    $dec = json_decode($key[0], true);
   $array_key =  array_keys($dec);

  switch($array_key[0]) {
       case "load" : get_nodes($link, $dec);
           break;
    }
}

?>