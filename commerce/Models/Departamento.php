<?php
include_once 'Conexion.php';
class Departamento
{
    var $objetos;
    private $acceso;
    public function __construct()
    {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }
    function llenar_departamentos()
    {
        $sql = "SELECT * FROM departamento";
        $query = $this->acceso->prepare($sql);
        $query->execute();
        $this->objetos = $query->fetchAll();
        return $this->objetos;
    }
}