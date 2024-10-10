<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Andino | Register</title>

    <!-- Google Font: Source Sans Pro -->
    <!-- Font Awesome -->
    <link rel="stylesheet" href="../Util/Css/css/all.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="../Util/Css/adminlte.min.css">
    <link rel="stylesheet" href="../Util/Css/toastr.min.css">
    <link rel="stylesheet" href="../Util/Css/sweetalert2.min.css">
</head>
<div class="modal fade" id="terminos" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="card card-succes">
                <div class="card-header">
                    <h5 class="card-title">TERMINOS Y CONDICIONES</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">
                            &times;
                        </span>
                    </button>
                </div>
                <div class="card-body">
                    <p>* utilizaremos tus datos para producir publicidad segun tus gustos</p>
                    <p>* la empresa no se hace responzable de fraudes o  estafas</p>
                </div>
                <div class="card-footer">
                    <button type="button" class="btn btn-secondary btn-block" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<body class="hold-transition login-page">
    <div class="mt-5">
        <div class="login-logo">
            <img src="../Util/img/logo.jpg" class="profile-user-img img-fluid img-circle">
            <a href="../index.php"><b>Andino</b>arte&cultura</a>
        </div>
        <!-- /.login-logo -->
        <div class="card">
            <div class="card-body login-card-body">
                <p class="login-box-msg">Registrarse</p>

                <form id="form-register">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label for="username">Username</label>
                                <input type="text" name="username" class="form-control" id="username" placeholder="Ingrese Username">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="pass">Contraseña</label>
                                <input type="password" name="pass" class="form-control" id="pass" placeholder="Ingrese Contraseña">
                            </div>
                            <div class="form-group">
                                <label for="nombres">Nombre</label>
                                <input type="text" name="nombres" class="form-control" id="nombres" placeholder="Ingrese nombres">
                            </div>
                            <div class="form-group">
                                <label for="dni">nro. de Carnet</label>
                                <input type="text" name="dni" class="form-control" id="dni" placeholder="Ingrese carnet de identidad">
                            </div>
                            <div class="form-group">
                                <label for="telefono">Numero celular</label>
                                <input type="text" name="telefono" class="form-control" id="telefono" placeholder="telefono">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="pass_repeat">Repita la Contraseña</label>
                                <input type="password" name="pass_repeat" class="form-control" id="pass_repeat" placeholder="Ingrese denuevo su Contraseña">
                            </div>
                            <div class="form-group">
                                <label for="apellidos">Apellido</label>
                                <input type="text" name="apellidos" class="form-control" id="apellidos" placeholder="Ingrese apellidos">
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="text" name="email" class="form-control" id="email" placeholder="Ingrese email">
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group mb-0">
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" name="terms" class="custom-control-input" id="terms">
                                    <label class="custom-control-label" for="terms">Estoy de acuerdo con los terminos de servicio <a href="#" data-toggle="modal" data-target="#terminos">terminos de servicio</a>.</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /.card-body -->
                    <div class="card-footer text-center">
                        <button type="submit" class="btn btn-lg bg-gradient-primary">Registrarme</button>
                    </div>
                </form>

            </div>
            <!-- /.login-card-body -->
        </div>
    </div>
    <!-- /.login-box -->

    <!-- jQuery -->
    <script src="../Util/Js/jquery.min.js"></script>
    <!-- Bootstrap 4 -->
    <script src="../Util/Js/bootstrap.bundle.min.js"></script>
    <!-- AdminLTE App -->
    <script src="../Util/Js/adminlte.min.js"></script>
    <script src="../Util/Js/toastr.min.js"></script>
    <script src="../Util/Js/jquery.validate.min.js"> </script>
    <script src="../Util/Js/additional-methods.min.js"> </script>
    <script src="../Util/Js/sweetalert2.min.js"></script>
    <script src="register.js"> </script>

</body>

</html>