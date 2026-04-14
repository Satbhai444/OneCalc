import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function CAGRCalculator() {
  const { colors: Colors } = useApp();
  const [initial, setInitial] = useState('10000');
  const [final, setFinal] = useState('25000');
  const [years, setYears] = useState('5');
  
  const [cagr, setCagr] = useState(0);

  useEffect(() => {
    const iv = parseFloat(initial);
    const fv = parseFloat(final);
    const yv = parseFloat(years);

    if (iv > 0 && fv > 0 && yv > 0) {
      const res = (Math.pow(fv / iv, 1 / yv) - 1) * 100;
      setCagr(res);
    }
  }, [initial, final, years]);

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.resultCard, { backgroundColor: '#10B981' }]}>
         <Text style={styles.resLabel}>CAGR Growth Rate</Text>
         <Text style={styles.resVal}>{cagr.toFixed(2)}%</Text>
         <Text style={styles.hint}>Annualized return over {years} years</Text>
      </View>

      <View style={styles.form}>
         <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: Colors.text }]}>Initial Investment</Text>
            <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} value={initial} onChangeText={setInitial} keyboardType="numeric" />
         </View>
         <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: Colors.text }]}>Final Value</Text>
            <TextInput style={[styles.input, { borderColor: Colors.border,  color: Colors.text, backgroundColor: Colors.cardBg }]} value={final} onChangeText={setFinal} keyboardType="numeric" />
         </View>
         <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: Colors.text }]}>Duration (Years)</Text>
            <TextInput style={[styles.input, { borderColor: Colors.border,  color: Colors.text, backgroundColor: Colors.cardBg }]} value={years} onChangeText={setYears} keyboardType="numeric" />
         </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  resultCard: { padding: 30, borderRadius: 24, alignItems: 'center', marginBottom: 30 },
  resLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold' },
  resVal: { color: '#FFF', fontSize: 44, fontFamily: 'SpaceGrotesk_700Bold' },
  hint: { fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 8, fontFamily: 'SpaceGrotesk_500Medium' },
  form: { gap: 16, marginBottom: 40 },
  inputGroup: { gap: 8 },
  label: { fontSize: 14, fontFamily: 'SpaceGrotesk_700Bold', marginLeft: 4 },
  input: { height: 60, borderRadius: 20, paddingHorizontal: 20, fontSize: 24, fontFamily: 'SpaceGrotesk_700Bold', borderWidth: 1.5 },
});
