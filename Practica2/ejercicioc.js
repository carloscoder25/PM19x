const personas = [
    { nombre: 'Juan', edad: 22 },
    { nombre: 'Luis', edad: 35 },
    { nombre: 'Maria', edad: 28 },
];
//tu codigo aqui

/*
1. Usa .find() para buscar a la persona con nombre "Luis".
2. Usa .forEach() para imprimir el nombre de cada persona con su edad.
3. Usa .reduce() para sumar todas las edades y obtener un total.
*/

const buscar = personas
    .find(persona => persona.nombre === 'Luis');
console.log(buscar);

personas.forEach(persona =>{
    console.log(`${persona.nombre} tiene ${persona.edad} años`);
});