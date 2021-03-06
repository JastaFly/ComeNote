localStorage.setItem('order', 0); 
localStorage.setItem('offset', 10);
localStorage.setItem('max', 20);
let ajax_load = 0;
window.addEventListener('scroll', function () { // загрузка при прокрутке
    let bottom = $(window).scrollTop() + $(window).height();
    let window_height = $(document).height();
    let load_scroll = parseInt(localStorage.getItem('scroll_load'), 10);
    console.log(ajax_load);
    if (bottom >= window_height && ajax_load == 0) {
        let scroll_val = load_scroll + 200;
        let max = parseInt(localStorage.getItem('max'), 10);
        var offset = parseInt(localStorage.getItem('offset'), 10);
        let data = {
            'load': offset + '-' + max
        };

        let modData = JSON.stringify(data);
        ajax_load = 1;
        $.ajax({
            url: "logic/command-process.php",
            type: "POST",
            data: modData,
            dataType: "json",
            success: function (res) {
                if (res.length != 0) {
                    console.log('1');
                    for (i = 0; i < res.length; i++) {
                        let count = offset + i;
                        let dirt_date = res[i][3];
                        let date = dirt_date.match(/^\d{2,4}([-])\d{2,4}([-])\d{2,4}/);
                        let time = dirt_date.match(/\d{1,2}:\d{1,2}:\d{1,2}/);
                        let year = dirt_date.match(/^\d{2,4}/);
                        let dirt_m_d = dirt_date.match(/-\d{2,4}-\d{2,4}/);
                        let m_d = dirt_m_d[0].replace('-', '');
                        $('#div-list').append('<div class="note" id="note-' + count + '"></div>');
                        $('#note-' + count).append('<div class="tool-note" id="tool-note-' + count + '"></div>');
                        $('#tool-note-' + count).append('<span class="name">' + res[i][1] + '</span>');
                        $('#tool-note-' + count).append('<div class="tool-group" id="tool-group-' + count + '"></div>');
                        $('#tool-group-' + count).append('<span class="date" >' + m_d + '-' + year + '<span class="time"> ' + time[0] + '</span></span>');
                        $('#tool-group-' + count).append('<div class="delete" title="Уничтожить" onclick="kill_window(this)"></div>');
                        if (res[i][4] == 1) {
                            $('#tool-group-' + count).append('<div class="favorite-on" title="Самое то"  onclick="favorite(this)"></div>');
                        } else {
                            $('#tool-group-' + count).append('<div class="favorite-off" title="Так се" onclick="favorite(this)"></div>');
                        }
                        $('#tool-group-' + count).append('<span class="id-value">' + res[i][0] + '</span>');
                        $('#tool-group-' + count).append('<div onclick="edit(this)" class="ok" title="Всё ok"  ></div>');
                        $('#tool-group-' + count).append('<div class="cancel" title="Ну нах!" onclick="cancel(this)"></div>');
                        $('#tool-group-' + count).append('<div class="viev" title="Что там?"></div>');
                        $('#note-' + count).append('<p class="content">' + res[i][2] + '</p>');
                        $('#tool-group-' + count).append('<div class="edit" title="Подправить"></div>');
                        ajax_load = 0;
                        localStorage.setItem('max', max + 10);
                        localStorage.setItem('offset', offset + 10);
                    }
                }
            }
        });
    }
});
window.onload = function () {
    load(); // загружает первые 10 заметок
}
let render_note = function (res) { // отображает записи

    for (i = 0; i < res.length; i++) {
        let dirt_date = res[i][3];
        let date = dirt_date.match(/^\d{2,4}([-])\d{2,4}([-])\d{2,4}/);
        let time = dirt_date.match(/\d{1,2}:\d{1,2}:\d{1,2}/);
        let year = dirt_date.match(/^\d{2,4}/);
        let dirt_m_d = dirt_date.match(/-\d{2,4}-\d{2,4}/);
        let m_d = dirt_m_d[0].replace('-', '');
        $('#div-list').append('<div class="note" id="note-' + i + '"></div>');
        $('#note-' + i).append('<div class="tool-note" id="tool-note-' + i + '"></div>');
        $('#tool-note-' + i).append('<span class="name">' + res[i][1] + '</span>');
        $('#tool-note-' + i).append('<div class="tool-group" id="tool-group-' + i + '"></div>');
        $('#tool-group-' + i).append('<span class="date" >' + m_d + '-' + year + '<span class="time"> ' + time[0] + '</span></span>');
        $('#tool-group-' + i).append('<div class="delete" title="Уничтожить" onclick="kill_window(this)"></div>');
        if (res[i][4] == 1) {
            $('#tool-group-' + i).append('<div class="favorite-on" title="Самое то"  onclick="favorite(this)"></div>');
        } else {
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
let load = function () {
    let data = {
        'load': '0-10'
    };
    let modData = JSON.stringify(data);
    $.ajax({
        url: "logic/command-process.php",
        type: "POST",
        data: modData,
        dataType: "json",
        success: function (res) {
            console.log(res);
            render_note(res);
        }
    });
}
let edit = function (elem) { // изменение записи
    let parent = elem.parentNode.children;
    let main_parent = elem.parentNode.parentNode.children;
    let paren_group = elem.parentNode.parentNode.parentNode.children;
    let text_value = paren_group[1].value;
    let title = main_parent[0].value;
    let id = parent[3].innerHTML;
    let data = {
        edit: {
            'id': id,
            'new_title': title,
            'new_text': text_value
        }
    }
    let mod_data = JSON.stringify(data);
    $.ajax({
        url: "logic/command-process.php",
        type: "POST",
        data: mod_data,
        dataType: "json",
        success: function (res) {
            console.log(res);
            let notes = document.getElementsByClassName('note');
            $(notes).remove();
            load();
            ajax_load = 0;
            localStorage.setItem('max', 10);
            localStorage.setItem('offset', 10);
            paren_group[1].style.display = 'block';
            parent[1].style.display = 'block';
            parent[2].style.display = 'block';
            parent[4].style.display = 'none';
            parent[5].style.display = 'none';
            parent[6].style.display = 'block';
            parent[7].style.display = 'block';
            let modal_window = document.getElementsByClassName('modal-window');
            let window_child = modal_window[0].children;
            window_child[2].innerHTML = "Изменения сохранены";
            $('.modal-window').slideToggle(500);
            $('.cover').slideToggle(400);
            let main_wrap = document.getElementsByClassName('main-wrap');
            let header = document.getElementsByTagName('header');
            main_wrap[0].style.filter = 'blur(3px)';
            header[0].style.filter = 'blur(3px)';
        }
    });
}
let cancel = function (elem) { // выход из записи без сохранения изменений
    let parent = elem.parentNode.children;
    let main_parent = elem.parentNode.parentNode.children;
    let paren_group = elem.parentNode.parentNode.parentNode.children;
    let id = parent[3].innerHTML;
    let data = {
        load_one: id
    }
    let mod_data = JSON.stringify(data);
    $.ajax({
        url: "logic/command-process.php",
        type: "POST",
        data: mod_data,
        dataType: "json",
        success: function (res) {
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
let favorite = function (elem) { // изменение флага избранной записи
    let class_css = elem.classList;
    let parent = elem.parentNode.children;
    let id = parent[3].innerHTML;
    if (class_css[0] == 'favorite-on') {
        data = {
            favorite: {
                id: id,
                value: 0
            }
        }
    } else {
        data = {
            favorite: {
                id: id,
                value: 1
            }
        }
    }
    let mod_data = JSON.stringify(data);
    $.ajax({
        url: "logic/command-process.php",
        type: "POST",
        data: mod_data,
        dataType: "json",
        success: function (res) {
            console.log(res);
            if (res[0][4] == 0) {
                elem.classList.remove('favorite-on');
                elem.classList.add('favorite-off');
            } else {
                elem.classList.remove('favorite-off');
                elem.classList.add('favorite-on');
            }
        }
    });

}
let kill_note = function () { // удаление записи
    let id = localStorage.getItem('kill_id');
    let data = {
        'delete': id
    }
    let mod_data = JSON.stringify(data);
    $.ajax({
        url: "logic/command-process.php",
        type: "POST",
        data: mod_data,
        dataType: "json",
        success: function (res) {
            let windiw = document.getElementsByClassName('kill-window');
            $(windiw[0]).slideToggle(400);
            let cover = document.getElementsByClassName('cover');
            $(cover[0]).slideToggle(400);
            let header = document.getElementsByTagName('header');
            header[0].style.filter = 'blur(0px)';
            let main_wrap = document.getElementsByClassName('main-wrap');
            main_wrap[0].style.filter = 'blur(0px)';
            let note_id = localStorage.getItem('note_id');
            let note = document.getElementById(note_id);
            $(note).remove();
        }
    });
}
let search = function (elem) { // поиск запииси по имени
    let field = document.getElementsByClassName('search-field');
    let parent = elem.parentNode.parentNode.children;
    let name = field[0].value;
    let data = {
        'search_name': name
    }
    let mod_data = JSON.stringify(data);
    $.ajax({
        url: "logic/command-process.php",
        type: "POST",
        data: mod_data,
        dataType: "json",
        success: function (res) {
            let notes = document.getElementsByClassName('note');
            console.log(res);
            if (res.length == 0) {
                let window = document.getElementsByClassName('no-found-window');
                $(window[0]).slideToggle(500);
                let main_wrap = document.getElementsByClassName('main-wrap');
                let header = document.getElementsByTagName('header');
                let cover = document.getElementsByClassName('cover');
                $(cover[0]).slideToggle(400);
                main_wrap[0].style.filter = 'blur(3px)';
                header[0].style.filter = 'blur(3px)';
            } else {
                $(notes).remove();
                let clear_button = document.getElementsByClassName('clear-button');
                clear_button[0].style.display = 'block';
                parent[1].style.display = 'none';
                parent[2].style.display = 'none';
                parent[3].style.display = 'none';
                render_note(res);
            }
        }
    });
}
$(document).ready(function () { // ловит нажатие клавиши Enter в поле поиска по имени
    $('.search-field').keydown(function (e) {
        if (e.keyCode === 13) {
            search(this);
        }
    });
});
let date_sort = function (elem) {
    let notes = document.getElementsByClassName('note');
    let sort = localStorage.getItem('order');
    let child = elem.children;
    let data = {
        date_sort: {
            sort_by: sort,
            max: notes.length
        }
    };
    let mod_data = JSON.stringify(data);
    $.ajax({
        url: "logic/command-process.php",
        type: "POST",
        data: mod_data,
        dataType: "json",
        success: function (res) {
            $(notes).remove();
            render_note(res);
            if (sort == 0) {
                localStorage.setItem('order', 1);
                child[1].classList.add('sort-down-hov');
                child[2].classList.remove('sort-up-hov');
            } else if (sort == 1) {
                localStorage.setItem('order', 0);
                child[1].classList.remove('sort-down-hov');
                child[2].classList.add('sort-up-hov');
            }
        }
    });
}
let only_favorite = function (elem) { // загружает только избранные записи
    let parent = elem.parentNode.children;
    let wrap = elem.parentNode;
    console.log(parent);
    let notes = document.getElementsByClassName('note');
    let button = document.getElementsByClassName('clear-button');
    let data = {
        get_favorite: 'all'
    }
    let mod_data = JSON.stringify(data);
    $.ajax({
        url: "logic/command-process.php",
        type: "POST",
        data: mod_data,
        dataType: "json",
        success: function (res) {
            console.log(res);
            $(notes).remove();
            button[0].style.display = 'block';
            elem.style.display = 'none';
            parent[0].style.display = 'none';
            parent[1].style.display = 'none';
            parent[2].style.display = 'none';
            parent[3].style.display = 'none';
            wrap.style.justifyContent = 'flex-end';
            render_note(res);
            ajax_load = 1;
            localStorage.setItem('max', 10);
            localStorage.setItem('offset', 10);
        }
    });
}
let add = function (elem) { // добавляет новую заметку
    let title = elem.previousElementSibling.previousElementSibling.value;
    let text = elem.parentNode.nextElementSibling.value;
    let favorite_class = elem.previousElementSibling.classList;
    if (favorite_class == 'favorite-off') {
        var favorite_val = 0;
    } else if (favorite_class == 'favorite-on') {
        var favorite_val = 1;
    }
    let data = {
        add_note: {
            title: title,
            text: text,
            favorite: favorite_val
        }
    }
    let mod_data = JSON.stringify(data);
    $.ajax({
        url: "logic/command-process.php",
        type: "POST",
        data: mod_data,
        dataType: "html",
        success: function (res) {
            let modal_window = document.getElementsByClassName('modal-window');
            let window_child = modal_window[0].children;
            window_child[2].innerHTML = "Заметка сохранена"
            $('.modal-window').slideToggle(500);
            $('.cover').slideToggle(500);
            $('.new_note_filds').slideToggle(500);
            console.log(window_child);
            let header = document.getElementsByTagName('header');
            let main_wrap = document.getElementsByClassName('main-wrap');
            header[0].style.filter = 'blur(3px)';
            main_wrap[0].style.filter = 'blur(3px)';
            $('.note').remove();
            ajax_load = 0;
            localStorage.setItem('max', 10);
            localStorage.setItem('offset', 10);
            load();
        }
    });
}