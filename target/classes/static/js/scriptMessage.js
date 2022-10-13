//Este archivo contiene todas las funciones relacionadas con el mensaje
var myURLMessage = 'api/Message';
//esta funcion obtiene todos los mensajes
function getMessage() {

    $.ajax({
        url: myURLMessage+'/all',
        type: 'GET',
        dataType: 'json',
        success: function (message) {
            console.log(message);
            $("#camposmessage").empty();
            $("#message").empty();
            pintarMensaje(message);


        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}
//esta funcion pinta la tabla con los mensajes
function pintarMensaje(items) {

    let myTableMensaje = "<table  class=tabla>";
    myTableMensaje += "<tr><td style=width:150px>Id Mensaje</td><td style=width:150px>Mensaje</td><td style=width:150px>Acciones</td></tr>";
    if(items !== undefined) {
        for (i = 0; i < items.length; i++) {
            myTableMensaje += "<tr>";
            myTableMensaje += "<td style=width:150px>" + items[i].idMessage + "</td>"
            myTableMensaje += "<td style=width:300px>" + items[i].messageText + "</td>"
            myTableMensaje += "<td><button onclick=getDetailMessage(" + items[i].idMessage + ") ><img src=/icons/edit.png  alt=Actualizar height=20></button>";
            myTableMensaje += "<button onclick=deleteMessage(" + items[i].idMessage + ") ><img src=/icons/delete2.png  alt=Eliminar height=20></button></td>";
            myTableMensaje += "</tr>";
        }
    }
    myTableMensaje += "</table>";
    $("#message").append(myTableMensaje);

}

function habilitaDatosMensaje(nuTipo) {
    //Esta funcion muestra en pantalla los datos del mensaje para crear o actualizar
    $("#camposmessage").empty();
    let campos = "<h2>Ingrese la información del Mensaje</h2>"

    if (nuTipo == 2) {
        campos += "<label width: 180px;>Código: </label>"
        campos += "<input type=number id=idMessage disabled class=input><br>";
    }
    campos += "<label width: 180px;>Mensaje: </label><input type=text id=Messagetext class=input><br>";
    if (nuTipo == 1) {
        campos += "<button onclick=saveMessage() >Guardar Mensaje</button>";
    } else {
        campos += "<button onclick=updateMessage() >Actualizar Mensaje</button>";
    }


    campos += "</div>";
    $("#camposmessage").append(campos);
}
function getMensajeInfo() {
    let idMessage = $("#idMessage").val();
    let MessageText = $("#Messagetext").val();

    let mensaje = {
        id: idMessage,
        messageText: MessageText
    };

    return mensaje;
}

function saveMessage() {

    let data = getMensajeInfo();
    let dataToSend = JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url: myURLMessage+'/save',
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        success: function (mensaje) {
            getMessage();
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });

}

function deleteMessage(idMessage) {

    let data = { id: idMessage };
    let dataToSend = JSON.stringify(data);
    $.ajax({
        url: myURLMessage+'/delete',
        type: 'DELETE',
        contentType: 'application/json',
        data: dataToSend,
        success: function (mensaje) {
            getMessage();
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}

function updateMessage() {

    let data = getMensajeInfo();
    let dataToSend = JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url: myURLMessage+'/update',
        type: 'PUT',
        contentType: 'application/json',
        data: dataToSend,
        success: function (mensaje) {
            getMessage();
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });

}
function getDetailMessage(idMessage) {
    habilitaDatosMensaje(2);

    $.ajax({
        url: myURLMessage + "/" + idMessage,
        type: 'GET',
        dataType: 'json',
        success: function (message) {


            $("#idMessage").val(message.idMessage);
            $("#Messagetext").val(message.messageText);

        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}
