import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import styles from '../../constants/styles';
import colors from '../../constants/colors';
import TransactionItem from '../../components/finance/TransactionItem';

const TransactionsScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'income', 'expense'

  // Datos de ejemplo
  const transactions = [
    { id: 1, amount: 1500, category: 'Comida', date: '2023-05-15', type: 'expense', description: 'Almuerzo con amigos' },
    { id: 2, amount: 5000, category: 'Salario', date: '2023-05-10', type: 'income', description: 'Pago quincenal' },
    { id: 3, amount: 1200, category: 'Transporte', date: '2023-05-08', type: 'expense', description: 'Gasolina' },
    { id: 4, amount: 800, category: 'Entretenimiento', date: '2023-05-05', type: 'expense', description: 'Cine' },
    { id: 5, amount: 3000, category: 'Freelance', date: '2023-05-01', type: 'income', description: 'Diseño de logo' },
  ];

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.category.toLowerCase().includes(search.toLowerCase()) || 
                         t.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || t.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Buscar transacciones..."
        onChangeText={setSearch}
        value={search}
        lightTheme
        round
        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
        inputContainerStyle={{ backgroundColor: colors.light }}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 16 }}>
        <TouchableOpacity 
          onPress={() => setFilter('all')}
          style={{ padding: 8, borderBottomWidth: filter === 'all' ? 2 : 0, borderColor: colors.primary }}
        >
          <Text style={{ color: filter === 'all' ? colors.primary : colors.dark }}>Todas</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setFilter('income')}
          style={{ padding: 8, borderBottomWidth: filter === 'income' ? 2 : 0, borderColor: colors.income }}
        >
          <Text style={{ color: filter === 'income' ? colors.income : colors.dark }}>Ingresos</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setFilter('expense')}
          style={{ padding: 8, borderBottomWidth: filter === 'expense' ? 2 : 0, borderColor: colors.expense }}
        >
          <Text style={{ color: filter === 'expense' ? colors.expense : colors.dark }}>Gastos</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TransactionItem 
            amount={item.amount}
            category={item.category}
            date={item.date}
            type={item.type}
            description={item.description}
            onPress={() => navigation.navigate('EditTransaction', { transaction: item })}
          />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 32, color: colors.dark }}>
            No se encontraron transacciones
          </Text>
        }
      />
    </View>
  );
};

export default TransactionsScreen;