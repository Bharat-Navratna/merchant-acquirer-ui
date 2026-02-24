import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SettingsScreen: React.FC = () => {
  const [lang, setLang] = useState<'fr' | 'ar'>('fr');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Langue</Text>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => setLang('fr')}
          style={[styles.option, lang === 'fr' && styles.selected]}
        >
          <Text style={styles.optionText}>Français</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setLang('ar')}
          style={[styles.option, lang === 'ar' && styles.selected]}
        >
          <Text style={styles.optionText}>العربية</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.note}>(Sélection seulement, pas de traduction réelle)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  row: { flexDirection: 'row' },
  option: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  selected: {
    borderColor: '#007aff',
    backgroundColor: '#e6f0ff',
  },
  optionText: { fontSize: 16 },
  note: { fontSize: 12, color: '#666', marginTop: 16 },
});

export default SettingsScreen;
