//Este archivo contiene todas las funciones relacionadas con las reservas
var myURLReservation = 'api/Reservation';
menuOptionxxx='';
clientOption='';
//obtiene todos las reservas
function getReservation() {

    $.ajax({
        url: myURLReservation+'/all',
        type: 'GET',
        dataType: 'json',
        success: function (reservas) {
            $("#camposReservation").empty();
            $("#reservation").empty();
            pintarReservation(reservas);


        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}

//pinta la tabla en pantalla con los datos de la reserva
function pintarReservation(items) {
    let myTableReservation= "<table cellpadding=0 cellspacing=0 class=tabla >";

    myTableReservation += "<tr><td style=width:70px>Id cliente</td>" +
                            "<td style=width:100px>Nombre cliente</td>" +
                            "<td style=width:100px>Correo cliente</td>" +
                            "<td style=width:100px>Biblioteca</td>" +
                            "<td  style=width:70px>Calificación</td>" +
                            "<td style=width:100px>Fecha inicio</td>" +
                            "<td style=width:100px>Fecha devolución</td>" +
                            "<td style=width:70px>Estado</td>" +
                            "<td style=width:100px>Acciones</td></tr>";
    if(items !== undefined){
        for (i = 0; i < items.length; i++) {
            myTableReservation += "<tr>";
            if(items[i].client!==null) {
                myTableReservation += "<td style=width:150px>" + items[i].client.idClient + "</td>"
                myTableReservation += "<td style=width:150px>" + items[i].client.name + "</td>"
                myTableReservation += "<td style=width:150px>" + items[i].client.email + "</td>"
            }else{
                myTableReservation += "<td style=width:150px></td>"
                myTableReservation += "<td style=width:150px></td>"
                myTableReservation += "<td style=width:150px></td>"
            }
            if (items[i].lib!=null){
                myTableReservation += "<td style=width:150px>" + items[i].lib.name + "</td>"
            }else{
                myTableReservation += "<td style=width:150px></td>"
            }
            if(items[i].score){
                myTableReservation += "<td style=width:150px>" + items[i].score.score + "</td>"
            }else{
                myTableReservation += "<td style=width:150px></td>"
            }

            console.log(items[i].startDate);

            const fechaInicio = items[i].startDate.split("T");
            const fechaFin = items[i].devolutionDate.split("T");

            myTableReservation += "<td style=width:150px>" + fechaInicio[0] + "</td>"
            myTableReservation += "<td style=width:150px>" + fechaFin[0] +"</td>"
            myTableReservation += "<td style=width:150px>" + items[i].status + "</td>"
            myTableReservation += "<td style=width:150px>"+"<button onclick=getDetailReservation(" + items[i].idReservation + ") ><img src=/icons/edit.png  alt=Actualizar height=20></button>";
            myTableReservation += "<button onclick=deleteReservation(" + items[i].idReservation + ") ><img src=/icons/delete2.png  alt=Eliminar height=20></button></td>";
            myTableReservation += "</tr>";
        }
    }
    myTableReservation += "</table>";
    $("#reservation").append(myTableReservation);

}

function habilitaDatosReservation(nuTipo) {
        //Esta funcion muestra en pantalla los datos de la reserva para crear o actualizar
        $("#camposReservation").empty();
        let campos = "<h2>Ingrese la informacion de la reserva</h2>";

        if (nuTipo == 2) {
            campos += "<input type=hidden id=idReservation disabled class=input><br>";
        }

        campos += "<div class='input2'><label width: 180px;>Fecha de solicitud </label><input type=date id=iniReservation class=input></input></div>";
        campos += "<div class='input2'><label width: 180px;>Fecha de entrega </label><input type=date id=endReservation class=input></input></div>";
        if (nuTipo==1){
            campos += "<div class='input2'><label width: 180px;>Biblioteca: </label><select id=library>"+menuOptionxxx+"</select></div>";
        }else{
            campos += "<div class='input2'><label width: 180px;>Biblioteca: </label><select id=library disabled> " +menuOptionxxx+"</select></div>";
        }
        if (nuTipo==1){
            campos += "<div class='input2'><label width: 180px;>Cliente: </label><select id=client>"+clientOption+"</select></div>";
        }else{
            campos += "<div class='input2'><label width: 180px;>Cliente: </label><select id=client disabled> " +clientOption+"</select></div>";
        }
        if (nuTipo==1){
            campos += "<div class='input2'><label width: 180px;>Estado </label>" +
                     "<select  id=status disabled>" +
                            "<option value=created selected>Creado</option>" +
                        "</select></div>";
        }else{
            campos += "<div class='input2'><label width: 180px;>Estado </label>" +
                "<select   id=status>" +
                "<option value=created>Creado</option>" +
                "<option value=programed>Programado</option>" +
                "<option value='cancelled'>Cancelado</option>" +
                "<option value='realized'>Realizado</option>" +
                "</select></div>";
        }



        //si el tipo es 1 es para crearlo y si el tipo es 2 para actaulizarlo
        if (nuTipo == 1) {
            campos += "<button onclick=saveReservation() >Guardar Reserva</button>";
        } else {
            campos += "<button onclick=updateReservation() >Guardar Reserva</button>";
        }
        campos += "</div>";
        $("#camposReservation").append(campos);
}

//obtiene los datos digitados en el formulario de reservas
function getReservationInfo() {
    let idReservation =$("#idReservation").val();
    let startDate = $("#iniReservation").val();
    console.log(startDate);
    let devolutionDate = $("#endReservation").val();
    console.log(devolutionDate);
    let library = $("#library option:selected").val();
    let status = $("#status option:selected").val();
    let client = $("#client option:selected").val();


    let reservation = {
        idReservation: idReservation,
        startDate: startDate,
        devolutionDate: devolutionDate,
        client: {idClient:client},
        status: status,
        lib: {id:library},
        score: null
    };

    return reservation;
}


//esta funcion crea la reserva
function saveReservation() {

    let data = getReservationInfo();
    let dataToSend = JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url: myURLReservation+'/save',
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        success: function (category) {
            getReservation();
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });

}
//esta funcion borra la reserva
function deleteReservation(idReser) {

    let data = { id: idReser };
    let dataToSend = JSON.stringify(data);
    $.ajax({
        url: myURLReservation+'/'+idReser,
        type: 'DELETE',
        contentType: 'application/json',
        data: dataToSend,
        success: function (category) {
            getReservation();
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}

//esta funcion actualiza la reserva
function updateReservation() {

    let data = getReservationInfo();
    let dataToSend = JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url: myURLReservation+'/update',
        type: 'PUT',
        contentType: 'application/json',
        data: dataToSend,
        success: function (reservation) {
            try {
                getReservation();
            } catch (error) {
                console.log("Hubo error");
            }

        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });

}

//esta función obtiene el dato de la categoria y lo muestra en el formulario de actualización.
function getDetailReservation(idReserva) {
    habilitaDatosReservation(2);

    $.ajax({
        url: myURLReservation + "/" + idReserva,
        type: 'GET',
        dataType: 'json',
        success: function (reservation) {
            const fechaInicio = reservation.startDate.split("T");
            const fechaFin = reservation.devolutionDate.split("T");
            $("#idReservation").val(reservation.idReservation);
            $("#iniReservation").val(fechaInicio[0])
            $("#endReservation").val(fechaFin[0]);
            $("#library").val(reservation.lib.id);
            $("#status").val(reservation.status);
            $("#client").val(reservation.client.idClient);

        },
        error: function (xhr, status) {
            alert('ha sucedido un problema', status.data);
        }
    });
}
window.addEventListener('load', async function() {
    let optionlibrary = "";
    let optionclient= "";
    try {
        let menuOption = await fetch('api/Lib/all');
        let library = await menuOption.json();

        for (i = 0; i < library.length; i++) {
            optionlibrary += '<option value="' + library[i].id + '">' + library[i].name + '</option>';
        }
        let clientOption = await fetch('api/Client/all');
        let client = await clientOption.json();
        for(i=0; i< client.length; i++){
            optionclient += '<option value="' + client[i].idClient + '">' + client[i].name + '</option>';
        }
    }catch (e) {
        console.log(e);
    }
    menuOptionxxx = optionlibrary;
    clientOption = optionclient;
    console.log(menuOptionxxx);

});
