import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTransactions } from '../context/TransactionsContext';
import { TransactionRow } from '../components/TransactionRow';
import { RootStackParamList } from '../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeNavProp>();
  const { transactions } = useTransactions();

  const recent = transactions.slice(0, 5);

  const goToDetail = (id: string) => {
    navigation.navigate('TransactionDetail', { transactionId: id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.actionsRow}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.link}>Paramètres</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>Transactions récentes</Text>
      <FlatList
        data={recent}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TransactionRow transaction={item} onPress={() => goToDetail(item.id)} />
        )}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
        <Text style={styles.link}>Voir tout</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => navigation.navigate('PayMethodSelect')}
        >
          <Text style={styles.payButtonText}>Nouveau paiement</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 8,
  },
  link: {
    color: '#007aff',
    marginVertical: 4,
    fontSize: 16,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
  },
  payButton: {
    backgroundColor: '#007aff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default HomeScreen;
