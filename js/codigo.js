window.addEventListener("load", inicio);

function inicio() {
    borrarPantalla();
    document.querySelector("#contenedorLogin").style.display = "block";
    escucharBotonesMenu();
}

let usuarioActual;

/**************************************************Datos precargados******************************************************** */

// creacion de usuarios locales

class Local {
    constructor(unId, unNombre, unUsuario, unaContraseña, unTipo, unaDireccion, unCupoMaximo, unaFoto, unEstado) {
        this.id = unId;
        this.nombre = unNombre;
        this.usuario = unUsuario;
        this.contraseña = unaContraseña;
        this.tipo = unTipo;
        this.direccion = unaDireccion;
        this.cupoMaximo = unCupoMaximo;
        this.foto = unaFoto;
        this.estado = unEstado;
    }
}

let usuariosLocales = [
    new Local("r1", "McDonalds", "mcdonalds123", "mc_Donalds", "restaurant", "Tres Cruces Shopping", 10, "./imgs/mcDonalds.jpeg", true),
    new Local("r2", "Burger King", "bking_", "burki456", "restaurant", "Costa Urbana Shopping", 70, "./imgs/burgerKing.jpg", true),
    new Local("r3", "La Pasiva", "lapa7", "La_pas789", "restaurant", "Juan Benito Blanco 920", 60, "./imgs/laPasiva.jpg", true),
    new Local("m1", "Museo del Carnaval", "mcarnaval159", "musCarn_123", "museo", "Rambla 25 de Agosto 1825", 75, "./imgs/museoDelCarnaval.jpg", true),
    new Local("m2", "Museo del futbol", "museoFutbol50", "mfut3050", "museo", "Estadio Centenario", 40, "./imgs/museoDelFutbol.jpg", true),
    new Local("t1", "Teatro Solis", "solis_teatro", "tsolis321", "teatro", "Reconquista esq Bartolomé Miter", 1500, "./imgs/teatroSolis.jpg", true),
    new Local("t2", "Teatro de verano", "tverano_456", "verano2022", "teatro", "Rambla Wilson esq Julio Maria Sosa", 4200, "./imgs/teatroDeVerano.png", true)
]

// creacion de usuarios personas

class Persona {
    constructor(unNombre, unUsuario, unaContraseña) {
        this.id = `p${contadorPersonas}`;
        this.nombre = unNombre;
        this.usuario = unUsuario;
        this.contraseña = unaContraseña;
        contadorPersonas++;
    }
}

let contadorPersonas = 1;
let usuariosPersonas = [
    new Persona("Juan Rodriguez", "jRod123", "Rodri_456"),
    new Persona("Maria Fernandez", "marfer.852", "fernandezMar23"),
    new Persona("Pedro Romano", "pedro_rom159", "Romano1"),
    new Persona("Valeria García", "vgar-789", "garciaVal_7"),
    new Persona("Victor Mendez", "vicMend123", "victorMendez.789"),
    new Persona("Patricia Silvera", "Silpat_456", "patriciAsil-753"),
    new Persona("Carlos Pérez", "carper_456", "perezCarlos22")
]

let contadorReservas = 1;
class Reserva {
    constructor(unLocal, unaPersona, unaCantidad, unEstado, unaCalificacion) {
        this.id = `r${contadorReservas}`;
        this.local = unLocal;
        this.persona = unaPersona;
        this.cantidad = unaCantidad;
        this.estado = unEstado;
        this.calificacion = unaCalificacion;
        contadorReservas++;
    }
}

let reservas = [
    new Reserva("mcdonalds123", "jRod123", 5, "pendiente", 0),
    new Reserva("bking_", "marfer.852", 2, "pendiente", 0),
    new Reserva("lapa7", "pedro_rom159", 3, "pendiente", 0),
    new Reserva("mcarnaval159", "vgar-789", 4, "finalizada", 3),
    new Reserva("museoFutbol50", "vgar-789", 3, "pendiente", 0),
    new Reserva("solis_teatro", "vicMend123", 2, "finalizada", 2),
    new Reserva("tverano_456", "vicMend123", 5, "pendiente", 0),
]

/**************************************************Manejo de menús********************************************************** */

//borro todo el contenido de la pantalla

