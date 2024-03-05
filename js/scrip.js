let pantalla = document.querySelector('.pantallaCalculadora');
let numeroOperacion = 0;
let operacion = 0;
let reset = false;
const botonPunto = document.getElementById('punto');

let prueba

function agregarNumero(numero) {
    // condicional para comprobar si estamos haciendo una nueva operacion o queremos hacer una operacion al resultado obtenido.
    if (reset == true) {
        numeroOperacion = pantalla.textContent.trim();
        reset = false;
        botonPunto.disabled = false
        mostrarPantalla(0);
    }
    modificarNumero(numero)
}

function agregarComa() {
    modificarNumero('.')
    botonPunto.disabled = true
}

function modificarNumero(numero) {
    // almacenamos el numero actual de la pantalla en una variable 
    let contenidoActual = pantalla.textContent.trim();

    if (contenidoActual === '0') {
        mostrarPantalla(numero)
    } else {
        mostrarPantalla(contenidoActual + numero)
    }
   
}
function borrar() {
    mostrarPantalla(0);
    ajustarTexto();
    numeroOperacion = 0;
    operacion = 0;
    reset = false;
    botonPunto.disabled = false
}

function cambiarSigno() {
    let contenidoActual = pantalla.textContent.trim();

    mostrarPantalla(-contenidoActual)
}

function operacionPorcentaje() {
    let contenidoActual = pantalla.textContent.trim();
    let resultado = parseFloat(contenidoActual) / 100

    mostrarPantalla(resultado)

}

function agregarOperador(operador) {
    // condicional para ver si es la primera operacion o queremos realizar una sucesion de operaciones
    if (operacion == 0) {

        operacion = operador
        numeroOperacion = pantalla.textContent.trim();
        botonPunto.disabled = false
        mostrarPantalla(0)

    } else {
        // como ya hay una operacion pendiente hacer llamar la funcion resultado y le damos el operador nuevo para almacenarlo para nuevas operaciones
        resultado(operador);
    }  
}

function resultado(operador) {
    // se crea la variable resultado para psteriormente almacenar el resultado de la operacion y mostrarla en pantalla.
    let resultado;
    // pasamos los numeros guardados a numeros.
    let numeroPantalla = parseFloat(pantalla.textContent.trim());
    let numeroGuardado = parseFloat(numeroOperacion);
    // casos segun la operacion a realizar
    switch (operacion) {
        case '+':
            resultado = numeroGuardado + numeroPantalla;
            break;
        case '-':
            resultado = numeroGuardado - numeroPantalla;
            break;
        case '/':
            resultado = numeroGuardado / numeroPantalla;
            break;
        case '*':
            resultado = numeroGuardado * numeroPantalla;
            break;
        default:
            resultado = numeroPantalla;
            break;
    }
    // almacenamos el operador por si quisieramos segir haciendo operaciones con el mismo numero y lo marcamos con la variable reset.
    operacion = operador
    reset = true
    // borramos el numero a operar
    numeroOperacion = 0;
    // mostramos el resultado en pantalla
    mostrarPantalla(resultado)
}

function mostrarPantalla(numero) {
    pantalla.textContent = numero.toString().slice(0, 14);

    ajustarTexto()
}

function ajustarTexto() {
    const numLetras =  pantalla.textContent.trim().length;
    const fontSizeActual = window.getComputedStyle(pantalla).getPropertyValue('font-size');
    const anchoPantalla = pantalla.clientWidth;
    let fontSize ;
    if (numLetras > 6) {
        fontSize = (anchoPantalla / numLetras) + 10  ;
        
    }
    
    prueba = fontSize;
    pantalla.style.fontSize = fontSize + 'px'
}