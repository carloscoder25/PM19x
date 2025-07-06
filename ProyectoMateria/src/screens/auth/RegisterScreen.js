import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import styles from '../../constants/styles';
import colors from '../../constants/colors';

const RegisterScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    // Validación y envío al backend
    console.log('Formulario enviado:', form);
    navigation.navigate('Main');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Crear cuenta</Text>
      
      <Input
        label="Nombre"
        value={form.name}
        onChangeText={(text) => handleChange('name', text)}
        placeholder="Ingresa tu nombre"
      />
      
      <Input
        label="Apellidos"
        value={form.lastName}
        onChangeText={(text) => handleChange('lastName', text)}
        placeholder="Ingresa tus apellidos"
      />
      
      <Input
        label="Correo electrónico"
        value={form.email}
        onChangeText={(text) => handleChange('email', text)}
        placeholder="usuario@ejemplo.com"
        keyboardType="email-address"
      />
      
      <Input
        label="Teléfono"
        value={form.phone}
        onChangeText={(text) => handleChange('phone', text)}
        placeholder="Ingresa tu teléfono"
        keyboardType="phone-pad"
      />
      
      <Input
        label="Contraseña"
        value={form.password}
        onChangeText={(text) => handleChange('password', text)}
        placeholder="Mínimo 8 caracteres"
        secureTextEntry
      />
      
      <Input
        label="Confirmar contraseña"
        value={form.confirmPassword}
        onChangeText={(text) => handleChange('confirmPassword', text)}
        placeholder="Repite tu contraseña"
        secureTextEntry
      />
      
      <Button 
        title="Continuar" 
        onPress={handleSubmit}
        style={{ marginTop: 16 }}
      />
      
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
        <Text>¿Ya tienes cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: colors.primary }}>Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;