import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function InvestmentReturn() {
  const { colors: Colors } = useApp();
  const [initial, setInitial] = useState('10000');
  const [rate, setRate] = useState('12');
  const [years, setYears] = useState('5');
  
  const [finalValue, setFinalValue] = useState('0');
  const [totalProfit, setTotalProfit] = useState('0');

  useEffect(() => {
    const P = parseFloat(initial) || 0;
    const r = parseFloat(rate) || 0;
    const t = parseFloat(years) || 0;

    if (P > 0) {
      const amount = P * Math.pow(1 + (r / 100), t);
      setFinalValue(amount.toFixed(0));
      setTotalProfit((amount - P).toFixed(0));
    }
  }, [initial, rate, years]);

  return (
    <View style={styles.container}>
      <View style={[styles.resultCard, { backgroundColor: '#10B981' }]}>
        <Text style={styles.resultLabel}>Future Value</Text>
        <Text style={styles.resultValue}>₹ {Number(finalValue).toLocaleString('en-IN')}</Text>
        <View style={styles.statsRow}>
           <Text style={styles.statText}>Total Gain: ₹ {Number(totalProfit).toLocaleString('en-IN')}</Text>
        </View>
      </View>

      <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: Colors.text }]}>Initial Investment (₹)</Text>
          <TextInput 
            style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
            value={initial}
            onChangeText={setInitial}
            keyboardType="numeric"
          />

          <Text style={[styles.label, { color: Colors.text }]}>Annual Interest Rate (%)</Text>
          <TextInput 
            style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
            value={rate}
            onChangeText={setRate}
            keyboardType="numeric"
          />

          <Text style={[styles.label, { color: Colors.text }]}>Investment Period (Years)</Text>
          <TextInput 
            style={[styles.input, { backgroundColor: Colors.cardBg, color: Colors.text, borderColor: Colors.border }]}
            value={years}
            onChangeText={setYears}
            keyboardType="numeric"
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  resultCard: { padding: 30, borderRadius: 32, alignItems: 'center', elevation: 5 },
  resultLabel: { fontFamily: 'SpaceGrotesk_500Medium', color: 'rgba(255,255,255,0.8)', fontSize: 13, marginBottom: 8 },
  resultValue: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 40 },
  statsRow: { marginTop: 16, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100 },
  statText: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 14 },

  inputGroup: { marginTop: 30, gap: 10 },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14, marginBottom: 4, marginLeft: 4 },
  input: { height: 60, borderRadius: 18, paddingHorizontal: 20, fontSize: 22, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5, marginBottom: 12 },
});
