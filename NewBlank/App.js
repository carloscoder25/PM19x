import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image, StyleSheet, Switch, Alert, ActivityIndicator } from 'react-native';

const RegisterScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    terms: ''
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      fullName: '',
      email: '',
      terms: ''
    };

    if (!fullName.trim()) {
      newErrors.fullName = 'Nombre completo es requerido';
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Correo electrónico es requerido';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Correo electrónico no válido';
      valid = false;
    }

    if (!acceptTerms) {
      newErrors.terms = 'Debes aceptar los términos y condiciones';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const showSuccessAlert = () => {
    Alert.alert(
      '✅ Registro Exitoso',
      `📋 Detalles del registro:\n\n👤 Nombre: ${fullName}\n📧 Email: ${email}\n✅ Términos aceptados: ${acceptTerms ? 'Sí' : 'No'}`,
      [
        { 
          text: 'Aceptar', 
          onPress: () => console.log('Alert cerrado') 
        }
      ]
    );
  };

  const handleRegister = () => {
    console.log('Botón presionado'); // Debug
    if (validateForm()) {
      console.log('Formulario válido'); // Debug
      setIsLoading(true);
      
      // Simulamos una carga
      setTimeout(() => {
        setIsLoading(false);
        console.log('Mostrando alerta...'); // Debug
        showSuccessAlert();
      }, 1500);
    } else {
      console.log('Formulario inválido', errors); // Debug
    }
  };

  return (
    <ImageBackground 
      source={require('./assets/Background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.logoContainer}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.loadingText}>Cargando...</Text>
          </View>
        ) : (
          <Image 
            source={require('./assets/loading.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />
        )}

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              placeholderTextColor="#999"
              value={fullName}
              onChangeText={setFullName}
            />
            {errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>

          <View style={styles.termsContainer}>
            <Switch
              value={acceptTerms}
              onValueChange={setAcceptTerms}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={acceptTerms ? "#f5dd4b" : "#f4f3f4"}
            />
            <Text style={styles.termsText}>Acepto los términos y condiciones</Text>
          </View>
          {errors.terms ? <Text style={styles.errorText}>{errors.terms}</Text> : null}

          <TouchableOpacity 
            style={styles.registerButton} 
            onPress={handleRegister}
            disabled={isLoading}
          >
            <Text style={styles.registerButtonText}>
              {isLoading ? 'Registrando...' : 'Registrarse'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

// ... (los estilos se mantienen igual)

// Los estilos se mantienen igual que en tu código original
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 10,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  termsText: {
    marginLeft: 10,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  registerButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RegisterScreen;