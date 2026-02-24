import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useTransactions } from '../context/TransactionsContext';
import { TransactionRow } from '../components/TransactionRow';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Transactions'>;

const TransactionsScreen: React.FC = () => {
  const { transactions } = useTransactions();
  const navigation = useNavigation<NavProp>();

  const goDetail = (id: string) => {
    navigation.navigate('TransactionDetail', { transactionId: id });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TransactionRow transaction={item} onPress={() => goDetail(item.id)} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default TransactionsScreen;
