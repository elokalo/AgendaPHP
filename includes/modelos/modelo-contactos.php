<?php 

//Necesitamos comprobar que esten definidas las variables de $_POST y $_GET en el servidor para poder acceder a ellas y asi, con un 'isset' es suficiente
if(isset($_POST['accion'])){
    if($_POST['accion']==='crear'){
        //Creara un nuevo registro en la BD
        require_once('../funciones/bd.php');

        //Validar las entradas con filtros, limpiamos las entradas
        $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
        $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);
        $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);

        try{
            $stmt = $conn->prepare("INSERT INTO contactos (nombre, empresa, telefono) VALUES (?,?,?)");
            $stmt->bind_param("sss", $nombre, $empresa, $telefono);
            $stmt->execute();

            if($stmt->affected_rows === 1){
                $respuesta = array(
                    'respuesta' => 'correcto',
                    'datos' => array(
                        'nombre' => $nombre,
                        'empresa' => $empresa,
                        'telefono' => $telefono,
                        'id_insertado' => $stmt->insert_id
                    )
                );
            }

            /*
            $respuesta = array(
                'respuesta' => 'correcto',
                'info' => $stmt->affected_rows //Se afecto correctamente el registro, si es igual a '1' nos indica que se inserto correctamente el registro
            );*/
            $stmt->close();
            $conn->close();
        } catch(Exception $e){
            $respuesta=array(
                'error'=>$e->getMessage()
            );
        }
        echo json_encode($respuesta);
    }
}

if(isset($_GET['accion'])){
    if($_GET['accion']==='borrar'){

        require_once('../funciones/bd.php');

        $id = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);

        try{
            $stmt = $conn->prepare("DELETE FROM contactos WHERE id_contacto=?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            if($stmt->affected_rows === 1){
                $respuesta = array(
                    'respuesta' => 'correcto'
                );
            }
            $stmt->close();
            $conn->close();
        } catch (Exception $e){
            $respueta = array(
                'error' => $e->getMessage()
            );
        }
        echo json_encode($respuesta);
    }
}

if(isset($_POST['accion'])){
    if($_POST['accion']==='editar'){

        //Creara un nuevo registro en la BD
        require_once('../funciones/bd.php');

        //Validar las entradas con filtros, limpiamos las entradas
        $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
        $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);
        $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);
        $id = filter_var($_POST['id_contacto'], FILTER_SANITIZE_NUMBER_INT);

        try{
            $stmt = $conn->prepare("UPDATE contactos SET nombre=?, empresa=?, telefono=? WHERE id_contacto=?");
            $stmt->bind_param("sssi", $nombre, $empresa, $telefono, $id);
            $stmt->execute();
            if($stmt->affected_rows===1){
                $respuesta = array(
                    'respuesta' => 'correcto'
                );
            }

            $stmt->close();
            $conn->close();
        } catch(Exception $e){
            $respueta = array(
                'error' => $e->getMessage()
            );
        }
        echo json_encode($respuesta);
    }
}
?>
