<?php
include_once '../Models/Municipio.php';
$municipio = new Municipio();
session_start();

if ($_POST['funcion'] == 'llenar_municipios') {
    $id_provincia=$_POST['id_provincia'];
    $municipio->llenar_municipios($id_provincia);
    $json=array();
    foreach ($municipio->objetos as $objeto){
        $json[] = array(
            'id'=>$objeto->id,
            'nombre'=>$objeto->nombre
        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
}
