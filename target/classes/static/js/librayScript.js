function getLibrary(){
    $.ajac({
        url: "api/lib/all",
        type: 'GET',
        dataType: 'json',
        success : function (l){
            return l;
        },
        error : function (xhr, status){
            alert('ha sucedido un problema ');
        },
        complete : function (xhr, status){

        }
    });
}