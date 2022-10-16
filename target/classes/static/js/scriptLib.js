//Este archivo contiene todas las funciones relacionadas con el Library
var myURLLib = 'api/Lib';

//obtiene todos los Library
function getlib() {

    $.ajax({
        url: myURLLib+'/all',
        type: 'GET',
        dataType: 'json',
        success: function (lib) {
            let cs = lib.items;
            console.log(lib);
            $("#campos").empty();
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
        "<td style=width:150px>Id libro</th>" +
        "<td style=width:150px>Nombre</th>" +
        "<td style=width:150px>Obejtivo</th>" +
        "<td style=width:150px>Capacidad</th>" +
        "<td style=width:150px>Descripcion</th>" +
        "<td style=width:150px>Mensaje</th>" +
        "<td style=width:150px>Reservacion</th>" +
        "</tr>";
    if(items !== undefined){
        for (i = 0; i < items.length; i++) {
            myTableLib += "<tr>";
            myTableLib += "<td style=width:150px>" + items[i].id + "</td>"
            myTableLib += "<td style=width:150px>" + items[i].name + "</td>"
            myTableLib += "<td style=width:150px>" + items[i].target + "</td>"
            myTableLib += "<td style=width:150px>" + items[i].capacity + "</td>"
            myTableLib += "<td style=width:150px>" + items[i].description + "</td>"
            myTableLib += "<td style=width:150px>" + items[i].message() + "</td>"
            myTableLib += "<td style=width:150px>" + items[i].reservations + "</td>"

            myTableLib += "<td><button onclick=getDetailLib(" + items[i].id + ") ><img src=/icons/edit.png  alt=Actualizar height=20></button></td>";
            myTableLib += "</tr>";
        }
    }
    myTableLib += "</table>";
    $("#lib").append(myTableLib);

}

function habilitaDatosLib(nuTipo) {
    //Esta funcion muestra en pantalla los datos del cliente para crear o actualizar clientes
    $("#campos").empty();
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
        $("#campos").append(campos);
    }

//obtiene los datos digitados en el formulario de clientes
    function getLibInfo() {
        let idLib = $("#idLib").val();
        let nameLib = $("#nameLib").val();
        let emailClient = $("#emailLib").val();
        let ageClient = $("#ageLib").val();
        let passClient = $("#passLib").val();

        let lib = {
            id: id,
            name: nameLib,
            target: objetivoLib,
            capacity: CapacidadLibrary,
            description: DescripcionLib,
        };

        return lib;
    }


//esta funcion crea el libro
    function savelib() {

        let data = getlibInfo();
        let dataToSend = JSON.stringify(data);

        console.log(data);
        console.log(dataToSend);

        $.ajax({
            url: myURLLib + '/save',
            type: 'POST',
            contentType: 'application/json',
            data: dataToSend,
            success: function (clients) {
                getlib();
            },
            error: function (xhr, status) {
                alert('ha sucedido un problema');
            }
        });

    }

//esta funcion actualiza el cliente
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
            success: function (clients) {
                getlib();

            },
            error: function (xhr, status) {
                alert('ha sucedido un problema');
            }
        });

    }

//esta función obtiene el dato del cliente y lo muestra en el formulario de actualización.
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
                $("#emailLib").val(cs.email);
                $("#ageClient").val(cs.age);

            },
            error: function (xhr, status) {
                alert('ha sucedido un problema', status.data);
            }
        });
    }
}
