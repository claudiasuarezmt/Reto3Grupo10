//Este archivo contiene todas las funciones relacionadas con el cliente
var myURLCliente = 'api/Client';

//obtiene todos los clientes
function getClients() {

    $.ajax({
        url: myURLCliente+'/all',
        type: 'GET',
        dataType: 'json',
        success: function (clients) {
            let cs = clients.items;
            console.log(clients);
            $("#campos").empty();
            $("#cliente").empty();
            pintarCliente(clients);


        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}

//pinta la tabla en pantalla con los datos de los clientes
function pintarCliente(items) {
    let myTableCliente = "<table cellpadding=0 cellspacing=0 class=tabla >";
    myTableCliente += "<tr><td style=width:150px>Id Cliente</td><td style=width:150px>Nombre</td><td style=width:150px>Correo</td><td style=width:150px>Edad</td><td style=width:150px>Acciones</td></tr>";
    if(items !== undefined){
        for (i = 0; i < items.length; i++) {
            myTableCliente += "<tr>";
            myTableCliente += "<td style=width:150px>" + items[i].idClient + "</td>"
            myTableCliente += "<td style=width:150px>" + items[i].name + "</td>"
            myTableCliente += "<td style=width:150px>" + items[i].email + "</td>"
            myTableCliente += "<td style=width:150px>" + items[i].age + "</td>"
            myTableCliente += "<td><button onclick=getDetailClient(" + items[i].idClient + ") ><img src=/icons/edit.png  alt=Actualizar height=20></button>";
            myTableCliente += "<button onclick=deleteClient(" + items[i].idClient + ") ><img src=/icons/delete2.png  alt=Eliminar height=20></button></td>";
            myTableCliente += "</tr>";
        }
    }
    myTableCliente += "</table>";
    $("#cliente").append(myTableCliente);

}

function habilitaDatosCliente(nuTipo) {
    //Esta funcion muestra en pantalla los datos del cliente para crear o actualizar clientes
    $("#campos").empty();
    let campos = "<h2>Ingrese la informacion del Cliente</h2>";

    if (nuTipo == 2) {
        campos += "<label width: 180px;>Codigo: </label>"
        campos += "<input type=number id=idClient disabled class=input><br>";
    }

    campos += "<label width: 180px;>Nombre: </label><input type=text id=nameClient class=input><br>";
    if (nuTipo == 1){
        campos += "<label width: 180px;>Correo: </label><input type=text id=emailClient class=input><br>";
    }else{
        campos += "<label width: 180px;>Correo: </label><input type=text id=emailClient disabled class=input><br>";
    }

    campos += "<label width: 180px;>Contraseña:   </label><input type=password id=passClient class=input><br>";

    campos += "<label width: 180px;>Edad:   </label><input type=number id=ageClient class=input><br>";

    //si el tipo es 1 es para crearlo y si el tipo es 2 para actaulizarlo
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
    let passClient = $("#passClient").val();

    let client = {
        idClient: idClient,
        name: nameClient,
        email: emailClient,
        age: ageClient,
        password: passClient
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
        url: myURLCliente+'/save',
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

//esta funcion actualiza el cliente
function updateClient() {

    let data = getClientInfo();
    let dataToSend = JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url: myURLCliente+'/update',
        type: 'PUT',
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

//esta función obtiene el dato del cliente y lo muestra en el formulario de actualización.
function getDetailClient(idClient) {
    habilitaDatosCliente(2);

    $.ajax({
        url: myURLCliente + "/" + idClient,
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
function deleteClient(idClient) {

    let data = { id: idClient };
    let dataToSend = JSON.stringify(data);
    $.ajax({
        url: myURLCliente+'/'+idClient,
        type: 'DELETE',
        contentType: 'application/json',
        data: dataToSend,
        success: function (client) {
            getClients();
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}