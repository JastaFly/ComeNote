<?php 
include_once($_SERVER['DOCUMENT_ROOT'] . '/db-config.php') ;

function get_nodes($pdo,$commad) {
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, FALSE);
    $range_start = '/[0-9]+-/';
    preg_match_all($range_start, $commad['load'], $matches_start);
    $clean_range = '/[0-9]+/';
    preg_match_all($clean_range, $matches_start[0][0], $clean_start_matches);
    $range_end = '/-[0-9]+/';
    preg_match_all($range_end, $commad['load'], $matches_end);
    preg_match_all($clean_range, $matches_end[0][0], $clean_end_matches);
    $max = $clean_end_matches[0][0];
    $min = $clean_start_matches[0][0];
    $query ="SELECT * FROM note ORDER BY date DESC LIMIT :max OFFSET :min";
    $prepar = $pdo->prepare($query);
    $prepar->bindParam(':max', $max, PDO::PARAM_INT);
    $prepar->bindParam(':min', $min, PDO::PARAM_INT);
    $prepar->execute();
    $result = $prepar->fetchAll(PDO::FETCH_NUM);
    $json_result = json_encode($result);
    print_r($json_result);
}
function update_node($pdo, $data) {
    date_default_timezone_set("Europe/Moscow");
    $date_msk = date('Y-m-d H:i:s');
    $id = $data['edit']['id'];
    $title_no_uferline = strtr($data['edit']['new_title'], '_', ' ');
    $text_no_underline = strtr($data['edit']['new_text'], '_', ' '); 
    $query ="UPDATE note SET name=:name, description=:description, date=:date WHERE id=:id";
    $prepar = $pdo->prepare($query);
    $param = [
              ':name' => $title_no_uferline,
              ':description' => $text_no_underline,
              ':date' => $date_msk,
              ':id' => $id
    ];
    $prepar->execute($param);
    $get ="SELECT * FROM note WHERE id=:id";
    $prepar_get = $pdo->prepare($get);
    $param_get = [
              ':id' => $id
    ];
    $prepar_get->execute($param_get);
    $result = $prepar_get->fetchAll(PDO::FETCH_NUM);
    $json_result = json_encode($result);
    echo $json_result;
}
function get_one($pdo, $commad) {
    $id = $commad['load_one'];
    $query ="SELECT * FROM note WHERE id=:id";
    $prepar = $pdo->prepare($query);
    $param = [
              ':id' => $id
    ];
    $prepar->execute($param);
    $result = $prepar->fetchAll(PDO::FETCH_NUM);
    $json_result = json_encode($result);
    print_r($json_result) ;
}
function favorite($pdo, $favorite) {
    $id = $favorite['favorite']['id'];
    $value = $favorite['favorite']['value'];
    $query ="UPDATE `note` SET `favorite` = :primary WHERE `note`.`id` = :id";
    $prepar = $pdo->prepare($query);
    $param = [
              ':primary' => $value,
              ':id' => $id
    ];
    $prepar->execute($param);
    $get ="SELECT * FROM note WHERE id=:id";
    $prepar_get = $pdo->prepare($get);
    $param_get = [
              ':id' => $id
    ];
    $prepar_get->execute($param_get);
    $result = $prepar_get->fetchAll(PDO::FETCH_NUM);
    $json_result = json_encode($result);
    print_r($json_result);
}
function kill($pdo, $data) {
    $id = $data[delete];
    echo $id;
    $query ="DELETE FROM note WHERE id = :id";
    $prepar = $pdo->prepare($query);
    $param = [
              ':id' => $id
    ];
    $prepar->execute($param);
}
function search_name($pdo, $commad) {
    $name = strtr($commad['search_name'], '_', ' ');
    $query ="SELECT * FROM note WHERE name=:name";
    $prepar = $pdo->prepare($query);
    $param = [
              ':name' => $name
    ];
    $prepar->execute($param);
    $result = $prepar->fetchAll(PDO::FETCH_NUM);
    $json_result = json_encode($result);
    print_r($json_result);
}
function date_sort($pdo, $commad) {
    $order = $commad['date_sort']['sort_by'];
    $max = $commad['date_sort'][max];
    if ($order == 1) {
        $query ="SELECT * FROM note ORDER BY date DESC LIMIT :max";
    }
    else if ($order == 0) {
        $query = "SELECT * FROM note ORDER BY date ASC LIMIT :max";
    }
    $prepar = $pdo->prepare($query);
    $prepar->bindParam(':max', $max, PDO::PARAM_INT);
    $prepar->execute();
    $result = $prepar->fetchAll(PDO::FETCH_NUM);
    $json_result = json_encode($result);
    print_r($json_result);
}
function get_favorite($pdo, $command) {
    $value = $command[get_favorite];
    if ($value == 'all') {
        $query ="SELECT * FROM note WHERE `favorite`=1";
        $prepar = $pdo->prepare($query);
        $prepar->execute();
        $result = $prepar->fetchAll(PDO::FETCH_NUM);
        $json_result = json_encode($result);
        print_r($json_result);
    }
    else {
        $query ="SELECT * FROM note WHERE `primary`=1 LIMIT :limit";
        $prepar = $pdo->prepare($query);
        $prepar->bindParam(':limit', $value, PDO::PARAM_INT);
        $prepar->execute();
        $result = $prepar->fetchAll(PDO::FETCH_NUM);
        $json_result = json_encode($result);
        print_r($json_result);
    }
}
function add_note($pdo, $command) {
    $clear_title = strtr($command['add_note']['title'], '_', ' ');
    $clear_text = strtr($command['add_note']['text'], '_', ' ');
    $query ="INSERT INTO note (`name`, `description`, `date`, `favorite`) VALUES (:name, :description, NOW(), :favorite)";
    $prepar = $pdo->prepare($query);
    $param = [
              ':name' => $clear_title,
              ':description' => $clear_text,   
              ':favorite' => $command['add_note']['favorite']
    ];
    /*
    $prepar->execute($param);
    $get_note ="SELECT * FROM note ORDER BY date DESC LIMIT 1";
    $prepar_get = $pdo->prepare($get_note);
    $prepar_get->execute();
    $result = $prepar_get->fetchAll(PDO::FETCH_NUM);
    $json_result = json_encode($result); */
}
?>