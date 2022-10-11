//Este archivo contiene todas las funciones relacionadas con los administradores
var myURLAdmin = 'api/Admin';

//obtiene todos los administradores
function getAdmins() {

    $.ajax({
        url: myURLAdmin+'/all',
        type: 'GET',
        dataType: 'json',
        success: function (admins) {


            $("#campos").empty();
            $("#admin").empty();
            pintarAdmins(admins);


        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}

//pinta la tabla en pantalla con los datos de los clientes
function pintarAdmins(items) {
    let myTableAdmin = "<table cellpadding=0 cellspacing=0 class=tabla >";
    myTableAdmin += "<tr><td style=width:150px>Id Administrador</td><td style=width:150px>Nombre</td><td style=width:150px>Correo</td></tr>";
    if(items !== undefined){
        for (i = 0; i < items.length; i++) {
            myTableAdmin += "<tr>";
            myTableAdmin += "<td style=width:150px>" + items[i].id + "</td>"
            myTableAdmin += "<td style=width:150px>" + items[i].name + "</td>"
            myTableAdmin += "<td style=width:150px>" + items[i].email + "</td>"
            myTableAdmin += "</tr>";
        }
    }
    myTableAdmin += "</table>";
    $("#admin").append(myTableAdmin);

}

