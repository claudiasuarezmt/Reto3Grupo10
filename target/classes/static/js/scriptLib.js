//Este archivo contiene todas las funciones relacionadas con el Library
var myURLLib = 'api/Lib';

//obtiene todos los Library
function getLib() {

    $.ajax({
        url: myURLLib+'/all',
        type: 'GET',
        dataType: 'json',
        success: function (lib) {
            $("#tabLib").empty();
            $("#lib").empty();
            pintarlib(lib);

        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}

//pinta la tabla en pantalla con los datos de los clientes
function pintarlib(items) {
    let myTableLib = "<table cellpadding=0 cellspacing=0 class=tabla >";
    myTableLib += "<tr>" +
        "<th style=width:150px>Id libro</th>" +
        "<th style=width:150px>Nombre</th>" +
        "<th style=width:150px>Obejtivo</th>" +
        "<th style=width:150px>Capacidad</th>" +
        "<th style=width:150px>Descripcion</th>" +
        "<th style=width:150px>Mensaje</th>" +
        "<th style=width:150px>Reservacion</th>" +
        "</tr>";
    if(items !== undefined){
        for (i = 0; i < items.length; i++) {
            myTableLib += "<tr>";
            myTableLib += "<td style=width:150px>" + items[i].id + "</td>"
            myTableLib += "<td style=width:150px>" + items[i].name + "</td>"
            myTableLib += "<td style=width:150px>" + items[i].target + "</td>"
            myTableLib += "<td style=width:150px>" + items[i].capacity + "</td>"
            myTableLib += "<td style=width:150px>" + items[i].description + "</td>"
            myTableLib += "<td style=width:150px>" + items[i].messageText() + "</td>"
            myTableLib += "<td style=width:150px>" + items[i].endReservation + "</td>"

            if(items[i].libs.length !== 0) {
                myTableLib += '<td><table class="nulo">'
                for (j = 0; j < items[i].libs.length; j++) {
                    myTableLib += "<tr style='background-color:#DDEBF7; color: black; '><td style=width:70px>" + items[i].libs[j].name + "</td>"
                    myTableLib += "<td style=width:70px>" + items[i].libs[j].target + "</td>"
                    myTableLib += "<td style=width:70px>" + items[i].libs[j].capacity + "</td>"
                    myTableLib += "<td style=width:70px>" + items[i].libs[j].description + "</td></tr>"
                }
            }

            myTableLib += "<td><button onclick=getDetailLib(" + items[i].id + ") ><img src=/icons/edit.png  alt=Actualizar height=20></button></td>";
            myTableLib += "</tr>";
        }

        myTableLib+='</table></td>'
    }else{
        myTableLib += "<td style=width:280px></td>"


    }
    myTableLib += "<td style=width:150px>"+"<button onclick=getDetailLib(" + items[i].id + ") ><img src=/icons/edit.png  alt=Actualizar height=20></button>";
    myTableLib += "<button onclick=deleteLib(" + items[i].id + ") ><img src=/icons/delete2.png  alt=Eliminar height=20></button></td>";
    myTableLib += "</tr>";

    myTableLib += "</table>";
    $("#tabLib").append(myTableLib);

}

function habilitaDatosLib(nuTipo) {
    //Esta funcion muestra en pantalla los datos del libros para crear o actualizar libros
    $("#camposLib").empty();
    let campos = "<h2>Ingrese la información del Libro</h2>";

    if (nuTipo == 2) {
        campos += "<label width: 180px;>Codigo: </label>"
        campos += "<input type=number id=id disabled class=input><br>";
    }

    campos += "<label width: 180px;>Nombre: </label><input type=text id=nameLib class=input><br>";
    if (nuTipo == 1) {
        campos += "<label width: 180px;>Objetivo: </label><input type=text id=targetlLib class=input><br>";
    } else {
        campos += "<label width: 180px;>Objetivo: </label><input type=text id=targetLib disabled class=input><br>";
    }
    if (nuTipo == 1) {
        campos += "<label width: 180px;>Capacidad: </label><input type=text id=targetlLib class=input><br>";
    } else {
        campos += "<label width: 180px;>Capacidad: </label><input type=text id=targetLib disabled class=input><br>";
    }
    if (nuTipo == 1) {
        campos += "<label width: 180px;>Descripcion: </label><input type=text id=targetlLib class=input><br>";
    } else {
        campos += "<label width: 180px;>Descripcion: </label><input type=text id=targetLib disabled class=input><br>";


        //si el tipo es 1 es para crearlo y si el tipo es 2 para actaulizarlo
        if (nuTipo == 1) {
            campos += "<button onclick=saveLib() >Guardar Libreria</button>";
        } else {
            campos += "<button onclick=updateLib() >Guardar Libreria</button>";
        }
        campos += "</div>";
        $("#camposlib").append(campos);
    }

//obtiene los datos digitados en el formulario de clientes
    function getLibInfo() {
        let idLib = $("#idLibrary").val();
        let nameLib = $("#nameLibrary").val();
        let objetivoLib = $("#objetivoLibrary").val();
        let targetLib = $("#targetLibrary").val();
        let descripcionLib = $("#descripcionLibrary").val();

        }

        let lib = {
            id: idlib,
            name: nameLib,
            target: objetivoLib,
            capacity: capacidadLib,
            description: descripcionLib,
            category: {
                id: $("#camposCategory").val()
            }
        };

        return lib;
    }


//esta funcion crea el libro
    function savelib() {

        let data = getLibInfo();
        let dataToSend = JSON.stringify(data);

        console.log(data);
        console.log(dataToSend);

        $.ajax({
            url: myURLLib + '/save',
            type: 'POST',
            contentType: 'application/json',
            data: dataToSend,
            success: function (lib) {
                getLib();
            },
            error: function (xhr, status) {
                alert('ha sucedido un problema');
            }
        });

    }

//esta funcion actualiza el Library
    function updateLib() {

        let data = getLibInfo();
        let dataToSend = JSON.stringify(data);

        console.log(data);
        console.log(dataToSend);

        $.ajax({
            url: myURLLib + '/save',
            type: 'POST',
            contentType: 'application/json',
            data: dataToSend,
            success: function (lib) {
                getLib();

            },
            error: function (xhr, status) {
                alert('ha sucedido un problema');
            }
        });

    }

//esta función obtiene el dato del Libreria y lo muestra en el formulario de actualización.
    function getDetailLib(idlib) {
        habilitaDatosLib(2);

        $.ajax({
            url: myURLLib + "/" + idlib,
            type: 'GET',
            dataType: 'json',
            success: function (lib) {
                let cs = lib;
                console.log("Mensaje1" + cs);
                console.log("Mensaje2" + lib.items);

                $("#idCLib").val(cs.id);
                $("#nameLib").val(cs.name)
                $("#objetivoLib").val(cs.email);
                $("#capacidadLib").val(cs.age);

            },
            error: function (xhr, status) {
                alert('ha sucedido un problema', status.data);
            }
        });

}