import { StatusBar } from "expo-status-bar";
import { StyleSheet,Text,View,ActivityIndicator,FlatList,SafeAreaView } from "react-native";
import React,{ useEffect, useState} from "react";

const App =()=>{
  const [loading,setLoading] = useState(true);
  const [users, setUsers]= useState([]);

  useEffect(() => {
    setTimeout(() =>{
      fetch('https://jsonplaceholder.typicode.com/users')
      .then(resp => resp.json())
      .then(data => {
        setUsers (data);
        setLoading (false);
      })
      .catch(err =>{
        console.error ('Error al cargar los usuarios: ' ,err);
        setLoading(false);
      })
    }, 2000);
  }, []);

  const renderItem = ({item}) =>(
<View style={style.card}>
  <Text style={StyleSheet.name}>{item.name}</Text>
  <Text style={StyleSheet.Text}>{item.email}</Text>
  <Text style={StyleSheet.Text}>{item.address.city}</Text>
  <Text style={StyleSheet.Text}>{item.company.name}</Text>
</View>
  );
  return(
    <SafeAreaView>
      {loading ?(
        <View style={styles.loadingContainer}>
          <ActivityIndicator
          size='large'
          color='#007bff'
          />
          <Text style={styles.loadingText}> Cargando Usuarios ....</Text>
        </View>
      )
    </SafeAreaView>
  
  );

}