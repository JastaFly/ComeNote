<?php 
include_once 'db-function.php';

if (!empty($_POST)) {
 $key = array_keys($_POST);
    $dec = json_decode($key[0], true);
   $array_key =  array_keys($dec);
  switch($array_key[0]) {
    case "load" : get_nodes($pdo, $dec);
           break;
    case "edit" : update_node($pdo, $dec);
          break;
    case "load_one" : get_one($pdo, $dec);
          break;
    case "favorite" : favorite($pdo, $dec);
          break;
    case "delete" : kill($pdo, $dec);
          break;
    case "search_name" : search_name($pdo, $dec);
          break;
    case "date_sort" : date_sort($pdo, $dec);
          break;
    case "get_favorite" : get_favorite($pdo, $dec);
          break;
    case "add_note" : add_note($pdo, $dec);
          break;
    } 
  
}

?>