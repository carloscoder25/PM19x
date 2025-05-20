//------------------------a----------
var nombre ="Armando";
var edad = 25;

nombre = "Ana Maria";

var saludo = "Hola " + nombre + ". Tienes " + edad + "años.";

//muestra en consola el contenido del saludo 
//ejercicio correcto
const nombre = 'Juan';
let edad = 25;

//-------------------------b-----------
function cuadrado(numero){
    return numero* numero ;
}
//console.log();
//muestra en consola en probando con 3 numeros diferentes
//ejercicio correcto
const cuadrado = (numero) => numero * numero;

//purebas
console.log(cuadrado(2));
console.log(cuadrado(3));
console.log(cuadrado(4));

//------------------------c------------------
/*Crea una arrow function llamada saludoPersonalizado que reciba dos parametros: 
nombre y edad. y retorne una cadena como la siguiente */

//"Hola, me llamo Isay y tengo 37 años ."
//ejercicio correcto
const saludoPersonalizado = (nombre, edad) => {
    return `Hola, me llamo ${nombre} y tengo ${edad} años.`;
}

// Ejemplo de uso
console.log(saludoPersonalizado("Isay", 37)); // "Hola, me llamo Isay y tengo 37 años."
console.log(saludoPersonalizado("María", 28)); // "Hola, me llamo María y tengo 28 años."
console.log(saludoPersonalizado("Carlos", 42)); // "Hola, me llamo Carlos y tengo 42 años."