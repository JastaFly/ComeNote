<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ваши записи</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <link rel="shortcut icon" href="/img/favicon.png" type="image/png">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="js-machine/animation.js"></script>
    <script src="js-machine/function.js"></script>
    <?php 
    include_once 'logic/db-function.php';
    ?>
</head>
    <body>
    <div class="cover"></div>
    <header> 
      <a href="index.php">
       <div class="logo-group">
           <img src="img/logo-bottom.png" alt="" class="logo" id="logo-bottom">
           <img src="img/elephan.png" alt="" class="logo" id="elephan">
       </div>
        </a>
   </header>
    <div class="center-wrap">
    <div class="modal-window">
           <div class="modal-header">
           <div class="cross" onclick="closer(this)"></div>
           </div>
           <img src="img/tick-circle.png" class="ok-tick"  alt="">
            <p class="ok-text" onclick="tick()">Изменения сохранены!</p>
        </div>
    <div class="kill-window">
           <div class="modal-header">
           <div class="cross" onclick="closer(this)"></div>
           </div>
           <p class="kill-title"></p>
            <p class="ok-text" onclick="tick()">Удалить?</p>
            <div class="button-wrap">
            <span class="delete-button button" onclick="kill_note()">Да!</span>
            <span class="no-delete-button button" onclick="closer(this)">Ниии!</span>
            </div>
        </div>
        <div class="no-found-window">
           <div class="modal-header">
           <div class="cross" onclick="closer(this)"></div>
           </div>
           <p class="no-found-title">404</p>
            <p class="ok-text" onclick="tick()">Ничего не найдено!</p>
        </div>
    <div class="main-wrap">
       
        <div class="tool-wrap">
            <div class="searh">
                <input type="text" class="search-field" placeholder="Искать по имени">
                <input type="button" class="search-button" onclick="search()">
            </div>
            <span class="button no-delete-button clear-button" onclick="clear_note(this)">Очистить</span>
            <div class="purple-button">
                <span class="white-text"></span>
                <span class="sort-up"></span>
                <span class="sort-down"></span>
            </div>
        </div>
        <div id="div-list">
        </div>
    </div>
    </div>
</body>
</html>