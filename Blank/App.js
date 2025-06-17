import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React,{Children, useState} from 'react';

//componente Propio  Texto 
const Texto =({style})=>{
  const[contenido,setContenido]=useState('Hola mundo')
  const actualizarTexto=()=>{setContenido('Estado modificado')}
  const actualizacion=()=>{setContenido('Hola mundo')}
  return(
    <Text style={[styles.Text,style]} onPress={actualizarTexto}>{ contenido} </Text>

  ) ;   
  
}

const Boton =()=>{
  const [contenido,setContenido]=useState('Soy un boton')
  const actualizarBoton=()=>{setContenido('ya no soy un boton')}
  return( 
 <Button onPress={actualizarBoton} title={contenido}></Button>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Hola nmmundo REACTNATIVE</Text>
      
      <Texto style={styles.azul}></Texto>
    
      
      <Texto style={styles.Blanco}></Texto>
     
      <Texto style={styles.Gris}></Texto>

      <StatusBar style="auto"/>

    

  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'space-between',
//justify arriba hacia abajo
//align de los lados
  },
  Text:{
    color:'green',
    fontSize:27,
    height:150,
    width:150,
  },
  azul:{backgroundColor:'blue'},
  Blanco:{backgroundColor:'white'},
  Gris:{backgroundColor:'grey'},
});
