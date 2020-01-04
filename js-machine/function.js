window.onload = function() {
    load();
}
let load = function() {
let data = {'load':'0-10'};
console.log(data);
let modData = JSON.stringify(data);
$.ajax({                                   
    url: "logic/command-process.php",                               
    type: "GET", 
    data: modData,  
    dataType: "html",
    success: function(res) {                         
       let json_parse = JSON.parse(res);
        for (i = 0; i < json_parse.length; i++) {
            $('#div-list').append('<div class="note" id="note-' + i + '"></div>');
            $('#note-' + i).append('<div class="tool-note" id="tool-note-' + i + '"></div>');
            $('#tool-note-' + i).append('<span class="name">' + json_parse[i][1] + '</span>');
            $('#tool-note-' + i).append('<span class="date">' + json_parse[i][3] + '</span>');
            $('#tool-note-' + i).append('<div class="viev"></div>');
            $('#note-' + i).append('<p class="content">' + json_parse[i][2] + '</p>');
            $('#tool-note-' + i).append('<div class="edit"></div>');
        }
    }
});
}
