$(document).ready(function() {

    const url = window.location.href;
    let temp = url.split("/");
    const item = temp[temp.length-1];

let menu = '<div class="navbar-left">\n' +
    '    <ul>\n' ;
    if(item==="index.html"){
        menu= menu+'<li><a href="index.html" style="color: black;">';
    }else{
        menu= menu+'<li><a href="index.html">';
    }
    menu=menu+'Inicio </a></li>';
    if(item==="admin.html"){
        menu=menu+'<li><a href="admin.html" style="color: black;">'
    }else{
        menu=menu+'<li><a href="admin.html">'
    }
    menu=menu+'Administradores </a></li>';


    if(item==="client.html"){
        menu= menu+'<li><a href="client.html" style="color: black;">';
    }else{
        menu= menu+'<li><a href="client.html">';
    }

    menu=menu+'Clientes </a></li>';

    if(item==="category.html"){
        menu= menu+'<li><a href="category.html" style="color: black;">';
    }else{
        menu= menu+'<li><a href="category.html">';
    }

    menu=menu+'Categorias </a></li>';

    if(item==="message.html"){
        menu= menu+'<li><a href="message.html" style="color: black;">';
    }else{
        menu= menu+'<li><a href="message.html">';
    }

    menu=menu+'Mensajes </a></li>';
    menu=menu+'</ul></div>'
    $("#menu").html(menu);


});