import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function RetirementCalculator() {
  const { colors: Colors } = useApp();
  const [age, setAge] = useState('25');
  const [retireAge, setRetireAge] = useState('60');
  const [expenses, setExpenses] = useState('50000');
  const [inflation, setInflation] = useState('6');
  
  const [corpus, setCorpus] = useState('0');

  useEffect(() => {
    const curAge = parseInt(age) || 0;
    const retAge = parseInt(retireAge) || 0;
    const exp = parseFloat(expenses) || 0;
    const infl = parseFloat(inflation) || 0;

    if (retAge > curAge) {
      const yearsToRetire = retAge - curAge;
      const futureExpenses = exp * Math.pow(1 + (infl / 100), yearsToRetire);
      // Rough corpus: 25x future annual expenses
      const total = futureExpenses * 12 * 25;
      setCorpus(total.toFixed(0));
    }
  }, [age, retireAge, expenses, inflation]);

  return (
    <View style={styles.container}>
      <View style={[styles.resultCard, { backgroundColor: '#7C3AED' }]}>
        <Text style={styles.resultLabel}>Required Retirement Corpus</Text>
        <Text style={styles.resultValue}>₹ {Number(corpus).toLocaleString('en-IN')}</Text>
        <Text style={styles.hint}>Based on 25x Annual Future Expenses</Text>
      </View>

      <ScrollView contentContainerStyle={styles.inputGroup} showsVerticalScrollIndicator={false}>
          <View style={styles.row}>
             <View style={{flex: 1}}>
                <Text style={[styles.label, { color: Colors.text }]}>Current Age</Text>
                <TextInput style={[styles.input, { borderColor: Colors.border,  color: Colors.text }]} value={age} onChangeText={setAge} keyboardType="numeric" />
             </View>
             <View style={{flex: 1}}>
                <Text style={[styles.label, { color: Colors.text }]}>Retire Age</Text>
                <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text }]} value={retireAge} onChangeText={setRetireAge} keyboardType="numeric" />
             </View>
          </View>

          <Text style={[styles.label, { color: Colors.text }]}>Current Monthly Expenses (₹)</Text>
          <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text }]} value={expenses} onChangeText={setExpenses} keyboardType="numeric" />

          <Text style={[styles.label, { color: Colors.text }]}>Expected Inflation (%)</Text>
          <TextInput style={[styles.input, { borderColor: Colors.border, color: Colors.text }]} value={inflation} onChangeText={setInflation} keyboardType="numeric" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  resultCard: { padding: 30, borderRadius: 32, alignItems: 'center', marginBottom: 30 },
  resultLabel: { fontFamily: 'SpaceGrotesk_500Medium', color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 8 },
  resultValue: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 32 },
  hint: { fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 10, fontFamily: 'SpaceGrotesk_500Medium' },
  inputGroup: { gap: 16 },
  row: { flexDirection: 'row', gap: 16 },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14, marginBottom: 4, marginLeft: 4 },
  input: { height: 56, borderRadius: 16, paddingHorizontal: 16, fontSize: 18, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5 },
});
