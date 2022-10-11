//Este archivo contiene todas las funciones relacionadas con el cliente
var myURLAdmin = 'api/Admin';

//obtiene todos los clientes
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
    myTableAdmin += "<tr><td style=width:150px>Id Administrador</td><td style=width:150px>Nombre</td><td style=width:150px>Correo</td><td style=width:150px>Acciones</td></tr>";
    if(items !== undefined){
        for (i = 0; i < items.length; i++) {
            myTableAdmin += "<tr>";
            myTableAdmin += "<td style=width:150px>" + items[i].id + "</td>"
            myTableAdmin += "<td style=width:150px>" + items[i].name + "</td>"
            myTableAdmin += "<td style=width:150px>" + items[i].email + "</td>"
            myTableAdmin += "<td><button ><img src=/icons/edit.png  alt=Actualizar height=20></button>";
            myTableAdmin += "<button ><img src=/icons/delete2.png  alt=Eliminar height=20></button></td>";
            myTableAdmin += "</tr>";
        }
    }
    myTableAdmin += "</table>";
    $("#admin").append(myTableAdmin);

}

function habilitaDatosCliente(nuTipo) {
    //Esta funcion muestra en pantalla los datos del cliente para crear o actualizar clientes
    $("#campos").empty();
    let campos = "<h2>Ingrese la informacion del Cliente</h2>";

    if (nuTipo == 1) {
        console.log("diana");
    } else {
        campos += "<label width: 180px;>Codigo: </label>"
        campos += "<input type=number id=idClient disabled class=input><br>";
    }

    campos += "<label width: 180px;>Nombre: </label><input type=text id=nameClient class=input><br>";
    campos += "<label width: 180px;>Correo: </label><input type=text id=emailClient class=input><br>";
    campos += "<label width: 180px;>Edad:   </label><input type=number id=ageClient class=input><br>";

    //si el tipo es 1 es para crearlo y si el tipoo es 2 para actaulizarlo
    if (nuTipo == 1) {
        campos += "<button onclick=saveClient() >Guardar Cliente</button>";
    } else {
        campos += "<button onclick=updateClient() >Guardar Cliente</button>";
    }
    campos += "</div>";
    $("#campos").append(campos);
}

//obtiene los datos digitados en el formulario de clientes
function getClientInfo() {
    let idClient = $("#idClient").val();
    let nameClient = $("#nameClient").val();
    let emailClient = $("#emailClient").val();
    let ageClient = $("#ageClient").val();

    let client = {
        idClient: idClient,
        name: nameClient,
        email: emailClient,
        age: ageClient
    };

    return client;
}


//esta funcion crea el cliente
function saveClient() {

    let data = getClientInfo();
    let dataToSend = JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url: myURLAdmin+'/save',
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        success: function (clients) {
            getClients();
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });

}
//esta funcion borra el cliente
function deleteClient(idClient) {

    let data = { id: idClient };
    let dataToSend = JSON.stringify(data);
    $.ajax({
        url: myURLAdmin+'/delete/'+idClient,
        type: 'DELETE',
        contentType: 'application/json',
        data: dataToSend,
        success: function (clients) {
            getClients();
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}

//esta funcion actualiza el cliente
function updateClient() {

    let data = getClientInfo();
    let dataToSend = JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url: myURLAdmin+'/save',
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        success: function (clients) {
            try {
                getClients();
            } catch (error) {
                console.log("Hubo errrorrrrrrrrrrrrrrrrrrrrr");
            }

        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });

}

//esta función obtiene el dato del cliente y lo muestra en el formulario de actualización.
function getDetailClient(idClient) {
    habilitaDatosCliente(2);

    $.ajax({
        url: myURLAdmin + "/" + idClient,
        type: 'GET',
        dataType: 'json',
        success: function (clients) {
            let cs = clients;
            console.log("Mensaje1"+cs);
            console.log("Mensaje2"+clients.items);

            $("#idClient").val(cs.idClient);
            $("#nameClient").val(cs.name)
            $("#emailClient").val(cs.email);
            $("#ageClient").val(cs.age);

        },
        error: function (xhr, status) {
            alert('ha sucedido un problema', status.data);
        }
    });
}
