import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const BudgetCard = ({ category, spent, limit, onPress }) => {
  const percentage = (spent / limit) * 100;
  const isOver = percentage > 100;
  
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.amount}>
            ${spent.toLocaleString()} / ${limit.toLocaleString()}
          </Text>
        </View>
        
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { 
                width: `${Math.min(percentage, 100)}%`,
                backgroundColor: isOver ? colors.danger : colors.primary,
              }
            ]}
          />
        </View>
        
        <Text style={[styles.percentage, { color: isOver ? colors.danger : colors.dark }]}>
          {percentage.toFixed(0)}%
        </Text>
        
        {isOver && (
          <Text style={styles.alert}>Has excedido tu presupuesto</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  category: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.light,
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  percentage: {
    textAlign: 'right',
    fontSize: 14,
  },
  alert: {
    color: colors.danger,
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  },
});

export default BudgetCard;