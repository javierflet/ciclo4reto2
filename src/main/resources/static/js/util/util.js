function id(){
    $.ajax({
        url:"http://144.22.58.155/api/user/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            for (i=0;i<respuesta.length;i++){
                console.log(respuesta[i].id);
                idAutoIncremen=respuesta[i].id;
            }
            guardar(idAutoIncremen+1);
        }
    });
} 

function guardar(id){
    
   
    console.log("el nuevo id es = " + (id+1));

    let myData={
        identification:$("#identification").val(),
        name:$("#name").val(),
        address:$("#address").val(),
        cellPhone:$("#cellPhone").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        zone:$("#zone").val(),
        type:$("#type").val()
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    /*
    $.ajax({
        url: "http://localhost:8080/api/user/new",
        type: "POST",
        data: dataToSend,
        contentType:"application/JSON",
        datatype: "JSON",
        success:function(respuesta){
            $("#resultado").html("<p class='loader text-center'>Cuenta creada, espere para ser redireccionado...</p>");
            setTimeout(
                function(){ 
                    $("#header").html("BIENVENIDO <br>"+respuesta.name);
                    traerInformacion();
                }, 6000
            );

        }
    });
    */

}