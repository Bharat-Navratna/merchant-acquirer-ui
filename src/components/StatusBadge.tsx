import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  status: 'success' | 'failed';
}

export const StatusBadge: React.FC<Props> = ({ status }) => {
  const label = status === 'success' ? 'Succès' : 'Échec';
  const style = status === 'success' ? styles.success : styles.failed;

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  text: {
    color: '#fff',
    fontSize: 12,
  },
  success: {
    backgroundColor: '#4caf50',
  },
  failed: {
    backgroundColor: '#f44336',
  },
});
