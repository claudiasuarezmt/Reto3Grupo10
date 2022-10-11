$("document").ready(function(){
    getClients();
});

function getClients(){
    $.ajax({
        url : "api/Client/all",
        type : 'GET',
        dataType : 'json',
        success : function(clients) {
            $("#resultado").empty();
            for(i=0;i<clients.length;i++){
                $("#resultado").append(clients[i].idClient+" "+clients[i].name+" "+clients[i].age+" "+clients[i].email+" ");
                $("#resultado").append("<br>");
            }

        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });
}