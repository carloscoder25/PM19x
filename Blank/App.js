import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';


const Texto =(props)=>{
  const{children}=props
  return(
    <Text>{children}</Text>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hola nmmundo REACTNATIVE</Text>
      <Texto> Hola bb </Texto>

      <Button title='Presionar'></Button>
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