function borrarPantalla() {
    document.querySelector("#contenedorLogin").style.display = "none";
    document.querySelector("#contenedorRegistrarse").style.display = "none";
    document.querySelector("#contenedorMenuLocal").style.display = "none";
    document.querySelector("#contenedorMenuPersona").style.display = "none";

    document.querySelector("#contenedorDisponibilidad_Local").style.display = "none";
    document.querySelector("#contenedorEstadoReserva_Local").style.display = "none";
    document.querySelector("#contenedorCupoMaximo_Local").style.display = "none";
    document.querySelector("#contenedorInformacionEstadistica_Local").style.display = "none";

    document.querySelector("#contenedorSolicitarReserva_Persona").style.display = "none";
    document.querySelector("#contenedorCancelarReserva_Persona").style.display = "none";
    document.querySelector("#contenedorCalificarReserva_Persona").style.display = "none";
    document.querySelector("#contenedorListadoReservas_Persona").style.display = "none";
    document.querySelector("#contenedorInformacionEstadistica_Persona").style.display = "none";
}

//escuchar todos los botones de los menus y el login

function escucharBotonesMenu() {
    document.querySelector("#btnIngresar_Login").addEventListener("click", iniciarSesion);
    document.querySelector("#btnRegistrarse_Login").addEventListener("click", mostrarContenedorRegistrarse_Persona);

    document.querySelector("#btnMenuDesHabReservas_Local").addEventListener("click", mostrarContenedorDisponibilidad_Local);
    document.querySelector("#btnMenuEstadoReserva_Local").addEventListener("click", mostrarContenedorEstadoReserva_Local);
    document.querySelector("#btnMenuModificarCupo_Local").addEventListener("click", mostrarContenedorCupoMaximo_Local);
    document.querySelector("#btnMenuInformacionEstadistica_Local").addEventListener("click", mostrarContenedorInformacionEstadistica_Local);

    document.querySelector("#btnMenuSolicitarReserva_Persona").addEventListener("click", mostrarContenedorSolicitarReserva_Persona);
    document.querySelector("#btnMenuCancelarReserva_Persona").addEventListener("click", mostrarContenedorCancelarReserva_Persona);
    document.querySelector("#btnMenuCalificarReserva_Persona").addEventListener("click", mostrarcontenedorCalificarReserva_Persona);
    document.querySelector("#btnMenuReservasPendientes_Persona").addEventListener("click", mostrarContenedorListadoReservas_Persona);
    document.querySelector("#btnMenuInformacionEstadistica_Persona").addEventListener("click", mostrarContenedorInformacionEstadistica_Persona);

    document.querySelector("#btnCerrarCesion_Local").addEventListener("click", cerrarSesion);
    document.querySelector("#btnCerrarCesion_Persona").addEventListener("click", cerrarSesion);
}

//mostrar el contenedor de cada funcionalidad cuando se presionan los botones

function mostrarContenedorDisponibilidad_Local() {
    borrarPantalla();
    document.querySelector("#contenedorMenuLocal").style.display = "block";
    document.querySelector("#contenedorDisponibilidad_Local").style.display = "block";
    document.querySelector("#btnModificar_Disponibilidad_Local").addEventListener("click", modificarDisponibilidad);
}

function mostrarContenedorEstadoReserva_Local() {
    borrarPantalla();
    document.querySelector("#contenedorMenuLocal").style.display = "block";
    document.querySelector("#contenedorEstadoReserva_Local").style.display = "block";
    document.querySelector("#btnBuscar_EstadoReserva_Local").addEventListener("click", buscarReservas);
    document.querySelector("#btnModificar_EstadoReserva_Local").addEventListener("click", modificarEstadoReserva);
}

function mostrarContenedorCupoMaximo_Local() {
    borrarPantalla();
    document.querySelector("#contenedorMenuLocal").style.display = "block";
    document.querySelector("#contenedorCupoMaximo_Local").style.display = "block";
    document.querySelector("#btnModificar_CupoMaximo_Local").disabled = false;
    document.querySelector("#btnModificar_CupoMaximo_Local").addEventListener("click", modificarCupoMaximo);
}

function mostrarContenedorInformacionEstadistica_Local() {
    borrarPantalla();
    document.querySelector("#contenedorMenuLocal").style.display = "block";
    document.querySelector("#contenedorInformacionEstadistica_Local").style.display = "block";
    mostrarInformacionEstadisticaLocal();
}

