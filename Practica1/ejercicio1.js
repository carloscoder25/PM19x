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