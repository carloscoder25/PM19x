import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from '../../components/common/Button';
import colors from '../../constants/colors';
import styles from '../../constants/styles';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <Image 
        source={require('../../assets/images/logo.png')} 
        style={{ width: 150, height: 150, marginBottom: 24 }}
      />
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>Lana App</Text>
      <Text style={{ color: colors.dark, marginBottom: 32, textAlign: 'center' }}>
        Tu asistente de finanzas personales
      </Text>
      <Button 
        title="Comenzar" 
        onPress={() => navigation.navigate('Register')}
        style={{ width: '80%' }}
      />
    </View>
  );
};

export default WelcomeScreen;