$(document).ready(function() {
    $('#div-list').on('click', '.viev', function() {
        let elem_neib = this.parentNode.nextElementSibling;
        $(elem_neib).slideToggle(400);
    });
});
