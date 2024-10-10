<?php
include_once 'Conexion.php';
class Usuario
{
    var $objetos;
    private $acceso;
    public function __construct()
    {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }
    
    function verificar_usuario($user)
    {
        $sql = "SELECT * FROM usuario
                    WHERE user =:user";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':user' => $user));
        $this->objetos = $query->fetchAll();
        return $this->objetos;
    }
    function registrar_usuario($username, $pass, $nombres, $apellidos, $dni, $email, $telefono)
    {
        $sql = "INSERT INTO usuario(user,pass,nombres,apellidos,dni,email,telefono,id_tipo) VALUES(:user,:pass,:nombres,:apellidos,:dni,:email,:telefono,:id_tipo)";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':user' => $username, ':pass' => $pass, ':nombres' => $nombres, ':apellidos' => $apellidos, ':dni' => $dni, ':email' => $email, ':telefono' => $telefono, ':id_tipo' => 2));
    }
    function obtener_datos($user)
    {
        $sql = "SELECT * FROM usuario
                JOIN tipo_usuario ON usuario.id_tipo = tipo_usuario.id
                where usuario.id = :user";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':user' => $user));
        $this->objetos = $query->fetchAll();
        return $this->objetos;
    }
    function editar_datos($id_usuario, $nombres, $apellidos, $dni, $email, $telefono, $nombre)
    {
        if ($nombre != '') {
            $sql = "UPDATE usuario set nombres=:nombres,
            apellidos=:apellidos,
            dni=:dni,
            email=:email,
            telefono=:telefono,
            avatar=:avatar
                where id=:id_usuario";
            $query = $this->acceso->prepare($sql);
            $variables = array(
                ':id_usuario' => $id_usuario,
                ':nombres' => $nombres,
                ':apellidos' => $apellidos,
                ':dni' => $dni,
                ':email' => $email,
                ':telefono' => $telefono,
                ':avatar' => $nombre
            );
            $query->execute($variables);
        } else {
            $sql = "UPDATE usuario set nombres=:nombres,
                            apellidos=:apellidos,
                            dni=:dni,
                            email=:email,
                            telefono=:telefono
                            where id=:id_usuario";
            $query = $this->acceso->prepare($sql);
            $variables = array(
                ':id_usuario' => $id_usuario,
                ':nombres' => $nombres,
                ':apellidos' => $apellidos,
                ':dni' => $dni,
                ':email' => $email,
                ':telefono' => $telefono
            );
            $query->execute($variables);
        }
    }
    function cambiar_contra($id_usuario,$pass_new){
        $sql = "UPDATE usuario set pass=:pass_new
                where id=:id_usuario";
        $query = $this->acceso->prepare($sql);
        $variables = array(
            ':id_usuario' => $id_usuario,
            ':pass_new' => $pass_new            
        );
        $query->execute($variables);

    }
}