function mostrarContenedorRegistrarse_Persona() {
    borrarPantalla();
    document.querySelector("#contenedorRegistrarse").style.display = "block";
    document.querySelector("#btnRegistrarse_Registro").addEventListener("click", registrarUsuario);
}

function mostrarContenedorSolicitarReserva_Persona() {
    borrarPantalla();
    document.querySelector("#contenedorMenuPersona").style.display = "block";
    document.querySelector("#contenedorSolicitarReserva_Persona").style.display = "block";
    cargarSelectSolicitarReserva();
    document.querySelector("#btnSolicitarReserva_Persona").addEventListener("click", solicitarReserva);
}

function mostrarContenedorCancelarReserva_Persona() {
    borrarPantalla();
    document.querySelector("#contenedorMenuPersona").style.display = "block";
    document.querySelector("#contenedorCancelarReserva_Persona").style.display = "block";
    document.querySelector("#btnCancelarReserva_Persona").addEventListener("click", cancelarReserva);
    cargarSelectReservasPendientes_cancelarReserva();
}

function mostrarcontenedorCalificarReserva_Persona() {
    borrarPantalla();
    document.querySelector("#contenedorMenuPersona").style.display = "block";
    document.querySelector("#contenedorCalificarReserva_Persona").style.display = "block";
    document.querySelector("#btnCalificar_CalificarReserva_Persona").addEventListener("click", calificarReserva);
    cargarSelectReservasFinalizadas_CalificarReserva();
}

function mostrarContenedorListadoReservas_Persona() {
    borrarPantalla();
    document.querySelector("#contenedorMenuPersona").style.display = "block";
    document.querySelector("#contenedorListadoReservas_Persona").style.display = "block";
    document.querySelector("#btnMostrar_ListadoReservas_Persona").addEventListener("click", mostrarInformacionReserva);
    cargarSelectReservasPendientes_ListadoReservas();
}

function mostrarContenedorInformacionEstadistica_Persona() {
    borrarPantalla();
    document.querySelector("#contenedorMenuPersona").style.display = "block";
    document.querySelector("#contenedorInformacionEstadistica_Persona").style.display = "block";
    cargarTablaEstadisitica_Persona();
}

/**************************************************Inicio de sesión***************************************************** */

function iniciarSesion() {
    let usuarioIngresado = document.querySelector("#txtUsuario_Login").value;
    let contraseñaIngresada = document.querySelector("#txtContraseña_Login").value;

    if (existeUsuario(usuarioIngresado)) {
        if (contraseñaValida(usuarioIngresado, contraseñaIngresada)) {
            if (determinarTipoUsuario(usuarioIngresado) == "local") {
                borrarPantalla();
                document.querySelector("#contenedorMenuLocal").style.display = "block";
                usuarioActual = document.querySelector("#txtUsuario_Login").value;
            } else {
                borrarPantalla();
                document.querySelector("#contenedorMenuPersona").style.display = "block";
                usuarioActual = document.querySelector("#txtUsuario_Login").value;
            }
        } else {
            alert("Contraseña incorrecta");
            document.querySelector("#txtUsuario_Login").value = "";
            document.querySelector("#txtContraseña_Login").value = "";
        }
    } else {
        alert("Usuario no existente");
        document.querySelector("#txtUsuario_Login").value = "";
        document.querySelector("#txtContraseña_Login").value = "";
    }
}

function buscarUsuarioLocal(usuario) {
    for (let local of usuariosLocales) {
        if (local.usuario == usuario) {
            return local;
        }
    }
    return -1;
}

function buscarUsuarioPersona(usuario) {
    for (let persona of usuariosPersonas) {
        if (persona.usuario == usuario) {
            return persona;
        }
    }
    return -1;
}

function existeUsuario(usuario) {
    if (buscarUsuarioLocal(usuario) != -1 || buscarUsuarioPersona(usuario) != -1) {
        return true;
    }
    return false;
}

function buscarContraseñaLocal(usuario, contraseña) {
    for (let local of usuariosLocales) {
        if (local.usuario == usuario) {
            if (local.contraseña == contraseña) {
                return true;
            }
        }
    }
    return false;
}

function buscarContraseñaPersona(usuario, contraseña) {
    for (let persona of usuariosPersonas) {
        if (persona.usuario == usuario) {
            if (persona.contraseña == contraseña) {
                return true;
            }
        }
    }
    return false;
}

