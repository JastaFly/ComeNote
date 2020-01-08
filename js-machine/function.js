window.onload = function() {
    load();
}
let load = function() {
let data = {'load':'0-10'};
let modData = JSON.stringify(data);
$.ajax({                                   
    url: "logic/command-process.php",                               
    type: "POST", 
    data: modData,  
    dataType: "json",
    success: function(res) { 
        console.log(res);
        for (i = 0; i < res.length; i++) {
            $('#div-list').append('<div class="note" id="note-' + i + '"></div>');
            $('#note-' + i).append('<div class="tool-note" id="tool-note-' + i + '"></div>');
            $('#tool-note-' + i).append('<span class="name">' + res[i][1] + '</span>');
            $('#tool-note-' + i).append('<div class="tool-group" id="tool-group-' + i + '"></div>');
            $('#tool-group-' + i).append('<span class="date" >' + res[i][3] + '</span>');
            $('#tool-group-' + i).append('<div class="delete" title="Уничтожить" onclick="delete_note(this)"></div>');
            if (res[i][4] == 1) {
                $('#tool-group-' + i).append('<div class="favorite-on" title="Самое то"  onclick="favorite(this)"></div>');
                }
            else {
                $('#tool-group-' + i).append('<div class="favorite-off" title="Так се" onclick="favorite(this)"></div>');
            }
             $('#tool-group-' + i).append('<span class="id-value">' + res[i][0] + '</span>');
            $('#tool-group-' + i).append('<div onclick="edit(this)" class="ok" title="Всё ok"  ></div>');
            $('#tool-group-' + i).append('<div class="cancel" title="Ну нах!" onclick="cancel(this)"></div>');
            $('#tool-group-' + i).append('<div class="viev" title="Что там?"></div>');
            $('#note-' + i).append('<p class="content">' + res[i][2] + '</p>');
            $('#tool-group-' + i).append('<div class="edit" title="Подправить"></div>');
        }
    }
});
}
let edit =  function(elem) {
    let parent = elem.parentNode.children;
    let main_parent = elem.parentNode.parentNode.children;
    let paren_group = elem.parentNode.parentNode.parentNode.children;
    console.log(parent);
    let text_value = paren_group[1].value;
    let title = main_parent[0].value;
    let id = parent[3].innerHTML;
    let data = { edit : {
        'id' : id,
        'new_title' : title,
        'new_text' : text_value
    }
    } 
let mod_data = JSON.stringify(data);

    $.ajax({                                   
        url: "logic/command-process.php",                               
        type: "POST", 
        data: mod_data,  
        dataType: "json",
        success: function(res) { 
            $(main_parent[0]).replaceWith('<span class="name">' + res[0][1] + '</span>');
            $(paren_group[1]).replaceWith('<p class="content">' + res[0][2] + '</p>');
            paren_group[1].style.display = 'block';
            parent[1].style.display = 'block';
            parent[2].style.display = 'block';
            parent[4].style.display = 'none';
            parent[5].style.display = 'none';
            parent[6].style.display = 'block';
            parent[7].style.display = 'block';
            $('.modal-window').slideToggle(500);
            let main_wrap = document.getElementsByClassName('main-wrap');
            let header = document.getElementsByTagName('header');
            main_wrap[0].style.filter = 'blur(3px)';
            header[0].style.filter = 'blur(3px)';
        }
    });
}
let cancel = function(elem) {
    let parent = elem.parentNode.children;
    let main_parent = elem.parentNode.parentNode.children;
    let paren_group = elem.parentNode.parentNode.parentNode.children;
    let id = parent[3].innerHTML;
    let data = { load_one : id} 
    let mod_data = JSON.stringify(data);
    $.ajax({                                   
    url: "logic/command-process.php",                               
    type: "POST", 
    data: mod_data,  
    dataType: "json",
    success: function(res) { 
        console.log(parent);
        $(main_parent[0]).replaceWith('<span class="name">' + res[0][1] + '</span>');
        $(paren_group[1]).replaceWith(' <p class="content" >' + res[0][2] + '</p>');
        parent[1].style.display = 'block';
        parent[2].style.display = 'block';
        parent[6].style.display = 'block';
        parent[7].style.display = 'block';
        parent[4].style.display = 'none';
        parent[5].style.display = 'none';
    }
});
}
let favorite = function(elem) {
    let class_css = elem.classList;
    let parent = elem.parentNode.children;
    let id = parent[3].innerHTML;
    if (class_css[0] == 'favorite-on') {
        data = {favorite : {
            id : id,
            value : 0
        }}
    }
    else {
        data = {favorite : {
            id : id,
            value : 1
        }}
    }
    let mod_data = JSON.stringify(data);
    $.ajax({                                   
        url: "logic/command-process.php",                               
        type: "POST", 
        data: mod_data,  
        dataType: "json",
        success: function(res) { 
            if (res[0][0] == 0) {
                elem.classList.remove('favorite-on');
                elem.classList.add('favorite-off');
                }
            else {
                elem.classList.remove('favorite-off');
                elem.classList.add('favorite-on');
            }
        }
    });
    
}
let delete_note = function(elem) {
    let parent = elem.parentNode.children;
    let id = parent[3].innerHTML;
    let data = {'delete' : id}
    console.log(id);
     let mod_data = JSON.stringify(data);
    $.ajax({                                   
    url: "logic/command-process.php",                               
    type: "POST", 
    data: mod_data,  
    dataType: "html",
    success: function(res) { 
        console.log(res);
    }
});
}