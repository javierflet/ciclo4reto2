/* global fetch */

//function traerInformacion(){location.reload(true);}
//Función para actualizar cada 60 segundos(60000 milisegundos)
//setInterval("traerInformacion()",60000);
//traerInformacion();

function traerInformacion(){
    $("#resultado").html("<p class='loader text-center'>Cargando...</p>");
    $.ajax({
        url:"http://144.22.58.155/api/user/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //console.log(respuesta);         
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(items){
    let myTable="<table id='informacion'>";
    let tableHeader = `<thead><tr>
    <th>IDENTIFICACIÓN</th>
    <th>NOMBRE</th>
    <th>DIRECCIÓN</th>
    <th>CELULAR</th>
    <th>CORREO ELÉCTRONICO</th>
    <th>ZONA</th>
    <th>TIPO DE USUARIO</th>
    <th></th>
    </thead></tr>`;
    myTable += tableHeader;

    for (i=0; i<items.length; i++ ) {
        myTable+="<tr>";
        myTable+="<td data-titulo='IDENTIFICACIÓN:'>"+items[i].identification+"</td>";
        myTable+="<td data-titulo='NOMBRE:'>"+items[i].name+"</td>";
        myTable+="<td data-titulo='DIRECCIÓN DE DOMICILIO:'>"+items[i].address+"</td>";
        myTable+="<td data-titulo='CELULAR:'>"+items[i].cellPhone+"</td>";
        myTable+="<td data-titulo='CORREO ELÉCTRONICO:'>"+items[i].email+"</td>";
        myTable+="<td data-titulo='ZONA:'>"+items[i].zone+"</td>";
        myTable+="<td data-titulo='TIPO DE USUARIO:'>"+items[i].type+"</td>";
        let direccion="actualizar('"+items[i].identification+"')";
        let direccion2="eliminar('"+items[i].identification+"')";

        myTable+="<td> <button class='mx-auto btn-danger btn-gradient' onclick="+direccion2+">Borrar registro </button> <button class='mx-auto btn-danger btn-gradient'  onclick="+direccion+">Editar registro </button> </td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").html(myTable);
}

function Editar(id){
    //console.log(items);
    $.ajax({
        url:"http://144.22.58.155/api/user/"+id,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){         
            //console.log(respuesta); 
            $("#id").val(respuesta.id),
            $("#identification").val(respuesta.identification),
            $("#name").val(respuesta.name),
            $("#address").val(respuesta.address),
            $("#cellPhone").val(respuesta.cellPhone),
            $("#email").val(respuesta.email),
            $("#password").val(respuesta.password),
            $("#zone").val(respuesta.zone),
            $("#type").val(respuesta.type),

            //console.log(respuesta.type)

            $("#select-ADM").attr("selected", false);
            $("#select-USER").attr("selected", false);
            $("#select-ASESOR").attr("selected", false);
            $("#select-COORDINADOR").attr("selected", false);

            $("#select-"+respuesta.type).attr("selected", true);
            $("#btn-actualizar").show()
            $("#btn-guardar").hide()
        }
    });
}

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


function validar2(option){
    console.log($('#type').val());
    if ($('#email').val().length == 0 || $('#password').val().length == 0 || $('#confirmar').val().length == 0 || $('#name').val().length == 0
    || $('#identification').val().length == 0 || $('#address').val().length == 0 || $('#cellPhone').val().length == 0 || $('#zone').val().length == 0
    || $('#type').val() == "null"  ) {
        $("#validarCampos").html("<h4 style='color: red'>Todos los campos son necesarios</h4>");
        return false;
    }else{ 
        
            if($('#password').val() == $('#confirmar').val()){
                $("#validarCampos").html("");
                if(option==2){
                    actualizar();
                }else{
                    validarEmail();
                }
            }else{
                $("#validarCampos").html("<h4 style='color: red'>La contraseña no coincide</h4>");
                setTimeout(
                    function(){ 
                        $("#validarCampos").html("");
                    }, 10000
                );
                
            }
        
        
    }
}
function validarEmail(){
    $("#resultado").html("<p class='loader text-center'>Cargando...</p>");
    $.ajax({
        url:"http://144.22.58.155/api/user/emailexist/"+$('#email').val(),
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            if(respuesta==true){
                swal("Ha ocurrido un error", "El correo ya se encuentra registrado", "error");
            }else{
                id();
            }
            
        }
    });
}

//aqui estoy
function id(){
    $.ajax({
        url:"http://144.22.58.155/api/user/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //console.log(respuesta);
            for (i=0;i<respuesta.length;i++){
                //console.log(respuesta[i].id);
                idAutoIncremen=respuesta[i].id;
            }
            guardar(idAutoIncremen+1);
        }
    });
}

function guardar(id){
    let myData={
        id:id,
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
    //console.log(dataToSend);
    
    $.ajax({
        url: "http://144.22.58.155/api/user/new",
        type: "POST",
        data: dataToSend,
        contentType:"application/JSON",
        datatype: "JSON",
        success:function(respuesta){
            //$("#resultado").html("<p class='loader text-center'>Cuenta creada, espere para ser redireccionado...</p>");
            swal("Usuario nuevo registrado de manera exitosa", "Ya puede iniciar sesión", "success");
            $(".datos-user").val("");
            traerInformacion();
        },
        error: function(respuesta) {
            //console.log(respuesta);
            //console.log(respuesta.abort.name);
            if(respuesta.abort.name=="abort"){
                $("#validarCampos").html("<h4 style='color: red'>Ha ocurrido un error " + respuesta.status +"</h4>");
            }else{
                $("#validarCampos").html("<h4 style='color: red'>El usuario ya se encuentra registrado</h4>");
            }
        },
    });
    

}

function actualizar(){
    let myData={
        id:$("#id").val(),
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
    //console.log(dataToSend);
    
    $.ajax({
        url: "http://144.22.58.155/api/user/update",
        type: "PUT",
        data: dataToSend,
        contentType:"application/JSON",
        datatype: "JSON",
        success:function(respuesta){
            swal("Usuario actualizado correctamente", "Ya puede iniciar sesión", "success");
            $(".datos-user").val("");
            traerInformacion();
        },
        error: function(respuesta) {
            if(respuesta.abort.name=="abort"){
                $("#validarCampos").html("<h4 style='color: red'>Ha ocurrido un error " + respuesta.status +"</h4>");
            }else{
                $("#validarCampos").html("<h4 style='color: red'>El usuario ya se encuentra registrado</h4>");
            }
        },
    });
    

}

function borrarElemento(id){
    //console.log(idElemento);

    $.ajax({
        url:"http://144.22.58.155/api/user/"+id,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            swal({
                title: "Desea eliminar este usuario?",
                text: respuesta.id,
                icon: "warning",
                buttons: true,
                dangerMode: true,
              }).then((ok) => {
                if (ok) {
                    eliminar(id);
                } else {
                  swal("Eliminación de registro de usuario cancelado!");
                }
              });
        }
    });
}

function eliminar(id){
    $.ajax({
        url: "http://144.22.58.155/api/user/"+id,
        type: "DELETE",
        contentType:"application/JSON",
        dataType: "JSON",
        success:function(respuesta){
            $("#resultado").empty();
            //$("#validarCampos").html("<h4 style='color: green'>Se ha eliminado exitosamente</h4>");
            traerInformacion();
        }
    });
    swal("Usuario eliminado satisfactoriamente", {
        icon: "success",
      });
};