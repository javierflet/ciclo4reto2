/* global fetch */

//function traerInformacion(){location.reload(true);}
//Función para actualizar cada 60 segundos(60000 milisegundos)
//setInterval("traerInformacion()",60000);
//traerInformacion();

document.getElementById('email').addEventListener('input', function() {
    let campo = event.target;
    let valido = document.getElementById('emailOK');

    let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
    if (emailRegex.test(campo.value)) {
        $("#btn-consultar").attr("disabled",false);
        $("#resultado").html("");
    } else {
        $("#resultado").html("<p class='loader text-center'>Debe ingresar un correo valido</p>");
    }
});

function consultar(){
    $("#resultado").html("<p class='loader text-center'>Cargando...</p>");
    $.ajax({
        //http://localhost:8080/
        url:"http://144.22.58.155/api/user/"+$('#email').val()+"/"+$('#password').val(),
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            
            if(respuesta.id!=null && respuesta.type=="ADM" ){
                $("#header").html("BIENVENIDO <br>"+respuesta.name);
                traerInformacion(respuesta);
            }else{
                $("#validarCampos").html("<h4 style='color: red'>No existe un usuario</h4>");
            }
            
        }
    });
}


function validar(){
    if ($('#email').val().length == 0 || $('#password').val().length == 0) {
        $("#validarCampos").html("<h4 style='color: red'>Todos los campos son necesarios</h4>");
        return false;
    }else{
        $("#validarCampos").html("");
        consultar();
    }
}

function traerInformacion(items){
    $("#resultado").html("<p class='loader text-center'>Cargando...</p>");
    
    $("#lista-clothe").html("");
    $("#btn-consultar").hide();

    let data = {
        'name' : items.name,
        'type' : items.type
    };
    
    localStorage.setItem("object_name", JSON.stringify(data));

    $(document).ready(function(){
        $(location).attr('href',"menu.html");
    });
    
}