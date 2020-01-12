<?php 
include_once 'db-function.php';

if (!empty($_POST)) {
 $key = array_keys($_POST);
    $dec = json_decode($key[0], true);
   $array_key =  array_keys($dec);
  switch($array_key[0]) {
    case "load" : get_nodes($link, $dec);
           break;
    case "edit" : update_node($link, $dec);
          break;
    case "load_one" : get_one($link, $dec);
          break;
    case "favorite" : favorite($link, $dec);
          break;
    case "delete" : kill($link, $dec);
          break;
    case "search_name" : search_name($link, $dec);
          break;
    case "date_sort" : date_sort($link, $dec);
          break;
    case "get_favorite" : get_favorite($link, $dec);
          break;
    } 
  
}

?>