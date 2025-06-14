import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React,{Children, useState} from 'react';

//componente Propio  Texto 
const Texto =()=>{
  const[contenido,setContenido]=useState('Hola mundo')
  const actualizarTexto=()=>{setContenido('Estado modificado')}
  const actualizacion=()=>{setContenido('Hola mundo')}
  return(
    <Text onPress={actualizarTexto}>{ contenido} </Text>

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
      <Text>Hola nmmundo REACTNATIVE</Text>
      <Texto></Texto>
      <Texto></Texto>
      <Texto></Texto>

      <Button title='Presionar'></Button>

      <Boton title='Soy un boton'></Boton>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
