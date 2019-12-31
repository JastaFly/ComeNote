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

?>