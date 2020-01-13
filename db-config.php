<?php
$host = 'localhost'; // адрес сервера 
$database = 'note'; // имя базы данных
$user = 'root'; // имя пользователя
$password = ''; // пароль

// подключение к БД
try {  
  
  # MySQL через PDO_MYSQL  
  $pdo = new PDO("mysql:host=$host;dbname=$database", $user, $password);  
  
}  
catch(PDOException $e) {  
    echo $e->getMessage();  
}
?>