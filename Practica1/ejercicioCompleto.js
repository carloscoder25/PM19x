// Ejercicio a: Variables con let y const
const nombre = "Juan";
let edad = 25;
const PI = 3.1416;

// Ejercicio b: Arrow function
const cuadrado = (numero) => numero * numero;

// Ejercicio c: Función de saludo
const saludoPersonalizado = (nombre, edad) => {
    return `Hola, me llamo ${nombre} y tengo ${edad} años.`;
}

// Pruebas
console.log("--- Ejercicio b: Cuadrado ---");
console.log(cuadrado(2));  // 4
console.log(cuadrado(5));  // 25
console.log(cuadrado(10)); // 100

console.log("\n--- Ejercicio c: Saludo ---");
console.log(saludoPersonalizado("Isay", 37));
console.log(saludoPersonalizado("María", 28));
console.log(saludoPersonalizado("Carlos", 42));