<?php
include_once '../Models/Departamento.php';
$departamento = new Departamento();
session_start();

if ($_POST['funcion'] == 'llenar_departamentos') {
    $departamento->llenar_departamentos();
    foreach ($departamento->objetos as $objeto){
        $json[] = array(
            'id'=>$objeto->id,
            'nombre'=>$objeto->nombre
        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
}
