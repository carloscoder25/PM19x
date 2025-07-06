import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const TransactionItem = ({ amount, category, date, type, description, onPress }) => {
  const formattedDate = format(new Date(date), 'dd MMM yyyy', { locale: es });
  
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Text style={styles.category}>{category}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
        <Text style={[styles.amount, { color: type === 'income' ? colors.income : colors.expense }]}>
          {type === 'income' ? '+' : '-'}${amount.toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  leftContainer: {
    flex: 1,
  },
  category: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    color: '#666',
    fontSize: 14,
    marginBottom: 4,
  },
  date: {
    color: '#999',
    fontSize: 12,
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TransactionItem;