<?php
include_once 'Conexion.php';
class Municipio
{
    var $objetos;
    private $acceso;
    public function __construct()
    {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }
    function llenar_municipios($id_provincia)
    {
        $sql = "SELECT * FROM municipio
            where id_provincia =:id";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':id'=>$id_provincia));
        $this->objetos = $query->fetchAll();
        return $this->objetos;
    }
}