//chequea que la contraseña ingresada pertenezca al usuario ingresado
function contraseñaValida(usuario, contraseña) {
    if (buscarContraseñaLocal(usuario, contraseña) || buscarContraseñaPersona(usuario, contraseña)) {
        return true;
    }

    return false;
}

function determinarTipoUsuario(usuario) {
    if (buscarUsuarioLocal(usuario) != -1) {
        return "local";
    } else if (buscarUsuarioPersona(usuario) != -1) {
        return "persona";
    }
}

/**************************************************Cerrar sesion******************************************************** */

function cerrarSesion() {
    borrarPantalla();
    document.querySelector("#contenedorLogin").style.display = "block";
    document.querySelector("#txtUsuario_Login").value = "";
    document.querySelector("#txtContraseña_Login").value = "";
    usuarioActual = null;
}

/**************************************************Registro de usuario************************************************** */

function registrarUsuario() {
    let nombreCompleto = document.querySelector("#txtNombre_Registro").value;
    let nombreUsuario = document.querySelector("#txtUsuario_Registro").value;
    let contraseña = document.querySelector("#txtContraseña_Registro").value;

    if (buscarUsuarioLocal(nombreUsuario) != -1 || buscarUsuarioPersona(nombreUsuario) != -1) {
        alert("Nombre de usuario ya utilizado");
        document.querySelector("#txtUsuario_Registro").value = "";
    } else if (!contraseñaValida_Registro(contraseña)) {
        alert("La contraseña ingresada no es válida")
    } else {
        let nuevoUsuario = new Persona(nombreCompleto, nombreUsuario, contraseña);
        usuariosPersonas.push(nuevoUsuario);
        alert("Registro con éxito!")
        borrarPantalla();
        document.querySelector("#contenedorLogin").style.display = "block";
    }
}

function hayMayuscula(texto) {
    for (let i = 0; i < texto.length; i++) {
        if (texto.charCodeAt(i) >= 65 && texto.charCodeAt(i) <= 90) {
            return true;
        }
    }

    return false;
}

function hayMinuscula(texto) {
    for (let j = 0; j < texto.length; j++) {
        if (texto.charCodeAt(j) >= 97 && texto.charCodeAt(j) <= 122) {
            return true;
        }
    }

    return false;
}

function hayNumero(texto) {
    for (let k = 0; k < texto.length; k++) {
        if (texto.charCodeAt(k) >= 48 && texto.charCodeAt(k) <= 57) {
            return true;
        }
    }

    return false;
}

function contraseñaValida_Registro(contraseña) {
    if (contraseña.length >= 6 && hayMayuscula(contraseña) && hayMinuscula(contraseña) && hayNumero(contraseña)) {
        return true;
    } else {
        return false;
    }

}

/***********************************************Habilitar/deshabilitar reservas****************************************** */

function modificarDisponibilidad() {
    let opcionElegida = document.querySelector("#slcHabilitado_Disponibilidad_Local").value;
    if (opcionElegida == "habilitado") {
        buscarUsuarioLocal(usuarioActual).estado = true;
        alert("Modificado con éxito!");
    } else if (opcionElegida == "deshabilitado") {
        buscarUsuarioLocal(usuarioActual).estado = false;
        alert("Modificado con éxito!");
    }
}

/***********************************************Cambiar estado de reserva************************************************ */

function buscarReservas() {
    let nombreIngresado = document.querySelector("#txtNombreCliente_EstadoReserva_Local").value;
    let reservasAEseNombre = crearArrayDeReservasSegunNombre(nombreIngresado);
    if (reservasAEseNombre != -1) {
        document.querySelector("#slcReservas_EstadoReserva_Local").innerHTML = "";
        cargarSelectReservasAEseNombre(reservasAEseNombre);
    } else {
        alert("No existen reservas a ese nombre");
        document.querySelector("#slcReservas_EstadoReserva_Local").innerHTML = "";
        document.querySelector("#txtNombreCliente_EstadoReserva_Local").value = "";
    }

}


//preguntar del if
function crearArrayDeReservasSegunNombre(nombre) {
    let lista = new Array();
    for (let reser of reservas) {
        let nombrePersona = buscarUsuarioPersona(reser.persona).nombre.toLowerCase();
        if ((reser.estado == "pendiente") && (nombrePersona.indexOf(nombre) != -1) && (reser.local == usuarioActual)) {
            lista.push(reser);
        }
    }

    if (lista.length == 0) {
        return -1;
    } else {
        return lista;
    }
}

