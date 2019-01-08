<div class="campos">
    <div class="campo">
        <label for="nombre">Nombre:</label>
        <input 
            type="text" 
            id="nombre" 
            placeholder="Nombre Contacto"
            value="<?php echo (isset($contacto['nombre']) ? $contacto['nombre'] : ''); ?>">
    </div>
    <div class="campo">
        <label for="empresa">Empresa:</label>
        <input 
            type="text" 
            id="empresa" 
            placeholder="Nombre Empresa"
            value="<?php echo (isset($contacto['empresa']) ? $contacto['empresa'] : ''); ?>">
    </div>
    <div class="campo">
        <label for="telefono">Teléfono:</label>
        <input 
            type="tel" 
            id="telefono" 
            placeholder="Telefono"
            value="<?php echo (isset($contacto['telefono']) ? $contacto['telefono'] : ''); ?>">
    </div>
</div> <!--.campos-->
<div class="campo enviar">
    <?php 
        $textoBtn = isset($contacto['telefono']) ? 'Guardar' : 'Añadir';
        $accion = isset($contacto['telefono']) ? 'editar' : 'crear';
    ?>
    <input type="hidden" id="accion" value="<?php echo $accion; ?>">
    <?php if(isset($contacto['id_contacto'])){ ?>
        <input type="hidden" id="id_contacto" value="<?php echo $contacto['id_contacto']; ?>">
    <?php } //end if?>
    <input type="submit" value="<?php echo $textoBtn; ?>">
</div>