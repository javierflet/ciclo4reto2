/* global fetch */

//function traerInformacion(){location.reload(true);}
//Función para actualizar cada 60 segundos(60000 milisegundos)
//setInterval("traerInformacion()",60000);
//traerInformacion();

function traerInformacion(){
    $("#resultado").html("<p class='loader text-center'>Cargando...</p>");
    $.ajax({
        url:"http://144.22.58.155/api/accessory/all",
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
    <th>REFERENCIA</th>
    <th>CATEGORIA</th>
    <th>DESCRIPCIÓN</th>
    <th>DISPONIBILIDAD</th>
    <th>PRECIO</th>
    <th>CANTIDAD</th>
    <th>FOTOGRAFIA PRODUCTO</th>
    <th></th>
    </thead></tr>`;
    myTable += tableHeader;

    for (i=0; i<items.length; i++ ) {
        myTable+="<tr>";
        myTable+="<td data-titulo='REFERENCIA:'>"+items[i].reference+"</td>";
        myTable+="<td data-titulo='CATEGORY:'>"+items[i].category+"</td>";
        myTable+="<td data-titulo='DESCRIPCIÓN:'>"+items[i].description+"</td>";
        myTable+="<td data-titulo='PRECIO:'>"+items[i].price+"</td>";
        myTable+="<td data-titulo='CANTIDAD:'>"+items[i].quantity+"</td>";
        myTable+="<td data-titulo='FOTOGRAFIA:'>"+items[i].photography+"</td>";
        myTable+="<td data-titulo='DISPONIBILIDAD:'>"+items[i].availability+"</td>";
        let direccion="Editar('"+items[i].reference+"')";
        let direccion2="borrarElemento('"+items[i].reference+"')";

        console.log(direccion);
        myTable+="<td> <button class='mx-auto btn-danger btn-gradient' onclick="+direccion2+">Borrar</button> <button class='mx-auto btn-danger btn-gradient' onclick="+direccion+">Editar</button> </td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").html(myTable);
}

function Editar(reference){
    //console.log(reference);
    $.ajax({
        url:"http://144.22.58.155/api/accessory/"+reference,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){         
            //console.log(respuesta); 
            $("#reference").val(respuesta.reference),
            $("#category").val(respuesta.category),
            $("#description").val(respuesta.description),
            $("#price").val(respuesta.price),
            $("#quantity").val(respuesta.quantity),
            $("#photography").val(respuesta.photography),
            $(".select").attr("selected", false);
            $("#select-"+respuesta.type).attr("selected", true);
            $("#btn-actualizar").show()
            $("#btn-guardar").hide()
        }
    });
}

function validar2(option){
    //console.log($('#type').val());
    if ($('#reference').val().length == 0 || $('#category').val().length == 0 || $('#description').val().length == 0
    || $('#price').val().length == 0 || $('#quantity').val().length == 0 || $('#photography').val().length == 0  
    || $('#availability').val().length == 0 ) {
        $("#validarCampos").html("<h4 style='color: red'>Todos los campos son necesarios</h4>");

        return false;

    }else{ 
            if($('#password').val() == $('#confirmar').val()){
                $("#validarCampos").html("");
                if(option==2){
                    actualizar();
                }else{
                    guardar();
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


function guardar(){
    let myData={
        reference:$("#reference").val(),
        category:$("#category").val(),
        description:$("#description").val(),
        availability:$("#availability").val(),
        price:$("#price").val(),
        quantity:$("#quantity").val(),
        photography:$("#photography").val(),
        availability:$("#availability").val()
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    
    $.ajax({
        url: "http://144.22.58.155/api/accessory/new",
        type: "POST",
        data: dataToSend,
        contentType:"application/JSON",
        datatype: "JSON",
        success:function(respuesta){
            //$("#resultado").html("<p class='loader text-center'>Cuenta creada, espere para ser redireccionado...</p>");
            swal("Registro exitoso", "Accesorio registrado correctamente", "success");
            $(".datos-user").val("");
            traerInformacion();
        },
        error: function(respuesta) {
            //console.log(respuesta);
            //console.log(respuesta.abort.name);
            if(respuesta.abort.name=="abort"){
                $("#validarCampos").html("<h4 style='color: red'>Ha ocurrido un error " + respuesta.status +"</h4>");
            }else{
                $("#validarCampos").html("<h4 style='color: red'>El accesorio ya se encuentra registrado</h4>");
            }
        },
    });
    

}

function actualizar(){
    let myData={
        reference:$("#reference").val(),
        category:$("#category").val(),
        description:$("#description").val(),
        availability:$("#availability").val(),
        price:$("#price").val(),
        quantity:$("#quantity").val(),
        photography:$("#photography").val(),
        availability:$("#availability").val()
    };
    let dataToSend=JSON.stringify(myData);
    //console.log(dataToSend);
    
    $.ajax({
        url: "http://144.22.58.155/api/accessory/update",
        type: "PUT",
        data: dataToSend,
        contentType:"application/JSON",
        datatype: "JSON",
        success:function(respuesta){
            swal("Actualización exitosa", "Accesorio actualizado correctamente", "success");
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

function borrarElemento(idElemento){
    //console.log(idElemento);

    $.ajax({
        url:"http://144.22.58.155/api/accessory/"+idElemento,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            swal({
                title: "Desea eliminar esta referencia de accesorio?",
                text: respuesta.reference,
                icon: "warning",
                buttons: true,
                dangerMode: true,
              }).then((ok) => {
                if (ok) {
                    eliminar(idElemento);
                } else {
                  swal("Eliminación de referencia de accesorio cancelado!");
                }
              });
        }
    });
}

function eliminar(idElemento){
    $.ajax({
        url: "http://144.22.58.155/api/accessory/"+idElemento,
        type: "DELETE",
        contentType:"application/JSON",
        dataType: "JSON",
        success:function(respuesta){
            $("#resultado").empty();
            //$("#validarCampos").html("<h4 style='color: green'>Se ha eliminado exitosamente</h4>");
            traerInformacion();
        }
    });
    swal("Accesorio eliminado correctamente", {
        icon: "success",
      });
};
