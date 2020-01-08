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
    main_wrap[0].style.filter = 'blur(0px)';
    header[0].style.filter = 'blur(0px)'; 
}
