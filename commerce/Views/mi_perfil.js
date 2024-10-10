$(document).ready(function () {
  var funcion;
  bsCustomFileInput.init();
  verificar_sesion();
  obtener_datos();
  llenar_departamentos();
  llenar_direcciones();
  llenar_historial();

  $("#departamento").select2({
    placeholder: "Seleccione un departamento",
    language: {
      noResults: function () {
        return "No hay resultados";
      },
      searching: function () {
        return "Buscando.....";
      },
    },
  });
  obtener_datos();
  $("#provincia").select2({
    placeholder: "Seleccione una provincia",
    language: {
      noResults: function () {
        return "No hay resultados";
      },
      searching: function () {
        return "Buscando.....";
      },
    },
  });
  obtener_datos();
  $("#municipio").select2({
    placeholder: "Seleccione un municipio",
    language: {
      noResults: function () {
        return "No hay resultados";
      },
      searching: function () {
        return "Buscando.....";
      },
    },
  });

  function llenar_historial() {
    funcion = "llenar_historial";
    $.post(
      "../Controllers/HistorialController.php",
      { funcion },
      (response) => {
        let historiales = JSON.parse(response);
        let template = "";
        //console.log(historiales);
        historiales.forEach((historial) => {
          template += `
            <div class="time-label">
                <span class="bg-danger">
                  ${historial[0].fecha}
                </span>
            </div>                  
          `;
          historial.forEach(cambio => {
            template +=`
            <div>
              ${cambio.m_icono}
                <div class="timeline-item">
                  <span class="time"><i class="far fa-clock"></i> ${cambio.hora}</span>

                  <h3 class="timeline-header">${cambio.th_icono} Se realizo la accion ${cambio.tipo_historial}
                  en ${cambio.modulo}</h3>

                  <div class="timeline-body">
                    ${cambio.descripcion}
                  </div>
                </div>
             </div>                 
            `;         
          })
        });
        template+=`
        <div>
                                        <i class="far fa-clock bg-gray"></i>
                                    </div>
        `;
        $("#historiales").html(template);
      }
    );
  }

  function llenar_direcciones() {
    funcion = "llenar_direcciones";
    $.post(
      "../Controllers/UsuarioMunicipioController.php",
      { funcion },
      (response) => {
        console.log(response);
        let direcciones = JSON.parse(response);
        let contador = 0;
        let template = "";
        direcciones.forEach((direccion) => {
          contador++;
          template += `
                    <div class="callout callout-info">
                        <div class="card-header">
                            <strong>direccion ${contador}</strong>
                            <div class="card-tools">
                                <button dir_id="${direccion.id}" type="button" class="eliminar_direccion btn btn-tool">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                        <div class="card-body>
                                <h2 class="lead"><b>${direccion.direccion}</b></h2>
                                <p class="text-muted text-sm"><b>Referencia: ${direccion.referencia}</p>
                                <ul class="ml-4 mb-0 fa-ul text-muted">
                                    <li class="small"><span class="fa-li"><i class="fas fa-lg fa-building"></i></span>
                                        ${direccion.municipio},${direccion.provincia},${direccion.departamento}
                                    </li>
                                </ul>
                        </div>
                    </div>         
                        `;
        });
        $("#direcciones").html(template);
      }
    );
  }
  $(document).on("click", ".eliminar_direccion", (e) => {
    let elemento = $(this)[0].activeElement;
    let id = $(elemento).attr("dir_id");
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success m-3",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Desea borrar esta direecion?",
        text: "Esta ocion no se puede revertir!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si. borrar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          funcion = "eliminar_direccion";
          $.post("../Controllers/UsuarioMunicipioController.php",
            { funcion, id },
            (response) => {
              //console.log(response);
              if (response == "success") {
                swalWithBootstrapButtons.fire({
                  title: "Borrado!",
                  text: "La direccion fue borrada.",
                  icon: "success",
                });
                llenar_direcciones();
                llenar_historial();
              } else if (response == "error") {
                swalWithBootstrapButtons.fire({
                  title: "No se borro!",
                  text: "Hubo alteracion en la integridad de los datos",
                  icon: "error",
                });
              } else {
                swalWithBootstrapButtons.fire({
                  title: "No se borro!",
                  text: "Tenemos problemas en el servidor",
                  icon: "error",
                });
              }
            }
          );
          /**/
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "La direccion no se borro :)",
            icon: "error",
          });
        }
      });
  });

  function llenar_departamentos() {
    funcion = "llenar_departamentos";
    $.post(
      "../Controllers/DepartamentoController.php",
      { funcion },
      (response) => {
        let departamentos = JSON.parse(response);
        let template = "";
        departamentos.forEach((departamento) => {
          template += `
                <option value="${departamento.id}">${departamento.nombre}</option>
                `;
        });
        $("#departamento").html(template);
        $("#departamento").val("").trigger("change");
      }
    );
  }
  $("#departamento").change(function () {
    let id_departamento = $("#departamento").val();
    funcion = "llenar_provincia";
    $.post(
      "../Controllers/ProvinciaController.php",
      { funcion, id_departamento },
      (response) => {
        let provincias = JSON.parse(response);
        let template = "";
        provincias.forEach((provincia) => {
          template += `
                <option value="${provincia.id}">${provincia.nombre}</option>
                `;
        });
        $("#provincia").html(template);
        $("#provincia").val("").trigger("change");
      }
    );
  });
  $("#provincia").change(function () {
    let id_provincia = $("#provincia").val();
    funcion = "llenar_municipios";
    $.post(
      "../Controllers/MunicipioController.php",
      { funcion, id_provincia },
      (response) => {
        let municipios = JSON.parse(response);
        let template = "";
        municipios.forEach((municipio) => {
          template += `
                <option value="${municipio.id}">${municipio.nombre}</option>
                `;
        });
        $("#municipio").html(template);
        $("#municipio").val("").trigger("change");
      }
    );
  });

  function verificar_sesion() {
    funcion = "verificar_sesion";
    $.post("../Controllers/UsuarioController.php", { funcion }, (response) => {
      console.log(response);
      if (response != "") {
        let sesion = JSON.parse(response);
        $("#nav_login").hide();
        $("#nav_register").hide();
        $("#usuario_nav").text(sesion.user + " #" + sesion.id);
        $("#avatar_nav").attr("src", "../Util/img/Users/" + sesion.avatar);
        $("#avatar_menu").attr("src", "../Util/img/Users/" + sesion.avatar);
        $("#usuario_menu").text(sesion.user);
      } else {
        $("#nav_usuario").hide();
        location.href = "login.php";
      }
    });
  }
  function obtener_datos() {
    funcion = "obtener_datos";
    $.post("../Controllers/UsuarioController.php", { funcion }, (response) => {
      let usuario = JSON.parse(response);
      $("#username").text(usuario.username);
      $("#tipo_usuario").text(usuario.tipo_usuario);
      $("#nombres").text(usuario.nombres + " " + usuario.apellidos);
      $("#avatar_perfil").attr("src", "../Util/img/Users/" + usuario.avatar);
      $("#dni").text(usuario.dni);
      $("#email").text(usuario.email);
      $("#telefono").text(usuario.telefono);
    });
  }
  $("#form-direccion").submit((e) => {
    funcion = "crear_direccion";
    let id_municipio = $("#municipio").val();
    let direccion = $("#direccion").val();
    let referencia = $("#referencia").val();
    $.post(
      "../Controllers/UsuarioMunicipioController.php",
      { id_municipio, direccion, referencia, funcion },
      (response) => {
        if ((response = "success")) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Se ha registrado su direccion correctamente",
            showConfirmButton: false,
            timer: 2000,
          }).then(function () {
            $("#form-register").trigger("reset");
            $("#departamento").val("").trigger("change");
            llenar_historial();
            llenar_direcciones();
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops... hubo un error",
            text: "Hubo un conflicto al crear la direccion, comuniquese con el area de sistemas",
          });
        }
      }
    );
    e.preventDefault();
  });
  $(document).on("click", ".editar_datos", (e) => {
    funcion = "obtener_datos";
    $.post("../Controllers/UsuarioController.php", { funcion }, (response) => {
      let usuario = JSON.parse(response);
      $("#nombres_mod").val(usuario.nombres);
      $("#apellidos_mod").val(usuario.apellidos);
      $("#dni_mod").val(usuario.dni);
      $("#email_mod").val(usuario.email);
      $("#telefono_mod").val(usuario.telefono);
    });
  });
  $.validator.setDefaults({
    submitHandler: function () {
      funcion = "editar_datos";
      let datos = new FormData($("#form-datos")[0]);
      datos.append("funcion", funcion);
      $.ajax({
        type: "POST",
        url: "../Controllers/UsuarioController.php",
        data: datos,
        cache: false,
        processData: false,
        contentType: false,
        success: function (response) {
          console.log(response);
          if (response == "success") {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Se han actualizado los datos",
              showConfirmButton: false,
              timer: 1000,
            }).then(function () {
              verificar_sesion();
              obtener_datos();
              llenar_historial();
            });
          } 
          else if(response=='danger'){
            Swal.fire({
              icon: "warning",
              title: "Oops... no altero ningun cambio",
              text: "modifique algun cambio para realizar la edicion!",
            });
          }
          else {
            Swal.fire({
              icon: "error",
              title: "Oops... hubo un error",
              text: "Hubo un conflicto al editar los datos, comuniquese con el area de sistemas",
            });
          }
        },
      });
    },
  });
  //EDITAR DATOS
  jQuery.validator.addMethod(
    "letras",
    function (value, element) {
      let variable = value.replace(/ /g, "");
      return /^[A-Za-z]+$/.test(variable);
    },
    "*Este campo solo permiten letras"
  );

  $("#form-datos").validate({
    rules: {
      nombres_mod: {
        required: true,
        letras: true,
      },
      apellidos_mod: {
        required: true,
        letras: true,
      },
      dni_mod: {
        required: true,
        digits: true,
        minlength: 7,
        maxlength: 10,
      },
      email_mod: {
        required: true,
        email: true,
      },
      telefono_mod: {
        required: true,
        digits: true,
        minlength: 8,
        maxlength: 10,
      },
    },
    messages: {
      nombres_mod: {
        required: "*Este campo es obligatorio",
      },
      apellidos_mod: {
        required: "*Este campo es obligatorio",
      },
      dni_mod: {
        required: "*Este campo es obligatorio",
        digits: "*Solo numeros",
        minlength: "*minimo 7 caracteres",
        maxlength: "*maximo 10 caracteres",
      },
      email_mod: {
        required: "*Este campo es obligatori",
        email: "*ingresa un email valido",
      },
      telefono_mod: {
        required: "*Este campo es obligatorio",
        digits: "*Solo numeros",
        minlength: "*minimo 8 caracteres",
        maxlength: "*maximo 10 caracteres",
      },
    },
    errorElement: "span",
    errorPlacement: function (error, element) {
      error.addClass("invalid-feedback");
      element.closest(".form-group").append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass("is-invalid");
      $(element).removeClass("is-valid");
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass("is-invalid");
      $(element).addClass("is-valid");
    },
  });
  //CAMBIAR CONTRASEÑAS
  $.validator.setDefaults({
    submitHandler: function () {
      funcion = "cambiar_contra";
      let pass_old = $("#pass_old").val();
      let pass_new = $("#pass_new").val();
      $.post(
        "../Controllers/UsuarioController.php",
        { funcion, pass_old, pass_new },
        (response) => {
          if (response == "success") {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Se ha cambiado la contraseña",
              showConfirmButton: false,
              timer: 1000,
            }).then(function () {
              $("#form-contra").trigger("reset");
            });
          } else if ((response = "error")) {
            Swal.fire({
              icon: "warning",
              title: "Oops... contraseña incorrecta",
              text: "ingrese la contraseña actual para poder cambiarla",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops... error",
              text: "Hubo un conflicto al editar los datos, comuniquese con el area de sistemas",
            });
          }
        }
      );
    },
  });

  jQuery.validator.addMethod(
    "letras",
    function (value, element) {
      let variable = value.replace(/ /g, "");
      return /^[A-Za-z]+$/.test(variable);
    },
    "*Este campo solo permiten letras"
  );

  $("#form-contra").validate({
    rules: {
      pass_old: {
        required: true,
        minlength: 8,
        maxlength: 20,
      },
      pass_new: {
        required: true,
        minlength: 8,
        maxlength: 20,
      },
      pass_repeat: {
        required: true,
        equalTo: "#pass_new",
      },
    },
    messages: {
      pass_old: {
        required: "*Este campo es obligatorio",
        minlength: "*La contraseña debe ser de minimo 8 caracteres",
        maxlength: "*La contraseña debe de ser de maximo 20 caracteres",
      },
      pass_new: {
        required: "*Este campo es obligatorio",
        minlength: "*La contraseña debe ser de minimo 8 caracteres",
        maxlength: "*La contraseña debe de ser de maximo 20 caracteres",
      },
      pass_repeat: {
        required: "*Este campo es obligatorio",
        equalTo: "*La contraseña no coincide",
      },
    },
    errorElement: "span",
    errorPlacement: function (error, element) {
      error.addClass("invalid-feedback");
      element.closest(".form-group").append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass("is-invalid");
      $(element).removeClass("is-valid");
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass("is-invalid");
      $(element).addClass("is-valid");
    },
  });
});
