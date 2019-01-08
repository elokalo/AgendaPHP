<?php include 'includes/layout/header.php'; 
include 'includes/funciones/funciones.php';
?>

<?php 
    $id = filter_var($_GET['id'], FILTER_VALIDATE_INT);
    
    if(!$id){
        die('No es válido');
    }

    $resultado = obtenerContacto($id);
    $contacto = $resultado->fetch_assoc(); //Nos trae el resultado y se almacenara en $contacto
?>

<div class="contenedor-barra">
    <div class="contenedor barra">
        <a href="index.php" class="btn volver">Volver</a>
        <h1>Editar Contacto</h1>
    </div>
</div>

<div class="bg-amarillo contenedor sombra">
    <form action="#" id="contacto" >
        <legend>Edite el Contacto</legend>
        
        <?php include 'includes/layout/formulario.php'; ?>

        </div>
    </form>
</div> <!--.contenedor-->
        

<?php include 'includes/layout/footer.php'; ?>