//Este archivo contiene todas las funciones relacionadas con los administradores
var myURLAdmin = 'api/Admin';

//obtiene todos los administradores
function getAdmins() {

    $.ajax({
        url: myURLAdmin+'/all',
        type: 'GET',
        dataType: 'json',
        success: function (admins) {


            $("#camposAdmin").empty();
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
    myTableAdmin += "<tr><td style=width:150px>Nombre</td><td style=width:150px>Correo</td><td style=width:150px>Acciones</td></tr>";
    if(items !== undefined){
        for (i = 0; i < items.length; i++) {
            myTableAdmin += "<tr>";
            myTableAdmin += "<td style=width:150px>" + items[i].name + "</td>"
            myTableAdmin += "<td style=width:150px>" + items[i].email + "</td>"
            myTableAdmin += "<td style=width:150px>"+"<button onclick=getDetailAdmin(" + items[i].id + ") ><img src=/icons/edit.png  alt=Actualizar height=20></button>";
            myTableAdmin += "<button onclick=deleteAdmin(" + items[i].id + ") ><img src=/icons/delete2.png  alt=Eliminar height=20></button></td>";
            myTableAdmin += "</tr>";
        }
    }
    myTableAdmin += "</table>";
    $("#admin").append(myTableAdmin);

}


function habilitaDatosAdmin(nuTipo) {
    //Esta funcion muestra en pantalla los datos de los administradores
    $("#camposAdmin").empty();
    let campos = "<h2>Ingrese la informacion del administrador</h2>";

    if (nuTipo == 2) {
        campos += "<input type=hidden id=idAdmin disabled class=input><br>";
    }

    campos += "<label width: 180px;>Nombre: </label><input type=text id=nameAdmin class=input><br>";
    if(nuTipo ==1) {
        campos += "<label width: 180px;>Correo: </label><input type=text id=emailAdmin class=input><br>";
    }else{
        campos += "<label width: 180px;>Correo: </label><input type=text id=emailAdmin disabled class=input><br>";
    }
    campos += "<label width: 180px;>Contraseña:   </label><input type=password id=passAdmin class=input><br>";



    //si el tipo es 1 es para crearlo y si el tipoo es 2 para actaulizarlo
    if (nuTipo == 1) {
        campos += "<button onclick=saveAdmin() >Guardar Administrador</button>";
    } else {
        campos += "<button onclick=updateAdmin() >Guardar Administrador</button>";
    }
    campos += "</div>";
    $("#camposAdmin").append(campos);
}

//obtiene los datos digitados en el formulario de admin
function getAdminInfo() {
    let idAdmin =$("#idAdmin").val();
    let nameAdmin = $("#nameAdmin").val();
    let emailAdmin = $("#emailAdmin").val();
    let passAdmin = $("#passAdmin").val();


    let admin = {
        id: idAdmin,
        name: nameAdmin,
        email: emailAdmin,
        password: passAdmin
    };

    return admin;
}


//esta funcion crea el administrador
function saveAdmin() {

    let data = getAdminInfo();
    let dataToSend = JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url: myURLAdmin+'/save',
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        success: function (administrador) {
            getAdmins();
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });

}
//esta funcion borra el administrador
function deleteAdmin(idAdmin) {

    let data = { id: idAdmin };
    let dataToSend = JSON.stringify(data);
    $.ajax({
        url: myURLAdmin+'/'+idAdmin,
        type: 'DELETE',
        contentType: 'application/json',
        data: dataToSend,
        success: function (admin) {
            getAdmins();
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}

//esta funcion actualiza el administrador
function updateAdmin() {

    let data = getAdminInfo();
    let dataToSend = JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url: myURLAdmin+'/update',
        type: 'PUT',
        contentType: 'application/json',
        data: dataToSend,
        success: function (admin) {
            try {
                getAdmins();
            } catch (error) {
                console.log("Hubo errrorrrrrrrrrrrrrrrrrrrrr");
            }

        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });

}

//esta función obtiene el dato del administrador y lo muestra en el formulario de actualización.
function getDetailAdmin(idAdmin) {
    habilitaDatosAdmin(2);

    $.ajax({
        url: myURLAdmin + "/" + idAdmin,
        type: 'GET',
        dataType: 'json',
        success: function (admin) {


            $("#idAdmin").val(admin.id);
            $("#nameAdmin").val(admin.name)
            $("#emailAdmin").val(admin.email);
            $("#passAdmin").val(admin.password);


        },
        error: function (xhr, status) {
            alert('ha sucedido un problema', status.data);
        }
    });
}
