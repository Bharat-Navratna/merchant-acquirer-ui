import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

const buttons = ['1','2','3','4','5','6','7','8','9','0','.','←'];

export const AmountKeypad: React.FC<Props> = ({ value, onChange }) => {
  const handlePress = (btn: string) => {
    if (btn === '←') {
      onChange(value.slice(0, -1));
    } else if (btn === '.') {
      if (!value.includes('.')) {
        onChange(value + '.');
      }
    } else {
      onChange(value + btn);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{value || '0'}</Text>
      <View style={styles.grid}>
        {buttons.map(b => (
          <TouchableOpacity
            key={b}
            style={styles.key}
            onPress={() => handlePress(b)}
          >
            <Text style={styles.keyText}>{b}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  display: {
    fontSize: 32,
    marginVertical: 16,
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  key: {
    width: '30%',
    margin: '1%',
    aspectRatio: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  keyText: {
    fontSize: 24,
  },
});
