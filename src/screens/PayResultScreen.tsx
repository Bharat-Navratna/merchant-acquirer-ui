import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { formatMoney } from '../utils/formatMoney';

type ResultRouteProp = RouteProp<RootStackParamList, 'PayResult'>;

const PayResultScreen: React.FC = () => {
  const route = useRoute<ResultRouteProp>();
  const navigation = useNavigation();
  const { success, transaction } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{success ? 'Paiement réussi' : 'Paiement échoué'}</Text>
      {transaction && (
        <>
          <Text style={styles.detail}>{formatMoney(transaction.amount)}</Text>
          <Text style={styles.detail}>Réf: {transaction.reference}</Text>
        </>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Retour à l'accueil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 16 },
  detail: { fontSize: 16, marginVertical: 4 },
  button: { marginTop: 24, backgroundColor: '#007aff', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default PayResultScreen;
