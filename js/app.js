const formContactos = document.querySelector('#contacto');
const listadoContactos = document.querySelector('#listado-contactos tbody');
const inputBuscador = document.querySelector('#buscar');

eventListeners();

function eventListeners() {
    //Cuando el formulario de crear o editar se ejecuta
    formContactos.addEventListener('submit', leerForm);

    //Evento para eliminar registro mediante el boton
    if(listadoContactos){
        listadoContactos.addEventListener('click', eliminarContacto);
    }

    if(inputBuscador){
        inputBuscador.addEventListener('input', buscarContactos);
    }

    numeroContactos();
}

function leerForm(e){
    e.preventDefault(); //Al utilizar una operacion con AJAX o JavaScript es necesario prevenir las acciones por default, en este caso la del formulario su accion por default es redireccionar a una URL

    //Leer los datos de los inputs
    const nombre = document.querySelector('#nombre').value,
          empresa = document.querySelector('#empresa').value,
          telefono = document.querySelector('#telefono').value;
          accion = document.querySelector('#accion').value;

    if(nombre==='' || empresa==='' || telefono===''){
        //2 parametros: texto y clase
        mostrarNotificacion('Todos los Campos son Obligatorios', 'error');
    } else {
        //Pasa la validacion, crear llamado a AJAX
        const infoContacto = new FormData(); //Leemos datos de un formulario para pasarlos por medio de ajax, lo crea en forma de arreglo
        infoContacto.append('nombre', nombre);
        infoContacto.append('empresa', empresa);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);

        if(accion==='crear'){
            //Creamos un nuevo contacto
            insertarBD(infoContacto);
        } else {
            //Editar el contacto
            //Leer el ID
            const idRegistro = document.querySelector('#id_contacto').value;
            infoContacto.append('id_contacto', idRegistro);
            actualizarRegistro(infoContacto);
        }
    }  
} //Fin funcion 'leerForm'

 //JSON = formato de transporte, JavaScript = Leemos los datos, AJAX = Enviamos los datos

//Inserta en la BD via AJAX
function insertarBD(datos){
    //Llamado a AJAX
    //Creamos el objeto request
    const xhr = new XMLHttpRequest();

    //abrir la conexion
    xhr.open('POST', 'includes/modelos/modelo-contactos.php', true);

    //pasar los datos
    xhr.onload = function () {
        if(this.status===200){
            //Leemos la respuesta de PHP
            const respuesta = JSON.parse(xhr.response); //Convertimos el JSON a un objeto de JavaScript
            
            //Inserta un nuevo elemento a la tabla
            const nuevoContacto = document.createElement('tr');

            nuevoContacto.innerHTML = `
                <td>${respuesta.datos.nombre}</td>
                <td>${respuesta.datos.empresa}</td>
                <td>${respuesta.datos.telefono}</td>
            `;

            //Creamos contenedor para los botones
            const contenedorAcciones = document.createElement('td');

            //Creamos el icono de editar
            const iconoEditar = document.createElement('i');
            iconoEditar.classList.add('fas', 'fa-pen-square');

            //Creamos el enlace para editar
            const btnEditar = document.createElement('a');
            btnEditar.appendChild(iconoEditar);
            btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
            btnEditar.classList.add('btn','btn-editar');

            //Agregando al padre <td>
            contenedorAcciones.appendChild(btnEditar);

            //Creando el icono de eliminar/borrar
            const iconoBorrar = document.createElement('i');
            iconoBorrar.classList.add('fas', 'fa-trash-alt');
            
            //Creamos el boton para borrar
            const btnBorrar = document.createElement('button');
            btnBorrar.appendChild(iconoBorrar);
            btnBorrar.setAttribute('data-id', respuesta.datos.id_insertado);
            btnBorrar.classList.add('btn', 'btn-borrar');

            //Agregammos al padre
            contenedorAcciones.appendChild(btnBorrar);

            //Agregamos al <tr> cada <td>
            nuevoContacto.appendChild(contenedorAcciones);

            //Agregamos el nuevo registro a la table en el <tdobyd>
            listadoContactos.appendChild(nuevoContacto);

            //Resetear el formulario
            document.querySelector('form').reset();

            //Mostrar la notificacion
            mostrarNotificacion('Contacto creado correctamente', 'correcto');

            //Actualizamos el numero
            numeroContactos();
        }
    }

    //enviar los datos
    xhr.send(datos);
} //Insertar Registros

