const persona = {
    nombre: "Ivan Isay",
    edad: 37,
    direccion: {
        ciudad:"Qro",
        pais:"MX"
    }
};

//Aplica destructuracion aqui

const{ nombre,edad, direccion: {ciudad,pais}} = persona;
//Imprime el mensaje
console.log('Hola soy '+nombre+' y tengo '+edad+' años, vivo en '+ciudad+','+pais+'');