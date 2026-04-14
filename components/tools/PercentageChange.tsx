import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function PercentageChange() {
  const { colors: Colors } = useApp();
  const [initial, setInitial] = useState('100');
  const [final, setFinal] = useState('150');
  
  const [change, setChange] = useState('0');
  const [isIncrease, setIsIncrease] = useState(true);

  useEffect(() => {
    const v1 = parseFloat(initial) || 0;
    const v2 = parseFloat(final) || 0;

    if (v1 !== 0) {
      const diff = v2 - v1;
      const pct = (diff / Math.abs(v1)) * 100;
      setChange(Math.abs(pct).toFixed(2));
      setIsIncrease(diff >= 0);
    }
  }, [initial, final]);

  return (
    <View style={styles.container}>
      <View style={[styles.resultCard, { backgroundColor: isIncrease ? '#10B981' : '#EF4444' }]}>
        <Text style={styles.resultLabel}>{isIncrease ? 'Increase' : 'Decrease'}</Text>
        <Text style={styles.resultValue}>{isIncrease ? '+' : '-'}{change}%</Text>
      </View>

      <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: Colors.text }]}>Initial Value</Text>
          <TextInput 
            style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
            value={initial}
            onChangeText={setInitial}
            keyboardType="numeric"
          />

          <Text style={[styles.label, { color: Colors.text }]}>Final Value</Text>
          <TextInput 
            style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
            value={final}
            onChangeText={setFinal}
            keyboardType="numeric"
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  resultCard: { padding: 30, borderRadius: 32, alignItems: 'center' },
  resultLabel: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 13, letterSpacing: 2, marginBottom: 4, textTransform: 'uppercase' },
  resultValue: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 64 },

  inputGroup: { marginTop: 40, gap: 10 },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14, marginBottom: 4, marginLeft: 4 },
  input: { height: 64, borderRadius: 20, paddingHorizontal: 20, fontSize: 24, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5, marginBottom: 16 },
});
