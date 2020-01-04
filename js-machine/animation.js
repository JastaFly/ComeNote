$(document).ready(function() {
    $('#div-list').on('click', '.viev', function() {
        let elem_neib = this.parentNode.nextElementSibling;
        $(elem_neib).slideToggle(400);
    });
});
$(document).ready(function() {
    $('#div-list').on('click', '.edit', function() {
        let elem_neib = this.parentNode.nextElementSibling;
        $(elem_neib).slideToggle(400);
        $(elem_neib).replaceWith('<textarea class="node-fild ">' + $(elem_neib).text() + '</textarea>');
        this.style.display = 'none';
        console.log(elem_neib);
      
    });
});