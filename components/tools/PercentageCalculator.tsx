import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function PercentageCalculator() {
  const { colors: Colors } = useApp();
  const [valA, setValA] = useState('20');
  const [valB, setValB] = useState('500');
  
  const [result, setResult] = useState('0');

  useEffect(() => {
    const a = parseFloat(valA) || 0;
    const b = parseFloat(valB) || 0;
    if (b !== 0) {
      setResult(((a / 100) * b).toFixed(2));
    }
  }, [valA, valB]);

  return (
    <View style={styles.container}>
      {/* Result Display */}
      <View style={[styles.resultCard, { backgroundColor: Colors.primary }]}>
        <Text style={styles.resultLabel}>Calculated Result</Text>
        <Text style={styles.resultValue}>{result}</Text>
        <Text style={styles.resultSub}>({valA}% of {valB})</Text>
      </View>

      {/* Input Group */}
      <View style={styles.inputGroup}>
          <View style={styles.inputBox}>
              <Text style={[styles.label, { color: Colors.text }]}>What is</Text>
              <View style={styles.row}>
                <TextInput 
                  style={[styles.input, { flex: 1, backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
                  value={valA}
                  onChangeText={setValA}
                  keyboardType="numeric"
                />
                <Text style={[styles.symbol, { color: Colors.text }]}>%</Text>
              </View>
          </View>

          <View style={styles.inputBox}>
              <Text style={[styles.label, { color: Colors.text }]}>Of Amount</Text>
              <TextInput 
                style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
                value={valB}
                onChangeText={setValB}
                keyboardType="numeric"
              />
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  resultCard: { padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  resultLabel: { fontFamily: 'SpaceGrotesk_500Medium', color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 8 },
  resultValue: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 64 },
  resultSub: { fontFamily: 'SpaceGrotesk_600SemiBold', color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 4 },

  inputGroup: { marginTop: 40, gap: 24 },
  inputBox: { gap: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 16, marginLeft: 4 },
  input: { height: 64, borderRadius: 20, paddingHorizontal: 20, fontSize: 24, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5 },
  symbol: { fontSize: 28, fontFamily: 'SpaceGrotesk_700Bold' }
});
