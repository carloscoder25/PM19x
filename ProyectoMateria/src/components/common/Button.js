import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import styles from '../../constants/styles';
import colors from '../../constants/colors';

const Button = ({ title, onPress, style, textStyle, loading = false, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && { backgroundColor: colors.light }]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;