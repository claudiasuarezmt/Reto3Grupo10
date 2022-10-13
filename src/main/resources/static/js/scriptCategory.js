//Este archivo contiene todas las funciones relacionadas con la categoria
var myURLCategory = 'api/Category';

//obtiene todos las categorias
function getCategory() {

    $.ajax({
        url: myURLCategory+'/all',
        type: 'GET',
        dataType: 'json',
        success: function (category) {
            $("#camposCategory").empty();
            $("#category").empty();
            pintarCategory(category);


        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}

//pinta la tabla en pantalla con los datos de la categoria
function pintarCategory(items) {
    let myTableCategory = "<table cellpadding=0 cellspacing=0 class=tabla >";
    myTableCategory += "<tr><td style=width:150px>Id Categoría</td><td style=width:150px>Nombre</td><td style=width:150px>Descripcion</td><td style=width:150px>Acciones</td></tr>";
    if(items !== undefined){
        for (i = 0; i < items.length; i++) {
            myTableCategory += "<tr>";
            myTableCategory += "<td style=width:150px>" + items[i].idCategory + "</td>"
            myTableCategory += "<td style=width:150px>" + items[i].name + "</td>"
            myTableCategory += "<td style=width:150px>" + items[i].description + "</td>"
            myTableCategory += "<td><button onclick=getDetailCategory(" + items[i].idCategory + ") ><img src=/icons/edit.png  alt=Actualizar height=20></button>";
            myTableCategory += "<button onclick=deleteCategory(" + items[i].idCategory + ") ><img src=/icons/delete2.png  alt=Eliminar height=20></button></td>";
            myTableCategory += "</tr>";
        }
    }
    myTableCategory += "</table>";
    $("#category").append(myTableCategory);

}

function habilitaDatosCategory(nuTipo) {
    //Esta funcion muestra en pantalla los datos de la categoria para crear o actualizar
    $("#camposCategory").empty();
    let campos = "<h2>Ingrese la informacion de la categoría</h2>";

    if (nuTipo == 2) {
        campos += "<label width: 180px;>Codigo: </label>"
        campos += "<input type=number id=idCategory disabled class=input><br>";
    }

    campos += "<label width: 180px;>Nombre: </label><input type=text id=nameCategory class=input><br>";
    campos += "<label width: 180px;>Correo: </label><input type=text id=descCategory class=input><br>";


    //si el tipo es 1 es para crearlo y si el tipoo es 2 para actaulizarlo
    if (nuTipo == 1) {
        campos += "<button onclick=saveCategory() >Guardar Categoría</button>";
    } else {
        campos += "<button onclick=updateCategory() >Guardar Categoría</button>";
    }
    campos += "</div>";
    $("#camposCategory").append(campos);
}

//obtiene los datos digitados en el formulario de category
function getCategoryInfo() {
    let idCate =$("#idCCategory").val();
    let nameCate = $("#nameCategory").val();
    let descCateg = $("#descCategory").val();


    let category = {
        id: idCate,
        name: nameCate,
        descriptoin: descCateg
    };

    return category;
}


//esta funcion crea el categoria
function saveCategory() {

    let data = getCategoryInfo();
    let dataToSend = JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url: myURLCategory+'/save',
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        success: function (category) {
            getCategory();
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });

}
//esta funcion borra la categoria
function deleteCategory(idCategory) {

    let data = { id: idCategory };
    let dataToSend = JSON.stringify(data);
    $.ajax({
        url: myURLCategory+'/delete/'+idCategory,
        type: 'DELETE',
        contentType: 'application/json',
        data: dataToSend,
        success: function (category) {
            getCategory();
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}

//esta funcion actualiza la categoria
function updateCategory() {

    let data = getCategoryInfo();
    let dataToSend = JSON.stringify(data);

    console.log(data);
    console.log(dataToSend);

    $.ajax({
        url: myURLCategory+'/save',
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        success: function (category) {
            try {
                getCategory();
            } catch (error) {
                console.log("Hubo errrorrrrrrrrrrrrrrrrrrrrr");
            }

        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });

}

//esta función obtiene el dato de la categoria y lo muestra en el formulario de actualización.
function getDetailCategory(idCategory) {
    habilitaDatosCategory(2);

    $.ajax({
        url: myURLCategory + "/" + idCategory,
        type: 'GET',
        dataType: 'json',
        success: function (category) {


            $("#idCategory").val(category.id);
            $("#nameCategory").val(category.name)
            $("#descCategory").val(category.description);


        },
        error: function (xhr, status) {
            alert('ha sucedido un problema', status.data);
        }
    });
}
