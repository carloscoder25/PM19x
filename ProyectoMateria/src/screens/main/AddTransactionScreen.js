import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import styles from '../../constants/styles';
import colors from '../../constants/colors';

const AddTransactionScreen = ({ navigation, route }) => {
  const { type = 'expense' } = route.params || {};
  
  const [form, setForm] = useState({
    amount: '',
    category: '',
    date: new Date(),
    description: '',
    type: type,
  });
  
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setForm({ ...form, date: selectedDate });
    }
  };

  const handleSubmit = () => {
    // Validación y envío al backend
    console.log('Transacción creada:', form);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>
        {form.type === 'income' ? 'Nuevo ingreso' : 'Nuevo gasto'}
      </Text>

      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <TouchableOpacity
          style={[
            { flex: 1, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: colors.income },
            form.type === 'income' && { backgroundColor: colors.income }
          ]}
          onPress={() => handleChange('type', 'income')}
        >
          <Text style={{ color: form.type === 'income' ? colors.white : colors.income }}>Ingreso</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            { flex: 1, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: colors.expense },
            form.type === 'expense' && { backgroundColor: colors.expense }
          ]}
          onPress={() => handleChange('type', 'expense')}
        >
          <Text style={{ color: form.type === 'expense' ? colors.white : colors.expense }}>Gasto</Text>
        </TouchableOpacity>
      </View>

      <Input
        label="Monto"
        value={form.amount}
        onChangeText={(text) => handleChange('amount', text)}
        placeholder="0.00"
        keyboardType="numeric"
      />

      <Input
        label="Categoría"
        value={form.category}
        onChangeText={(text) => handleChange('category', text)}
        placeholder="Selecciona una categoría"
      />

      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Input
          label="Fecha"
          value={form.date.toLocaleDateString()}
          placeholder="Selecciona una fecha"
          editable={false}
        />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={form.date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Input
        label="Descripción (opcional)"
        value={form.description}
        onChangeText={(text) => handleChange('description', text)}
        placeholder="Agrega una descripción"
        multiline
        numberOfLines={3}
      />

      <Button 
        title="Guardar transacción" 
        onPress={handleSubmit}
        style={{ marginTop: 16 }}
      />
    </ScrollView>
  );
};

export default AddTransactionScreen;