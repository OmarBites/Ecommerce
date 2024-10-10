<?php
include_once 'Conexion.php';
class UsuarioMunicipio
{
    var $objetos;
    private $acceso;
    public function __construct()
    {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }
    function crear_direccion($id_usuario,$id_municipio, $direccion, $referencia)
    {
        $sql = "INSERT INTO usuario_municipio(direccion,referencia,id_municipio,id_usuario) VALUES(:direccion,:referencia,:id_municipio,:id_usuario)";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':direccion' => $direccion, ':referencia' => $referencia, ':id_municipio' => $id_municipio, ':id_usuario' => $id_usuario));
    }
    function llenar_direcciones($id_usuario)
    {
        $sql = "select ud.id as id,direccion,referencia,d.nombre as municipio, p.nombre as provincia, dep.nombre as departamento from usuario_municipio ud
                join municipio d on d.id=ud.id_municipio
                join provincia p on p.id=d.id_provincia
                join departamento dep on dep.id=p.id_departamento
                where id_usuario=:id and estado='A'";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':id'=>$id_usuario));
        $this->objetos = $query->fetchAll();
        return $this->objetos;
    }
    function eliminar_direccion($id_direccion)
    {
        $sql = "UPDATE usuario_municipio set estado='I' WHERE id=:id_direccion";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':id_direccion' => $id_direccion));
    }
    function recuperar_direccion($id_direccion)
    {
        $sql = "select ud.id as id,direccion,referencia,d.nombre as municipio, p.nombre as provincia, dep.nombre as departamento from usuario_municipio ud
                join municipio d on d.id=ud.id_municipio
                join provincia p on p.id=d.id_provincia
                join departamento dep on dep.id=p.id_departamento
                where ud.id=:id and estado='A'";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':id'=>$id_direccion));
        $this->objetos = $query->fetchAll();
        return $this->objetos;
    }
}