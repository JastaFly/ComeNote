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
           <div class="delete-window">
           <div class="modal-header">
           <div class="cross" onclick="closer(this)"></div>
           </div>
           <p class="kill-title">72 метра</p>
            <p class="ok-text" onclick="tick()">Удалить?</p>
            <div class="button-wrap">
            <span class="delete-button button">Да!</span>
            <span class="no-delete-button button" onclick="closer(this)">Ниии!</span>
            </div>
           </div>
    <div class="main-wrap">
       
        <div class="tool-wrap">
            <div class="searh">
                <form action="">
                <input type="text" placeholder="Искать по имени">
                <input type="submit">
                </form>
            </div>
        </div>
        <div id="div-list">
        <div class="note">
           <div class="tool-note">
            <span class="name">72 метра</span>
                <div class="tool-group">
               <span class="date" >19.12.2019</span>
               <div class="delete" onclick="delite(this)"></div>
               <div class="favorite-on" onclick="edit(this)"></div>
               <div class="ok" onclick="edit(this)"></div>
               <div class="cancel" onclick="cancel(this)"></div>
               <div class="viev"></div>
               <div class="edit"></div>
            </div>
            </div>
            <p class="content"  >
                С другой стороны укрепление и развитие структуры влечет за собой процесс внедрения и модернизации соответствующий условий активизации. Разнообразный и богатый опыт реализация намеченных плановых заданий в значительной степени обуславливает создание систем массового участия. С другой стороны консультация с широким активом представляет собой интересный эксперимент проверки новых предложений. Таким образом укрепление и развитие структуры в значительной степени обуславливает создание систем массового участия. Задача организации, в особенности же укрепление и развитие структуры требуют от нас анализа новых предложений. Задача организации, в особенности же сложившаяся структура организации играет важную роль в формировании соответствующий условий активизации.

                Разнообразный и богатый опыт новая модель организационной деятельности обеспечивает широкому кругу (специалистов) участие в формировании позиций, занимаемых участниками в отношении поставленных задач. Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции способствует подготовки и реализации существенных финансовых и административных условий.
            </p>
        </div>
        </div>
    </div>
    </div>
</body>
</html>