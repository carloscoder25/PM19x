import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../../constants/styles';
import colors from '../../constants/colors';
import TransactionItem from '../../components/finance/TransactionItem';
import BudgetCard from '../../components/finance/BudgetCard';

const HomeScreen = ({ navigation }) => {
  // Datos de ejemplo
  const summary = {
    balance: 12500,
    income: 20000,
    expenses: 7500,
  };

  const recentTransactions = [
    { id: 1, amount: 1500, category: 'Comida', date: '2023-05-15', type: 'expense' },
    { id: 2, amount: 5000, category: 'Salario', date: '2023-05-10', type: 'income' },
    { id: 3, amount: 1200, category: 'Transporte', date: '2023-05-08', type: 'expense' },
  ];

  const budgets = [
    { id: 1, category: 'Comida', spent: 1500, limit: 2000 },
    { id: 2, category: 'Transporte', spent: 1200, limit: 1500 },
    { id: 3, category: 'Entretenimiento', spent: 800, limit: 1000 },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Resumen financiero */}
      <View style={styles.card}>
        <Text style={styles.header}>Resumen</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ color: colors.dark }}>Saldo actual</Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>${summary.balance.toLocaleString()}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ color: colors.income }}>Ingresos: ${summary.income.toLocaleString()}</Text>
            <Text style={{ color: colors.expense }}>Gastos: ${summary.expenses.toLocaleString()}</Text>
          </View>
        </View>
      </View>

      {/* Acciones rápidas */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
        <TouchableOpacity 
          style={[styles.button, { flex: 1, marginRight: 8 }]}
          onPress={() => navigation.navigate('AddTransaction', { type: 'income' })}
        >
          <Text style={styles.buttonText}>Ingreso</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, { flex: 1, marginLeft: 8, backgroundColor: colors.expense }]}
          onPress={() => navigation.navigate('AddTransaction', { type: 'expense' })}
        >
          <Text style={styles.buttonText}>Gasto</Text>
        </TouchableOpacity>
      </View>

      {/* Presupuestos */}
      <Text style={[styles.header, { marginTop: 16 }]}>Presupuestos</Text>
      {budgets.map(budget => (
        <BudgetCard 
          key={budget.id}
          category={budget.category}
          spent={budget.spent}
          limit={budget.limit}
          onPress={() => navigation.navigate('EditBudget', { budget })}
        />
      ))}
      <Button 
        title="Ver todos los presupuestos" 
        onPress={() => navigation.navigate('Budgets')}
        style={{ marginTop: 8, backgroundColor: colors.light }}
        textStyle={{ color: colors.dark }}
      />

      {/* Últimas transacciones */}
      <Text style={[styles.header, { marginTop: 16 }]}>Últimas transacciones</Text>
      {recentTransactions.map(transaction => (
        <TransactionItem 
          key={transaction.id}
          amount={transaction.amount}
          category={transaction.category}
          date={transaction.date}
          type={transaction.type}
          onPress={() => navigation.navigate('EditTransaction', { transaction })}
        />
      ))}
      <Button 
        title="Ver todas las transacciones" 
        onPress={() => navigation.navigate('Transactions')}
        style={{ marginTop: 8, backgroundColor: colors.light }}
        textStyle={{ color: colors.dark }}
      />
    </ScrollView>
  );
};

export default HomeScreen;