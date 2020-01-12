<?php
$host = 'localhost'; // адрес сервера 
$database = 'note'; // имя базы данных
$user = 'root'; // имя пользователя
$password = ''; // пароль

// подключение к БД
$link = mysqli_connect($host, $user, $password, $database) 
    or die("Не удалось подключиться к базе данных. Ошибка " . mysqli_error($link));
try {  
  
  # MySQL через PDO_MYSQL  
  $DBH = new PDO("mysql:host=$host;dbname=$database", $user, $password);  
  
}  
catch(PDOException $e) {  
    echo $e->getMessage();  
}
?>