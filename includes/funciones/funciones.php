<?php
    //Creamos una funcion para obtener una conexion con la base de datos y obtener todos los registros creados en la BD
    function obtenerContactos(){
        require_once('bd.php');

        try {
            return $conn->query("SELECT id_contacto, nombre, empresa, telefono FROM contactos");
        } catch (Exception $e) {
            echo "Error!!" . $e->getMessage() . "<br>";
            return false;
        }
    }

    //Obtiene un contacto toma un 'id'
    function obtenerContacto($id){
        require_once('bd.php');

        try {
            return $conn->query("SELECT id_contacto, nombre, empresa, telefono FROM contactos WHERE id_contacto = $id");
        } catch (Exception $e) {
            echo "Error!!" . $e->getMessage() . "<br>";
            return false;
        }
    }

?>