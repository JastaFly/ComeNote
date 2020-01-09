$(document).ready(function() {
    $('#div-list').on('click', '.viev', function() {
        let elem_neib = this.parentNode.parentNode.nextElementSibling;
        $(elem_neib).slideToggle(400);
    });
});
$(document).ready(function() {
    $('#div-list').on('click', '.edit', function() {
        let text = this.parentNode.parentNode.nextElementSibling;
        let parent = this.parentNode.children;
        let tool_note = this.parentNode.parentNode.children;
        console.log(parent);
        $(text).replaceWith('<textarea class="node-fild ">' + $(text).text() + '</textarea>');
        $(tool_note[0]).replaceWith('<input type="text" class="node-title" size="130" value="' + $(tool_note[0]).text() + '">');
        this.style.display = 'none';
        parent[1].style.display = 'none';
        parent[2].style.display = 'none';
        parent[6].style.display = 'none';
        parent[4].style.display = 'block';
        parent[5].style.display = 'block';
        $(text).slideToggle(400);
    });
}); 
let closer = function(elem) {
    let modal_window = elem.parentNode.parentNode;
    console.log(modal_window);
    $(modal_window).slideToggle(500);
    let main_wrap = document.getElementsByClassName('main-wrap');
    let header = document.getElementsByTagName('header');
    let cover = document.getElementsByClassName('cover');
    $(cover[0]).slideToggle(400);
    main_wrap[0].style.filter = 'blur(0px)';
    header[0].style.filter = 'blur(0px)'; 
}
let kill_window = function(elem) {
    let parent = elem.parentNode.children;
    let main_parent = elem.parentNode.parentNode.children;
    let note_id = elem.parentNode.parentNode.parentNode.getAttribute('id');
    localStorage.setItem('note_id', note_id);
    let id = parent[3].innerHTML;
    let title_value = main_parent[0].innerHTML;
    localStorage.setItem('kill_id', id);
    let title = document.getElementsByClassName('kill-title');
    title[0].innerHTML = title_value;
    let windiw = document.getElementsByClassName('kill-window');
    $(windiw[0]).slideToggle(400);
    let cover = document.getElementsByClassName('cover');
    $(cover[0]).slideToggle(400);
    let header = document.getElementsByTagName('header');
    header[0].style.filter = 'blur(3px)';
    let main_wrap = document.getElementsByClassName('main-wrap');
    main_wrap[0].style.filter = 'blur(3px)';
}