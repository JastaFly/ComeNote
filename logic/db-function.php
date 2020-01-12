<?php 
include_once($_SERVER['DOCUMENT_ROOT'] . '/db-config.php') ;

function get_nodes($link,$commad) {
    $range_start = '/[0-9]+-/';
    preg_match_all($range_start, $commad[load], $matches_start);
    $clean_range = '/[0-9]+/';
    preg_match_all($clean_range, $matches_start[0][0], $clean_start_matches);
    $range_end = '/-[0-9]+/';
    preg_match_all($range_end, $commad[load], $matches_end);
    preg_match_all($clean_range, $matches_end[0][0], $clean_end_matches);
    $max = $clean_end_matches[0][0];
    $min = $clean_start_matches[0][0];
    $query ="SELECT * FROM note LIMIT $max OFFSET $min";
    $result = mysqli_query($link, $query); 
    $done_result = mysqli_fetch_all($result);
    $json_result = json_encode($done_result);
    echo $json_result;
}
function update_node($link, $data) {
    date_default_timezone_set("Europe/Moscow");
    $date_msk = date('Y-m-d');
    $id = $data[edit][id];
    $title_no_uferline = strtr($data[edit][new_title], '_', ' ');
    $text_no_underline = strtr($data[edit][new_text], '_', ' '); 
    $query = "UPDATE note SET name='$title_no_uferline', description='$text_no_underline', date='$date_msk' WHERE id=$id";
    mysqli_query($link, $query); 
    $get = "SELECT * FROM note WHERE id=$id";
    $result = mysqli_query($link, $get);
    $done_result = mysqli_fetch_all($result);
    $json_result = json_encode($done_result);
    echo $json_result;
}
function get_one($link, $commad) {
    $id = $commad[load_one];
    $query ="SELECT * FROM note WHERE id=$id";
    $result = mysqli_query($link, $query);
    $done_result = mysqli_fetch_all($result);
    $json_result = json_encode($done_result);
    print_r($json_result) ;
}
function favorite($link, $favorite) {
    $id = $favorite[favorite][id];
    $value = $favorite[favorite][value];
    $query = "UPDATE `note` SET `primary` = $value WHERE `note`.`id` = $id";
    mysqli_query($link, $query);
    $get = "SELECT `primary` FROM note WHERE id=$id";
    $result = mysqli_query($link, $get);
    $done_result = mysqli_fetch_all($result);
    $json_result = json_encode($done_result);
    print_r($json_result);
}
function kill($link, $data) {
    $id = $data[delete];
    echo $id;
    $query = "DELETE FROM note WHERE id = $id";
    mysqli_query($link, $query);
}
function search_name($link, $commad) {
    $name = strtr($commad[search_name], '_', ' ');
    $query = "SELECT * FROM note WHERE name='$name'";
    $result = mysqli_query($link, $query);
    $done_result = mysqli_fetch_all($result);
    $json_result = json_encode($done_result);
    print_r($json_result);
}
function date_sort($link, $commad) {
    $order = $commad[date_sort][sort_by];
    $max = $commad[date_sort][max];
    if ($order == 1) {
        $query = "SELECT * FROM note ORDER BY date DESC LIMIT $max";
    }
    else if ($order == 0) {
        $query = "SELECT * FROM note ORDER BY date ASC LIMIT $max";
    }
    $result = mysqli_query($link, $query); 
    $done_result = mysqli_fetch_all($result);
    $json_result = json_encode($done_result);
    print_r($json_result);
}
function get_favorite($link, $command) {
    $value = $command[get_favorite];
    if ($value == 'all') {
        $query ="SELECT * FROM note WHERE `primary`=1";
       
    }
    else {
        $query ="SELECT * FROM note WHERE `primary`=1 LIMIT $value";
    }
    $result = mysqli_query($link, $query);
    $done_result = mysqli_fetch_all($result);
    $json_result = json_encode($done_result);
    print_r($json_result);
}
?>