function cargarSelectReservasAEseNombre(lista) {
    let combo = document.querySelector("#slcReservas_EstadoReserva_Local");
    combo.innerHTML = "";
    for (let reser of lista) {
        combo.innerHTML += `<option value=${reser.id}>${buscarUsuarioPersona(reser.persona).nombre} - ${reser.cantidad}</option>`;
    }
}

function modificarEstadoReserva() {
    let reservaAModificar = document.querySelector("#slcReservas_EstadoReserva_Local").value;
    buscarReservaPorId(reservaAModificar).estado = "finalizada";
    alert("Reserva finalizada con éxito!");
    document.querySelector("#slcReservas_EstadoReserva_Local").innerHTML = "";
    document.querySelector("#txtNombreCliente_EstadoReserva_Local").value = "";
}

function buscarReservaPorId(id) {
    for (let reser of reservas) {
        if (reser.id == id) {
            return reser;
        }
    }
}

/***********************************************Modificar cupo máximo**************************************************** */

function modificarCupoMaximo() {
    if (noHayReservasPendientes(usuarioActual)) {
        let cupoIngresado = document.querySelector("#txtNuevoCupo_CupoMaximo_Local").value;
        buscarUsuarioLocal(usuarioActual).cupoMaximo = parseInt(cupoIngresado);
        alert("Cupo máximo modificado con éxito!");
        document.querySelector("#txtNuevoCupo_CupoMaximo_Local").value = "";
    } else {
        alert("Tiene reservas pendientes");
        document.querySelector("#btnModificar_CupoMaximo_Local").disabled = true;
        document.querySelector("#txtNuevoCupo_CupoMaximo_Local").value = "";
    }
}

function noHayReservasPendientes(local) {
    for (let reser of reservas) {
        if (reser.estado == "pendiente" && reser.local == local) {
            return false;
        }
    }
    return true;
}

/***********************************************Información estadística_Local******************************************** */

function mostrarInformacionEstadisticaLocal() {
    document.querySelector("#txtOcupacion_InformacionEstadistica_Local").value = ocupacionTotal(usuarioActual);
    document.querySelector("#txtPromedio_InformacionEstadistica_Local").value = promedioCalificaciones(usuarioActual);
    cargarSelectCalificaciones_InformacionEstadistica();
    document.querySelector("#txtCantReservasPendientes_InformacionEstadistica_Local").value = cantidadReservasPendientes(usuarioActual);
    document.querySelector("#txtCantReservasFinalizadas_InformacionEstadistica_Local").value = cantidadReservasFinalizadas(usuarioActual);
}

function ocupacionTotal(local) {
    let porcentaje;

    porcentaje = (cantidadLugaresReservados(local) * 100) / buscarUsuarioLocal(local).cupoMaximo;

    return porcentaje.toFixed(2);
}

function promedioCalificaciones(local) {
    let cantidadReservas = cantidadReservasFinalizadas(local);
    if (cantidadReservas != 0) {
        let sumaCalificaciones = 0;

        for (let reser of reservas) {
            if (reser.local == local && reser.estado == "finalizada") {
                sumaCalificaciones += reser.calificacion;
            }
        }

        return sumaCalificaciones / cantidadReservas;
    } else {
        return 0;
    }
}

function cargarSelectCalificaciones_InformacionEstadistica() {
    let combo = document.querySelector("#slcCalificacionesLocales_InformacionEstadistica_Local");
    combo.innerHTML = "";
    for (let loc of usuariosLocales) {
        let promedio = promedioCalificaciones(loc.usuario);
        combo.innerHTML += `<option>${loc.nombre} - ${promedio}</option>`;
    }
}

function cantidadReservasPendientes(local) {
    let cantidad = 0;
    for (let reser of reservas) {
        if (reser.local == local && reser.estado == "pendiente") {
            cantidad++;
        }
    }

    return cantidad;
}

function cantidadReservasFinalizadas(local) {
    let cantidad = 0;
    for (let reser of reservas) {
        if (reser.local == local && reser.estado == "finalizada") {
            cantidad++;
        }
    }

    return cantidad;
}
/***********************************************Realizar una solicitud de reserva************************************************ */

