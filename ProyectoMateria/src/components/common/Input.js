import React from 'react';
import { TextInput, View, Text } from 'react-native';
import styles from '../../constants/styles';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, keyboardType, style }) => {
  return (
    <View>
      {label && <Text style={{ marginBottom: 4 }}>{label}</Text>}
      <TextInput
        style={[styles.input, style]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

export default Input;