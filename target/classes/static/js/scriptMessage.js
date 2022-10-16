//Este archivo contiene todas las funciones relacionadas con el mensaje
var myURLMessage = 'api/Message';
//esta funcion obtiene todos los mensajes
menuOptionxxx='';
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
    myTableMensaje += "<tr><td style=width:150px>Mensaje</td><td style=width:150px>Biblioteca</td><td style=width:150px>Cliente</td><td style=width:150px>Acciones</td></tr>";
    if(items !== undefined) {
        for (i = 0; i < items.length; i++) {
            myTableMensaje += "<tr>";
            myTableMensaje += "<td style=width:300px>" + items[i].messageText + "</td>"
            if(items[i].lib !== null){
                myTableMensaje+='<td><table class="nulo">'

                    myTableMensaje += "<tr style='background-color:#DDEBF7; color: black; '><td style=width:70px>" + items[i].lib.name + "</td>"
                    myTableMensaje += "<td style=width:70px>" + items[i].lib.target + "</td>"
                    myTableMensaje += "<td style=width:70px>" + items[i].lib.capacity + "</td>"
                    myTableMensaje += "<td style=width:70px>" + items[i].lib.description + "</td></tr>"

                myTableMensaje+='</table></td>'
            }else{
                myTableMensaje += "<td style=width:280px></td>"




            }
            if(items[i].client !== null){
                myTableMensaje+='<td><table class="nulo">'

                myTableMensaje += "<tr style='background-color:#DDEBF7; color: black; '><td style=width:70px>" + items[i].client.name + "</td>"
                myTableMensaje += "<td style=width:70px>" + items[i].client.age + "</td>"
                myTableMensaje += "<td style=width:70px>" + items[i].client.email + "</td>"

                myTableMensaje+='</table></td>'
            }else{
                myTableMensaje += "<td style=width:280px></td>"




            }
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
        campos += "<input type=hidden id=idMessage disabled class=input><br>";
    }
    campos += "<label width: 180px;>Mensaje: </label><input type=text id=Messagetext class=input><br>";
    if (nuTipo==1){
        campos += "<label width: 180px;>Biblioteca: </label><select id=library>"+menuOptionxxx+"</select><br/>";
    }else{
        campos += "<label width: 180px;>Biblioteca: </label><select id=library disabled> " +menuOptionxxx+"</select><br/>";
    }



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
    let selectedVal = $("#library option:selected").val();

    let mensaje = {
        idMessage: idMessage,
        messageText: MessageText,
        lib: {id:selectedVal }
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
        url: myURLMessage+'/'+idMessage,
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


    $.ajax({
        url: myURLMessage + "/" + idMessage,
        type: 'GET',
        dataType: 'json',
        success: function (message) {

            habilitaDatosMensaje(2);
            $("#idMessage").val(message.idMessage);
            $("#Messagetext").val(message.messageText);
            $("#library").val(message.lib.id);

        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}

window.addEventListener('load', async function() {
    let option = "";
    try {
        let menuOption = await fetch('api/Lib/all');
        let library = await menuOption.json();

        for (i = 0; i < library.length; i++) {
            option += '<option value="' + library[i].id + '">' + library[i].name + '</option>';
        }
    }catch (e) {
        console.log(e);
    }
    menuOptionxxx = option;
    console.log(menuOptionxxx);

});