function solicitarReserva() {
    let cantidadLugaresSolicitados = Number(document.querySelector("#txtReservarLugares").value);
    let localElegido = document.querySelector("#slcElegirLocalAReservar").value;
    if (Number(cantidadLugaresSolicitados) <= buscarUsuarioLocal(localElegido).cupoMaximo - cantidadLugaresReservados(localElegido)){
        let reserva = new Reserva(localElegido, usuarioActual, cantidadLugaresSolicitados, "pendiente", 0);
        reservas.push(reserva);
        alert("Reserva realizada con éxito!");
        document.querySelector("#txtReservarLugares").value = "";
        document.querySelector("#slcElegirLocalAReservar").value = "";
    } else {
        alert(`No hay lugares disponibles, quedan ${buscarUsuarioLocal(localElegido).cupoMaximo - cantidadLugaresReservados(localElegido)} lugares.`);
        document.querySelector("#txtReservarLugares").value = "";
        document.querySelector("#slcElegirLocalAReservar").value = "";
    }
}

function cargarSelectSolicitarReserva() {
    let combo = document.querySelector("#slcElegirLocalAReservar");
    combo.innerHTML = "";
    for (let loc of usuariosLocales) {
        let noTienePendientes = true;
        for (let reser of reservas) {
            if (reser.persona == usuarioActual && reser.estado == "pendiente" && reser.local == loc.usuario) {
                noTienePendientes = false;
            }
        }
        if (loc.estado == true && noTienePendientes) {
            combo.innerHTML += `<option value=${loc.usuario}>${loc.nombre}</option>`;
        }
    }
}

function cantidadLugaresReservados(local) {
    let cantidad = 0;
    for (let reser of reservas) {
        if (reser.local == local && reser.estado == "pendiente") {
            cantidad += reser.cantidad;
        }
    }

    return cantidad;
}

/***********************************************Cancelar una reserva************************************************ */

function cancelarReserva() {
    let idReserva = document.querySelector("#slcReservas_CancelarReserva_Persona").value;
    buscarReservaPorId(idReserva).estado = "cancelada";
    alert("Reserva cancelada con éxito!");
    cargarSelectReservasPendientes_cancelarReserva();
}

function cargarSelectReservasPendientes_cancelarReserva() {
    document.querySelector("#btnCancelarReserva_Persona").disabled = false;
    let combo = document.querySelector("#slcReservas_CancelarReserva_Persona");
    combo.innerHTML = "";
    let noTienePendientes = true;
    for (let reser of reservas) {
        let nombreLocal = buscarUsuarioLocal(reser.local).nombre;
        if (reser.persona == usuarioActual && reser.estado == "pendiente") {
            noTienePendientes = false;
            combo.innerHTML += `<option value=${reser.id}>${nombreLocal}</option>`;
        }
    }

    if (noTienePendientes) {
        alert("No tiene ninguna reserva pendiente");
        document.querySelector("#btnCancelarReserva_Persona").disabled = true;
    }
}

/***********************************************Calificar una reserva************************************************ */

function calificarReserva() {
    let idReserva = document.querySelector("#slcReservasFinalizadas_CalificarReserva_Persona").value;
    let calificacionElegida = Number(document.querySelector("#slcPuntuarReserva_CalificarReserva_Persona").value);
    buscarReservaPorId(idReserva).calificacion = calificacionElegida;
    alert("Reserva calificada con éxito!");
}

function cargarSelectReservasFinalizadas_CalificarReserva() {   
    document.querySelector("#btnCalificar_CalificarReserva_Persona").disabled = false;
    let combo = document.querySelector("#slcReservasFinalizadas_CalificarReserva_Persona");
    combo.innerHTML = "";
    let noTieneFinalizadas = true;
    for (let reser of reservas) {
        let nombreLocal = buscarUsuarioLocal(reser.local).nombre;
        if (reser.persona == usuarioActual && reser.estado == "finalizada") {
            noTieneFinalizadas = false;
            combo.innerHTML += `<option value=${reser.id}>${nombreLocal}</option>`;
        }
    }

    if (noTieneFinalizadas) {
        alert("No tiene ninguna reserva finalizada");
        document.querySelector("#btnCalificar_CalificarReserva_Persona").disabled = true;
    }
}

/***********************************************Listado pendientes************************************************ */

