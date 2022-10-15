//Este archivo contiene todas las funciones relacionadas con las reservas
var myURLReservation = 'api/Reservation';

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
    myTableReservation += "<tr><td style=width:150px>Id reserva</td><td style=width:150px>Id cliente</td><td style=width:150px>Nombre cliente</td><td style=width:150px>Correo cliente</td><td  style=width:150px>Calificación</td><td style=width:150px>Acciones</td></tr>";
    if(items !== undefined){
        for (i = 0; i < items.length; i++) {
            myTableReservation += "<tr>";
            myTableReservation += "<td style=width:150px>" + items[i].idReservation + "</td>"
            myTableReservation += "<td style=width:150px>" + items[i].idClient + "</td>"
            myTableReservation += "<td style=width:150px>" + items[i].name + "</td>"
            myTableReservation += "<td style=width:150px>" + items[i].email + "</td>"
            myTableReservation += "<td style=width:150px>" + items[i].score + "</td>"


            if(items[i].Reservation.length !== 0){
                myTableReservation+='<td><table class="nulo">'
                for(j=0; j < items[i].Reservation.length; j++){
                    myTableReservation += "<tr style='background-color:#DDEBF7; color: black; '><td style=width:70px>" + items[i].Reservation[j].name + "</td>"
                    myTableReservation += "<td style=width:70px>" + items[i].Reservation[j].startDate + "</td>"
                    myTableReservation += "<td style=width:70px>" + items[i].Reservation[j].devolutionDate + "</td>"
                }
                myTableReservation+='</table></td>'
            }else{
                myTableReservation += "<td style=width:280px></td>"
            }

            myTableReservation += "<td style=width:150px>"+"<button onclick=getDetailCategory(" + items[i].id + ") ><img src=/icons/edit.png  alt=Actualizar height=20></button>";
            myTableReservation += "<button onclick=deleteReservation(" + items[i].id + ") ><img src=/icons/delete2.png  alt=Eliminar height=20></button></td>";
            myTableReservation += "</tr>";
        }
    }
    myTableReservation += "</table>";
    $("#reservas").append(myTableReservation);

}

function habilitaDatosReservation(nuTipo) {
        //Esta funcion muestra en pantalla los datos de la reserva para crear o actualizar
        $("#camposReservation").empty();
        let campos = "<h2>Ingrese la informacion de la reserva</h2>";

        if (nuTipo == 2) {
            campos += "<label width: 180px;>Codigo: </label>"
            campos += "<input type=number id=idReservation disabled class=input><br>";
        }

        campos += "<label width: 180px;>Fecha de solicitud </label><input type=text id=iniReservation class=input><br>";
        campos += "<label width: 180px;>Fecha de entrega </label><input type=text id=endReservation class=input><br>";


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
    let devolutionDate = $("#endReservation").val();


    let reservation = {
        id: idReservation,
        iniReservation: startDate,
        endReservation: devolutionDate
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
function deleteReservation(idReservation) {

    let data = { id: idReservation };
    let dataToSend = JSON.stringify(data);
    $.ajax({
        url: myURLReservation+'/'+idReservation,
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
function getDetailReservation(idReservation) {
    habilitaDatosReservation(2);

    $.ajax({
        url: myURLReservation + "/" + idReservation,
        type: 'GET',
        dataType: 'json',
        success: function (reservation) {


            $("#idReservation").val(reservation.id);
            $("#iniReservation").val(reservation.startDate)
            $("#endReservation").val(reservation.devolutionDate);


        },
        error: function (xhr, status) {
            alert('ha sucedido un problema', status.data);
        }
    });
}