function actualizarRegistro(datos){
    //console.log(...datos); //Con la funcion 'spread' hacemos una copia del FormData

    //Crear el objeto
    const xhr = new XMLHttpRequest();

    //Abrir la conexion
    xhr.open('POST', 'includes/modelos/modelo-contactos.php', true);

    //Leer la respueta
    xhr.onload = function () {
        if(this.status === 200){
            const respuesta = JSON.parse(xhr.responseText);
            
            if(respuesta.respuesta==='correcto'){
                //mostrar notificacion correcto
                mostrarNotificacion('Contacto Editado Correctamente', 'correcto');

            } else{
                mostrarNotificacion('Hubo un error...', 'error');
            }

            //Despues de 4 segundos redireccionar a pagina de inicio
            setTimeout(()=>{
                window.location.href='index.php';
            },4000);
        }
    }
    //enviar la peticion
    xhr.send(datos);
} //Actualizar Registros

 
/*function eliminarDB(datos) {
    // Crear el objeto
    const xhrEliminar = new XMLHttpRequest();
 
    // abrir conexión
    xhrEliminar.open('POST', 'includes/modelos/modelo-contactos.php', true);
 
    // pasar los datos
    xhrEliminar.onload = function () {
 
        if (this.status === 200) {
            const resultado = JSON.parse(xhrEliminar.responseText);

            if(resultado.respuesta === 'correcto') {
                const botonEliminar = document.querySelector('#btn-borrar');
                // eliminarlo del DOM
                botonEliminar.parentElement.parentElement.remove();
            } else {
                //mostrarNotificacion('Hubo un error al momento de interactuar con la base de datos', 'error'); 
            }
 
        }
    }
    // enviar los datos 
    xhrEliminar.send(datos); 
}*/


function eliminarContacto(e){
    if(e.target.parentElement.classList.contains('btn-borrar')){
        //Tomar el id
        const id = e.target.parentElement.getAttribute('data-id');

        const respuesta = confirm('¿Estás seguro(a)?');
        if(respuesta){
            //Llamado a AJAX
            //Creamos el objeto
            const xhr = new XMLHttpRequest();

            //Abrir la conexion
            xhr.open('GET', `includes/modelos/modelo-contactos.php?id=${id}&accion=borrar`, true);
            
            //Leer la respuesta
            xhr.onload = function(){
                if(this.status===200){
                    const resultado = JSON.parse(xhr.responseText);
                    
                    if(resultado.respuesta === 'correcto') {

                        // eliminarlo del DOM con 'target'
                        //console.log(e.target.parentElement.parentElement);
                        e.target.parentElement.parentElement.parentElement.remove(); //Hacemos 'parentElement' hasta acceder al <tr> en este caso como estamos haciendo target al <i>, luego a su padre que es <button>, su abuelo es <td> y su bisabuelo <tr>

                        //Mostrar notificacion de correct
                        mostrarNotificacion('Contacto Eliminado', 'correcto');
                        //Actualizamos el numero
                        numeroContactos();
                    } else {
                        mostrarNotificacion('Hubo un error...', 'error'); 
                    }
                }
            }
            //Enviar la peticion
            xhr.send();
        } 
    }
}

//Notificacion en pantalla
function mostrarNotificacion(mensaje, clase) {
    const notif = document.createElement('div');
    notif.classList.add(clase,'notificacion', 'sombra');
    notif.textContent = mensaje;

    //Muestra Notificacion en el Formulario
    formContactos.insertBefore(notif, document.querySelector('form legend'));

    //Ocultar y mostrar la notificacion
    setTimeout(()=>{
        notif.classList.add('visible');

        setTimeout(()=>{
            notif.classList.remove('visible');

            setTimeout(()=>{
                notif.remove();
            },500);
        }, 3000);
    },100);
}

//Buscador de Registros
function buscarContactos(e){
    const expresion = new RegExp(e.target.value, "i"); //Con "i" quitamos el case sensitive de las palabras, es decir podemos colocarlo como mayusculas o minusculas
    const registros = document.querySelectorAll('tbody tr');

    registros.forEach(registro =>{
        registro.style.display = "none";

        if(registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1){
            registro.style.display = 'table-row';
        }
        numeroContactos();
    });
}

//Muestra el numero de contactos
function numeroContactos(){
    const totalContactos = document.querySelectorAll("tbody tr");
    const contenedorNumero = document.querySelector(".total-contactos span");

    let total =0;

    totalContactos.forEach(contacto =>{
        if(contacto.style.display === '' || contacto.style.display === 'table-row'){
            total++;
        }
    });

    //console.log(total);
    contenedorNumero.textContent = total;
}