function mostrarInformacionReserva() {
    let nombreLocal = buscarReservaPorId(document.querySelector("#slcReservaPendiente_ListadoReservas_Persona").value).local;
    document.querySelector("#etqFotoLocal_ListadoReservas_Persona").innerHTML = `<img src="${buscarUsuarioLocal(nombreLocal).foto}" width="300px" height="300px">`
    document.querySelector("#etqNombreCliente_ListadoReservas_Persona").innerHTML = "Reserva a nombre de: " + buscarUsuarioPersona(usuarioActual).nombre;
    document.querySelector("#etqCantidadLugares_ListadoReservas_Persona").innerHTML = "Lugares reservados: " + buscarReservaPorId(document.querySelector("#slcReservaPendiente_ListadoReservas_Persona").value).cantidad;
}

function cargarSelectReservasPendientes_ListadoReservas() {
    document.querySelector("#btnMostrar_ListadoReservas_Persona").disabled = false;
    let combo = document.querySelector("#slcReservaPendiente_ListadoReservas_Persona");
    combo.innerHTML = "";
    let noTienePendientes = true;
    for (let reser of reservas) {
        let nombreLocal = buscarUsuarioLocal(reser.local).nombre;
        if (reser.persona == usuarioActual && reser.estado == "pendiente") {
            noTienePendientes = false;
            combo.innerHTML += `<option value=${reser.id}>${nombreLocal}</option>`;
        }
    }

    if (noTienePendientes) {
        alert("No tiene ninguna reserva pendiente");
        document.querySelector("#btnMostrar_ListadoReservas_Persona").disabled = true;
    }
}

/***********************************************Información estadística_Persona************************************************ */

function cargarTablaEstadisitica_Persona() {
    let tabla = document.querySelector("#tblInformacionEstadistica_Persona");
    tabla.innerHTML = "";
    tabla.innerHTML = `<table border="1" id="tblInformacionEstadistica_Persona">
                            <tr>
                                <th>Local</th>
                                <th>Reservas propias</th>
                                <th>Reservas totales del local</th>
                                <th>Porcentaje de reservas</th>
                            </tr>
                        </table>`;
    let nombresLocalesUsados = new Array();
    for (let reser of reservas) {
        if (reser.persona == usuarioActual && !estaEnElArray(nombresLocalesUsados, reser.local)) {
            let reservasTotalesLocal = reservasTotalesAUnLocal(reser.local);
            let porcentaje;
            if (reservasTotalesLocal != 0){
                porcentaje = ((cantidadReservasPersona(usuarioActual, reser.local) * 100) / reservasTotalesLocal).toFixed(1);
            } else {
                porcentaje = 0;
            }
            tabla.innerHTML += `<tr>
                                    <td>${buscarUsuarioLocal(reser.local).nombre}</td>
                                    <td>${cantidadReservasPersona(usuarioActual, reser.local)}</td>
                                    <td>${reservasTotalesLocal}</td>
                                    <td>${porcentaje} %</td>
                                </tr>`;
            nombresLocalesUsados.push(reser.local);
        }
    }
    localMasReservado(usuarioActual);
}

function cantidadReservasPersona(persona, local) {
    let cantidad = 0;
    for (let reser of reservas) {
        if (reser.persona == persona && reser.local == local) {
            cantidad++;
        }
    }

    return cantidad;
}

function reservasTotalesAUnLocal(local){
    let cantidad = 0;
    for (let reser of reservas){
        if (reser.local == local){
            cantidad++;
        }
    }

    return cantidad
}

function estaEnElArray(lista, nombre) {
    for (let i = 0; i < lista.length; i++) {
        if (lista[i] == nombre) {
            return true;
        }
    }

    return false;
}

function localMasReservado(usuario){
    document.querySelector("#etqLocalReservasMaximo").innerHTML = "Locales con más reservas:<br>";
    let cantidadMaxima = null;
    
    for (let loc of usuariosLocales){
        if (cantidadReservasPersona(usuario, loc.usuario) >= cantidadMaxima){
            cantidadMaxima = cantidadReservasPersona(usuario, loc.usuario);
        }
    }

    for (let loc of usuariosLocales) {
        if (cantidadReservasPersona(usuario, loc.usuario) == cantidadMaxima){
            document.querySelector("#etqLocalReservasMaximo").innerHTML += `${loc.nombre} <br>`;
        }
    }
}