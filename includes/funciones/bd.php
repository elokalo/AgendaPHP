<?php 

    //Credenciales de la BD mediante variables
    define('DB_USUARIO', 'root');
    define('DB_PASSOWRD', 'root11');
    define('DB_HOST', 'localhost');
    define('DB_NAME', 'agendaphp');

    $conn = new mysqli(DB_HOST, DB_USUARIO, DB_PASSOWRD, DB_NAME);
    //El 5to parametro es el numero de puerto en el que esta corriendo MySQL

    //echo $conn->ping(); //Verificamos conexion con BD
?>