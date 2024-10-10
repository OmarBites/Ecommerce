<?php
include_once '../Models/Provincia.php';
$provincia = new Provincia();
session_start();

if ($_POST['funcion'] == 'llenar_provincia') {
    $id_departamento=$_POST['id_departamento'];
    $provincia->llenar_provincia($id_departamento);
    $json=array();
    foreach ($provincia->objetos as $objeto){
        $json[] = array(
            'id'=>$objeto->id,
            'nombre'=>$objeto->nombre
        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
}
