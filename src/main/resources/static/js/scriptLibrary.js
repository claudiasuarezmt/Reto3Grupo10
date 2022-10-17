//Este archivo contiene todas las funciones relacionadas con el mensaje
var myURLLibrary = 'api/Lib';
//esta funcion obtiene todos los mensajes
menuOptionxxx='';
function getLibrary() {

    $.ajax({
        url: myURLLibrary+'/all',
        type: 'GET',
        dataType: 'json',
        success: function (library) {
            console.log(library);
            $("#camposLibrary").empty();
            $("#library").empty();
            pintarLibrary(library);


        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}
//esta funcion pinta la tabla con los mensajes
function pintarLibrary(items) {

    let myTableLibrary = "<table  class=tabla>";
    myTableLibrary += "<tr><td style=width:150px>Nombre</td>" +
                          "<td style=width:150px>Capacidad</td>" +
                          "<td style=width:150px>Target</td>" +
                          "<td style=width:150px>Descripcion</td>" +
                          "<td style=width:150px>Categoría</td>" +
                          "<td style=width:150px>Acciones</td>" +
                        "</tr>";

    if(items !== undefined) {
        for (i = 0; i < items.length; i++) {
            myTableLibrary += "<tr>";
            myTableLibrary += "<td style=width:150px>" + items[i].name + "</td>"
            myTableLibrary += "<td style=width:150px>" + items[i].capacity + "</td>"
            myTableLibrary += "<td style=width:150px>" + items[i].target + "</td>"
            myTableLibrary += "<td style=width:150px>" + items[i].description + "</td>"
            myTableLibrary += "<td style=width:150px>" + items[i].category.name + "</td>"


            myTableLibrary += "<td><button onclick=getDetailLibrary(" + items[i].id + ") ><img src=/icons/edit.png  alt=Actualizar height=20></button>";
            myTableLibrary += "<button onclick=deleteLibrary(" + items[i].id + ") ><img src=/icons/delete2.png  alt=Eliminar height=20></button></td>";
            myTableLibrary += "</tr>";
        }
    }
    myTableLibrary += "</table>";
    $("#library").append(myTableLibrary);

}

function habilitaDatosLibrary(nuTipo) {


    //Esta funcion muestra en pantalla los datos del mensaje para crear o actualizar
    $("#camposLibrary").empty();
    $("#camposLibrary").show();
    let campos = "<h2>Ingrese la información de la biblioteca</h2>"

    if (nuTipo == 2) {
        campos += "<input type=hidden id=idLibrary disabled class=input><br>";
    }
    campos += "<label width: 180px;>Nombre: </label><input type=text id=nameLibrary class=input><br>";
    campos += "<label width: 180px;>Capacidad: </label><input type=number id=capacityLibrary class=input><br>";
    campos += "<label width: 180px;>Target: </label><input type=text id=targetLibrary class=input><br>";
    campos += "<label width: 180px;>Description: </label><input type=text id=descriptionLibrary class=input><br>";

    if (nuTipo==1){
        campos += "<label width: 180px;>Categoría: </label><select id=librarysel>"+menuOptionxxx+"</select><br/>";
    }else{
        campos += "<label width: 180px;>Categoría: </label><select id=librarysel disabled> " +menuOptionxxx+"</select><br/>";
    }



    if (nuTipo == 1) {
        campos += "<button onclick=saveLibrary() >Guardar Bibliotecta</button>";
    } else {
        campos += "<button onclick=updateLibrary() >Actualizar Biblioteca</button>";
    }


    campos += "</div>";
    $("#camposLibrary").append(campos);




}
function getLibraryInfo() {
    let idLibrary = $("#idLibrary").val();
    let name = $("#nameLibrary").val();
    let capacity = $("#capacityLibrary").val();
    let target = $("#targetLibrary").val();
    let description = $("#descriptionLibrary").val();
    let categ = $("#librarysel option:selected").val();




    let library = {
        id: idLibrary,
        name: name,
        capacity: capacity,
        target:target,
        description:description,
        category: {id:categ }
    };

    return library;
}

function saveLibrary() {

    let data = getLibraryInfo();
    let dataToSend = JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url: myURLLibrary+'/save',
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        success: function (library) {
            getLibrary();
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });

}

function deleteLibrary(idLibrary) {

    let data = { id: idLibrary };
    let dataToSend = JSON.stringify(data);
    $.ajax({
        url: myURLLibrary+'/'+idLibrary,
        type: 'DELETE',
        contentType: 'application/json',
        data: dataToSend,
        success: function (library) {
            getLibrary();
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}

function updateLibrary() {

    let data = getLibraryInfo();
    let dataToSend = JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url: myURLLibrary+'/update',
        type: 'PUT',
        contentType: 'application/json',
        data: dataToSend,
        success: function (library) {
            getLibrary();
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });

}
function getDetailLibrary(idLibrary) {


    $.ajax({
        url: myURLLibrary + "/" + idLibrary,
        type: 'GET',
        dataType: 'json',
        success: function (library) {

            habilitaDatosLibrary(2);
            $("#idLibrary").val(library.id);
            $("#nameLibrary").val(library.name);
            $("#capacityLibrary").val(library.capacity);
            $("#targetLibrary").val(library.target);
            $("#descriptionLibrary").val(library.description);
            $("#librarysel").val(library.category.id);


        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}

window.addEventListener('load', async function() {
    let option = "";
    try {
        let menuOption = await fetch('api/Category/all');
        let category = await menuOption.json();

        for (i = 0; i < category.length; i++) {
            option += '<option value="' + category[i].id + '">' + category[i].name + '</option>';
        }
    }catch (e) {
        console.log(e);
    }
    menuOptionxxx = option;
    console.log(menuOptionxxx);

});
